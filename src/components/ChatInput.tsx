'use client'

import { useState, useRef, useEffect, KeyboardEvent, FormEvent } from 'react'

interface ChatInputProps {
  onSend: (text: string) => void
  isLoading: boolean
}

export default function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea as content grows, up to 5 lines max
  useEffect(
    function autoResizeTextarea() {
      const textarea = textareaRef.current
      if (!textarea) return

      textarea.style.height = 'auto'
      const lineHeight = 24
      const maxHeight = lineHeight * 5
      textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`
    },
    [input]
  )

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || isLoading) return
    onSend(trimmed)
    setInput('')
  }

  // Enter sends the message; Shift+Enter inserts a newline
  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const hasContent = input.trim().length > 0

  return (
    <div className="absolute bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-end pointer-events-none pb-6 px-4">
      {/* Background Gradient for bottom fade to blackish */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--color-bg)] to-transparent pointer-events-none -z-10" />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl glass-panel rounded-[2rem] p-2 flex items-end gap-3 pointer-events-auto shadow-2xl transition-all-200 focus-within:border-[var(--color-accent-amber)] focus-within:shadow-[0_8px_40px_var(--color-accent-amber-glow)]"
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about ISRO missions..."
          disabled={isLoading}
          rows={1}
          className="flex-1 resize-none bg-transparent rounded-3xl py-3 pl-6 pr-2 text-[0.95rem] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none scrollbar-hide"
          style={{
            lineHeight: '24px',
            fontFamily: 'var(--font-plex-mono)',
          }}
        />

        <button
          type="submit"
          disabled={!hasContent || isLoading}
          className="group flex-shrink-0 flex items-center justify-center w-[46px] h-[46px] rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[var(--color-text-muted)] transition-all-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--color-accent-amber-glow)] hover:border-[var(--color-accent-amber)] hover:text-[var(--color-accent-amber)] mb-1 mr-1"
        >
          {/* Send arrow icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>

      <p className="text-center mt-3 text-[10px] text-[var(--color-text-muted)] font-medium font-[family-name:var(--font-plex-sans)] tracking-wide pointer-events-auto opacity-70">
        AntarikshaAI may produce inaccurate information. Please verify critical data.
      </p>
    </div>
  )
}
