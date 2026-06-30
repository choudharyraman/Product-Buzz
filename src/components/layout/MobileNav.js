'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { icon: '🏠', label: 'Home',  href: '/dashboard' },
  { icon: '📰', label: 'Hub',   href: '/hub' },
  { icon: '🃏', label: 'Drill', href: '/pm-drill' },
  { icon: '📚', label: 'Dict',  href: '/dictionary' },
  { icon: '🤖', label: 'Agent', href: '/agent' },
];

export default function MobileNav() {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === '/dashboard') return pathname === '/dashboard' || pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      <div className="mobile-nav-inner">
        {TABS.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`mobile-nav-item${isActive(tab.href) ? ' active' : ''}`}
            aria-current={isActive(tab.href) ? 'page' : undefined}
            aria-label={tab.label}
          >
            <span className="mobile-nav-icon" aria-hidden="true">{tab.icon}</span>
            <span className="mobile-nav-label">{tab.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
