/**
 * Types for Background Worker Service
 */

export interface WorkerHealthResponse {
  status?: string;
  uptime?: number;
  timestamp?: string | number;
  message?: string;
  [key: string]: any;
}

