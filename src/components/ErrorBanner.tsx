interface ErrorBannerProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorBanner({ message, onRetry }: ErrorBannerProps) {
  return (
    <div className="flex items-center justify-between mx-4 mt-4 border-l-2 border-[var(--color-error)] bg-[rgba(224,90,90,0.06)] rounded-r-lg p-3 pl-4">
      <span className="text-[13px] text-[var(--color-text-secondary)] font-geist">
        {message}
      </span>
      <button
        onClick={onRetry}
        className="ml-auto text-sm font-geist text-[var(--color-text-muted)] hover:text-[var(--color-error)] transition-colors"
      >
        Retry
      </button>
    </div>
  );
}
