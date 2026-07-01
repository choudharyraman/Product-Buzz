'use client';

import { useState } from 'react';
import Link from 'next/link';

const trendingProducts = [
  { rank: '1', category: 'Foodtech / Delivery', title: 'Zomato', desc: 'Decoding the unit economics of India\'s dominant food delivery network.', readTime: '5 min read' },
  { rank: '2', category: 'Fintech / Payments', title: 'Paytm', desc: 'Understanding the soundbox monetization and lending pivot.', readTime: '6 min read' },
  { rank: '3', category: 'Fintech / Rewards', title: 'CRED', desc: 'How premium member rewards drive high-value credit card spending.', readTime: '4 min read' },
  { rank: '4', category: 'DevTools / SaaS', title: 'Postman', desc: 'How a simple collaboration tool became a global API standard.', readTime: '7 min read' },
  { rank: '5', category: 'E-Commerce / Social', title: 'Meesho', desc: 'Unpacking the zero-commission marketplace for Tier-2+ India.', readTime: '5 min read' },
];

const insights = [
  {
    category: 'Strategy',
    title: 'The Post-Feature Era: Why Product Value Resides in Ecosystems, Not Capabilities.',
    desc: 'In a landscape saturated with feature parity, leading product organizations are shifting their focus from shipping capabilities to orchestrating holistic, interconnected ecosystems.',
    author: 'Elena Rostova',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600'
  },
  {
    category: 'Growth',
    title: 'Decoding the Viral Loop: Metrics That Matter.',
    desc: 'Viral coefficients, cohort retention curves, and sharing triggers. Why most viral features fail and how to build growth engines that stick.',
    author: 'Marcus Vance',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600'
  },
  {
    category: 'UX Design',
    title: 'Spatial Computing: Designing for the Z-Axis.',
    desc: 'As hardware catches up to imagination, product designers must rethink interactions beyond flat screens, embracing depth and proximity.',
    author: 'David Chen',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&q=80&w=600'
  }
];

