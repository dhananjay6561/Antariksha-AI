interface ErrorBannerProps {
  message: string
  onRetry: () => void
}

export default function ErrorBanner({ message, onRetry }: ErrorBannerProps) {
  return (
    <div
      className="flex items-center justify-between gap-3 mx-4 my-2 px-4 py-3 rounded-lg border-l-2 z-10 relative"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderLeftColor: 'var(--color-error)',
      }}
    >
      <p
        className="text-sm flex-1"
        style={{
          fontFamily: 'var(--font-plex-sans)',
          color: 'var(--color-error)',
        }}
      >
        {message}
      </p>
      <button
        onClick={onRetry}
        className="px-3 py-1.5 rounded text-xs font-medium border cursor-pointer"
        style={{
          fontFamily: 'var(--font-plex-sans)',
          color: 'var(--color-text-primary)',
          borderColor: 'var(--color-border)',
          backgroundColor: 'var(--color-surface-2)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-accent)'
          e.currentTarget.style.color = 'var(--color-accent)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-border)'
          e.currentTarget.style.color = 'var(--color-text-primary)'
        }}
      >
        Retry
      </button>
    </div>
  )
}
