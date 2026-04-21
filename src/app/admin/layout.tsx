import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../[locale]/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Admin Cockpit',
  description: 'Internal management system',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-neutral-950 text-neutral-50 antialiased`}>
        {children}
      </body>
    </html>
  );
}
