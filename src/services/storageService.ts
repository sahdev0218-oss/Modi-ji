import { PlayerProgress, GameSettings } from '../types/game';
import { INITIAL_ACHIEVEMENTS } from '../data/missions';

const PROGRESS_KEY = 'pm_modi_bharat_mission_progress_v1';
const SETTINGS_KEY = 'pm_modi_bharat_mission_settings_v1';

export const DEFAULT_PROGRESS: PlayerProgress = {
  coins: 100,
  stars: 0,
  xp: 0,
  level: 1,
  unlockedMissions: [1], // Level 1 unlocked initially
  completedMissions: {},
  currentOutfitId: 'saffron_classic',
  unlockedOutfits: ['saffron_classic'],
  achievements: INITIAL_ACHIEVEMENTS.reduce((acc, ach) => {
    acc[ach.id] = false;
    return acc;
  }, {} as Record<string, boolean>),
  highScore: 0,
};

export const DEFAULT_SETTINGS: GameSettings = {
  language: 'en',
  musicVolume: 0.6,
  sfxVolume: 0.8,
  graphicsQuality: 'medium',
  hapticFeedback: true,
  joystickFixed: false,
};

export class StorageService {
  public static loadProgress(): PlayerProgress {
    try {
      const data = localStorage.getItem(PROGRESS_KEY);
      if (!data) return { ...DEFAULT_PROGRESS };
      const parsed = JSON.parse(data);
      return {
        ...DEFAULT_PROGRESS,
        ...parsed,
        unlockedMissions: Array.isArray(parsed.unlockedMissions) && parsed.unlockedMissions.length > 0 
          ? parsed.unlockedMissions 
          : [1],
      };
    } catch (e) {
      console.warn('Failed to load progress from localStorage', e);
      return { ...DEFAULT_PROGRESS };
    }
  }

  public static saveProgress(progress: PlayerProgress): void {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('Failed to save progress to localStorage', e);
    }
  }

  public static loadSettings(): GameSettings {
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      if (!data) return { ...DEFAULT_SETTINGS };
      return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
    } catch (e) {
      return { ...DEFAULT_SETTINGS };
    }
  }

  public static saveSettings(settings: GameSettings): void {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save settings', e);
    }
  }

  public static resetAll(): void {
    try {
      localStorage.removeItem(PROGRESS_KEY);
    } catch (e) {
      // Ignored
    }
  }
}
