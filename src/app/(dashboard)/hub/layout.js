// Server Component — metadata can only be exported from server components.
// This layout wraps the Hub page and injects SEO tags via Next.js App Router.

export const metadata = {
  title: 'The Hub — PM News',
  description:
    'Global PM intelligence, curated daily. Stay on top of the latest in product management, strategy, tech, and growth.',
  openGraph: {
    title: 'The Hub — PM News | Product Buzz',
    description:
      'Global PM intelligence, curated daily. Stay on top of the latest in product management.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Hub — PM News | Product Buzz',
    description: 'Global PM intelligence, curated daily.',
  },
};

export default function HubLayout({ children }) {
  return children;
}
