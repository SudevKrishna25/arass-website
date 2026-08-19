import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import dynamic from 'next/dynamic';
import { GlobalNavigation } from '@/components/navigation/GlobalNavigation';
import { GlobalInquiryModal } from '@/components/ui/GlobalInquiryModal';
import { SmoothScrollProvider } from '@/components/animation/SmoothScrollProvider';
import { WorldStateProvider } from '@/context/WorldStateContext';
import { CinematicPageTransitionProvider } from '@/components/cinematic/CinematicPageTransition';
import { InteractiveCursor } from '@/components/cinematic/InteractiveCursor';

const AtmosphericCanvas = dynamic(() => import('@/components/cinematic/AtmosphericCanvas'), {
  ssr: false,
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#020914',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://arass.tech'),
  title: "ARASS — We Don't Follow The Future. We Build It.",
  description:
    'ARASS is an independent technology ecosystem discovering, researching, and engineering foundational breakthroughs to shape the long-term horizon of human civilization.',
  keywords: [
    'ARASS',
    'Deep Tech',
    'Frontier Research',
    'Autonomous Systems',
    'Quantum Engineering',
    'Advanced Materials',
    'Century-Scale Infrastructure',
    'Technology Ecosystem',
  ],
  authors: [{ name: 'ARASS Group', url: 'https://arass.tech' }],
  creator: 'ARASS Group',
  publisher: 'ARASS Group',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "ARASS — We Don't Follow The Future. We Build It.",
    description:
      'ARASS is an independent technology ecosystem discovering, researching, and engineering foundational breakthroughs.',
    url: 'https://arass.tech',
    siteName: 'ARASS',
    images: [
      {
        url: '/images/arass_horizon_cinematic_bg.jpg',
        width: 1200,
        height: 630,
        alt: 'ARASS Frontier Technological Ecosystem',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ARASS — We Don't Follow The Future. We Build It.",
    description:
      'ARASS is an independent technology ecosystem discovering, researching, and engineering foundational breakthroughs.',
    creator: '@arasstech',
    images: ['/images/arass_horizon_cinematic_bg.jpg'],
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="bg-background text-primary-text min-h-screen antialiased selection:bg-electric-cyan selection:text-background">
        <WorldStateProvider>
          <SmoothScrollProvider>
            <CinematicPageTransitionProvider>
              {/* Subtle 2D Canvas Particle Field */}
              <AtmosphericCanvas />
              {/* Custom Desktop Interactive Cursor */}
              <InteractiveCursor />
              {/* Global Navigation Header & Mega Menu */}
              <GlobalNavigation />
              {/* Active Route Content */}
              <main>{children}</main>
              {/* Global Institutional Inquiry Modal */}
              <GlobalInquiryModal />
            </CinematicPageTransitionProvider>
          </SmoothScrollProvider>
        </WorldStateProvider>
      </body>
    </html>
  );
}
