import React from 'react';
import { PlayerProgress, GameSettings } from '../../types/game';
import { INITIAL_ACHIEVEMENTS } from '../../data/missions';
import { translations } from '../../data/translations';
import { audioService } from '../../services/audioService';

interface AchievementsScreenProps {
  progress: PlayerProgress;
  settings: GameSettings;
  onBack: () => void;
}

export const AchievementsScreen: React.FC<AchievementsScreenProps> = ({
  progress,
  settings,
  onBack,
}) => {
  const t = translations[settings.language];

  return (
    <div className="relative w-full h-full min-h-screen bg-slate-950 flex flex-col justify-between overflow-hidden p-4 sm:p-6 select-none">
      {/* Header */}
      <header className="flex items-center justify-between pb-3 border-b border-slate-800">
        <button
          onClick={() => {
            audioService.playButtonClick();
            onBack();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-slate-300 hover:text-white"
        >
          <span>←</span>
          <span>{t.back}</span>
        </button>

        <div className="text-center">
          <h2 className="font-heading font-black text-lg sm:text-xl text-yellow-400">
            {t.achievements}
          </h2>
          <span className="text-[11px] text-slate-400">
            Badges of Bharat & National Service
          </span>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 px-3 py-1 rounded-full border border-amber-500/30 text-xs font-bold text-amber-400">
          <span>🪙 {progress.coins}</span>
        </div>
      </header>

      {/* Grid of Badges */}
      <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 my-4 pr-1">
        {INITIAL_ACHIEVEMENTS.map((ach) => {
          // Dynamic calculation based on player's overall completed missions
          const completedCount = Object.keys(progress.completedMissions).length;
          let currentProgress = 0;

          if (ach.id === 'master_diplomat') {
            currentProgress = Math.min(completedCount, ach.maxProgress);
          } else {
            // General progress mapped to completed levels
            currentProgress = Math.min(completedCount * 2, ach.maxProgress);
          }

          const isUnlocked = currentProgress >= ach.maxProgress;
          const percent = Math.min(100, Math.round((currentProgress / ach.maxProgress) * 100));

          return (
            <div
              key={ach.id}
              className={`p-4 rounded-3xl border flex items-center gap-4 transition-all ${
                isUnlocked
                  ? 'bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border-amber-500/60 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              {/* Medal Icon */}
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                  isUnlocked
                    ? 'bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 shadow-md shadow-amber-500/30 ring-2 ring-amber-300'
                    : 'bg-slate-800 text-slate-500 border border-slate-700'
                }`}
              >
                {isUnlocked ? '🏅' : '🔒'}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-black text-sm sm:text-base text-white truncate">
                    {settings.language === 'hi' ? ach.titleHi : ach.titleEn}
                  </h4>
                  <span className="text-xs font-bold text-amber-400">
                    +{ach.rewardCoins} 🪙
                  </span>
                </div>

                <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                  {settings.language === 'hi' ? ach.descHi : ach.descEn}
                </p>

                {/* Progress Bar */}
                <div className="mt-2.5">
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1 font-semibold">
                    <span>Progress</span>
                    <span>
                      {currentProgress} / {ach.maxProgress} ({percent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      style={{ width: `${percent}%` }}
                      className={`h-full rounded-full transition-all duration-500 ${
                        isUnlocked
                          ? 'bg-gradient-to-r from-amber-400 to-emerald-400'
                          : 'bg-amber-500'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <footer className="text-center text-xs text-slate-500 py-2">
        Inspiring dedication to environmental stewardship, social upliftment, and community progress.
      </footer>
    </div>
  );
};
