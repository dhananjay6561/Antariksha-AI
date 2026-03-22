'use client';

import { useState } from 'react';
import Header from './Header';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import SuggestionChips from './SuggestionChips';
import NewMissionModal from './NewMissionModal';
import { useGeminiStream } from '@/hooks/useGeminiStream';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import { useEasterEggs } from '@/hooks/useEasterEggs';

export default function ChatInterface() {
  const { messages, isLoading, error, sendMessage, retryLast, clearConversation } = useGeminiStream();
  const { scrollRef } = useAutoScroll(messages.length, isLoading);
  const { isRocketLaunching } = useEasterEggs();

  const [missionNumber, setMissionNumber] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const handleSendMessage = (content: string) => {
    sendMessage(content);
  };

  const handleNewMissionClick = () => {
    setShowModal(true);
  };

  const handleLaunchNewMission = () => {
    clearConversation();
    setMissionNumber((prev) => prev + 1);
    setShowModal(false);
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-[var(--color-bg)] text-[var(--color-text-primary)] overflow-hidden relative">
      <Header 
        missionNumber={missionNumber} 
        isLoading={isLoading} 
        onNewMission={handleNewMissionClick} 
      />

      <div className="flex-1 relative flex flex-col overflow-hidden w-full">
        {messages.length === 0 ? (
          <div className="flex-1 overflow-y-auto pt-4 pb-36">
            <SuggestionChips 
              isVisible={messages.length === 0} 
              onSelect={handleSendMessage} 
            />
          </div>
        ) : (
          <MessageList 
            messages={messages} 
            isLoading={isLoading} 
            error={error} 
            scrollRef={scrollRef} 
            onRetry={retryLast} 
          />
        )}
      </div>

      <ChatInput 
        onSendMessage={handleSendMessage} 
        isLoading={isLoading} 
      />

      {showModal && (
        <NewMissionModal 
          onLaunch={handleLaunchNewMission} 
          onCancel={() => setShowModal(false)} 
        />
      )}

      {isRocketLaunching && (
        <>
          <div className="fixed bottom-8 left-1/2 -ml-6 text-[2.5rem] animate-[rocketLaunch_2.5s_ease-in_forwards] z-50 pointer-events-none select-none">
            <span role="img" aria-label="rocket">🚀</span>
          </div>
          <div className="fixed bottom-6 right-6 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl p-3 font-geist-mono text-[12px] text-[var(--color-accent)] animate-[toastSlideIn_0.3s_ease-out_2.7s_forwards,toastFadeOut_0.3s_ease-out_5.7s_forwards] opacity-0 shadow-lg z-50 pointer-events-none">
            T+00:00 — Launch successful.
          </div>
        </>
      )}
    </div>
  );
}
