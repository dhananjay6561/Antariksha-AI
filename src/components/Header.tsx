export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 pointer-events-none">
      <div className="mx-auto max-w-3xl pointer-events-auto">
        <div className="glass-panel rounded-full flex items-center gap-4 px-5 py-3 transition-all-200 hover:border-white/20">
          {/* ISRO-inspired icon */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-accent-amber-glow)] border border-[var(--color-accent-amber)] shadow-[0_0_15px_var(--color-accent-amber-glow)] shrink-0">
            <span className="text-sm font-bold text-[var(--color-accent-amber)] font-[family-name:var(--font-orbitron)]">
              A
            </span>
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-lg font-bold tracking-wider text-[var(--color-text-primary)] font-[family-name:var(--font-orbitron)] leading-tight">
              AntarikshaAI
            </h1>
            <p className="text-xs text-[var(--color-text-muted)] font-medium leading-tight mt-0.5">
              India&apos;s space story. On demand.
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
