/**
 * Secure Token Storage for HerDeen
 * Persists JWT Access Token, Refresh Token, and user metadata
 * using expo-secure-store with safe fallback for web/memory.
 */

import { ENV } from '@/src/config/env';
import { User } from '@/src/types/auth';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const memoryStore: Record<string, string> = {};

const isSecureStoreAvailable = async (): Promise<boolean> => {
  if (Platform.OS === 'web') return false;
  try {
    return await SecureStore.isAvailableAsync();
  } catch {
    return false;
  }
};

const setItem = async (key: string, value: string): Promise<void> => {
  try {
    const available = await isSecureStoreAvailable();
    if (available) {
      await SecureStore.setItemAsync(key, value);
    } else if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    } else {
      memoryStore[key] = value;
    }
  } catch (error) {
    console.warn(`[TokenStorage] Error setting ${key}:`, error);
    memoryStore[key] = value;
  }
};

const getItem = async (key: string): Promise<string | null> => {
  try {
    const available = await isSecureStoreAvailable();
    if (available) {
      return await SecureStore.getItemAsync(key);
    } else if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    } else {
      return memoryStore[key] || null;
    }
  } catch (error) {
    console.warn(`[TokenStorage] Error getting ${key}:`, error);
    return memoryStore[key] || null;
  }
};

const removeItem = async (key: string): Promise<void> => {
  try {
    const available = await isSecureStoreAvailable();
    if (available) {
      await SecureStore.deleteItemAsync(key);
    } else if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    } else {
      delete memoryStore[key];
    }
  } catch (error) {
    console.warn(`[TokenStorage] Error removing ${key}:`, error);
    delete memoryStore[key];
  }
};

export const TokenStorage = {
  // Access Token
  async getAccessToken(): Promise<string | null> {
    return getItem(ENV.TOKEN_STORAGE_KEYS.ACCESS_TOKEN);
  },

  async setAccessToken(token: string): Promise<void> {
    return setItem(ENV.TOKEN_STORAGE_KEYS.ACCESS_TOKEN, token);
  },

  // Refresh Token
  async getRefreshToken(): Promise<string | null> {
    return getItem(ENV.TOKEN_STORAGE_KEYS.REFRESH_TOKEN);
  },

  async setRefreshToken(token: string): Promise<void> {
    return setItem(ENV.TOKEN_STORAGE_KEYS.REFRESH_TOKEN, token);
  },

  // Save Token Pair
  async setTokens(accessToken: string, refreshToken?: string): Promise<void> {
    await this.setAccessToken(accessToken);
    if (refreshToken) {
      await this.setRefreshToken(refreshToken);
    }
  },

  // User metadata
  async getUser(): Promise<User | null> {
    const userJson = await getItem(ENV.TOKEN_STORAGE_KEYS.USER);
    if (!userJson) return null;
    try {
      return JSON.parse(userJson) as User;
    } catch {
      return null;
    }
  },

  async setUser(user: User): Promise<void> {
    await setItem(ENV.TOKEN_STORAGE_KEYS.USER, JSON.stringify(user));
  },

  // Pending email (for registration/reset verification flows)
  async getPendingEmail(): Promise<string | null> {
    return getItem(ENV.TOKEN_STORAGE_KEYS.PENDING_EMAIL);
  },

  async setPendingEmail(email: string): Promise<void> {
    await setItem(ENV.TOKEN_STORAGE_KEYS.PENDING_EMAIL, email);
  },

  async removePendingEmail(): Promise<void> {
    await removeItem(ENV.TOKEN_STORAGE_KEYS.PENDING_EMAIL);
  },

  // Clear all auth state (Logout)
  async clearAll(): Promise<void> {
    await removeItem(ENV.TOKEN_STORAGE_KEYS.ACCESS_TOKEN);
    await removeItem(ENV.TOKEN_STORAGE_KEYS.REFRESH_TOKEN);
    await removeItem(ENV.TOKEN_STORAGE_KEYS.USER);
    await removeItem(ENV.TOKEN_STORAGE_KEYS.PENDING_EMAIL);
  },
};

