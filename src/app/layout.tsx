import type { Metadata } from 'next'
import { Orbitron, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'
import '@/styles/globals.css'

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
})

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AntarikshaAI — ISRO Intelligence Chatbot',
  description:
    'A purpose-built chatbot about India\'s space programme — ISRO\'s missions, launch vehicles, scientists, and the road ahead.',
  keywords: [
    'ISRO',
    'Indian Space Research Organisation',
    'Chandrayaan',
    'Mangalyaan',
    'Gaganyaan',
    'space',
    'chatbot',
    'AI',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${plexMono.variable} ${plexSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
