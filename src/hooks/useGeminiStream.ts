'use client'

import { useState, useCallback } from 'react'
import { nanoid } from 'nanoid'
import { Message } from '@/lib/types'

export function useGeminiStream() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = useCallback(async function sendMessage(text: string) {
    const userMessage: Message = {
      id: nanoid(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    }

    const botMessageId = nanoid()
    const botMessage: Message = {
      id: botMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isStreaming: true,
    }

    // Append user message and an empty streaming bot message
    setMessages((prev) => [...prev, userMessage, botMessage])
    setIsLoading(true)
    setError(null)

    try {
      // Build the messages payload — include all previous messages plus the new user message.
      // Exclude the empty bot placeholder from the API payload.
      const apiMessages = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }))

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const errorMsg =
          errorData.error || `Request failed with status ${response.status}`
        setError(errorMsg)
        // Remove the empty bot message on error
        setMessages((prev) => prev.filter((m) => m.id !== botMessageId))
        setIsLoading(false)
        return
      }

      if (!response.body) {
        setError('No response stream received.')
        setMessages((prev) => prev.filter((m) => m.id !== botMessageId))
        setIsLoading(false)
        return
      }

      // Read the response stream chunk by chunk and append to the bot message content
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let accumulatedContent = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        accumulatedContent += chunk

        // Update the bot message content with each new chunk
        const currentContent = accumulatedContent
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botMessageId
              ? { ...m, content: currentContent }
              : m
          )
        )
      }

      // Stream complete — mark the bot message as no longer streaming
      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMessageId
            ? { ...m, isStreaming: false }
            : m
        )
      )
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : 'Failed to send message.'
      setError(errorMsg)
      // Remove the failed bot message
      setMessages((prev) => prev.filter((m) => m.id !== botMessageId))
    } finally {
      setIsLoading(false)
    }
  }, [messages])

  const retryLast = useCallback(function retryLast() {
    // Find the last user message to re-send
    const lastUserMessage = [...messages]
      .reverse()
      .find((m) => m.role === 'user')

    if (!lastUserMessage) return

    // Remove the last bot message (the failed one) before retrying
    setMessages((prev) => {
      const lastBotIndex = [...prev]
        .map((m, i) => ({ role: m.role, index: i }))
        .reverse()
        .find((entry) => entry.role === 'assistant')

      if (lastBotIndex !== undefined) {
        return prev.filter((_, i) => i !== lastBotIndex.index)
      }
      return prev
    })

    setError(null)
    sendMessage(lastUserMessage.content)
  }, [messages, sendMessage])

  return { messages, isLoading, error, sendMessage, retryLast }
}
