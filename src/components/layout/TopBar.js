'use client';

export default function TopBar({ title = 'Product Buzz', streak = 0 }) {
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
      <div className="streak-counter" role="status" aria-label={`Streak: ${streak} days`}>
        <span aria-hidden="true">🔥</span>
        <span>{streak}d</span>
      </div>
    </header>
  );
}
