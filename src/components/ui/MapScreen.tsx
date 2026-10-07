import React, { useState } from 'react';
import { PlayerProgress, GameSettings, GameScreen } from '../../types/game';
import { MAP_LOCATIONS, MISSIONS_DATA } from '../../data/missions';
import { translations } from '../../data/translations';
import { audioService } from '../../services/audioService';

interface MapScreenProps {
  progress: PlayerProgress;
  settings: GameSettings;
  onSelectMission: (missionId: number) => void;
  onBack: () => void;
}

export const MapScreen: React.FC<MapScreenProps> = ({
  progress,
  settings,
  onSelectMission,
  onBack,
}) => {
  const t = translations[settings.language];
  const [selectedLocId, setSelectedLocId] = useState<string>('delhi');

  const selectedLoc = MAP_LOCATIONS.find((l) => l.id === selectedLocId) || MAP_LOCATIONS[0];
  const isUnlocked = progress.stars >= selectedLoc.starsRequired;

  // Find missions belonging to this location
  const locMissions = MISSIONS_DATA.filter((m) =>
    m.location.toLowerCase().includes(selectedLoc.nameEn.toLowerCase().split(' ')[0]) ||
    m.state.toLowerCase() === selectedLoc.state.toLowerCase() ||
    m.environmentTheme === selectedLoc.id
  );

  return (
    <div className="relative w-full h-full min-h-screen bg-slate-950 flex flex-col justify-between overflow-hidden p-4 sm:p-6 select-none">
      {/* Top Header */}
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
            {t.exploreIndia}
          </h2>
          <span className="text-[11px] text-slate-400">
            {progress.stars} ★ Total Stars Collected
          </span>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 px-3 py-1 rounded-full border border-amber-500/30 text-xs font-bold text-amber-400">
          <span>🪙</span>
          <span>{progress.coins}</span>
        </div>
      </header>

      {/* Main Content: Map View & Location Details Drawer */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 my-4 overflow-hidden">
        {/* Interactive India Map Vector Canvas */}
        <div className="lg:col-span-7 bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 rounded-3xl p-4 relative flex items-center justify-center overflow-hidden min-h-[340px]">
          {/* Subtle stylized India boundary SVG silhouette */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full max-h-[480px] object-contain text-slate-800/80 stroke-amber-500/20 fill-slate-900/60"
          >
            {/* Stylized polygon representation of India map outline */}
            <path
              d="M 36,8 L 48,10 L 45,18 L 54,24 L 62,26 L 76,28 L 88,32 L 95,36 L 90,44 L 80,42 L 72,50 L 64,54 L 56,66 L 52,78 L 48,94 L 44,82 L 36,70 L 26,62 L 20,50 L 24,42 L 22,34 L 32,24 Z"
              strokeWidth="1.5"
            />
          </svg>

          {/* Interactive Location Pins */}
          {MAP_LOCATIONS.map((loc) => {
            const locUnlocked = progress.stars >= loc.starsRequired;
            const isSelected = loc.id === selectedLocId;

            return (
              <button
                key={loc.id}
                onClick={() => {
                  audioService.playButtonClick();
                  setSelectedLocId(loc.id);
                }}
                style={{
                  left: `${loc.x}%`,
                  top: `${loc.y}%`,
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 transition-transform ${
                  isSelected ? 'scale-125 z-30' : 'hover:scale-110 z-20'
                }`}
              >
                <div className="flex flex-col items-center group">
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-lg border-2 transition-all ${
                      locUnlocked
                        ? isSelected
                          ? 'bg-amber-400 border-white text-slate-950 ring-4 ring-amber-400/50 animate-pulse-glow'
                          : 'bg-gradient-to-tr from-amber-600 to-orange-500 border-amber-300 text-white'
                        : 'bg-slate-800 border-slate-600 text-slate-500 opacity-70'
                    }`}
                  >
                    {locUnlocked ? '📍' : '🔒'}
                  </div>
                  <span
                    className={`text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded shadow mt-0.5 whitespace-nowrap ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-slate-900/90 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {settings.language === 'hi' ? loc.nameHi.split(' ')[0] : loc.nameEn.split(' ')[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Location Card & Available Missions Drawer */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div>
                <span className="text-xs uppercase font-bold text-amber-500 tracking-wider">
                  {selectedLoc.state}
                </span>
                <h3 className="font-heading font-black text-xl sm:text-2xl text-white">
                  {settings.language === 'hi' ? selectedLoc.nameHi : selectedLoc.nameEn}
                </h3>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  isUnlocked
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                }`}
              >
                {isUnlocked ? t.unlocked : t.requiresStars.replace('{stars}', String(selectedLoc.starsRequired))}
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-4">
              🏛️ <strong className="text-amber-300">{selectedLoc.landmark}</strong>
            </p>

            {/* Missions in this location */}
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2">
              Available Missions in this State
            </h4>

            <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
              {locMissions.length > 0 ? (
                locMissions.map((m) => {
                  const mUnlocked = progress.unlockedMissions.includes(m.id) || progress.stars >= m.requiredStars;
                  const completedData = progress.completedMissions[m.id];

                  return (
                    <div
                      key={m.id}
                      className={`p-3 rounded-2xl border transition-all ${
                        mUnlocked
                          ? 'bg-slate-800/80 border-slate-700 hover:border-amber-500/60'
                          : 'bg-slate-900/50 border-slate-800 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                          {m.code}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-amber-300 font-bold">
                          <span>★ {completedData ? completedData.stars : m.rewardStars}</span>
                          <span className="text-slate-500">|</span>
                          <span>🪙 {m.rewardCoins}</span>
                        </div>
                      </div>

                      <h5 className="font-bold text-sm text-slate-100 mt-1">
                        {settings.language === 'hi' ? m.titleHi : m.titleEn}
                      </h5>

                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                        {settings.language === 'hi' ? m.taglineHi : m.taglineEn}
                      </p>

                      <div className="mt-2 flex justify-end">
                        {mUnlocked ? (
                          <button
                            onClick={() => {
                              audioService.playButtonClick();
                              audioService.startBackgroundMusic();
                              onSelectMission(m.id);
                            }}
                            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs uppercase hover:scale-105 active:scale-95 transition-all shadow"
                          >
                            Launch Mission ▶
                          </button>
                        ) : (
                          <span className="text-xs text-slate-500">
                            🔒 {t.requiresStars.replace('{stars}', String(m.requiredStars))}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-4 rounded-xl bg-slate-800/40 text-center text-xs text-slate-400">
                  Select Delhi or another unlocked hub to begin initial missions!
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
            <span>Complete missions in unlocked hubs to earn stars and travel deeper into Bharat.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
