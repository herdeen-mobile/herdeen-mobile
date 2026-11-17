/**
 * Digital Tasbih Counter Service
 * Manages persistent counter state, presets, targets, and synchronization
 * with the HerDeen daily Ibadah tracker.
 */

import { ENV } from '@/src/config/env';
import { TrackerService } from '@/src/services/api/tracker-service';
import { TokenStorage } from '@/src/services/storage/token-storage';
import { DhikrDefinition, PRESET_DHIKRS, TasbihState } from '@/src/types/tasbih';

export { DhikrDefinition, PRESET_DHIKRS, TasbihState };

const DEFAULT_TASBIH_STATE: TasbihState = {
  counts: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0 },
  selectedDhikrId: '1',
  target: 33,
  soundEnabled: true,
  vibrationEnabled: true,
};

export const TasbihService = {
  /**
   * Retrieves active Tasbih state from persistent storage
   */
  async getState(): Promise<TasbihState> {
    try {
      const stored = await TokenStorage.getItem(ENV.STORAGE_KEYS.TASBIH_STATE);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...DEFAULT_TASBIH_STATE,
          ...parsed,
          counts: {
            ...DEFAULT_TASBIH_STATE.counts,
            ...(parsed.counts || {}),
          },
        };
      }
    } catch {}
    return DEFAULT_TASBIH_STATE;
  },

  /**
   * Saves updated Tasbih state to persistent storage
   */
  async saveState(state: TasbihState): Promise<TasbihState> {
    await TokenStorage.setItem(ENV.STORAGE_KEYS.TASBIH_STATE, JSON.stringify(state));
    return state;
  },

  /**
   * Increments the count for a specific Dhikr
   */
  async increment(dhikrId: string): Promise<TasbihState> {
    const current = await this.getState();
    const updatedCount = (current.counts[dhikrId] || 0) + 1;
    const newState: TasbihState = {
      ...current,
      counts: {
        ...current.counts,
        [dhikrId]: updatedCount,
      },
    };
    return await this.saveState(newState);
  },

  /**
   * Resets the count for a specific Dhikr
   */
  async reset(dhikrId: string): Promise<TasbihState> {
    const current = await this.getState();
    const newState: TasbihState = {
      ...current,
      counts: {
        ...current.counts,
        [dhikrId]: 0,
      },
    };
    return await this.saveState(newState);
  },

  /**
   * Resets all Dhikr counts to 0
   */
  async resetAll(): Promise<TasbihState> {
    const current = await this.getState();
    const clearedCounts: Record<string, number> = {};
    Object.keys(current.counts).forEach((key) => {
      clearedCounts[key] = 0;
    });
    const newState: TasbihState = {
      ...current,
      counts: clearedCounts,
    };
    return await this.saveState(newState);
  },

  /**
   * Marks Dhikr session complete in the daily Ibadah tracker
   */
  async completeSession(): Promise<any> {
    return await TrackerService.toggleAdhkaar(true);
  },
};
