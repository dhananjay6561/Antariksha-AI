import { useEffect, useState, useRef } from 'react';

const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export function useEasterEggs() {
  const [isRocketLaunching, setIsRocketLaunching] = useState(false);
  const keyTrackerRef = useRef<string[]>([]);

  const clickCountRef = useRef(0);
  const lastClickTimeRef = useRef(0);
  const [isScrambling, setIsScrambling] = useState(false);
  const [scrambleComplete, setScrambleComplete] = useState(false);

  // Konami key tracker
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      keyTrackerRef.current.push(event.key);
      keyTrackerRef.current = keyTrackerRef.current.slice(-10);

      const currentSequence = keyTrackerRef.current.join(',');
      const targetSequence = KONAMI_SEQUENCE.join(',');

      if (currentSequence === targetSequence) {
        setIsRocketLaunching(true);
        setTimeout(() => setIsRocketLaunching(false), 2500);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogoClick = () => {
    const now = Date.now();
    if (now - lastClickTimeRef.current > 3000) {
      clickCountRef.current = 1;
    } else {
      clickCountRef.current += 1;
    }
    lastClickTimeRef.current = now;

    if (clickCountRef.current === 5) {
      setIsScrambling(true);
      clickCountRef.current = 0;
      
      // Setup timing for scramble phases handled in the component
      setTimeout(() => {
        setIsScrambling(false);
        setScrambleComplete(true);
        
        setTimeout(() => setScrambleComplete(false), 4000);
      }, 2800);
    }
  };

  return {
    isRocketLaunching,
    handleLogoClick,
    isScrambling,
    scrambleComplete
  };
}
