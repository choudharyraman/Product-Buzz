'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { createClient } from '@/lib/supabase/client';

export default function TopBar({ title = 'Product Buzz' }) {
  const [localStreak, setLocalStreak] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('pm-drill-streak');
    if (stored) {
      setLocalStreak(parseInt(stored, 10));
    }
  }, []);

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push('/login');
      router.refresh();
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  return (
    <header className="app-topbar" aria-label="Top bar">
      {/* Logo mark */}
      <div className="sidebar-logo-mark" aria-hidden="true">⚡</div>

      {/* Page title */}
      <h1
        className="text-base font-semibold"
        style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
      >
        {title}
      </h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        {/* Streak badge */}
        <div className="streak-counter" role="status" aria-label={`Streak: ${localStreak} days`}>
          <span aria-hidden="true">🔥</span>
          <span>{localStreak}d</span>
        </div>

        {/* Logout button */}
        <button
          onClick={handleSignOut}
          title="Logout"
          aria-label="Logout"
          style={{
            background: 'var(--bg-overlay)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          🚪
        </button>
      </div>
    </header>
  );
}

