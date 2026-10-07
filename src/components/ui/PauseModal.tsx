import React from 'react';
import { translations } from '../../data/translations';
import { Language, GameSettings } from '../../types/game';
import { audioService } from '../../services/audioService';

interface PauseModalProps {
  language: Language;
  settings: GameSettings;
  onResume: () => void;
  onRestart: () => void;
  onExitMap: () => void;
  onExitTitle: () => void;
  onUpdateSettings: (settings: Partial<GameSettings>) => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  language,
  settings,
  onResume,
  onRestart,
  onExitMap,
  onExitTitle,
  onUpdateSettings,
}) => {
  const t = translations[language];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-slate-700/80 rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl">
        <h2 className="font-heading font-black text-2xl text-amber-400 mb-6 tracking-wide">
          ⏸ {t.pause}
        </h2>

        {/* Volume toggles */}
        <div className="space-y-4 text-left bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 mb-6">
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>{t.musicVolume}</span>
              <span>{Math.round(settings.musicVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.musicVolume}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                audioService.musicVolume = val;
                audioService.updateVolumes();
                onUpdateSettings({ musicVolume: val });
              }}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>{t.sfxVolume}</span>
              <span>{Math.round(settings.sfxVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.sfxVolume}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                audioService.sfxVolume = val;
                audioService.updateVolumes();
                onUpdateSettings({ sfxVolume: val });
              }}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={() => {
              audioService.playButtonClick();
              onResume();
            }}
            className="w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-orange-500/20 active:scale-98 transition-all"
          >
            ▶ {t.resume}
          </button>
          <button
            onClick={() => {
              audioService.playButtonClick();
              onRestart();
            }}
            className="w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all"
          >
            🔄 {t.restart}
          </button>
          <button
            onClick={() => {
              audioService.playButtonClick();
              onExitMap();
            }}
            className="w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all"
          >
            🗺 {t.map}
          </button>
          <button
            onClick={() => {
              audioService.playButtonClick();
              onExitTitle();
            }}
            className="w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-400 transition-all"
          >
            🏠 {t.mainMenu}
          </button>
        </div>
      </div>
    </div>
  );
};
