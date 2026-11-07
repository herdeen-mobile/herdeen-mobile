/**
 * HerDeen Authentication API Service
 * Implements all authentication endpoints from Herdeen Postman Collection
 */

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
    const response = await apiClient.post<PreRegisterResponse>('/auth/pre-register', {
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
    const response = await apiClient.post<RegisterResponse>('/auth/register', {
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
    const response = await apiClient.post<LoginResponse>('/auth/login', {
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
    const response = await apiClient.post<RequestOtpResponse>('/auth/request-otp', {
      email: data.email.trim().toLowerCase(),
    });
    return response.data;
  },

  /**
   * 5. Reset Password (PATCH /auth/reset-password)
   * Resets password using OTP, new password and confirmPassword
   */
  async resetPassword(data: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    const response = await apiClient.patch<ResetPasswordResponse>('/auth/reset-password', {
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
    const response = await apiClient.post<LogoutResponse>('/auth/logout', data || {});
    return response.data;
  },

  /**
   * 7. Refresh Token (POST /auth/refresh)
   * Obtains a new access token and rotated refresh token
   */
  async refreshToken(): Promise<RefreshTokenResponse> {
    const response = await apiClient.post<RefreshTokenResponse>('/auth/refresh');
    return response.data;
  },

  // ================= ADMIN AUTH ENDPOINTS ================= //

  /**
   * Admin Create (POST /auth/admin/create)
   */
  async adminCreate(data: AdminCreateRequest): Promise<any> {
    const response = await apiClient.post('/auth/admin/create', {
      email: data.email.trim().toLowerCase(),
    });
    return response.data;
  },

  /**
   * Admin Login (POST /auth/admin/login)
   */
  async adminLogin(data: AdminLoginRequest): Promise<any> {
    const response = await apiClient.post('/auth/admin/login', {
      email: data.email.trim().toLowerCase(),
      password: data.password,
    });
    return response.data;
  },

  /**
   * Admin Request OTP (POST /auth/admin/otp)
   */
  async adminOtp(data: AdminOtpRequest): Promise<any> {
    const response = await apiClient.post('/auth/admin/otp', {
      email: data.email.trim().toLowerCase(),
    });
    return response.data;
  },

  /**
   * Admin Reset Password (PATCH /auth/admin/reset-password)
   */
  async adminResetPassword(data: AdminResetPasswordRequest): Promise<any> {
    const response = await apiClient.patch('/auth/admin/reset-password', {
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
    const response = await apiClient.patch('/auth/admin/password', data);
    return response.data;
  },
};

