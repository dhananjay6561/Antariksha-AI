import { GoogleGenerativeAI } from '@google/generative-ai'
import { SYSTEM_PROMPT } from '@/lib/systemPrompt'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Validate that messages array exists and is non-empty
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json(
        { error: 'Messages array is required and must be non-empty.' },
        { status: 400 }
      )
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_PROMPT,
    })

    // Convert messages to Gemini history format:
    // All messages except the last become history entries.
    // Gemini uses 'model' instead of 'assistant' for AI responses.
    const history = messages.slice(0, -1).map(
      (m: { role: string; content: string }) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      })
    )

    const chat = model.startChat({ history })
    const lastUserMessage = messages[messages.length - 1].content

    const result = await chat.sendMessageStream(lastUserMessage)

    // Stream response chunks back to the client as they arrive
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text()
            if (text) {
              controller.enqueue(new TextEncoder().encode(text))
            }
          }
          controller.close()
        } catch (streamError) {
          controller.error(streamError)
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred.'
    return Response.json({ error: errorMessage }, { status: 500 })
  }
}
