/**
 * TanStack React Query Hooks for HerDeen Authentication
 */

import { useAuth } from '@/src/context/auth-context';
import { getErrorMessage } from '@/src/services/api/api-client';
import { AuthService } from '@/src/services/api/auth-service';
import {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  PreRegisterRequest,
  PreRegisterResponse,
  RegisterRequest,
  RegisterResponse,
  RequestOtpRequest,
  RequestOtpResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from '@/src/types/auth';
import { useMutation } from '@tanstack/react-query';

/**
 * 1. Pre-register hook (POST /auth/pre-register)
 */
export const usePreRegisterMutation = () => {
  const { setPendingEmail } = useAuth();

  return useMutation<PreRegisterResponse, Error, PreRegisterRequest>({
    mutationFn: async (data: PreRegisterRequest) => {
      try {
        const res = await AuthService.preRegister(data);
        return res;
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
    onSuccess: (_, variables) => {
      setPendingEmail(variables.email);
    },
  });
};

/**
 * Helper to extract tokens and user metadata from backend response
 * Handles { success: true, payload: { authKey, refreshToken, ... } }
 * and legacy { data: { accessToken, ... } }
 */
const extractTokensAndUser = (data: any, email?: string) => {
  const payload = data?.payload;
  const d = data?.data;

  const accessToken =
    payload?.authKey ||
    d?.authKey ||
    data?.authKey ||
    payload?.accessToken ||
    d?.accessToken ||
    data?.accessToken ||
    payload?.token ||
    d?.token ||
    data?.token ||
    (typeof payload === 'string' && payload.startsWith('ey') ? payload : undefined);

  const refreshToken =
    payload?.refreshToken ||
    d?.refreshToken ||
    data?.refreshToken;

  const user =
    payload?.user ||
    d?.user ||
    data?.user ||
    (email ? { email } : undefined);

  return { accessToken, refreshToken, user };
};

/**
 * 2. Register hook - Verify Email OTP (POST /auth/register)
 */
export const useRegisterMutation = () => {
  const { setAuthSession } = useAuth();

  return useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationFn: async (data: RegisterRequest) => {
      try {
        const res = await AuthService.register(data);
        return res;
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
    onSuccess: async (data, variables) => {
      const { accessToken, refreshToken, user } = extractTokensAndUser(data, variables.email);
      if (accessToken) {
        await setAuthSession(accessToken, refreshToken, user);
      }
    },
  });
};

/**
 * 3. Login hook (POST /auth/login)
 */
export const useLoginMutation = () => {
  const { setAuthSession } = useAuth();

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async (data: LoginRequest) => {
      try {
        const res = await AuthService.login(data);
        return res;
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
    onSuccess: async (data, variables) => {
      const { accessToken, refreshToken, user } = extractTokensAndUser(data, variables.email);
      if (accessToken) {
        await setAuthSession(accessToken, refreshToken, user);
      }
    },
  });
};

/**
 * 4. Request OTP / Forgot Password hook (POST /auth/request-otp)
 */
export const useRequestOtpMutation = () => {
  const { setPendingEmail } = useAuth();

  return useMutation<RequestOtpResponse, Error, RequestOtpRequest>({
    mutationFn: async (data: RequestOtpRequest) => {
      try {
        const res = await AuthService.requestOtp(data);
        return res;
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
    onSuccess: (_, variables) => {
      setPendingEmail(variables.email);
    },
  });
};

/**
 * 5. Reset Password hook (PATCH /auth/reset-password)
 */
export const useResetPasswordMutation = () => {
  return useMutation<ResetPasswordResponse, Error, ResetPasswordRequest>({
    mutationFn: async (data: ResetPasswordRequest) => {
      try {
        const res = await AuthService.resetPassword(data);
        return res;
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
  });
};

/**
 * 6. Logout hook (POST /auth/logout)
 */
export const useLogoutMutation = () => {
  const { logout } = useAuth();

  return useMutation<LogoutResponse, Error, LogoutRequest | undefined>({
    mutationFn: async (data?: LogoutRequest) => {
      try {
        const res = await AuthService.logout(data);
        return res;
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
    onSettled: async () => {
      await logout();
    },
  });
};

