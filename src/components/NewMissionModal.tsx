import { useEffect, useRef } from 'react';

interface NewMissionModalProps {
  onLaunch: () => void;
  onCancel: () => void;
}

export default function NewMissionModal({ onLaunch, onCancel }: NewMissionModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const launchBtnRef = useRef<HTMLButtonElement>(null);
  const cancelBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      } else if (e.key === 'Tab') {
        if (document.activeElement === cancelBtnRef.current) {
          e.preventDefault();
          launchBtnRef.current?.focus();
        } else if (document.activeElement === launchBtnRef.current) {
          e.preventDefault();
          cancelBtnRef.current?.focus();
        } else {
          e.preventDefault();
          cancelBtnRef.current?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    cancelBtnRef.current?.focus();

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-[var(--color-modal-overlay)] backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-[modalEntry_180ms_ease-out]"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef} 
        className="w-full max-w-sm bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl p-6 shadow-2xl"
      >
        <h2 className="font-space-grotesk font-semibold text-xl text-[var(--color-text-primary)]">
          Start a new mission?
        </h2>
        <p className="font-geist text-[14px] text-[var(--color-text-secondary)] mt-1.5 leading-relaxed">
          Your current conversation will drift into the void.
        </p>
        
        <div className="flex gap-3 mt-6">
          <button
            ref={cancelBtnRef}
            onClick={onCancel}
            className="flex-1 h-11 border border-[var(--color-border)] rounded-xl text-[var(--color-text-secondary)] font-geist hover:bg-[var(--color-accent-dim)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-border)]"
          >
            Abort
          </button>
          <button
            ref={launchBtnRef}
            onClick={onLaunch}
            className="flex-1 h-11 bg-[var(--color-accent)] rounded-xl text-[#07090f] font-semibold font-geist hover:scale-[1.02] transition-transform focus:outline-none focus:ring-2 focus:ring-[#07090f] focus:ring-offset-2 focus:ring-offset-[var(--color-accent)]"
          >
            Launch
          </button>
        </div>
      </div>
    </div>
  );
}
