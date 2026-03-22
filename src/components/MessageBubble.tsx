import ReactMarkdown from 'react-markdown'
import { Message } from '@/lib/types'

interface MessageBubbleProps {
  message: Message
}

function formatTimestamp(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div
      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} py-2 z-10 relative fade-in`}
    >
      <div
        className={`max-w-[90%] sm:max-w-[85%] rounded-3xl px-6 py-5 shadow-sm transition-all-200 ${
          isUser
            ? 'rounded-br-sm bg-[rgba(255,255,255,0.06)] border border-white/5 backdrop-blur-md'
            : 'rounded-bl-sm bg-[rgba(0,0,0,0.4)] border border-[var(--color-border-subtle)] backdrop-blur-xl'
        }`}
      >
        {/* Message content */}
        <div className="text-[0.95rem] leading-relaxed text-[var(--color-text-primary)]">
          {isUser ? (
            <p className="whitespace-pre-wrap font-medium">{message.content}</p>
          ) : (
            <div className="markdown-body">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* Timestamp */}
        <div className="mt-3 text-right">
          <span className="text-[0.65rem] font-medium tracking-wide text-[var(--color-text-muted)] opacity-70">
            {formatTimestamp(message.timestamp)}
          </span>
        </div>
      </div>
    </div>
  )
}
