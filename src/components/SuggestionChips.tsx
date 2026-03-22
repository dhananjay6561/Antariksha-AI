import { Suggestion } from '@/lib/types'

interface SuggestionChipsProps {
  suggestions: Suggestion[]
  onSelect: (prompt: string) => void
}

export default function SuggestionChips({
  suggestions,
  onSelect,
}: SuggestionChipsProps) {
  return (
    <div className="flex flex-col items-center gap-10 px-4 py-8 z-10 relative w-full">
      {/* Hero section */}
      <div className="text-center flex flex-col items-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-accent-amber-glow)] border border-[var(--color-accent-amber)] shadow-[0_0_30px_var(--color-accent-amber-glow)] mb-6">
          <span className="text-2xl font-bold text-[var(--color-accent-amber)] font-[family-name:var(--font-orbitron)]">
            A
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-wider mb-3 text-[var(--color-text-primary)] font-[family-name:var(--font-orbitron)]">
          AntarikshaAI
        </h2>
        <p className="text-sm sm:text-base text-[var(--color-text-muted)] font-medium max-w-md">
          Deep space mission control at your fingertips. Ask anything about ISRO and India&apos;s space journey.
        </p>
      </div>

      {/* Suggestion chips in a 2x3 responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mt-4">
        {suggestions.map((suggestion, index) => (
          <button
            key={suggestion.label}
            onClick={() => onSelect(suggestion.prompt)}
            className="group relative text-left px-5 py-4 rounded-2xl glass-panel text-[var(--color-text-primary)] hover:border-[var(--color-accent-amber)] hover:bg-[var(--color-surface-glass-hover)] transition-all-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_var(--color-accent-amber-glow)] overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative text-[10px] uppercase tracking-widest font-semibold block mb-2 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-amber)] transition-colors">
              {suggestion.category}
            </span>
            <span className="relative text-sm font-medium leading-relaxed">
              {suggestion.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
