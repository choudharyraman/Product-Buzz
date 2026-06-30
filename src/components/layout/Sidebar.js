'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const NAV_ITEMS = [
  { icon: '🏠', label: 'Home',       href: '/dashboard' },
  { icon: '📰', label: 'The Hub',    href: '/hub' },
  { icon: '🃏', label: 'PM Drill',   href: '/pm-drill' },
  { icon: '📚', label: 'Dictionary', href: '/dictionary' },
  { icon: '🤖', label: 'AI Agent',   href: '/agent' },
];

const ACCOUNT_ITEMS = [
  { icon: '👤', label: 'Profile',  href: '/profile' },
  { icon: '⚙️', label: 'Settings', href: '/settings' },
];

export default function Sidebar({ user = null }) {
  const pathname = usePathname();
  const [localStreak, setLocalStreak] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('pm-drill-streak');
    if (stored) {
      setLocalStreak(parseInt(stored, 10));
    } else {
      localStorage.setItem('pm-drill-streak', '0');
      setLocalStreak(0);
    }
  }, []);

  const isActive = (href) => {
    if (href === '/dashboard') return pathname === '/dashboard' || pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <aside className="app-sidebar" aria-label="Main navigation">
      <nav className="sidebar-nav">
        {/* ── Logo ─────────────────────────────────── */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-mark" aria-hidden="true">⚡</div>
          <span className="sidebar-logo-text">
            Product <span>Buzz</span>
          </span>
        </div>

        {/* ── Primary Nav ──────────────────────────── */}
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-item${isActive(item.href) ? ' active' : ''}`}
            aria-current={isActive(item.href) ? 'page' : undefined}
          >
            <span className="nav-icon" aria-hidden="true">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </Link>
        ))}

        {/* ── Account Section ───────────────────────── */}
        <div className="sidebar-section-label" aria-label="Account section">
          <span className="sidebar-label">Account</span>
        </div>

        {ACCOUNT_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-item${isActive(item.href) ? ' active' : ''}`}
            aria-current={isActive(item.href) ? 'page' : undefined}
          >
            <span className="nav-icon" aria-hidden="true">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </Link>
        ))}

        {/* ── Footer / User ─────────────────────────── */}
        <div className="sidebar-footer">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div
              className="sidebar-logo-mark"
              style={{ background: 'var(--bg-overlay)', border: '1px solid var(--border-default)', fontSize: '1rem' }}
              aria-hidden="true"
            >
              {user?.avatar ?? '👤'}
            </div>

            {/* Name + streak */}
            <div className="sidebar-user-info flex flex-col gap-1">
              <span className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)', maxWidth: '130px' }}>
                {user?.name ?? 'PM Learner'}
              </span>
              <span className="text-xs" style={{ color: 'var(--warm)' }}>
                Streak: {localStreak} days 🔥
              </span>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}
