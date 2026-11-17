/**
 * TanStack Query Hooks for Menstrual Cycle Tracking
 */

import { MenstrualService } from '@/src/services/api/menstrual-service';
import {
  CreateMenstrualLogRequest,
  MenstrualCycleData,
  UpdateMenstrualLogRequest,
} from '@/src/types/menstrual';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const MENSTRUAL_QUERY_KEYS = {
  all: ['menstrual-cycle'] as const,
  log: () => [...MENSTRUAL_QUERY_KEYS.all, 'log'] as const,
};

/**
 * Hook to fetch active menstrual cycle log
 */
export function useMenstrualCycleQuery() {
  return useQuery<MenstrualCycleData | null, Error>({
    queryKey: MENSTRUAL_QUERY_KEYS.log(),
    queryFn: async () => {
      return await MenstrualService.getMenstrualLog();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}

/**
 * Hook to create a new menstrual cycle log
 */
export function useCreateMenstrualLogMutation() {
  const queryClient = useQueryClient();

  return useMutation<MenstrualCycleData, Error, CreateMenstrualLogRequest['data']>({
    mutationFn: async (data) => {
      return await MenstrualService.createMenstrualLog(data);
    },
    onSuccess: (newCycle) => {
      queryClient.setQueryData(MENSTRUAL_QUERY_KEYS.log(), newCycle);
      queryClient.invalidateQueries({ queryKey: MENSTRUAL_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: ['tracker'] });
    },
  });
}

/**
 * Hook to update an existing menstrual cycle log
 */
export function useUpdateMenstrualLogMutation() {
  const queryClient = useQueryClient();

  return useMutation<MenstrualCycleData, Error, UpdateMenstrualLogRequest['update']>({
    mutationFn: async (update) => {
      return await MenstrualService.updateMenstrualLog(update);
    },
    onSuccess: (updatedCycle) => {
      queryClient.setQueryData(MENSTRUAL_QUERY_KEYS.log(), updatedCycle);
      queryClient.invalidateQueries({ queryKey: MENSTRUAL_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: ['tracker'] });
    },
  });
}

