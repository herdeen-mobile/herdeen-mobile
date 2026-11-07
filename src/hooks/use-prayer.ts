/**
 * TanStack React Query Hooks for Prayer Settings & Solah Reminders
 */

import { getErrorMessage } from '@/src/services/api/api-client';
import { PrayerService } from '@/src/services/api/prayer-service';
import { WorkerService } from '@/src/services/api/worker-service';
import { PrayerSettingsData, PrayerSettingsRequest, PrayerSettingsResponse } from '@/src/types/prayer';
import { WorkerHealthResponse } from '@/src/types/worker';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const PRAYER_QUERY_KEYS = {
  all: ['prayer'] as const,
  settings: () => ['prayer', 'settings'] as const,
  times: () => ['prayer', 'times'] as const,
  workerHealth: () => ['worker', 'health'] as const,
};

/**
 * Hook to update prayer settings and wake background worker for Solah reminders
 */
export const useUpdatePrayerSettingsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    PrayerSettingsResponse,
    Error,
    { data: PrayerSettingsRequest | PrayerSettingsData; wakeWorker?: boolean }
  >({
    mutationFn: async ({ data, wakeWorker = true }) => {
      try {
        const payload: PrayerSettingsRequest =
          'data' in data && typeof (data as any).data === 'object'
            ? (data as PrayerSettingsRequest)
            : { data: data as PrayerSettingsData };
        return await PrayerService.updatePrayerSettings(payload, wakeWorker);
      } catch (err) {
        throw new Error(getErrorMessage(err));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRAYER_QUERY_KEYS.settings() });
      queryClient.invalidateQueries({ queryKey: PRAYER_QUERY_KEYS.times() });
    },
  });
};

/**
 * Hook to wake the background worker service directly
 */
export const useWakeWorkerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<WorkerHealthResponse, Error, void>({
    mutationFn: async () => {
      try {
        return await WorkerService.wakeWorker();
      } catch (err) {
        throw new Error(getErrorMessage(err));
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(PRAYER_QUERY_KEYS.workerHealth(), data);
    },
  });
};

/**
 * Hook to check if the worker service is alive
 */
export const useWorkerHealthQuery = (options?: { enabled?: boolean }) => {
  return useQuery<boolean, Error>({
    queryKey: PRAYER_QUERY_KEYS.workerHealth(),
    queryFn: async () => {
      return await WorkerService.isWorkerAwake();
    },
    enabled: options?.enabled ?? false,
    staleTime: 1000 * 60 * 2,
  });
};
