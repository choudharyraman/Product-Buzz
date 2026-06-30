'use client';

import { useState, useEffect } from 'react';

export default function TopBar({ title = 'Product Buzz' }) {
  const [localStreak, setLocalStreak] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('pm-drill-streak');
    if (stored) {
      setLocalStreak(parseInt(stored, 10));
    }
  }, []);

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

      {/* Streak badge */}
      <div className="streak-counter" role="status" aria-label={`Streak: ${localStreak} days`}>
        <span aria-hidden="true">🔥</span>
        <span>{localStreak}d</span>
      </div>
    </header>
  );
}

