/**
 * Ibadah Tracker API Service
 * Manages daily spiritual tracking: Salah, Adhkar, Quran recitation, and Menstrual status.
 */

import { API_ENDPOINTS } from '@/src/config/endpoints';
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
    const response = await apiClient.get<TodayTrackerResponse>(API_ENDPOINTS.TRACKER.TODAY);
    return response.data;
  },

  /**
   * Toggle Salah Prayer Status (PATCH /tracker/toggle-prayer)
   */
  async togglePrayer(
    prayer: TogglePrayerRequest['prayer'],
    completed: boolean | string = true
  ): Promise<TogglePrayerResponse> {
    const completedStr = typeof completed === 'boolean' ? (completed ? 'true' : 'false') : completed;
    const response = await apiClient.patch<TogglePrayerResponse>(
      API_ENDPOINTS.TRACKER.TOGGLE_PRAYER,
      {
        prayer,
        completed: completedStr,
      }
    );
    return response.data;
  },

  /**
   * Toggle Adhkar Status (PATCH /tracker/adhkaar)
   */
  async toggleAdhkaar(completed: boolean | string = true): Promise<ToggleAdhkaarResponse> {
    const completedStr = typeof completed === 'boolean' ? (completed ? 'true' : 'false') : completed;
    const response = await apiClient.patch<ToggleAdhkaarResponse>(
      API_ENDPOINTS.TRACKER.ADHKAAR,
      {
        completed: completedStr,
      }
    );
    return response.data;
  },

  /**
   * Update Quran Pages Read (PATCH /tracker/quran)
   */
  async updateQuranPages(pagesRead: number | string): Promise<UpdateQuranPagesResponse> {
    const response = await apiClient.patch<UpdateQuranPagesResponse>(
      API_ENDPOINTS.TRACKER.QURAN,
      {
        pagesRead: String(pagesRead),
      }
    );
    return response.data;
  },
};
