import React from 'react';
import { PlayerProgress, GameSettings, GameScreen } from '../../types/game';
import { translations } from '../../data/translations';
import { audioService } from '../../services/audioService';

interface TitleScreenProps {
  progress: PlayerProgress;
  settings: GameSettings;
  onNavigate: (screen: GameScreen) => void;
  onToggleLanguage: () => void;
  onOpenApkGuide: () => void;
  onStartLatestMission: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  progress,
  settings,
  onNavigate,
  onToggleLanguage,
  onOpenApkGuide,
  onStartLatestMission,
}) => {
  const t = translations[settings.language];

  return (
    <div className="relative w-full h-full min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-amber-950/40 flex flex-col justify-between overflow-hidden p-4 sm:p-6 select-none">
      {/* Decorative Ashoka Chakra Watermark & Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] pointer-events-none opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_60s_linear_infinite] text-blue-400 fill-current">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
          {Array.from({ length: 24 }).map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={50 + 44 * Math.cos((i * 15 * Math.PI) / 180)}
              y2={50 + 44 * Math.sin((i * 15 * Math.PI) / 180)}
              stroke="currentColor"
              strokeWidth="1.2"
            />
          ))}
        </svg>
      </div>

      {/* Ambient Tricolor Top/Bottom Accents */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-white to-green-600" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar: Stats, Language Toggle, Audio Toggle, APK Export */}
      <header className="relative z-10 flex items-center justify-between w-full max-w-4xl mx-auto pt-2">
        {/* Player Stats Capsule */}
        <div className="flex items-center gap-2 sm:gap-4 bg-slate-900/80 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full border border-amber-500/30 shadow-lg">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-400">
            <span>🪙</span>
            <span>{progress.coins}</span>
          </div>
          <div className="w-[1px] h-3.5 bg-slate-700" />
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-yellow-300">
            <span>★</span>
            <span>{progress.stars}</span>
          </div>
          <div className="w-[1px] h-3.5 bg-slate-700" />
          <div className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-emerald-400">
            <span>LVL {progress.level}</span>
          </div>
        </div>

        {/* Quick Utility Controls */}
        <div className="flex items-center gap-2">
          {/* Deploy & APK Guide Button */}
          <button
            onClick={() => {
              audioService.playButtonClick();
              onOpenApkGuide();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-500/50 text-[11px] sm:text-xs font-bold text-emerald-300 transition-all shadow"
          >
            <span>🌐</span>
            <span>Netlify / APK</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => {
              audioService.playButtonClick();
              onToggleLanguage();
            }}
            className="px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-amber-500/40 text-xs font-bold text-amber-300 transition-all shadow"
          >
            {settings.language === 'en' ? 'हिन्दी' : 'English'}
          </button>
        </div>
      </header>

      {/* Main Center: Hero Branding & Emblem */}
      <main className="relative z-10 flex flex-col items-center justify-center my-auto text-center px-4">
        {/* Emblem Badge */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-orange-500 via-amber-300 to-green-600 shadow-2xl shadow-orange-500/30 flex items-center justify-center mb-4 animate-pulse-glow">
          <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center border-2 border-amber-400/60 p-2">
            <span className="text-3xl sm:text-4xl">🇮🇳</span>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 font-heading">
              BHARAT
            </span>
          </div>
        </div>

        {/* Game Title */}
        <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-tricolor tracking-wide drop-shadow-[0_4px_16px_rgba(255,153,51,0.4)]">
          {t.gameTitle}
        </h1>

        <p className="text-xs sm:text-sm font-medium text-amber-200/90 max-w-md mt-2 mb-8 leading-relaxed">
          {t.subtitle}
        </p>

        {/* 5 Primary Game Navigation Buttons (As specified in prompt) */}
        <div className="flex flex-col gap-3 w-full max-w-xs sm:max-w-sm">
          {/* PLAY BUTTON (Primary) */}
          <button
            onClick={() => {
              audioService.playButtonClick();
              audioService.startBackgroundMusic();
              onStartLatestMission();
            }}
            className="w-full py-4 px-6 rounded-2xl font-heading font-black text-lg sm:text-xl uppercase tracking-widest bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 text-slate-950 shadow-xl shadow-orange-500/40 border-2 border-amber-300 hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-3"
          >
            <span>▶</span>
            <span>{t.play}</span>
          </button>

          {/* MISSIONS BUTTON */}
          <button
            onClick={() => {
              audioService.playButtonClick();
              onNavigate('missions');
            }}
            className="w-full py-3 px-5 rounded-2xl font-bold text-sm sm:text-base uppercase tracking-wider bg-slate-900/90 hover:bg-slate-800 border border-amber-500/50 text-amber-200 hover:border-amber-400 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <span>🎯</span>
            <span>{t.missions}</span>
          </button>

          {/* MAP BUTTON */}
          <button
            onClick={() => {
              audioService.playButtonClick();
              onNavigate('map');
            }}
            className="w-full py-3 px-5 rounded-2xl font-bold text-sm sm:text-base uppercase tracking-wider bg-slate-900/90 hover:bg-slate-800 border border-emerald-500/50 text-emerald-200 hover:border-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <span>🗺️</span>
            <span>{t.map}</span>
          </button>

          {/* ACHIEVEMENTS BUTTON */}
          <button
            onClick={() => {
              audioService.playButtonClick();
              onNavigate('achievements');
            }}
            className="w-full py-3 px-5 rounded-2xl font-bold text-sm sm:text-base uppercase tracking-wider bg-slate-900/90 hover:bg-slate-800 border border-yellow-500/40 text-yellow-200 hover:border-yellow-400 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <span>🏅</span>
            <span>{t.achievements}</span>
          </button>

          {/* SETTINGS BUTTON */}
          <button
            onClick={() => {
              audioService.playButtonClick();
              onNavigate('settings');
            }}
            className="w-full py-3 px-5 rounded-2xl font-bold text-sm sm:text-base uppercase tracking-wider bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:border-slate-500 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <span>⚙️</span>
            <span>{t.settings}</span>
          </button>

          {/* WARDROBE (Bonus) */}
          <button
            onClick={() => {
              audioService.playButtonClick();
              onNavigate('wardrobe');
            }}
            className="w-full py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider text-amber-300/80 hover:text-amber-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>🧥</span>
            <span>{t.wardrobe}</span>
          </button>
        </div>
      </main>

      {/* Footer Note */}
      <footer className="relative z-10 text-center py-2">
        <p className="text-[10px] text-slate-500 max-w-lg mx-auto">
          Fictional educational game created for positive community awareness, cleanliness drives, and green heritage education across India.
        </p>
      </footer>
    </div>
  );
};
