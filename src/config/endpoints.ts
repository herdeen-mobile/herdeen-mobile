/**
 * Centralized API Endpoints Configuration
 */

export const API_ENDPOINTS = {
  // Authentication & User Data
  AUTH: {
    PRE_REGISTER: '/auth/pre-register',
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    REQUEST_OTP: '/auth/request-otp',
    RESET_PASSWORD: '/auth/reset-password',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    USER_DATA: '/auth/user-data',
    ADMIN_CREATE: '/auth/admin/create',
    ADMIN_LOGIN: '/auth/admin/login',
    ADMIN_OTP: '/auth/admin/otp',
    ADMIN_RESET_PASSWORD: '/auth/admin/reset-password',
    ADMIN_CHANGE_PASSWORD: '/auth/admin/password',
  },

  // Daily Content / Spiritual Reflections
  DAILY_CONTENT: '/daily-content',

  // Menstrual Cycle Tracking
  MENSTRUAL: {
    LOG: '/menstrual-cycle',
  },

  // Account / Cache Clearing
  CLEAR_CACHE: '/clear-cache',

  // Islamic & Prayer Times
  ISLAMIC: {
    PRAYER_TIMES: '/islamic/prayer-times',
    SETTINGS: '/prayer/settings',
  },

  // Daily Ibadah Tracker
  TRACKER: {
    TODAY: '/tracker/today',
    TOGGLE_PRAYER: '/tracker/toggle-prayer',
    ADHKAAR: '/tracker/adhkaar',
    QURAN: '/tracker/quran',
  },

  // Daily AI Planner
  PLANNER: {
    GENERATE: '/planner/generate',
    DAILY: (date: string) => `/planner/daily/${date}`,
    ADD_TASK: (date: string) => `/planner/add/${date}`,
    EDIT_TASK: (date: string, taskId: string) => `/planner/edit/${date}/${taskId}`,
    DELETE_TASK: (date: string, taskId: string) => `/planner/${date}/${taskId}`,
    COMPLETED_TASK: (date: string, task: string) => `/planner/completed/${date}/${encodeURIComponent(task)}`,
    COMPLETED_TASKS_BY_DATE: (date: string) => `/planner/completed/tasks/${date}`,
    HISTORY: '/planner/history',
  },

  // External Al-Quran Cloud REST API
  QURAN: {
    SURAHS: '/surah',
    SURAH_VERSES: (surahNumber: number | string) =>
      `/surah/${surahNumber}/editions/quran-uthmani,en.sahih`,
    JUZ: (juzNumber: number | string) => `/juz/${juzNumber}/quran-uthmani`,
  },

  // External Hisn al-Muslim Adhkar REST API
  HISN_MUSLIM: {
    INDEX: '/husn_en.json',
    CHAPTER_DUAS: (chapterId: number | string) => `/${chapterId}.json`,
  },
} as const;

