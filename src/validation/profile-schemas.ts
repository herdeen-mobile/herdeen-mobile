/**
 * Zod validation schemas for User Profile and Preferences
 */

import { z } from 'zod';

export const editProfileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'First name is required')
    .max(50, 'First name is too long'),
  lastName: z
    .string()
    .trim()
    .max(50, 'Last name is too long')
    .optional(),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .toLowerCase(),
  phoneNumber: z
    .string()
    .trim()
    .max(20, 'Phone number is too long')
    .optional(),
  lifeStage: z.string().optional(),
  deenGoals: z.array(z.string()).optional(),
});

export type EditProfileFormData = z.infer<typeof editProfileSchema>;

export const prayerSettingsSchema = z.object({
  fajr: z.boolean().optional(),
  dhuhr: z.boolean().optional(),
  asr: z.boolean().optional(),
  maghrib: z.boolean().optional(),
  isha: z.boolean().optional(),
  adhanSound: z.string().optional(),
  jumuahReminder: z.boolean().optional(),
  tahajjudReminder: z.boolean().optional(),
  calculationMethod: z.string().optional(),
  asrMethod: z.string().optional(),
});

export type PrayerSettingsFormData = z.infer<typeof prayerSettingsSchema>;
