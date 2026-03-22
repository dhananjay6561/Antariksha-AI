'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { Message } from '@/lib/types'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'

interface MessageListProps {
  messages: Message[]
  isLoading: boolean
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const [isUserScrolledUp, setIsUserScrolledUp] = useState(false)

  // Auto-scroll logic: scroll to bottom when new messages arrive,
  // unless the user has intentionally scrolled up to read history.
  useEffect(
    function autoScrollOnNewMessage() {
      if (!isUserScrolledUp && bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    },
    [messages, isLoading, isUserScrolledUp]
  )

  // Detect when user scrolls up from the bottom
  const handleScroll = useCallback(function handleScroll() {
    const container = scrollContainerRef.current
    if (!container) return

    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight

    // Consider user "scrolled up" if more than 100px from bottom
    setIsUserScrolledUp(distanceFromBottom > 100)
  }, [])

  function scrollToBottom() {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    setIsUserScrolledUp(false)
  }

  return (
    <div className="relative flex-1 min-h-0 w-full mb-10">
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto pt-6 pb-20 px-2 flex flex-col space-y-4"
      >
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {/* Show typing indicator when waiting for first chunk */}
        {isLoading &&
          (messages.length === 0 ||
            !messages[messages.length - 1]?.isStreaming) && (
            <div className="w-full flex justify-start my-4">
              <TypingIndicator />
            </div>
          )}

        {/* Sentinel element for auto-scroll */}
        <div ref={bottomRef} className="h-4" />
      </div>

      {/* "↓ Latest" FAB — visible when user has scrolled up */}
      {isUserScrolledUp && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border glass-panel text-[var(--color-accent-blue)] border-white/10 hover:border-[var(--color-accent-blue)] transition-all-200 hover:-translate-y-1 hover:shadow-lg fade-in"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
          Latest
        </button>
      )}
    </div>
  )
}
