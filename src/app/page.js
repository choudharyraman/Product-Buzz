'use client';

import Link from 'next/link';

const features = [
  {
    icon: '📰',
    label: 'The Hub',
    title: 'Global PM Intelligence',
    desc: 'Live-curated news from the top PM publications. Strategy, growth, UX, and AI — all in one feed.',
    accent: '#7C3AED',
  },
  {
    icon: '🃏',
    label: 'PM Drill',
    title: 'Your Daily 5-Min Workout',
    desc: 'Guesstimates, root-cause analyses, metric formulas. Swipe right when you\'ve got it. Build the habit.',
    accent: '#F59E0B',
  },
  {
    icon: '📚',
    label: 'Dictionary',
    title: '200 Products Decoded',
    desc: 'Top 100 global + top 100 Indian products. Business model, growth story, PM lessons — one click away.',
    accent: '#10B981',
  },
  {
    icon: '🤖',
    label: 'Buzz AI',
    title: 'Your Personal PM Coach',
    desc: 'Powered by Gemini. Ask it to quiz you, explain frameworks, or help you crack that PM interview.',
    accent: '#6366F1',
  },
];

const stats = [
  { value: '200+', label: 'Products Decoded' },
  { value: '60+', label: 'Drill Cards' },
  { value: '10+', label: 'PM News Sources' },
  { value: '5 min', label: 'Daily Commitment' },
];

export default function LandingPage() {
  return (
    <div style={{ background: 'var(--bg-base)', minHeight: '100dvh' }}>
      {/* Top Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(8,8,15,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '0 var(--space-6)',
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{
            width: 32, height: 32,
            background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
            borderRadius: 'var(--radius-md)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem', color: 'white', fontWeight: 700,
          }}>⚡</div>
          <span style={{ fontWeight: 700, fontSize: 'var(--text-base)', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            Product<span style={{ color: 'var(--accent)' }}>Buzz</span>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <Link href="/login" className="btn btn-ghost">Sign in</Link>
          <Link href="/signup" className="btn btn-primary">Get Started Free</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="landing-hero" style={{ paddingTop: 120 }}>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="hero-eyebrow">For PMs. By PMs.</div>

          <h1 className="hero-title">
            Your Daily{' '}
            <span className="gradient-text">PM Intelligence</span>{' '}
            Briefing
          </h1>

          <p className="hero-subtitle">
            News, drills, and a product encyclopedia — designed to build the habits
            that make great Product Managers. 5 minutes a day. Every day.
          </p>

          <div className="hero-actions">
            <Link href="/signup" className="btn btn-primary btn-lg">
              Start Building Your Habit →
            </Link>
            <Link href="/login" className="btn btn-secondary btn-lg">
              Sign In
            </Link>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex',
            gap: 'var(--space-10)',
            marginTop: 'var(--space-16)',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            {stats.map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: 'var(--text-3xl)',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                }}>{s.value}</div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginTop: 4, fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: 'var(--space-20) var(--space-6)', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 'var(--space-4)' }}>
            Everything a PM needs to grow
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto' }}>
            Four focused tools, zero fluff. Built for the discipline of daily learning.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 'var(--space-4)',
        }}>
          {features.map((f) => (
            <div key={f.label} className="card" style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: f.accent,
                opacity: 0.8,
              }} />
              <div style={{ fontSize: '2rem', marginBottom: 'var(--space-4)' }}>{f.icon}</div>
              <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: f.accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-2)' }}>
                {f.label}
              </div>
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-3)', letterSpacing: '-0.02em' }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PM Drill Showcase */}
      <section style={{
        padding: 'var(--space-20) var(--space-6)',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-16)', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--warm)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 'var(--space-4)' }}>
              🃏 PM Drill
            </div>
            <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 'var(--space-5)' }}>
              The 5-minute workout for your PM brain
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-6)' }}>
              Swipe through 5 cards. Guesstimates. Root-cause scenarios. Framework flashcards.
              Swipe right when you know it. Left to revisit. Track your streak.
              Show up every day and watch your PM instincts sharpen.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {['🧮 Guesstimate challenges', '🔍 Root Cause Analysis scenarios', '📐 Framework flashcards', '📊 Metrics formulas', '💡 Real product case studies'].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--warm)', flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Mock Drill Card */}
          <div style={{ perspective: 1200 }}>
            <div style={{
              background: 'linear-gradient(135deg, var(--bg-elevated), var(--bg-overlay))',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-2xl)',
              padding: 'var(--space-8)',
              textAlign: 'center',
              boxShadow: 'var(--shadow-lg)',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', top: 'var(--space-4)', right: 'var(--space-4)',
                display: 'flex', gap: 'var(--space-1)',
              }}>
                {[0,1,2,3,4].map((i) => (
                  <div key={i} style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: i === 0 ? 'var(--warm)' : 'var(--border-default)',
                  }} />
                ))}
              </div>
              <div style={{ marginBottom: 'var(--space-2)' }}>
                <span className="badge badge-guesstimate">🧮 Guesstimate</span>
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-5)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Card 1 of 5
              </div>
              <p style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 'var(--leading-snug)', marginBottom: 'var(--space-6)' }}>
                Estimate the daily order volume of a Tier-2 city quick-commerce app.
              </p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-6)' }}>
                💡 Think: population, target segment, order frequency
              </p>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--accent)', fontWeight: 500 }}>
                Tap to reveal answer ↓
              </div>
            </div>

            {/* Swipe hints */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-4)', padding: '0 var(--space-4)' }}>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--error)', opacity: 0.6 }}>← Review again</div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--success)', opacity: 0.6 }}>Got it ✓ →</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: 'var(--space-20) var(--space-6)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, height: 400,
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: 'var(--text-4xl)', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 'var(--space-5)' }}>
            Build the habit.<br />Become a better PM.
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-8)' }}>
            Free to start. 5 minutes a day. No excuses.
          </p>
          <Link href="/signup" className="btn btn-primary btn-lg" style={{ fontSize: 'var(--text-lg)', padding: 'var(--space-4) var(--space-10)' }}>
            Start Now — It&apos;s Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: 'var(--space-8) var(--space-6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 'var(--space-4)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <span style={{ fontSize: '1rem' }}>⚡</span>
          <span style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>ProductBuzz</span>
        </div>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
          © 2025 Product Buzz. Built for the PM community.
        </p>
      </footer>
    </div>
  );
}
