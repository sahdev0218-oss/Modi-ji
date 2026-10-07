import React from 'react';
import { GameSettings, PlayerProgress, Language } from '../../types/game';
import { translations } from '../../data/translations';
import { audioService } from '../../services/audioService';

interface SettingsScreenProps {
  settings: GameSettings;
  progress: PlayerProgress;
  onUpdateSettings: (settings: Partial<GameSettings>) => void;
  onResetProgress: () => void;
  onOpenApkGuide: () => void;
  onBack: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  settings,
  progress,
  onUpdateSettings,
  onResetProgress,
  onOpenApkGuide,
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

        <h2 className="font-heading font-black text-lg sm:text-xl text-slate-200">
          ⚙️ {t.settings}
        </h2>

        <div className="w-16" />
      </header>

      {/* Settings Form Container */}
      <div className="flex-1 overflow-y-auto max-w-xl mx-auto w-full my-4 space-y-4 pr-1">
        {/* 1. Language Support: Hindi / English */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
          <label className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-3">
            🌐 {t.language}
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                audioService.playButtonClick();
                onUpdateSettings({ language: 'en' });
              }}
              className={`py-3 px-4 rounded-xl font-bold text-sm border transition-all ${
                settings.language === 'en'
                  ? 'bg-amber-500 text-slate-950 border-white shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
              }`}
            >
              English
            </button>
            <button
              onClick={() => {
                audioService.playButtonClick();
                onUpdateSettings({ language: 'hi' });
              }}
              className={`py-3 px-4 rounded-xl font-bold text-sm font-hindi border transition-all ${
                settings.language === 'hi'
                  ? 'bg-amber-500 text-slate-950 border-white shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
              }`}
            >
              हिन्दी (Hindi)
            </button>
          </div>
        </div>

        {/* 2. Audio & Music Volume */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-4">
          <label className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
            🎵 {t.sound}
          </label>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
              <span>{t.musicVolume} (Indian Classical Instrumental)</span>
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
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
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

        {/* 3. Graphics Quality (Optimized for Android phones) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
          <label className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
            ⚡ {t.graphics}
          </label>
          <p className="text-[11px] text-slate-400 mb-3">
            Target 30–60 FPS on mobile processors.
          </p>
          <div className="grid grid-cols-3 gap-2">
            {(['low', 'medium', 'high'] as const).map((q) => (
              <button
                key={q}
                onClick={() => {
                  audioService.playButtonClick();
                  onUpdateSettings({ graphicsQuality: q });
                }}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold capitalize border transition-all ${
                  settings.graphicsQuality === q
                    ? 'bg-amber-500 text-slate-950 border-white'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
                }`}
              >
                {t[q]}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Netlify & Android Deployment Guides */}
        <div className="bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/40 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-1.5">
              <span>🌐</span>
              <span>Deploy to Netlify & APK Guide</span>
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Netlify build config, CLI commands & Android APK packaging.
            </p>
          </div>
          <button
            onClick={() => {
              audioService.playButtonClick();
              onOpenApkGuide();
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs uppercase shadow transition-all shrink-0"
          >
            Deploy Guide ➔
          </button>
        </div>

        {/* 5. Reset Progress */}
        <div className="bg-slate-900/50 border border-rose-950/80 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-rose-400">
              {t.resetProgress}
            </h4>
            <p className="text-[10px] text-slate-500">
              Clear saved stars, coins, and levels
            </p>
          </div>
          <button
            onClick={() => {
              if (window.confirm(t.resetConfirm)) {
                onResetProgress();
              }
            }}
            className="px-3 py-1.5 rounded-lg bg-rose-950/80 border border-rose-800 hover:bg-rose-900 text-rose-300 text-xs font-bold transition-all"
          >
            Reset
          </button>
        </div>
      </div>

      <footer className="text-center text-[10px] text-slate-600 py-1">
        PM Modi: Bharat Mission v1.0.0 • Made for Android & Mobile Web
      </footer>
    </div>
  );
};
