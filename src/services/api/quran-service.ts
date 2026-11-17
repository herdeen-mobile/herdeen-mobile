/**
 * Authentic Quran API Service
 * Fetches Surah lists, Verses, Translations, and Juz data
 * from the standard Al-Quran Cloud REST API.
 * Follows strict production patterns with no mock data fallbacks.
 */

import { API_ENDPOINTS } from '@/src/config/endpoints';
import { ENV } from '@/src/config/env';
import { TrackerService } from '@/src/services/api/tracker-service';
import { TokenStorage } from '@/src/services/storage/token-storage';
import {
  AlQuranSurahListResponse,
  AlQuranSurahVersesResponse,
  JuzMeta,
  LastReadMeta,
  SurahMeta,
  VerseItem,
} from '@/src/types/quran';
import axios from 'axios';

// Standard 30 Juz Divisions of the Holy Quran
const JUZ_MAPPING: { number: number; name: string; startSurah: string; startVerse: number; endSurah: string; endVerse: number }[] = [
  { number: 1, name: 'Alif Laam Meem', startSurah: 'Al-Faatiha', startVerse: 1, endSurah: 'Al-Baqarah', endVerse: 141 },
  { number: 2, name: 'Sayaqool', startSurah: 'Al-Baqarah', startVerse: 142, endSurah: 'Al-Baqarah', endVerse: 252 },
  { number: 3, name: 'Tilka ar-Rusul', startSurah: 'Al-Baqarah', startVerse: 253, endSurah: 'Aal-i-Imraan', endVerse: 92 },
  { number: 4, name: 'Lan Tanaaloo', startSurah: 'Aal-i-Imraan', startVerse: 93, endSurah: 'An-Nisaa', endVerse: 23 },
  { number: 5, name: 'Wal Mohsanat', startSurah: 'An-Nisaa', startVerse: 24, endSurah: 'An-Nisaa', endVerse: 147 },
  { number: 6, name: 'La Yuhibbullah', startSurah: 'An-Nisaa', startVerse: 148, endSurah: 'Al-Maaida', endVerse: 81 },
  { number: 7, name: 'Wa Iza Sami’oo', startSurah: 'Al-Maaida', startVerse: 82, endSurah: 'Al-An’aam', endVerse: 110 },
  { number: 8, name: 'Wa Lau Annana', startSurah: 'Al-An’aam', startVerse: 111, endSurah: 'Al-A’raaf', endVerse: 87 },
  { number: 9, name: 'Qalal Malao', startSurah: 'Al-A’raaf', startVerse: 88, endSurah: 'Al-Anfaal', endVerse: 40 },
  { number: 10, name: 'Wa A’lamoo', startSurah: 'Al-Anfaal', startVerse: 41, endSurah: 'At-Tawbah', endVerse: 92 },
  { number: 11, name: 'Ya’tazerona', startSurah: 'At-Tawbah', startVerse: 93, endSurah: 'Hud', endVerse: 5 },
  { number: 12, name: 'Wa Ma Min Da’abbat', startSurah: 'Hud', startVerse: 6, endSurah: 'Yusuf', endVerse: 52 },
  { number: 13, name: 'Wa Ma Ubrioo', startSurah: 'Yusuf', startVerse: 53, endSurah: 'Ibrahim', endVerse: 52 },
  { number: 14, name: 'Rubama', startSurah: 'Al-Hijr', startVerse: 1, endSurah: 'An-Nahl', endVerse: 128 },
  { number: 15, name: 'Subhanallazi', startSurah: 'Al-Israa', startVerse: 1, endSurah: 'Al-Kahf', endVerse: 74 },
  { number: 16, name: 'Qala Alam', startSurah: 'Al-Kahf', startVerse: 75, endSurah: 'Ta-Ha', endVerse: 135 },
  { number: 17, name: 'Iqtaraba', startSurah: 'Al-Anbiyaa', startVerse: 1, endSurah: 'Al-Hajj', endVerse: 78 },
  { number: 18, name: 'Qad Aflaha', startSurah: 'Al-Muminoon', startVerse: 1, endSurah: 'Al-Furqaan', endVerse: 20 },
  { number: 19, name: 'Wa Qalallazina', startSurah: 'Al-Furqaan', startVerse: 21, endSurah: 'An-Naml', endVerse: 55 },
  { number: 20, name: 'Amman Khalaqa', startSurah: 'An-Naml', startVerse: 56, endSurah: 'Al-Ankaboot', endVerse: 45 },
  { number: 21, name: 'Otlu Ma Oohiya', startSurah: 'Al-Ankaboot', startVerse: 46, endSurah: 'Al-Ahzaab', endVerse: 30 },
  { number: 22, name: 'Wa Manyaqnut', startSurah: 'Al-Ahzaab', startVerse: 31, endSurah: 'Yaseen', endVerse: 27 },
  { number: 23, name: 'Wa Maliya', startSurah: 'Yaseen', startVerse: 28, endSurah: 'Az-Zumar', endVerse: 31 },
  { number: 24, name: 'Faman Azlamu', startSurah: 'Az-Zumar', startVerse: 32, endSurah: 'Fussilat', endVerse: 46 },
  { number: 25, name: 'Elaihi Yuraddu', startSurah: 'Fussilat', startVerse: 47, endSurah: 'Al-Jaathiya', endVerse: 37 },
  { number: 26, name: 'Ha’a Meem', startSurah: 'Al-Ahqaaf', startVerse: 1, endSurah: 'Az-Zaariyaat', endVerse: 30 },
  { number: 27, name: 'Qala Fama Khatbukum', startSurah: 'Az-Zaariyaat', startVerse: 31, endSurah: 'Al-Hadid', endVerse: 29 },
  { number: 28, name: 'Qad Sami’a Allah', startSurah: 'Al-Mujaadila', startVerse: 1, endSurah: 'At-Tahrim', endVerse: 12 },
  { number: 29, name: 'Tabarakallazi', startSurah: 'Al-Mulk', startVerse: 1, endSurah: 'Al-Mursalaat', endVerse: 50 },
  { number: 30, name: 'Amma Yatasa’aloon', startSurah: 'An-Naba', startVerse: 1, endSurah: 'An-Naas', endVerse: 6 },
];

