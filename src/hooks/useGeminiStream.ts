import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Message } from '@/lib/types';

export function useGeminiStream() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    setError(null);
    setIsLoading(true);

    const userMessage: Message = {
      id: nanoid(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    const botMessageId = nanoid();
    const streamingBotMessage: Message = {
      id: botMessageId,
      role: 'model',
      content: '',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, streamingBotMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Connection failed.');
      }

      if (!response.body) throw new Error('No stream in response');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      // Stream reading loop
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;

        if (value) {
          const chunkText = decoder.decode(value, { stream: true });
          streamingBotMessage.content += chunkText;

          // Check for classified response easter egg
          if (streamingBotMessage.content.includes('[CLASSIFIED — FOUNDING BRIEF]')) {
            streamingBotMessage.isClassified = true;
          }

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botMessageId ? { ...streamingBotMessage } : msg
            )
          );
        }
      }
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || 'Comms link failed.');
      // Remove the empty bot message if it failed early
      if (streamingBotMessage.content === '') {
        setMessages((prev) => prev.filter((msg) => msg.id !== botMessageId));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const retryLast = async () => {
    const lastUserMessage = [...messages].reverse().find((msg) => msg.role === 'user');
    if (lastUserMessage) {
      // Remove all messages after the last user message
      const indexOfLastUser = messages.findIndex((msg) => msg.id === lastUserMessage.id);
      setMessages((prev) => prev.slice(0, indexOfLastUser));
      await sendMessage(lastUserMessage.content);
    }
  };

  const clearConversation = () => {
    setMessages([]);
    setIsLoading(false);
    setError(null);
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    retryLast,
    clearConversation,
  };
}
