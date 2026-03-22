import { useState, useEffect, useRef } from 'react';
import { Rocket } from 'lucide-react';
import { useEasterEggs } from '@/hooks/useEasterEggs';

interface HeaderProps {
  missionNumber: number;
  isLoading: boolean;
  onNewMission: () => void;
}

const BRAND_TEXT = "AntarikshaAI";
const TARGET_TEXT_1 = "ANTRIKSH-01";
const TARGET_TEXT_2 = "AntarikshaAI";
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export default function Header({ missionNumber, isLoading, onNewMission }: HeaderProps) {
  const { handleLogoClick, isScrambling, scrambleComplete } = useEasterEggs();
  const [logoText, setLogoText] = useState(BRAND_TEXT);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isScrambling) {
      const startTime = Date.now();
      
      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        
        if (elapsed < 1500) {
          // Phase 1: fully random
          const randomStr = Array.from({ length: BRAND_TEXT.length })
            .map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
            .join('');
          setLogoText(randomStr);
        } else if (elapsed < 2000) {
          // Phase 2: resolve to TARGET_TEXT_1
          const progress = (elapsed - 1500) / 500;
          const resolveCount = Math.floor(progress * TARGET_TEXT_1.length);
          const resolvedPart = TARGET_TEXT_1.slice(0, resolveCount);
          const randomPart = Array.from({ length: TARGET_TEXT_1.length - resolveCount })
            .map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
            .join('');
          setLogoText(resolvedPart + randomPart);
        } else if (elapsed < 2800) {
          // Phase 3: resolve to TARGET_TEXT_2
          const progress = (elapsed - 2000) / 800;
          const resolveCount = Math.floor(progress * TARGET_TEXT_2.length);
          const resolvedPart = TARGET_TEXT_2.slice(0, resolveCount);
          const randomPart = Array.from({ length: TARGET_TEXT_2.length - resolveCount })
            .map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
            .join('');
          setLogoText(resolvedPart + randomPart);
        } else {
          setLogoText(TARGET_TEXT_2);
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      }, 30);
    } else {
      // eslint-disable-next-line
      setLogoText(BRAND_TEXT);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isScrambling]);

  const formattedMission = String(missionNumber).padStart(3, '0');

  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-[var(--color-border)] bg-transparent">
      {/* Left side */}
      <div className="flex items-center gap-2">
        <span 
          onClick={handleLogoClick}
          className="font-space-grotesk font-bold text-[var(--color-text-primary)] cursor-pointer select-none text-lg"
        >
          {logoText}
        </span>
        <div className="w-1 h-1 rounded-full bg-[var(--color-accent)] mt-1" />
        
        {scrambleComplete && (
          <span className="ml-2 text-[10px] text-[var(--color-text-muted)] tracking-widest uppercase animate-[toastSlideIn_0.3s_ease-out_forwards]">
            [SYSTEM: NOMINAL]
          </span>
        )}
      </div>

      {/* Center - Empty */}
      <div className="flex-1" />

      {/* Right side */}
      <div className="flex items-center gap-4">
        <button
          onClick={onNewMission}
          disabled={isLoading}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-geist text-[var(--color-text-secondary)] transition-all duration-200 border border-transparent hover:border-[var(--color-border)] hover:bg-[var(--color-accent-dim)] group ${isLoading ? 'opacity-40 pointer-events-none' : ''}`}
        >
          < Rocket size={14} className="transition-transform duration-200 -rotate-45 group-hover:rotate-0" />
          <span>New Mission</span>
        </button>

        <div className="font-geist-mono text-[11px] text-[var(--color-text-muted)] tracking-wide uppercase flex items-center h-full pt-1">
          MISSION #{formattedMission}
        </div>
      </div>
    </header>
  );
}
