/**
 * TanStack React Query hooks for Digital Tasbih
 */

import { TasbihService } from '@/src/services/api/tasbih-service';
import { TasbihState } from '@/src/types/tasbih';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const TASBIH_QUERY_KEYS = {
  state: ['tasbih', 'state'] as const,
};

export const useTasbihStateQuery = () => {
  return useQuery<TasbihState, Error>({
    queryKey: TASBIH_QUERY_KEYS.state,
    queryFn: () => TasbihService.getState(),
  });
};

export const useIncrementTasbihMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<TasbihState, Error, string>({
    mutationFn: (dhikrId: string) => TasbihService.increment(dhikrId),
    onMutate: async (dhikrId) => {
      await queryClient.cancelQueries({ queryKey: TASBIH_QUERY_KEYS.state });
      const previousState = queryClient.getQueryData<TasbihState>(TASBIH_QUERY_KEYS.state);

      if (previousState) {
        queryClient.setQueryData<TasbihState>(TASBIH_QUERY_KEYS.state, {
          ...previousState,
          counts: {
            ...previousState.counts,
            [dhikrId]: (previousState.counts[dhikrId] || 0) + 1,
          },
        });
      }

      return { previousState };
    },
    onError: (_, __, context: any) => {
      if (context?.previousState) {
        queryClient.setQueryData(TASBIH_QUERY_KEYS.state, context.previousState);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TASBIH_QUERY_KEYS.state });
    },
  });
};

export const useResetTasbihMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<TasbihState, Error, string>({
    mutationFn: (dhikrId: string) => TasbihService.reset(dhikrId),
    onSuccess: (updated) => {
      queryClient.setQueryData(TASBIH_QUERY_KEYS.state, updated);
    },
  });
};

export const useSaveTasbihStateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<TasbihState, Error, TasbihState>({
    mutationFn: (state: TasbihState) => TasbihService.saveState(state),
    onSuccess: (updated) => {
      queryClient.setQueryData(TASBIH_QUERY_KEYS.state, updated);
    },
  });
};

export const useCompleteTasbihSessionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => TasbihService.completeSession(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracker', 'today'] });
    },
  });
};
