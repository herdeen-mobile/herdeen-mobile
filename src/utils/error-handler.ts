/**
 * Centralized API & Application Error Handler Utility
 */

import axios from 'axios';

/**
 * Extracts a human-readable error message from an unknown error,
 * prioritizing server response messages (payload, message, error).
 */
export function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error;
  }

  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    if (data) {
      if (typeof data === 'string') return data;
      if (typeof data.payload === 'string') return data.payload;
      if (typeof data.message === 'string') return data.message;
      if (typeof data.error === 'string') return data.error;
      if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
        return String(data.errors[0]);
      }
    }

    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      return 'The request timed out. Please check your network and try again.';
    }

    if (error.message === 'Network Error' || !error.response) {
      return 'Network connection issue. Please verify your internet connection.';
    }

    return error.message || 'An unexpected server error occurred.';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred. Please try again.';
}

/**
 * Checks if the error represents a network connection failure or timeout
 */
export function isNetworkError(error: unknown): boolean {
  if (axios.isAxiosError(error)) {
    return !error.response || error.code === 'ECONNABORTED' || error.message === 'Network Error';
  }
  return false;
}

/**
 * Checks if the error is an unauthenticated / expired session error (401)
 */
export function isAuthError(error: unknown): boolean {
  if (axios.isAxiosError(error)) {
    return error.response?.status === 401;
  }
  return false;
}

