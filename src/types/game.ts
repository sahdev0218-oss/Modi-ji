export type Language = 'en' | 'hi';

export type MissionType = 
  | 'clean' 
  | 'plant' 
  | 'quiz' 
  | 'heritage' 
  | 'community' 
  | 'solar' 
  | 'recycle' 
  | 'guide';

export interface QuizQuestion {
  id: string;
  questionEn: string;
  questionHi: string;
  optionsEn: string[];
  optionsHi: string[];
  correctIndex: number;
  explanationEn: string;
  explanationHi: string;
}

export interface MissionObjective {
  id: string;
  descriptionEn: string;
  descriptionHi: string;
  required: number;
  current: number;
  type: 'collect_trash' | 'plant_tree' | 'talk_citizen' | 'complete_quiz' | 'activate_solar' | 'guide_citizen';
}

export interface Mission {
  id: number;
  code: string;
  titleEn: string;
  titleHi: string;
  taglineEn: string;
  taglineHi: string;
  location: string;
  state: string;
  type: MissionType;
  difficulty: 1 | 2 | 3 | 4 | 5;
  requiredStars: number;
  rewardCoins: number;
  rewardXp: number;
  rewardStars: number;
  environmentTheme: 'delhi' | 'varanasi' | 'gujarat' | 'mumbai' | 'rajasthan' | 'kolkata' | 'chennai' | 'hyderabad' | 'bengaluru' | 'himalayas';
  timeLimitSeconds?: number;
  objectives: MissionObjective[];
  quizQuestions?: QuizQuestion[];
  educationalFactEn: string;
  educationalFactHi: string;
}

export interface Achievement {
  id: string;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  rewardCoins: number;
}

export interface WardrobeOutfit {
  id: string;
  nameEn: string;
  nameHi: string;
  vestColor: string; // Hex color
  kurtaColor: string;
  stoleColor?: string;
  price: number;
  unlocked: boolean;
}

export interface PlayerProgress {
  coins: number;
  stars: number;
  xp: number;
  level: number;
  unlockedMissions: number[]; // mission IDs
  completedMissions: Record<number, { stars: number; bestTime?: number }>;
  currentOutfitId: string;
  unlockedOutfits: string[];
  achievements: Record<string, boolean>;
  highScore: number;
}

export interface GameSettings {
  language: Language;
  musicVolume: number;
  sfxVolume: number;
  graphicsQuality: 'low' | 'medium' | 'high';
  hapticFeedback: boolean;
  joystickFixed: boolean;
}

export type GameScreen = 
  | 'title' 
  | 'gameplay' 
  | 'missions' 
  | 'map' 
  | 'achievements' 
  | 'settings' 
  | 'wardrobe';
