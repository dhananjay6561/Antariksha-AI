'use client'

import { useGeminiStream } from '@/hooks/useGeminiStream'
import { suggestions } from '@/lib/suggestions'
import Header from './Header'
import SuggestionChips from './SuggestionChips'
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import ErrorBanner from './ErrorBanner'

export default function ChatInterface() {
  const { messages, isLoading, error, sendMessage, retryLast } =
    useGeminiStream()

  const hasMessages = messages.length > 0

  return (
    <div className="flex flex-col h-screen w-full relative z-10 overflow-hidden">
      <Header />

      {/* Add top padding to account for the floating header (header height + py-4 = ~80px) */}
      <div className="flex-1 flex flex-col min-h-0 max-w-4xl w-full mx-auto pt-24 pb-32 px-4 sm:px-6 relative">
        {/* Empty state: show suggestion chips when no messages exist */}
        {!hasMessages ? (
          <div className="flex-1 flex flex-col items-center justify-center fade-in">
            <SuggestionChips
              suggestions={suggestions}
              onSelect={sendMessage}
            />
          </div>
        ) : (
          <div className="flex-1 flex flex-col min-h-0 w-full fade-in">
            <MessageList messages={messages} isLoading={isLoading} />
          </div>
        )}

        {/* Error banner — shown hovering above the input when an error occurs */}
        {error && (
          <div className="absolute bottom-28 left-0 right-0 z-40 px-4 flex justify-center fade-in">
            <ErrorBanner message={error} onRetry={retryLast} />
          </div>
        )}
      </div>

      <ChatInput onSend={sendMessage} isLoading={isLoading} />
    </div>
  )
}
