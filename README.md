# AntarikshaAI — ISRO Intelligence Chatbot

A purpose-built chatbot about India's space programme — ISRO's missions, launch vehicles, scientists, and the road ahead.

## Why ISRO?

ISRO's story is extraordinary: Mars on a budget smaller than the *Gravity* film, a south-pole Moon landing on the second attempt, a crewed mission in progress. I'm based in Bengaluru — ISRO's home city — and this felt like the most genuinely interesting topic I could build around.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS**
- **Google Gemini 1.5 Flash** API (streaming)
- Deployed on **Vercel**

## Features

- ⚡ Streaming responses with live token rendering
- 🎨 Mission-control aesthetic (deep space dark, amber accents)
- 💡 6 curated starter prompts
- ✅ Full error / loading / empty state handling
- 📱 Mobile responsive

## Architecture

```
src/
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata
│   ├── page.tsx                # Renders <ChatInterface />
│   └── api/chat/route.ts       # POST → Gemini API, streams back
├── components/
│   ├── ChatInterface.tsx       # State orchestrator
│   ├── MessageList.tsx         # Scrollable messages + auto-scroll
│   ├── MessageBubble.tsx       # Single message (user | bot)
│   ├── TypingIndicator.tsx     # Animated telemetry dots
│   ├── ChatInput.tsx           # Textarea + send button
│   ├── SuggestionChips.tsx     # 6 starter prompts (empty state)
│   ├── Header.tsx              # Logo, tagline, accent bar
│   └── ErrorBanner.tsx         # Inline error + retry
├── hooks/
│   └── useGeminiStream.ts      # All streaming + API call logic
├── lib/
│   ├── systemPrompt.ts         # Full AntarikshaAI system prompt
│   ├── suggestions.ts          # 6 curated starter prompts
│   └── types.ts                # Shared TypeScript types
└── styles/
    └── globals.css             # CSS variables, star-field bg, base styles
```

## Run Locally

```bash
npm install

# Add your Gemini API key to .env.local
echo "GEMINI_API_KEY=your_key_here" > .env.local

npm run dev
```

Get your API key at: [Google AI Studio](https://aistudio.google.com/app/apikey) (free, no credit card)

## Deploy to Vercel

1. Push to GitHub
2. Import repo in [Vercel](https://vercel.com)
3. Add `GEMINI_API_KEY` to Settings → Environment Variables
4. Deploy 🚀
