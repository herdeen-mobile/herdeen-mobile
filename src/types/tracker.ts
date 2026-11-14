/**
 * Types for Ibadah Daily Tracker (Prayer, Quran, Adhkar, Menstrual Status)
 */

export interface SalahTracker {
  fajr: boolean;
  dhuhr: boolean;
  asr: boolean;
  maghrib: boolean;
  isha: boolean;
}

export interface QuranTracker {
  pagesRead: number;
}

export interface MenstrualStatus {
  isInFlow: boolean;
  flowStartDate?: string;
  flowEndDate?: string;
  currentDay?: number;
  daysRemaining?: number;
}

export interface TrackerData {
  _id: string;
  userId: string;
  date: string;
  salah: SalahTracker;
  quran: QuranTracker;
  adhkaar: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface TodayTrackerPayload {
  tracker: TrackerData;
  MenstrualStatus?: MenstrualStatus;
}

export interface TodayTrackerResponse {
  success: boolean;
  payload: TodayTrackerPayload;
  timeStamp?: string;
}

export interface TogglePrayerRequest {
  prayer: 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';
  completed: 'true' | 'false' | boolean;
}

export interface TogglePrayerResponse {
  success: boolean;
  payload: SalahTracker;
  timeStamp?: string;
}

export interface ToggleAdhkaarRequest {
  completed: 'true' | 'false' | boolean;
}

export interface ToggleAdhkaarResponse {
  success: boolean;
  payload: {
    adhkaar: boolean;
  };
  timeStamp?: string;
}

export interface UpdateQuranPagesRequest {
  pagesRead: string | number;
}

export interface UpdateQuranPagesResponse {
  success: boolean;
  payload: {
    quran: {
      pagesRead: number;
    };
  };
  timeStamp?: string;
}

