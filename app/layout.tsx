import type { Metadata, Viewport } from 'next';
import './globals.css';
import FreshnessBar from '@/components/FreshnessBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'BALLOT.WATCH 2026 — 1980s Arcade Midterm Tracker',
  description: '1980s arcade video game style 2026 midterm election monitor tracking all 435 House seats, 35 Senate seats, polling averages with published methodology, and unblended forecaster ratings.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#080616',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[#080616] text-[#FFFFFF]">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&family=Silkscreen:wght@400;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#080616] text-[#FFFFFF] font-mono arcade-scanlines arcade-grid-bg antialiased selection:bg-[#FF007F] selection:text-white">
        <FreshnessBar />
        <Header />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
