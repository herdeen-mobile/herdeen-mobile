/**
 * Application environment configuration
 */

export const ENV = {
  API_BASE_URL:
    process.env.EXPO_PUBLIC_API_URL ||
    'https://herdeen-backend.onrender.com/api/v1',
  WORKER_BASE_URL:
    process.env.EXPO_PUBLIC_WORKER_URL ||
    'https://herdeen-backend-worker.onrender.com',
  WORKER_HEALTH_URL:
    process.env.EXPO_PUBLIC_WORKER_HEALTH_URL ||
    'https://herdeen-backend-worker.onrender.com/health',
  ALQURAN_API_URL:
    process.env.EXPO_PUBLIC_ALQURAN_API_URL ||
    'https://api.alquran.cloud/v1',
  HISN_MUSLIM_API_URL:
    process.env.EXPO_PUBLIC_HISN_MUSLIM_API_URL ||
    'https://hisnmuslim.com/api/en',
  API_TIMEOUT: 15000,
  WORKER_TIMEOUT: 45000,
  PLAN_POLL_INTERVAL_MS: 3000,
  PLAN_MAX_POLL_ATTEMPTS: 20,
  STORAGE_KEYS: {
    ACCESS_TOKEN: 'herdeen_access_token',
    REFRESH_TOKEN: 'herdeen_refresh_token',
    USER: 'herdeen_user_data',
    PENDING_EMAIL: 'herdeen_pending_email',
    TASBIH_STATE: 'herdeen_tasbih_state_v2',
    QURAN_FAVORITES: 'herdeen_quran_favorites_v2',
    QURAN_LAST_READ: 'herdeen_quran_last_read_v2',
    ADHKAR_FAVORITES: 'herdeen_adhkar_favorites_v2',
  },
  TOKEN_STORAGE_KEYS: {
    ACCESS_TOKEN: 'herdeen_access_token',
    REFRESH_TOKEN: 'herdeen_refresh_token',
    USER: 'herdeen_user_data',
    PENDING_EMAIL: 'herdeen_pending_email',
  },
} as const;
