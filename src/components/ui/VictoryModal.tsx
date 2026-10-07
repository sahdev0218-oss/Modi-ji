import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Mission, Language } from '../../types/game';
import { translations } from '../../data/translations';
import { audioService } from '../../services/audioService';

interface VictoryModalProps {
  mission: Mission;
  language: Language;
  onNextMission: () => void;
  onMainMenu: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  mission,
  language,
  onNextMission,
  onMainMenu,
}) => {
  const t = translations[language];

  useEffect(() => {
    audioService.playMissionVictory();

    // Indian Tricolor Confetti burst (Orange, White, Green, Gold)
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF9933', '#FFFFFF', '#138808', '#FFD700'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FF9933', '#FFFFFF', '#138808'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FF9933', '#FFFFFF', '#138808'],
        });
      }, 300);
    } catch (e) {
      // Ignored
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-amber-500/60 rounded-3xl max-w-md w-full p-6 text-center shadow-2xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Trophy / Namaste Emblem */}
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-600 to-yellow-400 p-1 shadow-lg shadow-amber-500/40 flex items-center justify-center text-4xl mb-3">
          <span>🏆</span>
        </div>

        <h2 className="font-heading font-black text-2xl sm:text-3xl text-tricolor tracking-wide">
          {t.missionComplete}
        </h2>
        <p className="text-sm font-semibold text-amber-300 mt-1">
          {language === 'hi' ? mission.titleHi : mission.titleEn}
        </p>

        {/* 3 Stars display */}
        <div className="flex justify-center gap-2 my-4">
          {[1, 2, 3].map((star) => (
            <span
              key={star}
              className="text-4xl text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)] animate-bounce"
              style={{ animationDelay: `${star * 150}ms` }}
            >
              ★
            </span>
          ))}
        </div>

        {/* Rewards earned */}
        <div className="grid grid-cols-2 gap-3 bg-slate-800/80 rounded-2xl p-3 border border-slate-700/80 my-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl">🪙</span>
            <div>
              <span className="text-xs text-slate-400 block">{t.coins}</span>
              <span className="text-lg font-bold text-amber-300">+{mission.rewardCoins}</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 border-l border-slate-700">
            <span className="text-xl">⚡</span>
            <div>
              <span className="text-xs text-slate-400 block">{t.xp}</span>
              <span className="text-lg font-bold text-emerald-400">+{mission.rewardXp}</span>
            </div>
          </div>
        </div>

        {/* Educational Fact Card */}
        <div className="bg-slate-800/60 border border-amber-500/30 rounded-2xl p-3.5 text-left mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
            <span>💡</span>
            <span>{t.educationalFact}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {language === 'hi' ? mission.educationalFactHi : mission.educationalFactEn}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              audioService.playButtonClick();
              onNextMission();
            }}
            className="flex-1 py-3.5 px-4 rounded-xl font-black text-sm uppercase tracking-wider bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-slate-950 shadow-lg shadow-orange-500/30 hover:scale-102 active:scale-98 transition-all"
          >
            {t.nextMission} ➔
          </button>
          <button
            onClick={() => {
              audioService.playButtonClick();
              onMainMenu();
            }}
            className="py-3.5 px-5 rounded-xl font-bold text-sm uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
          >
            {t.mainMenu}
          </button>
        </div>
      </div>
    </div>
  );
};
