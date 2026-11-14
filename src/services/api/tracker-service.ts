/**
 * Ibadah Tracker API Service
 * Manages daily spiritual tracking: Salah, Adhkar, Quran recitation, and Menstrual status.
 */

import { apiClient } from '@/src/services/api/api-client';
import {
  TodayTrackerResponse,
  ToggleAdhkaarRequest,
  ToggleAdhkaarResponse,
  TogglePrayerRequest,
  TogglePrayerResponse,
  UpdateQuranPagesRequest,
  UpdateQuranPagesResponse,
} from '@/src/types/tracker';

export const TrackerService = {
  /**
   * Get Today's Ibadah Tracker (GET /tracker/today)
   * Returns daily status for 5 prayers, adhkar, Quran pages, and menstrual cycle.
   */
  async getTodayTracker(): Promise<TodayTrackerResponse> {
    const response = await apiClient.get<TodayTrackerResponse>('/tracker/today');
    return response.data;
  },

  /**
   * Toggle Salah Prayer Status (PATCH /tracker/toggle-prayer)
   * @param prayer 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha'
   * @param completed 'true' | 'false' | boolean
   */
  async togglePrayer(
    prayer: TogglePrayerRequest['prayer'],
    completed: boolean | string = true
  ): Promise<TogglePrayerResponse> {
    const completedStr = typeof completed === 'boolean' ? (completed ? 'true' : 'false') : completed;
    const response = await apiClient.patch<TogglePrayerResponse>('/tracker/toggle-prayer', {
      prayer,
      completed: completedStr,
    });
    return response.data;
  },

  /**
   * Toggle Adhkar Status (PATCH /tracker/adhkaar)
   * @param completed 'true' | 'false' | boolean
   */
  async toggleAdhkaar(completed: boolean | string = true): Promise<ToggleAdhkaarResponse> {
    const completedStr = typeof completed === 'boolean' ? (completed ? 'true' : 'false') : completed;
    const response = await apiClient.patch<ToggleAdhkaarResponse>('/tracker/adhkaar', {
      completed: completedStr,
    });
    return response.data;
  },

  /**
   * Update Quran Pages Read (PATCH /tracker/quran)
   * @param pagesRead Number of pages read
   */
  async updateQuranPages(pagesRead: number | string): Promise<UpdateQuranPagesResponse> {
    const response = await apiClient.patch<UpdateQuranPagesResponse>('/tracker/quran', {
      pagesRead: String(pagesRead),
    });
    return response.data;
  },
};

