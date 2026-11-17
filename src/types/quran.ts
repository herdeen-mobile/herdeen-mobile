/**
 * Types for Al-Quran Cloud REST API & Quran Reader
 */

export interface SurahMeta {
  id: number;
  number: number;
  name: string; // Arabic name
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan' | string;
}

export interface VerseItem {
  id: number;
  numberInSurah: number;
  arabic: string;
  translation: string;
  audio?: string;
  juz?: number;
  page?: number;
}

export interface JuzMeta {
  id: number;
  number: number;
  name: string;
  startSurah: string;
  startVerse: number;
  endSurah: string;
  endVerse: number;
}

export interface LastReadMeta {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  timestamp: string;
}

// Raw Al-Quran API interfaces
export interface AlQuranAyahRaw {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

export interface AlQuranEditionRaw {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
  direction: string;
}

export interface AlQuranSurahEditionRaw {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: AlQuranAyahRaw[];
  edition: AlQuranEditionRaw;
}

export interface AlQuranSurahListResponse {
  code: number;
  status: string;
  data: SurahMeta[];
}

export interface AlQuranSurahVersesResponse {
  code: number;
  status: string;
  data: AlQuranSurahEditionRaw[];
}

