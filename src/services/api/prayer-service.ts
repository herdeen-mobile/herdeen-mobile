/**
 * Prayer & Solah Reminders API Service
 * Handles prayer settings, prayer times, and waking the worker service
 * for Solah Reminder BullMQ/Redis background jobs.
 */

import { apiClient } from '@/src/services/api/api-client';
import { WorkerService } from '@/src/services/api/worker-service';
import { PrayerSettingsRequest, PrayerSettingsResponse } from '@/src/types/prayer';

export const PrayerService = {
  /**
   * Update Prayer Settings (PATCH /prayer/settings)
   * Wakes the worker service so that Render's worker picks up the
   * Solah Reminder scheduling jobs from Redis/BullMQ.
   */
  async updatePrayerSettings(
    data: PrayerSettingsRequest,
    wakeWorkerService = true
  ): Promise<PrayerSettingsResponse> {
    const response = await apiClient.patch<PrayerSettingsResponse>('/prayer/settings', data);

    if (wakeWorkerService) {
      console.log('[PrayerService] Waking worker service for Solah Reminders background jobs...');
      WorkerService.wakeWorker().catch((err) => {
        console.warn('[PrayerService] Non-blocking worker wake error:', err);
      });
    }

    return response.data;
  },

  /**
   * Fetch configured Prayer Times / Calculations
   */
  async getPrayerTimes(): Promise<any> {
    const response = await apiClient.get('/prayer/times');
    return response.data;
  },
};

