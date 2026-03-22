export type MessageRole = 'user' | 'assistant'

export interface Message {
  id: string
  role: MessageRole
  content: string
  timestamp: Date
  isStreaming?: boolean
}

export interface Suggestion {
  category: string
  label: string
  prompt: string
}
