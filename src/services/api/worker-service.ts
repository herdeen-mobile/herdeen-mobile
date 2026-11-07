/**
 * Background Worker Service Client
 * Handles waking up Render free-tier worker Web Service via its /health endpoint.
 * Render Web Services spin down after 15 minutes of inactivity.
 * The worker picks up BullMQ/Redis jobs for:
 * 1. Daily Plan Generation
 * 2. Solah Reminders
 */

import { ENV } from '@/src/config/env';
import { WorkerHealthResponse } from '@/src/types/worker';
import axios from 'axios';

export interface WakeWorkerOptions {
  maxRetries?: number;
  retryDelayMs?: number;
  timeoutMs?: number;
}

export const WorkerService = {
  /**
   * Pings the worker Web Service /health endpoint to wake it up.
   * Retries automatically while the Render service boots up.
   */
  async wakeWorker(options?: WakeWorkerOptions): Promise<WorkerHealthResponse> {
    const maxRetries = options?.maxRetries ?? 6;
    const retryDelayMs = options?.retryDelayMs ?? 3000;
    const timeoutMs = options?.timeoutMs ?? 10000;

    let lastError: any = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`[WorkerService] Pinging worker health (${attempt}/${maxRetries}): ${ENV.WORKER_HEALTH_URL}`);

        const response = await axios.get<WorkerHealthResponse>(ENV.WORKER_HEALTH_URL, {
          timeout: timeoutMs,
          headers: {
            Accept: 'application/json',
          },
        });

        if (response.status >= 200 && response.status < 300) {
          console.log('[WorkerService] Worker service is awake and responsive!');
          return response.data;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`[WorkerService] Worker ping attempt ${attempt} failed (${err.message}). Retrying in ${retryDelayMs}ms...`);

        if (attempt < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
        }
      }
    }

    throw new Error(
      `Worker service failed to wake up after ${maxRetries} attempts. Render worker might still be spinning up. (${lastError?.message || 'Timeout'})`
    );
  },

  /**
   * Fast check to see if the worker is currently awake without long retries.
   */
  async isWorkerAwake(): Promise<boolean> {
    try {
      const response = await axios.get(ENV.WORKER_HEALTH_URL, { timeout: 3500 });
      return response.status >= 200 && response.status < 300;
    } catch {
      return false;
    }
  },
};

