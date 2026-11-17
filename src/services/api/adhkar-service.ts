/**
 * Authentic Adhkar & Supplications Service
 * Connects directly to the official Hisn al-Muslim (Fortress of the Muslim) REST API.
 * Follows strict production patterns with no mock data fallbacks.
 */

import { API_ENDPOINTS } from '@/src/config/endpoints';
import { ENV } from '@/src/config/env';
import { TrackerService } from '@/src/services/api/tracker-service';
import { TokenStorage } from '@/src/services/storage/token-storage';
import {
  AdhkarCategory,
  AdhkarChapter,
  AdhkarChapterMeta,
  DuaItem,
  HisnRawChapterResponse,
  HisnRawIndexResponse,
} from '@/src/types/adhkar';
import axios from 'axios';

const CATEGORY_RULE_MAP: { name: string; icon: string; matchers: string[] }[] = [
  {
    name: 'Morning & Evening',
    icon: 'weather-night-partly-cloudy',
    matchers: ['morning', 'evening', 'wake', 'sleeping', 'bed', 'night'],
  },
  {
    name: 'Prayer',
    icon: 'hands-pray',
    matchers: ['prayer', 'wudu', 'adhan', 'prostration', 'sujud', 'ruku', 'tashahhud', 'salam'],
  },
  {
    name: 'Mosque',
    icon: 'home-roof',
    matchers: ['mosque', 'masjid', 'entering the mosque', 'stepping out'],
  },
  {
    name: 'Protection',
    icon: 'shield-outline',
    matchers: ['protection', 'refuge', 'evil', 'distress', 'fear', 'enemy', 'anger', 'affliction'],
  },
  {
    name: 'Forgiveness',
    icon: 'hand-extended-outline',
    matchers: ['forgiveness', 'repenting', 'repentance', 'pardon', 'sin'],
  },
  {
    name: 'Food & Drink',
    icon: 'silverware-fork-knife',
    matchers: ['food', 'eating', 'drink', 'fasting', 'iftar', 'meal'],
  },
  {
    name: 'Travel',
    icon: 'airplane',
    matchers: ['travel', 'journey', 'mount', 'vehicle', 'destination'],
  },
  {
    name: 'Home & Family',
    icon: 'home-outline',
    matchers: ['home', 'house', 'restroom', 'toilet', 'entering', 'leaving', 'newborn', 'marriage'],
  },
  {
    name: 'Hajj & Umrah',
    icon: 'cube-outline',
    matchers: ['hajj', 'umrah', 'tawaf', 'safa', 'marwah', 'stone', 'talbiyah'],
  },
  {
    name: 'General & Daily',
    icon: 'cards-outline',
    matchers: [],
  },
];

function assignCategory(title: string): string {
  const lower = title.toLowerCase();
  for (const group of CATEGORY_RULE_MAP) {
    if (group.matchers.some((keyword) => lower.includes(keyword))) {
      return group.name;
    }
  }
  return 'General & Daily';
}

