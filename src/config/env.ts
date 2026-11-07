/**
 * Application environment configuration
 */

export const ENV = {
  API_BASE_URL:
    process.env.EXPO_PUBLIC_API_URL ||
    "https://herdeen-backend.onrender.com/api/v1",
  WORKER_BASE_URL:
    process.env.EXPO_PUBLIC_WORKER_URL ||
    "https://herdeen-backend-worker.onrender.com",
  WORKER_HEALTH_URL:
    process.env.EXPO_PUBLIC_WORKER_HEALTH_URL ||
    "https://herdeen-backend-worker.onrender.com/health",
  API_TIMEOUT: 15000,
  WORKER_TIMEOUT: 45000,
  PLAN_POLL_INTERVAL_MS: 3000,
  PLAN_MAX_POLL_ATTEMPTS: 20,
  TOKEN_STORAGE_KEYS: {
    ACCESS_TOKEN: "herdeen_access_token",
    REFRESH_TOKEN: "herdeen_refresh_token",
    USER: "herdeen_user_data",
    PENDING_EMAIL: "herdeen_pending_email",
  },
} as const;
