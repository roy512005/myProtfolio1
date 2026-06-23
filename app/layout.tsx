import type { Metadata } from 'next';
import { Syne, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Anupam Roy — Frontend Architect & React Specialist',
  description:
    'Anupam Roy is a world-class Frontend Developer specializing in React.js, Next.js, and TypeScript. Building the interfaces the internet remembers. Available for premium projects and strategic partnerships.',
  keywords: [
    'Frontend Developer',
    'React Developer',
    'Next.js',
    'TypeScript',
    'UI Engineer',
    'Web Performance',
    'Design Systems',
    'Freelance Frontend Developer',
  ],
  authors: [{ name: 'Anupam Roy' }],
  creator: 'Anupam Roy',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Anupam Roy — Frontend Architect',
    description: 'Building the interfaces the internet remembers.',
    siteName: 'Anupam Roy Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anupam Roy — Frontend Architect',
    description: 'Building the interfaces the internet remembers.',
    creator: '@anupamroy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body
        style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
        className="noise-overlay"
      >
        {children}
      </body>
    </html>
  );
}
