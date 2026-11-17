/**
 * Types for Prayer Settings, Prayer Times & Solah Reminders Background Jobs
 */

export interface PrayerSettingsData {
  remindersEnabled?: boolean | string;
  reminderBefore?: number;
  latitude?: string | number;
  longitude?: string | number;
  timezone?: string;
  calculationMethod?: string;
  madhab?: string;
  adhanSound?: boolean;
  jumuahReminder?: boolean;
  tahajjudReminder?: boolean;
  fajr?: boolean;
  dhuhr?: boolean;
  asr?: boolean;
  maghrib?: boolean;
  isha?: boolean;
  reminderType?: 'sound' | 'vibration' | 'silent' | string;
  [key: string]: any;
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

export interface PrayerTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export interface PrayerTimesPayload {
  date: string;
  timezone: string;
  prayers: PrayerTimes;
}

export interface PrayerTimesResponse {
  success: boolean;
  payload: PrayerTimesPayload;
  timeStamp?: string;
}
