/**
 * Types for Hisn al-Muslim Adhkar & Supplications
 */

export interface DuaItem {
  id: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference?: string;
  repeat?: number;
  audio?: string;
}

export interface AdhkarChapterMeta {
  id: string;
  title: string;
  category: string;
  audioUrl?: string;
}

export interface AdhkarChapter {
  id: string;
  category: string;
  title: string;
  audioUrl?: string;
  duas: DuaItem[];
}

export interface AdhkarCategory {
  id: string;
  name: string;
  iconName: string;
  chapterCount: number;
}

// Raw Hisn al-Muslim API Types
export interface HisnRawChapterItem {
  ID: number;
  TITLE: string;
  AUDIO_URL?: string;
  TEXT: string;
}

export interface HisnRawIndexResponse {
  English?: HisnRawChapterItem[];
  [key: string]: any;
}

export interface HisnRawDuaItem {
  ID: number;
  ARABIC_TEXT: string;
  LANGUAGE_ARABIC_TRANSLATED_TEXT: string;
  TRANSLATED_TEXT: string;
  REPEAT: number;
  AUDIO?: string;
}

export type HisnRawChapterResponse = Record<string, HisnRawDuaItem[]>;
