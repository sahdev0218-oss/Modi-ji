import React, { useState } from 'react';
import { PlayerProgress, GameSettings, MissionType } from '../../types/game';
import { MISSIONS_DATA } from '../../data/missions';
import { translations } from '../../data/translations';
import { audioService } from '../../services/audioService';

interface MissionsScreenProps {
  progress: PlayerProgress;
  settings: GameSettings;
  onSelectMission: (missionId: number) => void;
  onBack: () => void;
}

export const MissionsScreen: React.FC<MissionsScreenProps> = ({
  progress,
  settings,
  onSelectMission,
  onBack,
}) => {
  const t = translations[settings.language];
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { id: 'all', labelEn: 'All 20 Levels', labelHi: 'सभी 20 स्तर' },
    { id: 'clean', labelEn: 'Cleanliness', labelHi: 'स्वच्छता' },
    { id: 'plant', labelEn: 'Green Plantation', labelHi: 'वृक्षारोपण' },
    { id: 'quiz', labelEn: 'Quizzes', labelHi: 'क्विज़' },
    { id: 'heritage', labelEn: 'Heritage', labelHi: 'धरोहर' },
    { id: 'community', labelEn: 'Community Aid', labelHi: 'जन-सेवा' },
    { id: 'solar', labelEn: 'Solar Energy', labelHi: 'सौर ऊर्जा' },
  ];

  const filteredMissions = MISSIONS_DATA.filter((m) => {
    if (filter === 'all') return true;
    return m.type === filter;
  });

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
          <h2 className="font-heading font-black text-lg sm:text-xl text-amber-400">
            {t.allMissions}
          </h2>
          <span className="text-[11px] text-slate-400">
            {Object.keys(progress.completedMissions).length} of 20 Completed
          </span>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 px-3 py-1 rounded-full border border-amber-500/30 text-xs font-bold text-amber-400">
          <span>🪙 {progress.coins}</span>
          <span className="text-slate-600">|</span>
          <span className="text-yellow-300">★ {progress.stars}</span>
        </div>
      </header>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto py-3 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              audioService.playButtonClick();
              setFilter(cat.id);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              filter === cat.id
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {settings.language === 'hi' ? cat.labelHi : cat.labelEn}
          </button>
        ))}
      </div>

      {/* Missions Grid (All 20 Levels) */}
      <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pr-1 my-2">
        {filteredMissions.map((m) => {
          const isUnlocked = progress.unlockedMissions.includes(m.id) || progress.stars >= m.requiredStars;
          const completedData = progress.completedMissions[m.id];
          const isCompleted = !!completedData;

          return (
            <div
              key={m.id}
              className={`p-4 rounded-3xl border flex flex-col justify-between transition-all ${
                isUnlocked
                  ? 'bg-gradient-to-b from-slate-900/90 to-slate-900/60 border-slate-700/80 hover:border-amber-500/80 shadow-lg'
                  : 'bg-slate-950/60 border-slate-800 opacity-60'
              }`}
            >
              <div>
                {/* Mission Level & Status Pill */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 font-black text-[10px] tracking-wider">
                      LEVEL {m.id}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {m.code}
                    </span>
                  </div>

                  {isCompleted ? (
                    <div className="flex items-center gap-0.5 text-amber-400 text-xs font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
                      <span>★★★</span>
                      <span className="text-[10px] text-emerald-400 ml-1">✓ Done</span>
                    </div>
                  ) : isUnlocked ? (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      Ready
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full">
                      🔒 {m.requiredStars} ★
                    </span>
                  )}
                </div>

                {/* Title */}
                <h4 className="font-heading font-black text-base text-white line-clamp-1">
                  {settings.language === 'hi' ? m.titleHi : m.titleEn}
                </h4>

                <p className="text-[11px] text-amber-400/90 font-medium mt-0.5 mb-1.5">
                  📍 {m.location}
                </p>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-3">
                  {settings.language === 'hi' ? m.taglineHi : m.taglineEn}
                </p>

                {/* Objectives Checklist Preview */}
                <div className="space-y-1 bg-slate-950/50 p-2 rounded-xl border border-slate-800/80 mb-3 text-[11px] text-slate-300">
                  {m.objectives.map((obj) => (
                    <div key={obj.id} className="flex items-center gap-1.5">
                      <span className="text-amber-500 text-xs">◆</span>
                      <span className="truncate">
                        {settings.language === 'hi' ? obj.descriptionHi : obj.descriptionEn}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: Rewards and Play Button */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800 mt-auto">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                  <span className="text-amber-400">🪙 {m.rewardCoins}</span>
                  <span className="text-emerald-400">⚡ {m.rewardXp} XP</span>
                </div>

                {isUnlocked ? (
                  <button
                    onClick={() => {
                      audioService.playButtonClick();
                      audioService.startBackgroundMusic();
                      onSelectMission(m.id);
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs uppercase hover:scale-105 active:scale-95 transition-all shadow-md shadow-orange-500/20"
                  >
                    {isCompleted ? 'Replay ↻' : 'Start ▶'}
                  </button>
                ) : (
                  <span className="text-[11px] font-semibold text-slate-500">
                    Needs {m.requiredStars} Stars
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