export const QuranService = {
  /**
   * Fetches all 114 Surahs from the Al-Quran Cloud API
   */
  async getAllSurahs(): Promise<SurahMeta[]> {
    const url = `${ENV.ALQURAN_API_URL}${API_ENDPOINTS.QURAN.SURAHS}`;
    const response = await axios.get<AlQuranSurahListResponse>(url, {
      timeout: ENV.API_TIMEOUT,
    });

    const surahs = response.data?.data;
    if (!Array.isArray(surahs) || surahs.length === 0) {
      throw new Error('Failed to retrieve surah list from Al-Quran API');
    }

    return surahs.map((s) => ({
      id: s.number,
      number: s.number,
      name: s.name,
      englishName: s.englishName,
      englishNameTranslation: s.englishNameTranslation,
      numberOfAyahs: s.numberOfAyahs,
      revelationType: s.revelationType,
    }));
  },

  /**
   * Fetches verses for a given Surah with Arabic text and English translation
   */
  async getSurahVerses(surahNumber: number): Promise<VerseItem[]> {
    const endpoint = API_ENDPOINTS.QURAN.SURAH_VERSES(surahNumber);
    const url = `${ENV.ALQURAN_API_URL}${endpoint}`;

    const response = await axios.get<AlQuranSurahVersesResponse>(url, {
      timeout: ENV.API_TIMEOUT,
    });

    const editions = response.data?.data;
    if (!Array.isArray(editions) || editions.length < 2) {
      throw new Error(`Failed to load verses for Surah ${surahNumber}`);
    }

    const arabicAyahs = editions[0].ayahs;
    const translationAyahs = editions[1].ayahs;

    return arabicAyahs.map((ayah, idx) => ({
      id: ayah.numberInSurah,
      numberInSurah: ayah.numberInSurah,
      arabic: ayah.text,
      translation: translationAyahs[idx]?.text || '',
      juz: ayah.juz,
      page: ayah.page,
    }));
  },

  /**
   * Retrieves the 30 canonical Juz division list
   */
  async getJuzList(): Promise<JuzMeta[]> {
    return JUZ_MAPPING.map((item) => ({
      id: item.number,
      number: item.number,
      name: `Juz ${item.number} - ${item.name}`,
      startSurah: item.startSurah,
      startVerse: item.startVerse,
      endSurah: item.endSurah,
      endVerse: item.endVerse,
    }));
  },

  /**
   * Retrieves user's favorite Surah numbers from persistent storage
   */
  async getFavorites(): Promise<number[]> {
    try {
      const stored = await TokenStorage.getItem(ENV.STORAGE_KEYS.QURAN_FAVORITES);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  /**
   * Toggles favorite status for a given Surah number
   */
  async toggleFavorite(surahNumber: number): Promise<number[]> {
    const favorites = await this.getFavorites();
    const updated = favorites.includes(surahNumber)
      ? favorites.filter((id) => id !== surahNumber)
      : [...favorites, surahNumber];
    await TokenStorage.setItem(ENV.STORAGE_KEYS.QURAN_FAVORITES, JSON.stringify(updated));
    return updated;
  },

  /**
   * Retrieves the last read Ayah metadata
   */
  async getLastRead(): Promise<LastReadMeta | null> {
    try {
      const stored = await TokenStorage.getItem(ENV.STORAGE_KEYS.QURAN_LAST_READ);
      if (stored) return JSON.parse(stored);
    } catch { }
    return null;
  },

  /**
   * Saves the last read position
   */
  async saveLastRead(meta: Partial<LastReadMeta>): Promise<LastReadMeta> {
    const current = await this.getLastRead();
    const updated: LastReadMeta = {
      surahNumber: meta.surahNumber || current?.surahNumber || 1,
      surahName: meta.surahName || current?.surahName || 'Al-Faatiha',
      ayahNumber: meta.ayahNumber || current?.ayahNumber || 1,
      timestamp: new Date().toISOString(),
    };
    await TokenStorage.setItem(ENV.STORAGE_KEYS.QURAN_LAST_READ, JSON.stringify(updated));
    return updated;
  },

  /**
   * Logs pages read to the HerDeen backend tracker
   */
  async logPagesRead(pagesRead: number): Promise<any> {
    return await TrackerService.updateQuranPages(pagesRead);
  },
};
