import { suggestionChips } from '@/lib/suggestions';

interface SuggestionChipsProps {
  isVisible: boolean;
  onSelect: (prompt: string) => void;
}

export default function SuggestionChips({ isVisible, onSelect }: SuggestionChipsProps) {
  if (!isVisible) return null;

  return (
    <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto w-full px-4 mt-8 transition-all duration-300">
      {suggestionChips.map((chip) => (
        <button
          key={chip.id}
          onClick={() => onSelect(chip.prompt)}
          className="flex flex-col items-start p-3 bg-transparent border border-[var(--color-border)] rounded-lg hover:border-[var(--color-border-strong)] hover:bg-[var(--color-accent-dim)] transition-colors text-left font-geist group"
        >
          <span className="text-[9px] uppercase tracking-widest text-[var(--color-text-muted)] mb-1">
            {chip.category}
          </span>
          <span className="text-[13px] text-[var(--color-text-secondary)] leading-snug">
            {chip.label}
          </span>
        </button>
      ))}
    </div>
  );
}
