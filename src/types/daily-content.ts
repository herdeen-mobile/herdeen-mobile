/**
 * Types for Daily Content (Reflections, Duas, Reminders)
 */

export interface DailyContentItem {
  _id: string;
  type: string; // 'reflection' | 'dua' | 'reminder' | etc.
  title: string;
  content: string;
  source?: string;
  language?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface DailyContentResponse {
  success: boolean;
  payload: {
    contents: DailyContentItem;
  };
  timeStamp?: string;
}

