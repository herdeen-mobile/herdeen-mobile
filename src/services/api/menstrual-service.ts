/**
 * Menstrual Cycle API Service
 * Connects to /menstrual-cycle endpoints (GET, POST, PATCH)
 */

import { API_ENDPOINTS } from '@/src/config/endpoints';
import { apiClient } from '@/src/services/api/api-client';
import {
  CreateMenstrualLogRequest,
  MenstrualCycleData,
  MenstrualCycleResponse,
  UpdateMenstrualLogRequest,
} from '@/src/types/menstrual';

export const MenstrualService = {
  /**
   * Get Active Menstrual Cycle Log (GET /menstrual-cycle)
   */
  async getMenstrualLog(): Promise<MenstrualCycleData | null> {
    try {
      const response = await apiClient.get<MenstrualCycleResponse>(API_ENDPOINTS.MENSTRUAL.LOG);
      const payload = response.data?.payload;
      if (!payload) return null;

      // Some backends wrap response in { cycle: {...} } or return the log directly
      if (typeof payload === 'object' && 'cycle' in payload && payload.cycle) {
        return payload.cycle as MenstrualCycleData;
      }
      return payload as MenstrualCycleData;
    } catch (error: any) {
      // If 404, user simply has not recorded a cycle yet
      if (error?.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  /**
   * Create New Menstrual Cycle Log (POST /menstrual-cycle)
   */
  async createMenstrualLog(data: CreateMenstrualLogRequest['data']): Promise<MenstrualCycleData> {
    const payload: CreateMenstrualLogRequest = { data };
    const response = await apiClient.post<MenstrualCycleResponse>(
      API_ENDPOINTS.MENSTRUAL.LOG,
      payload
    );
    const result = response.data?.payload;
    if (result && typeof result === 'object' && 'cycle' in result && result.cycle) {
      return result.cycle as MenstrualCycleData;
    }
    return result as MenstrualCycleData;
  },

  /**
   * Update Menstrual Cycle Log (PATCH /menstrual-cycle)
   */
  async updateMenstrualLog(update: UpdateMenstrualLogRequest['update']): Promise<MenstrualCycleData> {
    const payload: UpdateMenstrualLogRequest = { update };
    const response = await apiClient.patch<MenstrualCycleResponse>(
      API_ENDPOINTS.MENSTRUAL.LOG,
      payload
    );
    const result = response.data?.payload;
    if (result && typeof result === 'object' && 'cycle' in result && result.cycle) {
      return result.cycle as MenstrualCycleData;
    }
    return result as MenstrualCycleData;
  },
};

