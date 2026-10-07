import React from 'react';
import { PlayerProgress, GameSettings } from '../../types/game';
import { WARDROBE_OUTFITS } from '../../data/missions';
import { translations } from '../../data/translations';
import { audioService } from '../../services/audioService';

interface WardrobeScreenProps {
  progress: PlayerProgress;
  settings: GameSettings;
  onSelectOutfit: (outfitId: string) => void;
  onBuyOutfit: (outfitId: string, price: number) => void;
  onBack: () => void;
}

export const WardrobeScreen: React.FC<WardrobeScreenProps> = ({
  progress,
  settings,
  onSelectOutfit,
  onBuyOutfit,
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
          <h2 className="font-heading font-black text-lg sm:text-xl text-amber-400">
            {t.wardrobe}
          </h2>
          <span className="text-[11px] text-slate-400">
            Dignified Traditional Attire Collection
          </span>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 px-3 py-1 rounded-full border border-amber-500/30 text-xs font-bold text-amber-400">
          <span>🪙 {progress.coins}</span>
        </div>
      </header>

      {/* Outfits List */}
      <div className="flex-1 overflow-y-auto max-w-xl mx-auto w-full my-4 grid grid-cols-1 sm:grid-cols-2 gap-4 pr-1">
        {WARDROBE_OUTFITS.map((outfit) => {
          const isUnlocked = progress.unlockedOutfits.includes(outfit.id) || outfit.price === 0;
          const isEquipped = progress.currentOutfitId === outfit.id;
          const canAfford = progress.coins >= outfit.price;

          return (
            <div
              key={outfit.id}
              className={`p-4 rounded-3xl border flex flex-col justify-between transition-all ${
                isEquipped
                  ? 'bg-gradient-to-b from-amber-950/40 to-slate-900 border-amber-400 ring-2 ring-amber-400/40 shadow-lg'
                  : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              <div>
                {/* Visual Preview Swatch */}
                <div className="w-full h-24 rounded-2xl bg-slate-950 flex items-center justify-center relative mb-3 border border-slate-800">
                  <div
                    style={{ backgroundColor: outfit.vestColor }}
                    className="w-12 h-16 rounded-lg shadow-lg border border-white/20 flex flex-col items-center justify-start pt-1"
                  >
                    <div className="w-4 h-1.5 rounded bg-white/40 mb-1" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/60 mb-1" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  </div>
                  {isEquipped && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px]">
                      EQUIPPED
                    </span>
                  )}
                </div>

                <h4 className="font-heading font-black text-sm text-white">
                  {settings.language === 'hi' ? outfit.nameHi : outfit.nameEn}
                </h4>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                {!isUnlocked && (
                  <span className="text-xs font-bold text-amber-400">
                    🪙 {outfit.price} Coins
                  </span>
                )}

                {isEquipped ? (
                  <button
                    disabled
                    className="w-full py-2 rounded-xl bg-slate-800 text-amber-400 font-bold text-xs uppercase cursor-default"
                  >
                    ✓ Selected
                  </button>
                ) : isUnlocked ? (
                  <button
                    onClick={() => {
                      audioService.playButtonClick();
                      onSelectOutfit(outfit.id);
                    }}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs uppercase shadow hover:scale-102 transition-transform"
                  >
                    Equip
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (canAfford) {
                        audioService.playButtonClick();
                        onBuyOutfit(outfit.id, outfit.price);
                      }
                    }}
                    disabled={!canAfford}
                    className={`w-full py-2 rounded-xl font-bold text-xs uppercase transition-all ${
                      canAfford
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? 'Unlock' : 'Need Coins'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <footer className="text-center text-[10px] text-slate-500 py-1">
        Earn coins by completing cleanliness drives, tree plantings, and community missions!
      </footer>
    </div>
  );
};
