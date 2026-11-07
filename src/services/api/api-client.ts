/**
 * Centralized Axios API Client
 * Includes:
 * - JWT Bearer token auto-injection
 * - Refresh-token rotation on 401 Unauthorized
 * - Request queueing while refreshing
 * - Standardized error formatting
 */

import { ENV } from '@/src/config/env';
import { TokenStorage } from '@/src/services/storage/token-storage';
import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

export const apiClient = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: ENV.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
  config: AxiosRequestConfig;
}> = [];

const processQueue = (error: any = null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      if (prom.config.headers) {
        prom.config.headers['Authorization'] = `Bearer ${token}`;
      }
      prom.resolve(apiClient(prom.config));
    }
  });
  failedQueue = [];
};

// Request Interceptor: Attach Access Token
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const token = await TokenStorage.getAccessToken();
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.warn('[apiClient] Error attaching token to request:', err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Token Refresh on 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // If 401 and request has not been retried yet, and is not the refresh/login endpoint itself
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/login') &&
      !originalRequest.url?.includes('/auth/refresh')
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await TokenStorage.getRefreshToken();
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Call /auth/refresh with Refresh Token in Authorization header
        const refreshResponse = await axios.post(
          `${ENV.API_BASE_URL}/auth/refresh`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        const newAccessToken =
          refreshResponse.data?.payload?.authKey ||
          refreshResponse.data?.data?.authKey ||
          refreshResponse.data?.authKey ||
          refreshResponse.data?.payload?.accessToken ||
          refreshResponse.data?.data?.accessToken ||
          refreshResponse.data?.accessToken ||
          refreshResponse.data?.token;

        const newRefreshToken =
          refreshResponse.data?.payload?.refreshToken ||
          refreshResponse.data?.data?.refreshToken ||
          refreshResponse.data?.refreshToken;

        if (!newAccessToken) {
          throw new Error('Refresh endpoint did not return a new access token');
        }

        await TokenStorage.setTokens(newAccessToken, newRefreshToken || refreshToken);

        processQueue(null, newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        await TokenStorage.clearAll();
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

/**
 * Helper to extract clean error message from Axios errors
 * Supports HerDeen's backend response structure:
 * {
 *   "success": false,
 *   "payload": "\"email\" must be a valid email",
 *   "timeStamp": "2026-11-07T05:04:55.346Z"
 * }
 */
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    if (typeof data === 'string') return data;

    // 1. Prioritize HerDeen backend payload format
    if (data?.payload !== undefined && data?.payload !== null) {
      if (typeof data.payload === 'string') {
        return data.payload.replace(/\\"/g, '"');
      }
      if (Array.isArray(data.payload)) {
        return data.payload
          .map((item: any) =>
            typeof item === 'string'
              ? item.replace(/\\"/g, '"')
              : item?.message || JSON.stringify(item)
          )
          .join('\n');
      }
      if (typeof data.payload === 'object') {
        return (
          data.payload.message ||
          data.payload.error ||
          JSON.stringify(data.payload)
        );
      }
      return String(data.payload);
    }

    // 2. Standard message field fallback
    if (data?.message) {
      if (Array.isArray(data.message)) {
        return data.message.join('\n');
      }
      return data.message;
    }

    // 3. Standard error field fallback
    if (data?.error) return data.error;

    // 4. Axios error fallback
    if (error.message) {
      if (error.message.includes('Network Error')) {
        return 'Network connection issue. Please check your internet connection.';
      }
      if (error.message.includes('timeout')) {
        return 'Request timed out. Please try again.';
      }
      return error.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred. Please try again.';
};

/**
 * Parses an error message to see if it targets a specific input field.
 * Handles Joi / backend validation formats such as:
 * "\"email\" must be a valid email" -> { field: 'email', message: '"email" must be a valid email' }
 */
export const parseFieldPayloadError = (
  errorMessage: string
): { field?: string; message: string } => {
  if (!errorMessage) return { message: '' };
  const cleaned = errorMessage.replace(/\\"/g, '"');

  // Match Joi-style pattern: "fieldName" ... or fieldName ...
  const joiMatch = cleaned.match(/^"?([a-zA-Z0-9_]+)"?\s+(.*)$/);
  if (joiMatch) {
    const potentialField = joiMatch[1];
    const knownFields = [
      'firstName',
      'lastName',
      'email',
      'password',
      'confirmPassword',
      'otp',
      'code',
    ];
    if (knownFields.includes(potentialField)) {
      return { field: potentialField, message: cleaned };
    }
  }

  // Keyword-based fallback matching
  const lower = cleaned.toLowerCase();

    // 1. Account existence collisions are email-field errors
    if (
      lower.includes('already exist') ||
      lower.includes('already registered') ||
      lower.includes('already in use') ||
      lower.includes('account already') ||
      lower.includes('user already')
    ) {
      return { field: 'email', message: cleaned };
    }

    if (lower.includes('email') || lower.includes('account')) {
      return { field: 'email', message: cleaned };
    }
    if (lower.includes('password') && !lower.includes('confirm')) {
      return { field: 'password', message: cleaned };
    }
    if (lower.includes('confirm')) {
      return { field: 'confirmPassword', message: cleaned };
    }
    if (lower.includes('otp') || lower.includes('code')) {
      return { field: 'otp', message: cleaned };
    }
    if (lower.includes('first name') || lower.includes('firstname')) {
      return { field: 'firstName', message: cleaned };
    }
    if (lower.includes('last name') || lower.includes('lastname')) {
      return { field: 'lastName', message: cleaned };
    }

    return { message: cleaned };
  };

