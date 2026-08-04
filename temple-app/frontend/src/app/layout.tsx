import type { Metadata } from 'next';
import { Cormorant_Garamond, Source_Sans_3, Noto_Sans_Malayalam, Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import { Toaster } from 'react-hot-toast';
import RootShell from '@/components/layout/RootShell';

const display = Cormorant_Garamond({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Source_Sans_3({ subsets: ['latin'], variable: '--font-body' });
const malayalam = Noto_Sans_Malayalam({ subsets: ['malayalam'], variable: '--font-malayalam' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'കിട്ടുണ്ണിത്തമ്പുരാൻ ക്ഷേത്രം | Kittunni Thampuran Temple',
  description: 'Book poojas, make donations, and enroll in annual schemes at കിട്ടുണ്ണിത്തമ്പുരാൻ ക്ഷേത്രം.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${malayalam.variable} ${inter.variable} font-inter relative min-h-screen selection:bg-brass selection:text-white`}>
        <Providers>
          <RootShell>{children}</RootShell>
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}
