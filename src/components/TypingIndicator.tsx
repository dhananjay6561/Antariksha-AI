export default function TypingIndicator() {
  return (
    <div className="w-full flex flex-col items-start px-4 py-2 mt-2">
      <div className="text-[9px] uppercase tracking-[0.2em] text-[var(--color-accent)] mb-1.5 font-geist">
        ANTRIKSHA
      </div>
      <div className="pl-4 py-0 border-l-2 border-[var(--color-accent)] flex items-center gap-1.5 h-6">
        <div className="w-1 h-1 rounded-full bg-[var(--color-accent)] animate-[telemetryPulse_0.9s_infinite] [animation-delay:0ms]" />
        <div className="w-1 h-1 rounded-full bg-[var(--color-accent)] animate-[telemetryPulse_0.9s_infinite] [animation-delay:180ms]" />
        <div className="w-1 h-1 rounded-full bg-[var(--color-accent)] animate-[telemetryPulse_0.9s_infinite] [animation-delay:360ms]" />
      </div>
    </div>
  );
}