export const AdhkarService = {
  /**
   * Fetches the official Hisn al-Muslim index and groups chapters into categories
   */
  async getCategories(): Promise<AdhkarCategory[]> {
    const url = `${ENV.HISN_MUSLIM_API_URL}${API_ENDPOINTS.HISN_MUSLIM.INDEX}`;
    const response = await axios.get<HisnRawIndexResponse>(url, {
      timeout: ENV.API_TIMEOUT,
    });

    const items = response.data?.English || [];
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error('No categories returned from Hisn al-Muslim API');
    }

    const counts: Record<string, number> = {};
    CATEGORY_RULE_MAP.forEach((c) => {
      counts[c.name] = 0;
    });

    items.forEach((item) => {
      const categoryName = assignCategory(item.TITLE);
      counts[categoryName] = (counts[categoryName] || 0) + 1;
    });

    return CATEGORY_RULE_MAP.map((cat) => ({
      id: cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: cat.name,
      iconName: cat.icon,
      chapterCount: counts[cat.name] || 0,
    })).filter((cat) => cat.chapterCount > 0);
  },

  /**
   * Fetches all Hisn al-Muslim chapters, optionally filtered by category
   */
  async getChaptersByCategory(category?: string): Promise<AdhkarChapterMeta[]> {
    const url = `${ENV.HISN_MUSLIM_API_URL}${API_ENDPOINTS.HISN_MUSLIM.INDEX}`;
    const response = await axios.get<HisnRawIndexResponse>(url, {
      timeout: ENV.API_TIMEOUT,
    });

    const items = response.data?.English || [];
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error('No chapters available from Hisn al-Muslim API');
    }

    const mapped: AdhkarChapterMeta[] = items.map((item) => ({
      id: String(item.ID),
      title: item.TITLE,
      category: assignCategory(item.TITLE),
      audioUrl: item.AUDIO_URL,
    }));

    if (!category || category.toLowerCase() === 'all') {
      return mapped;
    }

    return mapped.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );
  },

  /**
   * Fetches the duas for a specific chapter ID or title
   */
  async getChapter(idOrTitle: string | number, fallbackTitle?: string): Promise<AdhkarChapter> {
    let resolvedId = String(idOrTitle);

    // If idOrTitle is not numeric, look it up in the index
    if (!/^\d+$/.test(resolvedId)) {
      const url = `${ENV.HISN_MUSLIM_API_URL}${API_ENDPOINTS.HISN_MUSLIM.INDEX}`;
      const indexRes = await axios.get<HisnRawIndexResponse>(url, {
        timeout: ENV.API_TIMEOUT,
      });
      const items = indexRes.data?.English || [];
      const match = items.find(
        (i) => i.TITLE.toLowerCase() === String(idOrTitle).toLowerCase()
      );
      if (match) {
        resolvedId = String(match.ID);
      } else if (items.length > 0) {
        resolvedId = String(items[0].ID);
      }
    }

    const chapterUrl = `${ENV.HISN_MUSLIM_API_URL}${API_ENDPOINTS.HISN_MUSLIM.CHAPTER_DUAS(resolvedId)}`;
    const response = await axios.get<HisnRawChapterResponse>(chapterUrl, {
      timeout: ENV.API_TIMEOUT,
    });

    const data = response.data;
    if (!data || typeof data !== 'object') {
      throw new Error(`Unable to fetch duas for chapter ID: ${resolvedId}`);
    }

    const keys = Object.keys(data);
    const resolvedTitle = keys.length > 0 ? keys[0] : fallbackTitle || `Chapter ${resolvedId}`;
    const rawDuas = data[resolvedTitle] || (keys.length > 0 ? (data as any)[keys[0]] : []) || [];

    const mappedDuas: DuaItem[] = rawDuas.map((d) => ({
      id: String(d.ID),
      arabic: d.ARABIC_TEXT || '',
      transliteration: d.LANGUAGE_ARABIC_TRANSLATED_TEXT || '',
      translation: d.TRANSLATED_TEXT || '',
      repeat: Number(d.REPEAT) || 1,
      audio: d.AUDIO,
    }));

    return {
      id: resolvedId,
      title: resolvedTitle,
      category: assignCategory(resolvedTitle),
      duas: mappedDuas,
    };
  },

  /**
   * Alias for getChapter
   */
  async getChapterDuas(chapterId: number | string, chapterTitle?: string): Promise<AdhkarChapter> {
    return this.getChapter(chapterId, chapterTitle);
  },

  /**
   * Retrieves saved favorite dua IDs
   */
  async getFavorites(): Promise<string[]> {
    try {
      const stored = await TokenStorage.getItem(ENV.STORAGE_KEYS.ADHKAR_FAVORITES);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  /**
   * Toggles favorite status for a given Dua ID
   */
  async toggleFavorite(duaId: string): Promise<string[]> {
    const favorites = await this.getFavorites();
    const updated = favorites.includes(duaId)
      ? favorites.filter((id) => id !== duaId)
      : [...favorites, duaId];
    await TokenStorage.setItem(ENV.STORAGE_KEYS.ADHKAR_FAVORITES, JSON.stringify(updated));
    return updated;
  },

  /**
   * Marks daily adhkar complete in the HerDeen backend tracker
   */
  async completeAdhkarSession(): Promise<any> {
    return await TrackerService.toggleAdhkaar(true);
  },
};
