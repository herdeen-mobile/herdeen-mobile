/**
 * Types for Prayer Settings & Solah Reminders Background Jobs
 */

export interface PrayerSettingsData {
  remindersEnabled?: boolean | string;
  reminderBefore?: number;
  latitude?: string | number;
  longitude?: string | number;
  timezone?: string;
  calculationMethod?: string;
  madhab?: string;
}

export interface PrayerSettingsRequest {
  data: PrayerSettingsData;
}

export interface PrayerSettingsResponse {
  success?: boolean;
  message?: string;
  payload?: any;
  data?: any;
  [key: string]: any;
}

