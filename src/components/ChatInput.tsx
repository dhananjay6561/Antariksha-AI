import { useState, useRef, KeyboardEvent } from 'react';
import { ArrowUp } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height temporarily to properly calculate scrollHeight
      const newHeight = Math.min(textareaRef.current.scrollHeight, 120); // rough 5 lines max
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = '52px'; // Reset back to min-height
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-0 w-full py-4 bg-[var(--color-bg)] border-t border-[var(--color-border)] z-10 transition-colors">
      <div className="max-w-2xl mx-auto px-4 relative flex items-center">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder="Ask about any ISRO mission..."
          className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl min-h-[52px] max-h-[140px] px-4 py-[14px] pr-14 text-[var(--color-text-primary)] font-geist text-[14px] leading-[1.5] resize-none overflow-y-auto focus:outline-none focus:border-[var(--color-border-strong)] focus:shadow-[0_0_0_3px_var(--color-accent-dim)] placeholder:text-[var(--color-text-muted)] disabled:opacity-50"
          rows={1}
        />
        
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className={`absolute right-6 flex items-center justify-center w-[32px] h-[32px] rounded-lg bg-[var(--color-surface-2)] text-[var(--color-text-secondary)] transition-all duration-200 
            ${!input.trim() ? 'opacity-0 pointer-events-none' : 'opacity-100'} 
            ${isLoading ? 'opacity-30' : 'hover:bg-[var(--color-accent)] hover:text-[#07090f]'}`}
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </div>
  );
}
