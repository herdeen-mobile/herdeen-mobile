/**
 * Planner Service
 * Implements Daily Plan Generation, Task Management, and Worker-Orchestrated polling.
 *
 * Daily Plan Generation Flow:
 * 1. Call POST /planner/generate (Backend queues job in Redis/BullMQ and immediately returns).
 * 2. Call Worker Health Endpoint (/health) to wake Render worker service.
 * 3. Once worker is awake, it generates the plan and saves it to the database.
 * 4. Poll GET /planner/daily/:date until the plan is available.
 */

import { ENV } from '@/src/config/env';
import { apiClient } from '@/src/services/api/api-client';
import { WorkerService } from '@/src/services/api/worker-service';
import {
  AddTaskRequest,
  DailyPlanResponse,
  EditTaskRequest,
  GenerateDailyPlanRequest,
  GenerateDailyPlanResponse,
} from '@/src/types/planner';

export type PlanGenerationStage =
  | 'idle'
  | 'queuing'
  | 'waking_worker'
  | 'generating'
  | 'ready'
  | 'error';

export interface GenerateAndPollOptions {
  onStageChange?: (stage: PlanGenerationStage, message?: string) => void;
  maxPollAttempts?: number;
  pollIntervalMs?: number;
}

export const PlannerService = {
  /**
   * 1. Request Daily Plan Generation (POST /planner/generate)
   * The backend queues the BullMQ job in Redis and returns immediately.
   */
  async generateDailyPlan(data: GenerateDailyPlanRequest): Promise<GenerateDailyPlanResponse> {
    const response = await apiClient.post<GenerateDailyPlanResponse>('/planner/generate', data);
    return response.data;
  },

  /**
   * 2. Get Daily Plan by date (GET /planner/daily/:date)
   * @param date Date formatted as YYYY-MM-DD
   */
  async getDailyPlan(date: string): Promise<DailyPlanResponse> {
    const response = await apiClient.get<DailyPlanResponse>(`/planner/daily/${date}`);
    return response.data;
  },

  /**
   * 3. Add Custom Task to date (POST /planner/add/:date)
   */
  async addTask(date: string, data: AddTaskRequest): Promise<any> {
    const response = await apiClient.post(`/planner/add/${date}`, data);
    return response.data;
  },

  /**
   * 4. Edit Task (PATCH /planner/edit/:date/:taskId)
   */
  async editTask(date: string, taskId: string, data: EditTaskRequest): Promise<any> {
    const response = await apiClient.patch(`/planner/edit/${date}/${taskId}`, data);
    return response.data;
  },

  /**
   * 5. Delete Task (DELETE /planner/:date/:taskId)
   */
  async deleteTask(date: string, taskId: string): Promise<any> {
    const response = await apiClient.delete(`/planner/${date}/${taskId}`);
    return response.data;
  },

  /**
   * 6. Toggle Completed Status (PATCH /planner/completed/:date/:task)
   */
  async toggleCompleted(date: string, task: string): Promise<any> {
    const response = await apiClient.patch(`/planner/completed/${date}/${encodeURIComponent(task)}`);
    return response.data;
  },

  /**
   * 7. Get Completed Tasks (GET /planner/completed/tasks/:date)
   */
  async getCompletedTasks(date: string): Promise<any> {
    const response = await apiClient.get(`/planner/completed/tasks/${date}`);
    return response.data;
  },

  /**
   * 8. Get Planner History (GET /planner/history)
   */
  async getHistory(): Promise<any> {
    const response = await apiClient.get('/planner/history');
    return response.data;
  },

  /**
   * Complete Orchestrated Generation Flow:
   * 1. Calls /planner/generate to queue the job.
   * 2. Pings worker health endpoint to wake worker service on Render.
   * 3. Confirms worker is awake.
   * 4. Polls /planner/daily/:date until plan is generated and saved.
   */
  async generateDailyPlanWithWorker(
    data: GenerateDailyPlanRequest,
    date: string,
    options?: GenerateAndPollOptions
  ): Promise<DailyPlanResponse> {
    const {
      onStageChange,
      maxPollAttempts = ENV.PLAN_MAX_POLL_ATTEMPTS || 20,
      pollIntervalMs = ENV.PLAN_POLL_INTERVAL_MS || 3000,
    } = options || {};

    try {
      // Step 1: Queue generation in backend
      onStageChange?.('queuing', 'Queueing daily plan generation...');
      const queueResponse = await this.generateDailyPlan(data);
      console.log('[PlannerService] Plan generation queued:', queueResponse);

      // Step 2: Wake up the worker service on Render
      onStageChange?.('waking_worker', 'Waking up background worker service...');
      await WorkerService.wakeWorker();

      // Step 3: Poll GET /planner/daily/:date until the plan is ready
      onStageChange?.('generating', 'Worker is generating your personalized plan...');

      for (let attempt = 1; attempt <= maxPollAttempts; attempt++) {
        try {
          const plan = await this.getDailyPlan(date);

          // Check if plan has tasks populated
          const raw = plan.payload || plan.data || plan;
          const tasks = raw?.tasks || (Array.isArray(raw) ? raw : null);

          if (tasks && Array.isArray(tasks) && tasks.length > 0) {
            onStageChange?.('ready', 'Your daily plan is ready!');
            return plan;
          }
        } catch (pollErr) {
          // While worker generates, endpoint might return 404 or in-progress
          console.log(`[PlannerService] Polling attempt ${attempt}/${maxPollAttempts}...`);
        }

        if (attempt < maxPollAttempts) {
          await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
        }
      }

      // Final fetch attempt
      const finalPlan = await this.getDailyPlan(date);
      onStageChange?.('ready', 'Plan ready');
      return finalPlan;
    } catch (error: any) {
      onStageChange?.('error', error?.message || 'Failed to generate plan');
      throw error;
    }
  },
};

