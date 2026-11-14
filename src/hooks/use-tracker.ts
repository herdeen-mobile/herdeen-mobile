/**
 * TanStack React Query Hooks for Ibadah Tracker
 */

import { getErrorMessage } from '@/src/services/api/api-client';
import { TrackerService } from '@/src/services/api/tracker-service';
import {
  TodayTrackerResponse,
  ToggleAdhkaarResponse,
  TogglePrayerRequest,
  TogglePrayerResponse,
  UpdateQuranPagesResponse,
} from '@/src/types/tracker';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const TRACKER_QUERY_KEYS = {
  all: ['tracker'] as const,
  today: () => ['tracker', 'today'] as const,
};

/**
 * Hook to fetch today's ibadah tracker status (GET /tracker/today)
 */
export const useTodayTrackerQuery = (options?: { enabled?: boolean }) => {
  return useQuery<TodayTrackerResponse, Error>({
    queryKey: TRACKER_QUERY_KEYS.today(),
    queryFn: async () => {
      try {
        return await TrackerService.getTodayTracker();
      } catch (err) {
        throw new Error(getErrorMessage(err));
      }
    },
    enabled: options?.enabled ?? true,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
};

/**
 * Hook to toggle Salah prayer completion (PATCH /tracker/toggle-prayer)
 */
export const useTogglePrayerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    TogglePrayerResponse,
    Error,
    { prayer: TogglePrayerRequest['prayer']; completed?: boolean | string }
  >({
    mutationFn: async ({ prayer, completed = true }) => {
      try {
        return await TrackerService.togglePrayer(prayer, completed);
      } catch (err) {
        throw new Error(getErrorMessage(err));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRACKER_QUERY_KEYS.today() });
    },
  });
};

/**
 * Hook to toggle Adhkar completion (PATCH /tracker/adhkaar)
 */
export const useToggleAdhkaarMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ToggleAdhkaarResponse, Error, { completed?: boolean | string }>({
    mutationFn: async ({ completed = true }) => {
      try {
        return await TrackerService.toggleAdhkaar(completed);
      } catch (err) {
        throw new Error(getErrorMessage(err));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRACKER_QUERY_KEYS.today() });
    },
  });
};

/**
 * Hook to update Quran pages read (PATCH /tracker/quran)
 */
export const useUpdateQuranPagesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateQuranPagesResponse, Error, { pagesRead: number | string }>({
    mutationFn: async ({ pagesRead }) => {
      try {
        return await TrackerService.updateQuranPages(pagesRead);
      } catch (err) {
        throw new Error(getErrorMessage(err));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRACKER_QUERY_KEYS.today() });
    },
  });
};

