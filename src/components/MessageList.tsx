import { Message } from '@/lib/types';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import ErrorBanner from './ErrorBanner';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  onRetry: () => void;
}

export default function MessageList({ messages, isLoading, error, scrollRef, onRetry }: MessageListProps) {
  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto w-full scroll-smooth pt-4"
    >
      <div className="max-w-2xl mx-auto w-full pb-36">
        {messages.map((message) => {
          // If this is the latest bot message and content is empty but it's loading, show typing indicator
          if (message.role === 'model' && message.content === '' && isLoading && message === messages[messages.length - 1]) {
            return <TypingIndicator key={message.id} />;
          }
          
          return <MessageBubble key={message.id} message={message} />;
        })}

        {error && (
          <ErrorBanner message={error} onRetry={onRetry} />
        )}
      </div>
    </div>
  );
}
