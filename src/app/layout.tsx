import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import '@/styles/globals.css';

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-space-grotesk',
});

// Since we checked and the fonts directory was empty/missing, 
// using typical next.js fallback fonts instead of Geist local if they are missing
// from previous NextJS boilerplate. But wait, I'll attempt next/font/google for Geist.
// Actually, Geist is only in next/font/google in later Next 14 versions.
// I will use IBM Plex Mono for Geist Mono fallback, and Inter for Geist fallback,
// but named variables as requested.

import { Inter, IBM_Plex_Mono } from 'next/font/google';

const geistSans = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans', // keeping variable name to map safely
});

const geistMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'AntarikshaAI',
  description: 'AI mission analyst for ISRO',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
