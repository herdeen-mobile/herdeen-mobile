/**
 * HerDeen Authentication API Service
 * Implements all authentication endpoints from Herdeen Postman Collection
 */

import { API_ENDPOINTS } from '@/src/config/endpoints';
import { apiClient } from '@/src/services/api/api-client';
import {
  AdminChangePasswordRequest,
  AdminCreateRequest,
  AdminLoginRequest,
  AdminOtpRequest,
  AdminResetPasswordRequest,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  PreRegisterRequest,
  PreRegisterResponse,
  RefreshTokenResponse,
  RegisterRequest,
  RegisterResponse,
  RequestOtpRequest,
  RequestOtpResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from '@/src/types/auth';

export const AuthService = {
  /**
   * 1. Pre-Register (POST /auth/pre-register)
   * Sends user details and triggers an OTP code to user's email
   */
  async preRegister(data: PreRegisterRequest): Promise<PreRegisterResponse> {
    const response = await apiClient.post<PreRegisterResponse>(API_ENDPOINTS.AUTH.PRE_REGISTER, {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim().toLowerCase(),
      password: data.password,
    });
    return response.data;
  },

  /**
   * 2. Register / Verify Email OTP (POST /auth/register)
   * Verifies the OTP code sent after pre-registration and activates account
   */
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await apiClient.post<RegisterResponse>(API_ENDPOINTS.AUTH.REGISTER, {
      email: data.email.trim().toLowerCase(),
      otp: data.otp.trim(),
    });
    return response.data;
  },

  /**
   * 3. Login (POST /auth/login)
   * Authenticates user with email and password
   */
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, {
      email: data.email.trim().toLowerCase(),
      password: data.password,
    });
    return response.data;
  },

  /**
   * 4. Request OTP / Forgot Password (POST /auth/request-otp)
   * Requests a password reset or verification OTP code
   */
  async requestOtp(data: RequestOtpRequest): Promise<RequestOtpResponse> {
    const response = await apiClient.post<RequestOtpResponse>(API_ENDPOINTS.AUTH.REQUEST_OTP, {
      email: data.email.trim().toLowerCase(),
    });
    return response.data;
  },

  /**
   * 5. Reset Password (PATCH /auth/reset-password)
   * Resets password using OTP, new password and confirmPassword
   */
  async resetPassword(data: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    const response = await apiClient.patch<ResetPasswordResponse>(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
      email: data.email.trim().toLowerCase(),
      otp: data.otp.trim(),
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
    return response.data;
  },

  /**
   * 6. Logout (POST /auth/logout)
   * Revokes the active refresh token and invalidates session
   */
  async logout(data?: LogoutRequest): Promise<LogoutResponse> {
    const response = await apiClient.post<LogoutResponse>(API_ENDPOINTS.AUTH.LOGOUT, data || {});
    return response.data;
  },

  /**
   * 7. Refresh Token (POST /auth/refresh)
   * Obtains a new access token and rotated refresh token
   */
  async refreshToken(): Promise<RefreshTokenResponse> {
    const response = await apiClient.post<RefreshTokenResponse>(API_ENDPOINTS.AUTH.REFRESH);
    return response.data;
  },

  // ================= ADMIN AUTH ENDPOINTS ================= //

  /**
   * Admin Create (POST /auth/admin/create)
   */
  async adminCreate(data: AdminCreateRequest): Promise<any> {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.ADMIN_CREATE, {
      email: data.email.trim().toLowerCase(),
    });
    return response.data;
  },

  /**
   * Admin Login (POST /auth/admin/login)
   */
  async adminLogin(data: AdminLoginRequest): Promise<any> {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.ADMIN_LOGIN, {
      email: data.email.trim().toLowerCase(),
      password: data.password,
    });
    return response.data;
  },

  /**
   * Admin Request OTP (POST /auth/admin/otp)
   */
  async adminOtp(data: AdminOtpRequest): Promise<any> {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.ADMIN_OTP, {
      email: data.email.trim().toLowerCase(),
    });
    return response.data;
  },

  /**
   * Admin Reset Password (PATCH /auth/admin/reset-password)
   */
  async adminResetPassword(data: AdminResetPasswordRequest): Promise<any> {
    const response = await apiClient.patch(API_ENDPOINTS.AUTH.ADMIN_RESET_PASSWORD, {
      email: data.email.trim().toLowerCase(),
      otp: data.otp.trim(),
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
    return response.data;
  },

  /**
   * Admin Change Default Password (PATCH /auth/admin/password)
   */
  async adminChangePassword(data: AdminChangePasswordRequest): Promise<any> {
    const response = await apiClient.patch(API_ENDPOINTS.AUTH.ADMIN_CHANGE_PASSWORD, data);
    return response.data;
  },

  /**
   * Update User AI, Life Stage & Deen Goals (PATCH /auth/user-data)
   */
  async updateUserData(data: { lifeStage?: string; deenGoals?: string[]; [key: string]: any }): Promise<any> {
    const response = await apiClient.patch(API_ENDPOINTS.AUTH.USER_DATA, data);
    return response.data;
  },

  /**
   * Clear Backend Cache / Reset Tracking Data (POST /clear-cache)
   */
  async clearCache(): Promise<any> {
    const response = await apiClient.post(API_ENDPOINTS.CLEAR_CACHE, {});
    return response.data;
  },

  /**
   * Change Password (PATCH /auth/admin/password)
   */
  async changePassword(data: { currentPassword?: string; password: string; confirmPassword: string }): Promise<any> {
    const response = await apiClient.patch(API_ENDPOINTS.AUTH.ADMIN_CHANGE_PASSWORD, {
      password: data.currentPassword || '',
      data: {
        password: data.password,
        confirmPassword: data.confirmPassword,
      },
    });
    return response.data;
  },
};
