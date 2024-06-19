import type { Metadata } from 'next';
import { IBM_Plex_Sans, Inter } from 'next/font/google';
import './globals.css';

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  variable: '--font-ibmplexsans',
});
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    template: '%s | Coffee Connoisseur',
    default: 'Coffee Connoisseur',
  },
  description: 'Discover Coffee Shops Near You',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ibmPlexSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
