import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import GridBackground from '@/components/GridBackground';
import FloatingShapes from '@/components/FloatingShapes';
import ParticleBackground from '@/components/ParticleBackground';
import LenisProvider from '@/components/LenisProvider';
import PremiumBackground from '@/components/ui/PremiumBackground';
import CustomCursor from '@/components/ui/CustomCursor';
import { QualificationProvider } from '@/lib/qualification-context';
import QualificationModal from '@/components/QualificationModal';

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: 'swap',
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Toti Cavalcanti | Software Engineer',
  description: 'Custom software, websites, and AI automations built by Toti Cavalcanti, based in Rio de Janeiro.',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate the locale
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Get messages for the client provider
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased selection:bg-foreground selection:text-background`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <QualificationProvider>
            <div className="relative min-h-screen flex flex-col">
              <LenisProvider>
                <PremiumBackground />
                <CustomCursor />
                <Navbar />
                <main className="flex-grow">{children}</main>
                <Footer />
              </LenisProvider>
            </div>
            <QualificationModal />
          </QualificationProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
