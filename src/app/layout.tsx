import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import '@mantine/core/styles.css';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import ThemeProvider from '../theme/provider';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: 'Project Architecture',
  description: 'A custom Next.js project architecture template.',
  authors: [{ name: 'Your Name', url: 'https://yourwebsite.com' }],
  keywords: [
    'Next.js',
    'Project Architecture',
    'Template',
    'TypeScript',
    'React',
  ],
  openGraph: {
    title: 'Project Architecture',
    description: 'A custom Next.js project architecture template.',
    url: 'https://yourprojectdomain.com',
    siteName: 'Project Architecture',
    images: [
      {
        url: 'https://yourprojectdomain.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Project Architecture Open Graph Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0A192F',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${poppins.variable}`} suppressHydrationWarning={true}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
