import React, { useState, useEffect, useCallback } from 'react';
import { GameScreen, PlayerProgress, GameSettings, Mission } from './types/game';
import { MISSIONS_DATA } from './data/missions';
import { StorageService, DEFAULT_PROGRESS, DEFAULT_SETTINGS } from './services/storageService';
import { audioService } from './services/audioService';

// Screens & Modals
import { TitleScreen } from './components/ui/TitleScreen';
import { GameCanvas } from './components/game3d/GameCanvas';
import { GameHud } from './components/ui/GameHud';
import { VirtualJoystick } from './components/ui/VirtualJoystick';
import { MapScreen } from './components/ui/MapScreen';
import { MissionsScreen } from './components/ui/MissionsScreen';
import { AchievementsScreen } from './components/ui/AchievementsScreen';
import { SettingsScreen } from './components/ui/SettingsScreen';
import { WardrobeScreen } from './components/ui/WardrobeScreen';
import { QuizModal } from './components/ui/QuizModal';
import { VictoryModal } from './components/ui/VictoryModal';
import { PauseModal } from './components/ui/PauseModal';
import { ApkGuideModal } from './components/ui/ApkGuideModal';

export default function App() {
  // Saved state
  const [progress, setProgress] = useState<PlayerProgress>(() => StorageService.loadProgress());
  const [settings, setSettings] = useState<GameSettings>(() => StorageService.loadSettings());

  // Navigation
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('title');
  const [activeMissionId, setActiveMissionId] = useState<number>(1);

  // Gameplay State
  const [isPaused, setIsPaused] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isVictoryOpen, setIsVictoryOpen] = useState(false);
  const [isApkGuideOpen, setIsApkGuideOpen] = useState(false);
  const [dialogueToast, setDialogueToast] = useState<string | null>(null);

  // Joystick & Touch Controller inputs
  const [joystickVector, setJoystickVector] = useState({ x: 0, y: 0 });
  const [isSprinting, setIsSprinting] = useState(false);
  const [actionTriggerCounter, setActionTriggerCounter] = useState(0);
  const [jumpTriggerCounter, setJumpTriggerCounter] = useState(0);
  const [namasteTriggerCounter, setNamasteTriggerCounter] = useState(0);
  const [actionButtonInfo, setActionButtonInfo] = useState({ available: false, label: 'ACTION' });

  // In-mission objective counters
  const [objectiveStates, setObjectiveStates] = useState<Record<string, number>>({});

  // Sync settings with audioService
  useEffect(() => {
    audioService.musicVolume = settings.musicVolume;
    audioService.sfxVolume = settings.sfxVolume;
    audioService.updateVolumes();
  }, [settings]);

  // Persist progress and settings
  const updateProgress = useCallback((newProgress: Partial<PlayerProgress>) => {
    setProgress((prev) => {
      const updated = { ...prev, ...newProgress };
      StorageService.saveProgress(updated);
      return updated;
    });
  }, []);

  const updateSettings = useCallback((newSettings: Partial<GameSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      StorageService.saveSettings(updated);
      return updated;
    });
  }, []);

  // Active mission reference
  const activeMission: Mission =
    MISSIONS_DATA.find((m) => m.id === activeMissionId) || MISSIONS_DATA[0];

  // Start a specific mission
  const handleLaunchMission = (missionId: number) => {
    setActiveMissionId(missionId);
    setObjectiveStates({});
    setIsPaused(false);
    setIsQuizOpen(false);
    setIsVictoryOpen(false);
    setCurrentScreen('gameplay');
  };

  // Start latest unlocked mission
  const handleStartLatest = () => {
    const highestUnlocked = Math.max(...progress.unlockedMissions, 1);
    handleLaunchMission(highestUnlocked);
  };

  // Objective progress callback from 3D canvas
  const handleObjectiveProgress = (objectiveId: string, current: number, completed: boolean) => {
    setObjectiveStates((prev) => ({
      ...prev,
      [objectiveId]: current,
    }));
  };

  // Mission completion handler
  const handleMissionComplete = () => {
    const starsEarned = activeMission.rewardStars;
    const coinsEarned = activeMission.rewardCoins;
    const xpEarned = activeMission.rewardXp;

    const currentCompleted = { ...progress.completedMissions };
    currentCompleted[activeMission.id] = { stars: starsEarned };

    // Unlock next mission if exists
    const nextMissionId = activeMission.id + 1;
    const updatedUnlocked = [...progress.unlockedMissions];
    if (nextMissionId <= 20 && !updatedUnlocked.includes(nextMissionId)) {
      updatedUnlocked.push(nextMissionId);
    }

    // Calculate total stars
    const totalStars = Object.values(currentCompleted).reduce((sum, item) => sum + item.stars, 0);

    updateProgress({
      stars: totalStars,
      coins: progress.coins + coinsEarned,
      xp: progress.xp + xpEarned,
      level: Math.floor((progress.xp + xpEarned) / 500) + 1,
      completedMissions: currentCompleted,
      unlockedMissions: updatedUnlocked,
    });

    setIsVictoryOpen(true);
  };

  // Proceed to next mission after victory
  const handleNextMission = () => {
    setIsVictoryOpen(false);
    if (activeMission.id < 20) {
      handleLaunchMission(activeMission.id + 1);
    } else {
      setCurrentScreen('missions');
    }
  };

  // Quiz completion callback
  const handleQuizSuccess = () => {
    setIsQuizOpen(false);
    // Find quiz objective in current level
    const quizObj = activeMission.objectives.find((o) => o.type === 'complete_quiz');
    if (quizObj) {
      handleObjectiveProgress(quizObj.id, quizObj.required, true);
      // Check if all done
      setTimeout(() => {
        handleMissionComplete();
      }, 500);
    }
  };

  // Namaste trigger from joystick
  const handleNamasteTrigger = () => {
    setNamasteTriggerCounter((c) => c + 1);
    const greetingMsg =
      settings.language === 'hi'
        ? 'नमस्ते! स्वच्छ और समृद्ध भारत का संकल्प।'
        : 'Namaste! Building a clean, green, and vibrant Bharat.';
    setDialogueToast(greetingMsg);
    setTimeout(() => setDialogueToast(null), 2500);
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-slate-950 font-sans select-none touch-none">
      {/* 1. Title Screen */}
      {currentScreen === 'title' && (
        <TitleScreen
          progress={progress}
          settings={settings}
          onNavigate={(screen) => setCurrentScreen(screen)}
          onToggleLanguage={() =>
            updateSettings({ language: settings.language === 'en' ? 'hi' : 'en' })
          }
          onOpenApkGuide={() => setIsApkGuideOpen(true)}
          onStartLatestMission={handleStartLatest}
        />
      )}

      {/* 2. Interactive India Map Screen */}
      {currentScreen === 'map' && (
        <MapScreen
          progress={progress}
          settings={settings}
          onSelectMission={handleLaunchMission}
          onBack={() => setCurrentScreen('title')}
        />
      )}

      {/* 3. Missions Browser Screen */}
      {currentScreen === 'missions' && (
        <MissionsScreen
          progress={progress}
          settings={settings}
          onSelectMission={handleLaunchMission}
          onBack={() => setCurrentScreen('title')}
        />
      )}

      {/* 4. Achievements Screen */}
      {currentScreen === 'achievements' && (
        <AchievementsScreen
          progress={progress}
          settings={settings}
          onBack={() => setCurrentScreen('title')}
        />
      )}

      {/* 5. Settings Screen */}
      {currentScreen === 'settings' && (
        <SettingsScreen
          settings={settings}
          progress={progress}
          onUpdateSettings={updateSettings}
          onResetProgress={() => {
            StorageService.resetAll();
            setProgress({ ...DEFAULT_PROGRESS });
          }}
          onOpenApkGuide={() => setIsApkGuideOpen(true)}
          onBack={() => setCurrentScreen('title')}
        />
      )}

      {/* 6. Wardrobe Screen */}
      {currentScreen === 'wardrobe' && (
        <WardrobeScreen
          progress={progress}
          settings={settings}
          onSelectOutfit={(id) => updateProgress({ currentOutfitId: id })}
          onBuyOutfit={(id, price) => {
            updateProgress({
              coins: progress.coins - price,
              unlockedOutfits: [...progress.unlockedOutfits, id],
              currentOutfitId: id,
            });
          }}
          onBack={() => setCurrentScreen('title')}
        />
      )}

      {/* 7. Active 3D Gameplay Screen */}
      {currentScreen === 'gameplay' && (
        <div className="relative w-full h-full overflow-hidden bg-slate-950">
          {/* Three.js 3D Viewport */}
          <GameCanvas
            mission={activeMission}
            settings={settings}
            progress={progress}
            onObjectiveProgress={handleObjectiveProgress}
            onOpenQuiz={() => setIsQuizOpen(true)}
            onMissionComplete={handleMissionComplete}
            joystickVector={joystickVector}
            isSprinting={isSprinting}
            actionTriggered={actionTriggerCounter}
            jumpTriggered={jumpTriggerCounter}
            namasteTriggered={namasteTriggerCounter}
            onActionStatusChange={(available, label) =>
              setActionButtonInfo({ available, label })
            }
          />

          {/* In-Game HUD (Objectives, Stats, Dialogue) */}
          <GameHud
            mission={activeMission}
            language={settings.language}
            progress={progress}
            objectiveStates={objectiveStates}
            onPause={() => setIsPaused(true)}
            dialogueMessage={dialogueToast}
          />

          {/* Touch Virtual Joystick & Action Buttons Cluster */}
          <VirtualJoystick
            language={settings.language}
            onMove={(vec) => setJoystickVector(vec)}
            onAction={() => setActionTriggerCounter((c) => c + 1)}
            onJump={() => setJumpTriggerCounter((c) => c + 1)}
            onSprint={(sprint) => setIsSprinting(sprint)}
            onNamaste={handleNamasteTrigger}
            actionLabel={actionButtonInfo.label}
            isActionAvailable={actionButtonInfo.available}
          />

          {/* Pause Modal */}
          {isPaused && (
            <PauseModal
              language={settings.language}
              settings={settings}
              onResume={() => setIsPaused(false)}
              onRestart={() => handleLaunchMission(activeMission.id)}
              onExitMap={() => {
                setIsPaused(false);
                setCurrentScreen('map');
              }}
              onExitTitle={() => {
                setIsPaused(false);
                setCurrentScreen('title');
              }}
              onUpdateSettings={updateSettings}
            />
          )}

          {/* Educational Quiz Modal */}
          {isQuizOpen && activeMission.quizQuestions && (
            <QuizModal
              questions={activeMission.quizQuestions}
              language={settings.language}
              onComplete={handleQuizSuccess}
              onClose={() => setIsQuizOpen(false)}
            />
          )}

          {/* Mission Complete Victory Celebration Modal */}
          {isVictoryOpen && (
            <VictoryModal
              mission={activeMission}
              language={settings.language}
              onNextMission={handleNextMission}
              onMainMenu={() => {
                setIsVictoryOpen(false);
                setCurrentScreen('title');
              }}
            />
          )}
        </div>
      )}

      {/* APK Guide Modal */}
      {isApkGuideOpen && (
        <ApkGuideModal
          language={settings.language}
          onClose={() => setIsApkGuideOpen(false)}
        />
      )}
    </div>
  );
}
