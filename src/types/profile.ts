/**
 * Types for User Profile and Account Management
 */

import { User } from '@/src/types/auth';

export interface UserProfile extends User {
  phoneNumber?: string;
  avatarUrl?: string;
  lifeStage?: string;
  deenGoals?: string[];
}

export interface UpdateProfileRequest {
  firstName: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  lifeStage?: string;
  deenGoals?: string[];
}

export interface UpdateProfileResponse {
  success: boolean;
  message?: string;
  payload?: {
    user: User;
    [key: string]: any;
  };
}

