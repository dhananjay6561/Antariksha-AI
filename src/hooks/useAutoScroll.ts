import { useEffect, useState, useRef } from 'react';

export function useAutoScroll(messagesLength: number, isLoading: boolean) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (!container) return;
      // Check if user is scrolled within 100px of bottom
      const scrolledToBottom = Math.abs(container.scrollHeight - container.scrollTop - container.clientHeight) < 100;
      setIsAtBottom(scrolledToBottom);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messagesLength, isLoading]);

  return {
    scrollRef,
    isAtBottom,
    scrollToBottom,
  };
}
