import React, { useState } from 'react';
import { translations } from '../../data/translations';
import { Language } from '../../types/game';
import { audioService } from '../../services/audioService';

interface ApkGuideModalProps {
  language: Language;
  onClose: () => void;
  defaultTab?: 'netlify' | 'android';
}

export const ApkGuideModal: React.FC<ApkGuideModalProps> = ({
  language,
  onClose,
  defaultTab = 'netlify',
}) => {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'netlify' | 'android'>(defaultTab);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    audioService.playButtonClick();
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const netlifyCliCommands = `npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist`;

  const capacitorCommands = `npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "PM Modi Bharat Mission" "com.bharatmission.pmmodi" --web-dir dist
npm run build
npx cap add android
npx cap open android`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-emerald-500/50 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{activeTab === 'netlify' ? '🚀' : '📱'}</span>
            <div>
              <h3 className="font-heading font-black text-base sm:text-lg text-emerald-400">
                {activeTab === 'netlify' ? 'Netlify Deployment Guide' : t.apkTitle}
              </h3>
              <p className="text-[11px] text-slate-400">
                Ready configured for Netlify & Android APK
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              audioService.playButtonClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 my-3">
          <button
            onClick={() => {
              audioService.playButtonClick();
              setActiveTab('netlify');
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'netlify'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🌐</span>
            <span>Deploy to Netlify</span>
          </button>
          <button
            onClick={() => {
              audioService.playButtonClick();
              setActiveTab('android');
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'android'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>📱</span>
            <span>Android APK & PWA</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto my-1 space-y-4 pr-1 text-xs text-slate-300 leading-relaxed">
          {activeTab === 'netlify' ? (
            <>
              {/* Ready config notification */}
              <div className="bg-emerald-950/40 border border-emerald-500/40 p-3 rounded-2xl flex items-start gap-2.5">
                <span className="text-xl">✅</span>
                <div>
                  <h4 className="font-bold text-emerald-300 text-xs">
                    Configuration Files Added!
                  </h4>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    <code>netlify.toml</code> and <code>public/_redirects</code> have been configured with build settings (<code>dist</code> output) and SPA routing rules.
                  </p>
                </div>
              </div>

              {/* Option A: Git Push */}
              <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700">
                <h4 className="font-bold text-amber-400 text-sm mb-1 flex items-center gap-1.5">
                  <span>1️⃣</span>
                  <span>Option 1: Git-Connected Deploy (Recommended)</span>
                </h4>
                <ol className="list-decimal list-inside space-y-1 text-slate-300 text-[11px] mt-1.5">
                  <li>Push your repository to GitHub, GitLab, or Bitbucket.</li>
                  <li>Log in to <a href="https://app.netlify.com" target="_blank" rel="noreferrer" className="text-emerald-400 underline font-semibold">Netlify</a> and click <strong>"Add new site" ➔ "Import an existing project"</strong>.</li>
                  <li>Select your repository. Netlify reads <code>netlify.toml</code> automatically:
                    <ul className="list-disc list-inside ml-4 mt-1 text-slate-400">
                      <li>Build command: <code>npm run build</code></li>
                      <li>Publish directory: <code>dist</code></li>
                    </ul>
                  </li>
                  <li>Click <strong>Deploy Site</strong>!</li>
                </ol>
              </div>

              {/* Option B: Netlify CLI */}
              <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-teal-500/30">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-teal-300 text-sm flex items-center gap-1.5">
                    <span>2️⃣</span>
                    <span>Option 2: Deploy via Netlify CLI</span>
                  </h4>
                  <button
                    onClick={() => copyToClipboard(netlifyCliCommands, 'cli')}
                    className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 font-semibold text-[10px]"
                  >
                    {copiedKey === 'cli' ? 'Copied ✓' : 'Copy Commands'}
                  </button>
                </div>
                <p className="text-slate-400 text-[11px] mb-2">
                  Deploy instantly from your terminal:
                </p>
                <pre className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-[10px] text-teal-300 overflow-x-auto whitespace-pre">
                  {netlifyCliCommands}
                </pre>
              </div>

              {/* Option C: Drag and Drop */}
              <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700">
                <h4 className="font-bold text-slate-200 text-sm mb-1 flex items-center gap-1.5">
                  <span>3️⃣</span>
                  <span>Option 3: Manual Drag & Drop</span>
                </h4>
                <p className="text-[11px] text-slate-300">
                  Run <code>npm run build</code> locally, then drag the generated <code>dist</code> folder into <a href="https://app.netlify.com/drop" target="_blank" rel="noreferrer" className="text-emerald-400 underline font-semibold">app.netlify.com/drop</a> for instant zero-configuration deployment!
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Method 1: Instant PWA Install on Android */}
              <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700">
                <h4 className="font-bold text-amber-400 text-sm mb-1 flex items-center gap-1.5">
                  <span>⚡</span>
                  <span>Method 1: Instant Mobile Web APK (PWA)</span>
                </h4>
                <p className="text-slate-300 text-[11px] mb-2">
                  On any Android smartphone via Google Chrome:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-slate-400 text-[11px]">
                  <li>Open your Netlify or preview URL in Google Chrome on your Android phone.</li>
                  <li>Tap the three dots menu (⋮) in the top-right corner.</li>
                  <li>Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</li>
                  <li>It installs directly as a standalone full-screen Android app!</li>
                </ol>
              </div>

              {/* Method 2: Native Android APK with Capacitor */}
              <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-emerald-500/30">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-emerald-300 text-sm flex items-center gap-1.5">
                    <span>📦</span>
                    <span>Method 2: Native Android APK Build (Capacitor)</span>
                  </h4>
                  <button
                    onClick={() => copyToClipboard(capacitorCommands, 'cap')}
                    className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 font-semibold text-[10px]"
                  >
                    {copiedKey === 'cap' ? 'Copied ✓' : 'Copy Commands'}
                  </button>
                </div>
                <p className="text-slate-400 text-[11px] mb-2">
                  To compile into a standalone `.apk` using Android Studio:
                </p>
                <pre className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-[10px] text-emerald-400 overflow-x-auto whitespace-pre">
                  {capacitorCommands}
                </pre>
                <p className="text-[10px] text-slate-400 mt-2">
                  Once Android Studio opens, click <strong>Build ➔ Build Bundle(s) / APK(s) ➔ Build APK(s)</strong>. Your APK will be in <code>android/app/build/outputs/apk/</code>!
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => {
              audioService.playButtonClick();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
