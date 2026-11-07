/**
 * Types and interfaces for HerDeen Authentication
 * Extracted and modeled from Herdeen Postman Collection
 */

export interface User {
  id?: string;
  _id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  isEmailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

// 1. Pre-Register (POST /auth/pre-register)
export interface PreRegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface PreRegisterResponse {
  message?: string;
  success?: boolean;
  data?: {
    email?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

// 2. Register / Verify Email OTP (POST /auth/register)
export interface RegisterRequest {
  email: string;
  otp: string;
}

export interface RegisterResponse {
  message?: string;
  success?: boolean;
  accessToken?: string;
  authKey?: string;
  refreshToken?: string;
  user?: User;
  payload?: {
    message?: string;
    authKey?: string;
    accessToken?: string;
    refreshToken?: string;
    user?: User;
    [key: string]: any;
  };
  data?: {
    authKey?: string;
    accessToken?: string;
    refreshToken?: string;
    user?: User;
    [key: string]: any;
  };
  [key: string]: any;
}

// 3. Login (POST /auth/login)
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message?: string;
  success?: boolean;
  accessToken?: string;
  authKey?: string;
  refreshToken?: string;
  user?: User;
  payload?: {
    message?: string;
    authKey?: string;
    accessToken?: string;
    refreshToken?: string;
    user?: User;
    [key: string]: any;
  };
  data?: {
    authKey?: string;
    accessToken?: string;
    refreshToken?: string;
    user?: User;
    [key: string]: any;
  };
  [key: string]: any;
}

// 4. Request OTP / Forgot Password (POST /auth/request-otp)
export interface RequestOtpRequest {
  email: string;
}

export interface RequestOtpResponse {
  message?: string;
  success?: boolean;
  data?: any;
  [key: string]: any;
}

// 5. Reset Password (PATCH /auth/reset-password)
export interface ResetPasswordRequest {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordResponse {
  message?: string;
  success?: boolean;
  data?: any;
  [key: string]: any;
}

// 6. Logout (POST /auth/logout)
export interface LogoutRequest {
  email?: string;
  password?: string;
}

export interface LogoutResponse {
  message?: string;
  success?: boolean;
  [key: string]: any;
}

// 7. Refresh Token (POST /auth/refresh)
export interface RefreshTokenResponse {
  message?: string;
  success?: boolean;
  accessToken?: string;
  authKey?: string;
  refreshToken?: string;
  payload?: {
    message?: string;
    authKey?: string;
    accessToken?: string;
    refreshToken?: string;
    [key: string]: any;
  };
  data?: {
    authKey?: string;
    accessToken?: string;
    refreshToken?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

// Admin Auth Types
export interface AdminCreateRequest {
  email: string;
}

export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface AdminOtpRequest {
  email: string;
}

export interface AdminResetPasswordRequest {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
}

export interface AdminChangePasswordRequest {
  password: string;
  data: {
    password: string;
    confirmPassword: string;
  };
}

// Generic API Error / Backend Error Format
export interface ApiError {
  success?: boolean;
  payload?: string | string[] | Record<string, any>;
  timeStamp?: string;
  message?: string;
  statusCode?: number;
  error?: string;
  details?: any;
}

