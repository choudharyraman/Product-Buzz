'use client';

import Link from 'next/link';

/* ── Stat data ────────────────────────────────────────── */
const STATS = [
  { value: '7',  label: 'Drill Streak',       icon: '🔥', accent: 'var(--warm)' },
  { value: '12', label: 'Articles Read',       icon: '📰', accent: 'var(--accent)' },
  { value: '34', label: 'Products Explored',   icon: '🚀', accent: 'var(--success)' },
];

/* ── Today's drill teaser ─────────────────────────────── */
const DRILL_TEASER = {
  type:     'Guesstimate',
  badgeClass: 'badge-guesstimate',
  question: 'Estimate the number of active WhatsApp users in India who send at least one voice note per day.',
  timeEstimate: '~10 min',
};

/* ── Skeleton news cards ──────────────────────────────── */
function NewsCardSkeleton() {
  return (
    <div className="card" style={{ overflow: 'hidden', padding: 0 }}>
      {/* Image area */}
      <div className="skeleton" style={{ height: '160px', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }} />
      {/* Body */}
      <div style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <div className="skeleton" style={{ height: '12px', width: '40%' }} />
        <div className="skeleton" style={{ height: '16px', width: '90%' }} />
        <div className="skeleton" style={{ height: '16px', width: '70%' }} />
        <div className="skeleton" style={{ height: '12px', width: '55%', marginTop: 'var(--space-1)' }} />
      </div>
    </div>
  );
}

/* ── Skeleton product cards ───────────────────────────── */
function ProductCardSkeleton() {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <div className="skeleton" style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', flexShrink: 0 }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <div className="skeleton" style={{ height: '14px', width: '60%' }} />
          <div className="skeleton" style={{ height: '12px', width: '80%' }} />
        </div>
      </div>
      <div className="skeleton" style={{ height: '12px', width: '40%' }} />
    </div>
  );
}

/* ── Section header ───────────────────────────────────── */
function SectionHeader({ title, linkHref, linkLabel }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="section-title" style={{ margin: 0 }}>{title}</h2>
      {linkHref && (
        <Link
          href={linkHref}
          className="btn btn-ghost btn-sm"
          style={{ color: 'var(--accent)', fontSize: 'var(--text-sm)' }}
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}

/* ── Main dashboard page ──────────────────────────────── */
export default function DashboardPage() {
  return (
    <>
      {/* ── Page Header ───────────────────────────────── */}
      <div className="page-header animate-fade-in">
        <h1>Good morning, PM 👋</h1>
        <p className="subtitle">Your daily briefing is ready.</p>
      </div>

      {/* ── Stats Row ─────────────────────────────────── */}
      <section
        className="grid-3 animate-fade-in"
        style={{ marginBottom: 'var(--space-8)', animationDelay: '50ms' }}
        aria-label="Your stats"
      >
        {STATS.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="flex items-center justify-between">
              <span className="stat-value" style={{ color: stat.accent }}>{stat.value}</span>
              <span style={{ fontSize: '1.5rem' }} aria-hidden="true">{stat.icon}</span>
            </div>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* ── Today's PM Drill ──────────────────────────── */}
      <section
        className="animate-fade-in"
        style={{ marginBottom: 'var(--space-8)', animationDelay: '100ms' }}
        aria-label="Today's PM Drill"
      >
        <SectionHeader title="Today's PM Drill 🃏" />

        <div
          className="card card-hover"
          style={{
            background: 'linear-gradient(135deg, var(--bg-elevated) 0%, rgba(124,58,237,0.06) 100%)',
            borderColor: 'var(--accent-border)',
          }}
        >
          {/* Drill meta */}
          <div className="flex items-center gap-2" style={{ marginBottom: 'var(--space-3)' }}>
            <span className={`badge ${DRILL_TEASER.badgeClass}`}>{DRILL_TEASER.type}</span>
            <span className="badge badge-neutral">
              ⏱ {DRILL_TEASER.timeEstimate}
            </span>
          </div>

          {/* Question preview */}
          <p
            className="font-medium"
            style={{
              color: 'var(--text-primary)',
              fontSize: 'var(--text-base)',
              lineHeight: 'var(--leading-snug)',
              marginBottom: 'var(--space-5)',
            }}
          >
            {DRILL_TEASER.question}
          </p>

          {/* CTA */}
          <Link href="/pm-drill" className="btn btn-primary btn-lg">
            Start Today's Drill ⚡
          </Link>
        </div>
      </section>

      {/* ── Latest from The Hub ────────────────────────── */}
      <section
        className="animate-fade-in"
        style={{ marginBottom: 'var(--space-8)', animationDelay: '150ms' }}
        aria-label="Latest from The Hub"
      >
        <SectionHeader
          title="Latest from The Hub 📰"
          linkHref="/hub"
          linkLabel="View All"
        />

        <div className="grid-3">
          <NewsCardSkeleton />
          <NewsCardSkeleton />
          <NewsCardSkeleton />
        </div>
      </section>

      {/* ── Quick Dictionary ───────────────────────────── */}
      <section
        className="animate-fade-in"
        style={{ marginBottom: 'var(--space-8)', animationDelay: '200ms' }}
        aria-label="Quick Dictionary"
      >
        <SectionHeader
          title="Quick Dictionary 📚"
          linkHref="/dictionary"
          linkLabel="Browse All"
        />

        <div className="grid-3">
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </div>
      </section>
    </>
  );
}
