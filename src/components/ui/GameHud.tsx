import React from 'react';
import { Mission, Language, PlayerProgress } from '../../types/game';
import { translations } from '../../data/translations';
import { audioService } from '../../services/audioService';

interface GameHudProps {
  mission: Mission;
  language: Language;
  progress: PlayerProgress;
  objectiveStates: Record<string, number>;
  onPause: () => void;
  dialogueMessage?: string | null;
}

export const GameHud: React.FC<GameHudProps> = ({
  mission,
  language,
  progress,
  objectiveStates,
  onPause,
  dialogueMessage,
}) => {
  const t = translations[language];

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-3 sm:p-5 select-none">
      {/* Top HUD Bar */}
      <div className="flex items-start justify-between w-full pointer-events-auto">
        {/* Left: Pause Button & Mission ID */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              audioService.playButtonClick();
              onPause();
            }}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700/80 hover:border-amber-500/80 active:scale-95 text-white flex items-center justify-center font-bold text-base shadow-lg transition-transform"
          >
            ⏸
          </button>

          <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-slate-700/80 shadow-lg">
            <span className="text-[10px] font-bold text-amber-400 block leading-tight">
              LEVEL {mission.id} • {mission.code}
            </span>
            <span className="text-xs font-black text-white max-w-[140px] sm:max-w-xs truncate block">
              {language === 'hi' ? mission.titleHi : mission.titleEn}
            </span>
          </div>
        </div>

        {/* Right: Currency & Stars */}
        <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-amber-500/30 shadow-lg text-xs font-bold">
          <span className="text-amber-400">🪙 {progress.coins}</span>
          <span className="text-slate-600">|</span>
          <span className="text-yellow-300">★ {progress.stars}</span>
        </div>
      </div>

      {/* Top-Center / Left-floating: Objectives Tracker */}
      <div className="pointer-events-auto self-start mt-2 max-w-xs sm:max-w-sm bg-slate-950/80 backdrop-blur-md border border-amber-500/40 rounded-2xl p-3 shadow-xl">
        <div className="flex items-center justify-between text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1.5">
          <span>🎯 {t.objectives}</span>
          <span className="text-[10px] text-slate-400 font-normal">📍 {mission.location.split(',')[0]}</span>
        </div>

        <div className="space-y-1.5 text-xs">
          {mission.objectives.map((obj) => {
            const current = objectiveStates[obj.id] || 0;
            const isDone = current >= obj.required;

            return (
              <div
                key={obj.id}
                className={`flex items-center justify-between p-1.5 rounded-lg border transition-colors ${
                  isDone
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-900/50 border-slate-800 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 truncate pr-2">
                  <span className={isDone ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                    {isDone ? '✓' : '○'}
                  </span>
                  <span className="text-[11px] truncate">
                    {language === 'hi' ? obj.descriptionHi : obj.descriptionEn}
                  </span>
                </div>
                <span className="font-mono text-[11px] font-bold shrink-0">
                  {current}/{obj.required}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Center Dialogue / Toast Banner if active */}
      {dialogueMessage && (
        <div className="self-center my-auto pointer-events-none animate-bounce">
          <div className="bg-slate-900/95 border-2 border-amber-400 text-amber-200 px-5 py-2.5 rounded-2xl shadow-2xl text-xs sm:text-sm font-bold flex items-center gap-2">
            <span>🙏</span>
            <span>{dialogueMessage}</span>
          </div>
        </div>
      )}

      {/* Space for bottom controls (joystick & action buttons) */}
      <div className="h-28 pointer-events-none" />
    </div>
  );
};
