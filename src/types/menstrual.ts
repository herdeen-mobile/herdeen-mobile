/**
 * Menstrual Cycle Tracking Types & API Contracts
 */

export interface MenstrualReminderPreference {
  spiritualEncouragement?: boolean;
  restReminder?: boolean;
  disableIbadahReminders?: boolean;
}

export interface MenstrualCycleData {
  _id?: string;
  userId?: string;
  lastFlowDate: string; // "YYYY-MM-DD"
  averageFlowDuration: number | string;
  cycleLength: number;
  useStandardCycle?: boolean;
  quranGoalDuringPeriod?: number;
  memorizationFrequency?: 'weekly' | 'occasionally' | string;
  reminderPreference?: MenstrualReminderPreference;
  isInFlow?: boolean;
  flowStartDate?: string;
  flowEndDate?: string;
  currentDay?: number;
  daysRemaining?: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface MenstrualCycleResponse {
  success: boolean;
  payload: MenstrualCycleData | { cycle?: MenstrualCycleData; [key: string]: any };
  timeStamp?: string;
}

export interface CreateMenstrualLogRequest {
  data: {
    lastFlowDate: string;
    averageFlowDuration?: number | string;
    cycleLength: number;
    useStandardCycle?: boolean;
    quranGoalDuringPeriod?: number;
    memorizationFrequency?: string;
    reminderPreference?: MenstrualReminderPreference;
  };
}

export interface UpdateMenstrualLogRequest {
  update: Partial<MenstrualCycleData>;
}

