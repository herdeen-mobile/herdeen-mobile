/**
 * TanStack React Query Hooks for Daily Planner & Background Generation
 */

import { getErrorMessage } from '@/src/services/api/api-client';
import {
  GenerateAndPollOptions,
  PlanGenerationStage,
  PlannerService,
} from '@/src/services/api/planner-service';
import {
  AddTaskRequest,
  DailyPlanResponse,
  EditTaskRequest,
  GenerateDailyPlanRequest,
  GenerateDailyPlanResponse,
} from '@/src/types/planner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export const PLANNER_QUERY_KEYS = {
  all: ['planner'] as const,
  daily: (date: string) => ['planner', 'daily', date] as const,
  completed: (date: string) => ['planner', 'completed', date] as const,
  history: () => ['planner', 'history'] as const,
};

/**
 * Hook to fetch daily plan for a given date (YYYY-MM-DD)
 */
export const useDailyPlanQuery = (date: string, options?: { enabled?: boolean }) => {
  return useQuery<DailyPlanResponse, Error>({
    queryKey: PLANNER_QUERY_KEYS.daily(date),
    queryFn: async () => {
      try {
        return await PlannerService.getDailyPlan(date);
      } catch (err) {
        throw new Error(getErrorMessage(err));
      }
    },
    enabled: Boolean(date) && (options?.enabled ?? true),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Hook for Orchestrated Daily Plan Generation:
 * 1. Calls /planner/generate (queues in Redis/BullMQ)
 * 2. Pings worker health endpoint to wake worker
 * 3. Polls /planner/daily/:date until plan is ready
 */
export const useGenerateDailyPlanMutation = () => {
  const queryClient = useQueryClient();
  const [stage, setStage] = useState<PlanGenerationStage>('idle');
  const [stageMessage, setStageMessage] = useState<string>('');

  const mutation = useMutation<
    DailyPlanResponse,
    Error,
    { data: GenerateDailyPlanRequest; date: string; options?: GenerateAndPollOptions }
  >({
    mutationFn: async ({ data, date, options }) => {
      setStage('queuing');
      try {
        const result = await PlannerService.generateDailyPlanWithWorker(data, date, {
          ...options,
          onStageChange: (newStage, message) => {
            setStage(newStage);
            if (message) setStageMessage(message);
            options?.onStageChange?.(newStage, message);
          },
        });
        return result;
      } catch (err) {
        setStage('error');
        throw new Error(getErrorMessage(err));
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: PLANNER_QUERY_KEYS.daily(variables.date) });
      queryClient.invalidateQueries({ queryKey: PLANNER_QUERY_KEYS.history() });
    },
  });

  return {
    ...mutation,
    stage,
    stageMessage,
  };
};

/**
 * Hook to trigger basic generation queue without waiting for worker poll
 */
export const useQueueDailyPlanMutation = () => {
  return useMutation<GenerateDailyPlanResponse, Error, GenerateDailyPlanRequest>({
    mutationFn: async (data: GenerateDailyPlanRequest) => {
      try {
        return await PlannerService.generateDailyPlan(data);
      } catch (err) {
        throw new Error(getErrorMessage(err));
      }
    },
  });
};

/**
 * Hook to add a task to a daily plan
 */
export const useAddPlannerTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { date: string; task: AddTaskRequest }>({
    mutationFn: async ({ date, task }) => {
      try {
        return await PlannerService.addTask(date, task);
      } catch (err) {
        throw new Error(getErrorMessage(err));
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: PLANNER_QUERY_KEYS.daily(variables.date) });
    },
  });
};

/**
 * Hook to toggle task completed
 */
export const useToggleTaskCompletedMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { date: string; task: string }>({
    mutationFn: async ({ date, task }) => {
      try {
        return await PlannerService.toggleCompleted(date, task);
      } catch (err) {
        throw new Error(getErrorMessage(err));
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: PLANNER_QUERY_KEYS.daily(variables.date) });
      queryClient.invalidateQueries({ queryKey: PLANNER_QUERY_KEYS.completed(variables.date) });
    },
  });
};

/**
 * Hook to edit task
 */
export const useEditPlannerTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { date: string; taskId: string; update: EditTaskRequest }>({
    mutationFn: async ({ date, taskId, update }) => {
      try {
        return await PlannerService.editTask(date, taskId, update);
      } catch (err) {
        throw new Error(getErrorMessage(err));
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: PLANNER_QUERY_KEYS.daily(variables.date) });
    },
  });
};

/**
 * Hook to delete task
 */
export const useDeletePlannerTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { date: string; taskId: string }>({
    mutationFn: async ({ date, taskId }) => {
      try {
        return await PlannerService.deleteTask(date, taskId);
      } catch (err) {
        throw new Error(getErrorMessage(err));
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: PLANNER_QUERY_KEYS.daily(variables.date) });
    },
  });
};