export default function LandingPage() {
  const [drillAnswered, setDrillAnswered] = useState(false);
  const [drillRevealed, setDrillRevealed] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="editorial-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* ── TopNavBar ── */}
      <header className="editorial-header" style={{ position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 var(--space-8)',
          height: '80px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <div style={{
              width: '32px', height: '32px',
              background: 'linear-gradient(135deg, var(--ed-primary), #333)',
              borderRadius: '6px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1rem', color: 'white', fontWeight: 700,
            }}>⚡</div>
            <span className="font-editorial-display" style={{
              fontWeight: 700,
              fontSize: '1.5rem',
              letterSpacing: '-0.03em',
              color: 'var(--ed-on-surface)'
            }}>
              ProductBuzz
            </span>
          </Link>

          {/* Nav Links */}
          <nav style={{ display: 'flex', gap: 'var(--space-6)' }} className="hidden md:flex">
            <Link href="/signup" className="editorial-nav-link">Strategy</Link>
            <Link href="/signup" className="editorial-nav-link">Design</Link>
            <Link href="/signup" className="editorial-nav-link">Growth</Link>
            <Link href="/signup" className="editorial-nav-link">Tech</Link>
          </nav>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <Link href="/login" className="editorial-btn-secondary" style={{ padding: '6px 14px', fontSize: '0.875rem' }}>
              Sign In
            </Link>
            <Link href="/signup" className="editorial-btn-primary" style={{ padding: '6px 14px', fontSize: '0.875rem' }}>
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* ── Main Layout ── */}
      <main style={{ flexGrow: 1, maxWidth: '1280px', margin: '0 auto', padding: 'var(--space-10) var(--space-8) var(--space-20)', width: '100%' }}>
        
        {/* Hero & Bento Layout */}
        <section style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-8)', marginBottom: 'var(--space-12)' }} className="lg:grid-cols-12">
          
          {/* Lead Story: Daily PM Drill (Left 2/3) */}
          <div className="lg:col-span-8" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div className="editorial-card" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              {/* Image Banner */}
              <div style={{
                height: '320px',
                backgroundImage: 'url("https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1200")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}>
                <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
                  <span className="editorial-tag" style={{ background: 'var(--ed-primary)', color: 'var(--ed-on-primary)' }}>
                    Daily PM Drill
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <h1 className="font-editorial-display" style={{
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  lineHeight: '1.15',
                  color: 'var(--ed-on-surface)',
                  margin: 0,
                  letterSpacing: '-0.02em'
                }}>
                  The 5-Minute Workout: Build Your Product Instincts Every Day.
                </h1>
                
                <p style={{ fontSize: '1.125rem', color: 'var(--ed-on-surface-variant)', margin: 0, lineHeight: 1.6 }}>
                  Great Product Managers are not born—they are built through daily discipline. Sharpen your product sense, metrics formulas, and root-cause capabilities with simulated PM interview questions.
                </p>

                {/* Simulated Interactive Card */}
                <div style={{
                  background: 'var(--ed-surface-low)',
                  border: '1px solid var(--ed-outline)',
                  borderRadius: '8px',
                  padding: 'var(--space-6)',
                  marginTop: 'var(--space-4)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-4)',
                  position: 'relative'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="editorial-tag" style={{ background: 'var(--warm-subtle)', color: 'var(--warm)', border: '1px solid rgba(245,158,11,0.2)' }}>
                      🧮 Guesstimate Challenge
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--ed-on-surface-variant)' }}>Card 1 of 5</span>
                  </div>

                  <p style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ed-on-surface)', margin: 0, lineHeight: 1.4 }}>
                    Estimate the daily order volume of a Tier-2 city quick-commerce app in India.
                  </p>

                  {!drillRevealed ? (
                    <button
                      onClick={() => setDrillRevealed(true)}
                      className="editorial-btn-secondary"
                      style={{ alignSelf: 'flex-start', padding: '6px 12px', fontSize: '0.875rem' }}
                    >
                      💡 Tap to reveal helper variables & solution
                    </button>
                  ) : (
                    <div style={{ fontSize: '0.875rem', color: 'var(--ed-on-surface-variant)', borderLeft: '3px solid var(--ed-secondary)', paddingLeft: '12px', lineHeight: 1.5 }}>
                      <p style={{ fontWeight: 600, margin: '0 0 6px 0', color: 'var(--ed-on-surface)' }}>Approach & Solution Outline:</p>
                      <ul style={{ margin: 0, paddingLeft: '16px' }}>
                        <li><strong>Target population:</strong> Tier-2 city (~1,000,000 people, ~250,000 households).</li>
                        <li><strong>Q-Commerce adoption:</strong> ~15% active user penetration = 37,500 active ordering households.</li>
                        <li><strong>Frequency:</strong> ~2 orders/week per active household = ~10,700 orders/day total in the city.</li>
                        <li><strong>Market Share:</strong> Assuming this app has a 40% market share = <strong>~4,300 daily orders</strong>.</li>
                      </ul>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                        <button onClick={() => { setDrillAnswered(true); setDrillRevealed(false); }} className="editorial-btn-primary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>Got it ✓</button>
                        <button onClick={() => { setDrillAnswered(true); setDrillRevealed(false); }} className="editorial-btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>Need review</button>
                      </div>
                    </div>
                  )}

                  {drillAnswered && (
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                      background: 'rgba(255,255,255,0.95)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      borderRadius: '8px', padding: '16px', textAlign: 'center'
                    }}>
                      <span style={{ fontSize: '1.5rem', marginBottom: '8px' }}>🔥 Habit Loop Triggered!</span>
                      <p style={{ fontSize: '0.875rem', margin: '0 0 12px 0', color: 'var(--ed-on-surface-variant)' }}>
                        Sign up now to lock in your daily streak, unlock 60+ cards, and see global PM dashboards!
                      </p>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Link href="/signup" className="editorial-btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>Create Account</Link>
                        <button onClick={() => setDrillAnswered(false)} className="editorial-btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>Try Again</button>
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ marginTop: 'var(--space-2)' }}>
                  <Link href="/signup" className="editorial-btn-primary" style={{ gap: 'var(--space-2)' }}>
                    Start Your Daily Workout
                    <span style={{ fontSize: '1.1rem' }}>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Trending Now: Product Dictionary (Right 1/3) */}
          <aside className="lg:col-span-4" style={{
            backgroundColor: 'var(--ed-surface-low)',
            borderRadius: '12px',
            padding: 'var(--space-6)',
            border: '1px solid var(--ed-outline)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-6)'
          }}>
            <h3 className="font-editorial-display" style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: 'var(--ed-on-surface)',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ color: 'var(--warm)' }}>📈</span> Trending Now
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              {trendingProducts.map((p) => (
                <Link
                  key={p.rank}
                  href="/login"
                  style={{
                    display: 'flex',
                    gap: 'var(--space-4)',
                    textDecoration: 'none',
                    borderBottom: '1px solid var(--ed-outline)',
                    paddingBottom: 'var(--space-4)',
                    cursor: 'pointer'
                  }}
                  className="group"
                >
                  <span className="font-editorial-display" style={{
                    fontSize: '2.25rem',
                    fontWeight: 700,
                    lineHeight: 1,
                    color: 'var(--ed-surface-dim)'
                  }}>
                    {p.rank}
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      color: 'var(--ed-accent)',
                      letterSpacing: '0.05em'
                    }}>
                      {p.category}
                    </span>
                    <h4 className="font-editorial-display" style={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: 'var(--ed-on-surface)',
                      margin: 0,
                      transition: 'color 0.2s'
                    }}>
                      {p.title}
                    </h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--ed-on-surface-variant)', margin: 0, lineHeight: 1.4 }}>
                      {p.desc}
                    </p>
                    <span style={{ fontSize: '0.75rem', color: 'var(--ed-on-surface-variant)', marginTop: '4px' }}>
                      {p.readTime}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </section>

        {/* Divider */}
        <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--ed-outline)', margin: 'var(--space-12) 0' }}></div>

        {/* Product of the Day Section */}
        <section style={{ marginBottom: 'var(--space-16)' }}>
          <div className="editorial-card" style={{ display: 'grid', gridTemplateColumns: '1fr', overflow: 'hidden' }} className="md:grid-cols-2">
            <div style={{
              height: '320px',
              backgroundImage: 'url("https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative'
            }} className="md:h-auto">
              <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
                <span className="editorial-tag" style={{ background: 'var(--ed-primary)', color: 'var(--ed-on-primary)' }}>
                  Product of the Day
                </span>
              </div>
            </div>

            <div style={{ padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'var(--space-4)' }}>
              <div>
                <span className="editorial-tag" style={{ color: 'var(--ed-accent)', padding: 0 }}>Q-Commerce / Hyperlocal</span>
              </div>
              <h2 className="font-editorial-display" style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--ed-on-surface)', margin: 0 }}>
                Zepto — The Q-Comm Speed Demon
              </h2>
              <p style={{ fontSize: '1.125rem', color: 'var(--ed-on-surface-variant)', margin: 0, lineHeight: 1.6 }}>
                How Zepto redefined convenience commerce in India, building a $5B business in under 4 years by optimizing dark store layouts and delivery paths.
              </p>
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <Link href="/login" className="editorial-btn-primary">
                  Deep Dive Analysis
                </Link>
                <Link href="/signup" className="editorial-btn-secondary">
                  Unlock 80+ Products
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Insights Section */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)' }}>
            <h2 className="font-editorial-display" style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>
              Latest Insights
            </h2>
            <Link href="/signup" style={{ textDecoration: 'none', color: 'var(--ed-accent)', fontSize: '0.875rem', fontWeight: 600 }}>
              View All Insights →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-8)' }} className="md:grid-cols-3">
            {insights.map((insight, i) => (
              <article key={i} className="editorial-card" style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
                <div style={{ height: '180px', backgroundImage: `url(${insight.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', flexGrow: 1 }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--ed-accent)', letterSpacing: '0.05em' }}>
                    {insight.category}
                  </span>
                  <h3 className="font-editorial-display" style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ed-on-surface)', margin: 0, lineHeight: 1.3 }}>
                    {insight.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--ed-on-surface-variant)', margin: 0, lineHeight: 1.5 }}>
                    {insight.desc}
                  </p>
                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--ed-outline)', fontSize: '0.75rem', color: 'var(--ed-on-surface-variant)' }}>
                    <span style={{ fontWeight: 600 }}>{insight.author}</span>
                    <span>{insight.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer style={{
        backgroundColor: 'var(--ed-surface-low)',
        borderTop: '1px solid var(--ed-outline)',
        marginTop: 'auto'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'var(--space-12) var(--space-8)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-8)' }} className="md:grid-cols-12">
            
            {/* Newsletter */}
            <div className="md:col-span-5" style={{
              backgroundColor: 'var(--ed-surface-lowest)',
              borderRadius: '12px',
              padding: 'var(--space-6)',
              border: '1px solid var(--ed-outline)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)'
            }}>
              <h3 className="font-editorial-display" style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>
                Intelligence, Delivered.
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--ed-on-surface-variant)', margin: 0, lineHeight: 1.4 }}>
                Join 50,000+ product leaders receiving our weekly synthesis of strategy, design, and growth.
              </p>
              
              {!subscribed ? (
                <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      flexGrow: 1,
                      backgroundColor: 'var(--ed-surface-low)',
                      border: '1px solid var(--ed-outline)',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      fontSize: '0.875rem',
                      outline: 'none'
                    }}
                  />
                  <button type="submit" className="editorial-btn-primary" style={{ padding: '8px 14px', fontSize: '0.875rem' }}>
                    Subscribe
                  </button>
                </form>
              ) : (
                <div style={{ fontSize: '0.875rem', color: 'var(--success)', fontWeight: 600 }}>
                  ✓ Thank you! You&apos;re subscribed.
                </div>
              )}
            </div>

            {/* Links */}
            <div className="md:col-span-7" style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-12)', flexWrap: 'wrap' }}>
              <div>
                <span className="font-editorial-display" style={{ fontSize: '1.25rem', fontWeight: 600, display: 'block', marginBottom: '16px' }}>
                  ProductBuzz
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem' }}>
                  <Link href="/login" style={{ textDecoration: 'none', color: 'var(--ed-on-surface-variant)' }}>Archives</Link>
                  <Link href="/signup" style={{ textDecoration: 'none', color: 'var(--ed-on-surface-variant)' }}>About</Link>
                </div>
              </div>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '16px', color: 'var(--ed-on-surface-variant)' }}>
                  Legal
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem' }}>
                  <Link href="/signup" style={{ textDecoration: 'none', color: 'var(--ed-on-surface-variant)' }}>Privacy Policy</Link>
                  <Link href="/signup" style={{ textDecoration: 'none', color: 'var(--ed-on-surface-variant)' }}>Terms of Service</Link>
                </div>
              </div>
            </div>

          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 'var(--space-8)',
            borderTop: '1px solid var(--ed-outline)',
            marginTop: 'var(--space-8)',
            fontSize: '0.875rem',
            color: 'var(--ed-on-surface-variant)'
          }}>
            <span>© 2026 ProductBuzz. All rights reserved.</span>
            <span>Made with ⚡ for product thinkers.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
