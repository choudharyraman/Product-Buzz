import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const viewport = {
  themeColor: '#0C0C15',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  title: {
    default: 'Product Buzz — Daily PM Intelligence',
    template: '%s | Product Buzz',
  },
  description:
    'Your daily companion for Product Management. PM news, the PM Drill, and a Product Dictionary — built for aspiring and early-stage PMs.',
  keywords: ['product management', 'PM news', 'product manager', 'daily drill', 'PM learning', 'product dictionary'],
  authors: [{ name: 'Product Buzz' }],
  creator: 'Product Buzz',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://productbuzz.app',
    title: 'Product Buzz — Daily PM Intelligence',
    description: 'Your daily companion for Product Management.',
    siteName: 'Product Buzz',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Product Buzz — Daily PM Intelligence',
    description: 'Your daily companion for Product Management.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}

