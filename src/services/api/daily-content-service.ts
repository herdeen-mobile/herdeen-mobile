/**
 * Daily Content API Service
 * Fetches reflections, daily duas, and spiritual reminders from the backend.
 */

import { API_ENDPOINTS } from '@/src/config/endpoints';
import { apiClient } from '@/src/services/api/api-client';
import { DailyContentResponse } from '@/src/types/daily-content';

export const DailyContentService = {
  /**
   * Get Daily Content (GET /daily-content)
   * Retrieves today's active reflection, dua, or spiritual reminder.
   */
  async getDailyContent(): Promise<DailyContentResponse> {
    const response = await apiClient.get<DailyContentResponse>(API_ENDPOINTS.DAILY_CONTENT);
    return response.data;
  },
};
