export default function TypingIndicator() {
  return (
    <div className="flex w-full justify-start py-2 z-10 relative fade-in">
      <div className="rounded-3xl rounded-bl-sm bg-[rgba(0,0,0,0.4)] border border-[var(--color-border-subtle)] backdrop-blur-xl px-6 py-5 flex items-center justify-center gap-2 shadow-sm min-w-[80px] h-[64px]">
        {/* Three pulsing telemetry dots with staggered animation */}
        <div className="typing-dot" />
        <div className="typing-dot" />
        <div className="typing-dot" />
      </div>
    </div>
  )
}
