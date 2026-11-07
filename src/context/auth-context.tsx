/**
 * HerDeen Authentication Context
 * Manages global authentication state, token lifecycle, and session restore
 */

import { TokenStorage } from '@/src/services/storage/token-storage';
import { User } from '@/src/types/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  pendingEmail: string;
  setPendingEmail: (email: string) => void;
  setAuthSession: (accessToken: string, refreshToken?: string, user?: User) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pendingEmail, setPendingEmailState] = useState<string>('');

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = await TokenStorage.getAccessToken();
        const storedUser = await TokenStorage.getUser();
        const storedPendingEmail = await TokenStorage.getPendingEmail();

        if (token) {
          setIsAuthenticated(true);
          if (storedUser) setUser(storedUser);
        }
        if (storedPendingEmail) {
          setPendingEmailState(storedPendingEmail);
        }
      } catch (e) {
        console.warn('[AuthProvider] Initialization error:', e);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const setPendingEmail = (email: string) => {
    setPendingEmailState(email);
    TokenStorage.setPendingEmail(email);
  };

  const setAuthSession = async (accessToken: string, refreshToken?: string, newUser?: User) => {
    await TokenStorage.setTokens(accessToken, refreshToken);
    if (newUser) {
      await TokenStorage.setUser(newUser);
      setUser(newUser);
    }
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await TokenStorage.clearAll();
    setUser(null);
    setIsAuthenticated(false);
    setPendingEmailState('');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        pendingEmail,
        setPendingEmail,
        setAuthSession,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

