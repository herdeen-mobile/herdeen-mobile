/**
 * TanStack React Query Hooks for Daily Content (Reflections, Duas, Spiritual Reminders)
 */

import { getErrorMessage } from '@/src/services/api/api-client';
import { DailyContentService } from '@/src/services/api/daily-content-service';
import { DailyContentResponse } from '@/src/types/daily-content';
import { useQuery } from '@tanstack/react-query';

export const DAILY_CONTENT_QUERY_KEYS = {
  all: ['daily-content'] as const,
  active: () => ['daily-content', 'active'] as const,
};

/**
 * Hook to fetch today's active daily reflection or dua (GET /daily-content)
 */
export const useDailyContentQuery = (options?: { enabled?: boolean }) => {
  return useQuery<DailyContentResponse, Error>({
    queryKey: DAILY_CONTENT_QUERY_KEYS.active(),
    queryFn: async () => {
      try {
        return await DailyContentService.getDailyContent();
      } catch (err) {
        throw new Error(getErrorMessage(err));
      }
    },
    enabled: options?.enabled ?? true,
    staleTime: 1000 * 60 * 60,
    retry: 2,
  });
};

