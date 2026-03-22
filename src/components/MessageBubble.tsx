import ReactMarkdown from 'react-markdown';
import { Message } from '@/lib/types';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  
  if (isUser) {
    return (
      <div className="flex flex-col items-end w-full px-4 mb-4 animate-[messageEntry_150ms_ease-out]">
        <div className="max-w-[75%] bg-[var(--color-user-bubble)] border border-[var(--color-border)] rounded-2xl rounded-br-sm px-4 py-3 text-[14px] text-[var(--color-text-primary)] font-geist-mono shadow-sm">
          {message.content}
        </div>
        <div className="text-[11px] text-[var(--color-text-muted)] mt-1.5 font-geist text-right mr-1">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    );
  }

  // Bot message structure
  const isClassified = message.isClassified;
  const borderColor = isClassified ? 'border-[var(--color-success)]' : 'border-[var(--color-accent)]';
  const labelColor = isClassified ? 'text-[var(--color-success)]' : 'text-[var(--color-accent)]';
  const labelText = isClassified ? 'CLASSIFIED ▸' : 'ANTRIKSHA';

  return (
    <div className={`flex flex-col items-start w-full px-4 py-2 mb-6 sm:mb-8 animate-[messageEntry_150ms_ease-out] ${isClassified ? 'relative overflow-hidden' : ''}`}>
      {/* Scanline overlay for classified messages */}
      {isClassified && (
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'repeating-linear-gradient(transparent 0, transparent 3px, rgba(255,255,255,0.015) 3px, rgba(255,255,255,0.015) 4px)'
        }} />
      )}

      <div className={`text-[9px] uppercase tracking-[0.2em] font-geist mb-1.5 ${labelColor}`}>
        {labelText}
      </div>
      <div className={`w-full pl-4 py-0 border-l-2 ${borderColor} bg-[var(--color-bot-bubble)] font-geist-mono text-[14px] text-[var(--color-text-primary)] leading-relaxed prose prose-invert prose-p:my-2 prose-pre:my-2 prose-pre:bg-[var(--color-surface-2)] prose-pre:border prose-pre:border-[var(--color-border)]`}>
        <ReactMarkdown>{message.content}</ReactMarkdown>
      </div>
    </div>
  );
}
