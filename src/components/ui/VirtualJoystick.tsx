import React, { useRef, useState, useEffect, useCallback } from 'react';
import { translations } from '../../data/translations';
import { Language } from '../../types/game';
import { audioService } from '../../services/audioService';

interface VirtualJoystickProps {
  language: Language;
  onMove: (vector: { x: number; y: number }) => void;
  onAction: () => void;
  onJump: () => void;
  onSprint: (active: boolean) => void;
  onNamaste: () => void;
  actionLabel?: string;
  isActionAvailable?: boolean;
}

export const VirtualJoystick: React.FC<VirtualJoystickProps> = ({
  language,
  onMove,
  onAction,
  onJump,
  onSprint,
  onNamaste,
  actionLabel,
  isActionAvailable = false,
}) => {
  const t = translations[language];
  const joystickBaseRef = useRef<HTMLDivElement>(null);
  const [knobPos, setKnobPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isSprinting, setIsSprinting] = useState(false);
  const touchIdRef = useRef<number | null>(null);

  // Keyboard controls listener (for easy desktop development / testing)
  useEffect(() => {
    const keysPressed: Record<string, boolean> = {};

    const updateFromKeys = () => {
      let x = 0;
      let y = 0;
      if (keysPressed['KeyW'] || keysPressed['ArrowUp']) y -= 1;
      if (keysPressed['KeyS'] || keysPressed['ArrowDown']) y += 1;
      if (keysPressed['KeyA'] || keysPressed['ArrowLeft']) x -= 1;
      if (keysPressed['KeyD'] || keysPressed['ArrowRight']) x += 1;

      // Normalize diagonal
      const mag = Math.sqrt(x * x + y * y);
      if (mag > 0) {
        x /= mag;
        y /= mag;
      }
      onMove({ x, y });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['KeyW', 'KeyS', 'KeyA', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        keysPressed[e.code] = true;
        updateFromKeys();
      }
      if (e.code === 'Space') {
        e.preventDefault();
        onJump();
      }
      if (e.code === 'KeyE' || e.code === 'Enter') {
        e.preventDefault();
        onAction();
      }
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        setIsSprinting(true);
        onSprint(true);
      }
      if (e.code === 'KeyN') {
        onNamaste();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (['KeyW', 'KeyS', 'KeyA', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        keysPressed[e.code] = false;
        updateFromKeys();
      }
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        setIsSprinting(false);
        onSprint(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onMove, onJump, onAction, onSprint, onNamaste]);

  // Touch joystick calculation
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (touchIdRef.current !== null) return;
    const touch = e.changedTouches[0];
    touchIdRef.current = touch.identifier;
    setIsDragging(true);
    handleTouchMove(e);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!joystickBaseRef.current || touchIdRef.current === null) return;

    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      if (touch.identifier === touchIdRef.current) {
        const rect = joystickBaseRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const maxRadius = rect.width / 2;
        let dx = touch.clientX - centerX;
        let dy = touch.clientY - centerY;

        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > maxRadius) {
          dx = (dx / dist) * maxRadius;
          dy = (dy / dist) * maxRadius;
        }

        setKnobPos({ x: dx, y: dy });

        // Normalize output -1 to 1
        const normX = dx / maxRadius;
        const normY = dy / maxRadius;
        onMove({ x: normX, y: normY });
        break;
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === touchIdRef.current) {
        touchIdRef.current = null;
        setIsDragging(false);
        setKnobPos({ x: 0, y: 0 });
        onMove({ x: 0, y: 0 });
        break;
      }
    }
  };

  // Toggle sprint
  const toggleSprint = () => {
    audioService.playButtonClick();
    const next = !isSprinting;
    setIsSprinting(next);
    onSprint(next);
  };

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-20 flex flex-col justify-end p-4 pb-6 sm:p-8">
      <div className="flex items-end justify-between w-full">
        {/* Left Side: Virtual Analog Joystick */}
        <div className="pointer-events-auto relative">
          <div
            ref={joystickBaseRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-slate-900/60 backdrop-blur-md border-2 border-amber-500/40 shadow-xl flex items-center justify-center relative touch-none active:border-amber-400"
          >
            {/* Guide crosshairs */}
            <div className="absolute w-full h-[1px] bg-slate-700/40 pointer-events-none" />
            <div className="absolute h-full w-[1px] bg-slate-700/40 pointer-events-none" />
            <div className="w-16 h-16 rounded-full border border-amber-500/20 pointer-events-none" />

            {/* Draggable Knob */}
            <div
              style={{
                transform: `translate(${knobPos.x}px, ${knobPos.y}px)`,
                transition: isDragging ? 'none' : 'transform 0.15s ease-out',
              }}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-amber-600 to-orange-400 border-2 border-white/60 shadow-lg flex items-center justify-center text-white pointer-events-none font-bold text-xs"
            >
              <div className="w-4 h-4 rounded-full bg-white/40" />
            </div>
          </div>
          <span className="block text-center text-[10px] sm:text-xs font-semibold text-amber-300/80 mt-1 uppercase tracking-wider">
            Move
          </span>
        </div>

        {/* Right Side: Action Buttons Cluster */}
        <div className="pointer-events-auto flex flex-col items-end gap-3">
          {/* Secondary Action Row: Sprint & Namaste */}
          <div className="flex items-center gap-3">
            {/* Namaste Button */}
            <button
              onClick={() => {
                audioService.playNamasteGreeting();
                onNamaste();
              }}
              title="Namaste Greeting"
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-slate-900/70 backdrop-blur-md border border-amber-500/50 hover:border-amber-400 active:scale-90 transition-transform shadow-lg flex flex-col items-center justify-center text-amber-300 font-bold"
            >
              <span className="text-xl">🙏</span>
              <span className="text-[9px] font-hindi leading-tight">{t.namasteButton}</span>
            </button>

            {/* Sprint Toggle Button */}
            <button
              onClick={toggleSprint}
              className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full backdrop-blur-md border shadow-lg flex flex-col items-center justify-center font-bold active:scale-90 transition-all ${
                isSprinting
                  ? 'bg-amber-500 border-white text-slate-950 shadow-amber-500/50'
                  : 'bg-slate-900/70 border-slate-700 text-slate-300 hover:border-amber-500/40'
              }`}
            >
              <span className="text-sm">⚡</span>
              <span className="text-[9px] uppercase tracking-wider">{t.sprintButton}</span>
            </button>
          </div>

          {/* Primary Action Row: Jump and Main Context Action */}
          <div className="flex items-end gap-3 sm:gap-4">
            {/* Jump Button */}
            <button
              onClick={() => {
                audioService.playJump();
                onJump();
              }}
              className="w-15 h-15 sm:w-16 sm:h-16 rounded-full bg-slate-900/80 backdrop-blur-md border-2 border-emerald-500/60 active:scale-90 transition-transform shadow-xl flex flex-col items-center justify-center text-emerald-300 font-bold hover:border-emerald-400"
            >
              <span className="text-lg leading-none">⬆</span>
              <span className="text-[10px] tracking-wide mt-0.5">{t.jumpButton}</span>
            </button>

            {/* Main Primary ACTION Button (Large & Highlighted when near interactive) */}
            <button
              onClick={() => {
                audioService.playButtonClick();
                onAction();
              }}
              className={`w-20 h-20 sm:w-22 sm:h-22 rounded-full border-3 shadow-2xl flex flex-col items-center justify-center font-black active:scale-95 transition-all text-white ${
                isActionAvailable
                  ? 'bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 border-white ring-4 ring-amber-400/50 animate-pulse-glow shadow-orange-500/50 scale-105'
                  : 'bg-gradient-to-tr from-amber-700/80 to-orange-600/80 border-amber-300/60 shadow-amber-900/40'
              }`}
            >
              <span className="text-xl sm:text-2xl">✨</span>
              <span className="text-[11px] sm:text-xs tracking-wider leading-tight text-center px-1 font-bold">
                {actionLabel || t.actionButton}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
