'use client';

import { useState } from 'react';
import Link from 'next/link';

const topBriefs = [
  { category: 'AI INTEGRATION', title: 'OpenAI unveils agent tools', desc: 'New APIs allow systems to execute tasks autonomously.', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=150' },
  { category: 'M&A UPDATE', title: 'Figma acquires design startup', desc: 'Strategic deal aims to bolster collaborative whiteboard features.', image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80&w=150' },
  { category: 'REGULATION', title: 'EU tightens tech privacy rules', desc: 'Strict compliance audits target digital market platforms.', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=150' },
  { category: 'STRATEGY', title: 'Netflix expands gaming tier', desc: 'Mobile catalog grows as retention-boosting strategy.', image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=150' },
  { category: 'FINTECH', title: 'Stripe hits valuation record', desc: 'Global digital transactions surge past projection marks.', image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=150' },
];

const sidebarShorts = [
  { title: 'CAGR Explained', desc: 'Compound Annual Growth Rate represents the smoothed annual rate of product growth over time.' },
  { title: 'North Star Metric', desc: 'The single key metric that best captures the core value your product delivers to its customers.' },
  { title: 'Cohort Retention', desc: 'Tracking user behavior over time to see what percentage return in subsequent weeks.' },
  { title: 'ARPU Pivot', desc: 'Average Revenue Per User. Crucial for understanding monetization growth curves.' },
  { title: 'LTV/CAC Ratio', desc: 'Life-Time Value vs Customer Acquisition Cost. Ideal product health ratio is 3:1.' },
];

const trendingProducts = [
  { rank: '1', category: 'Foodtech / Delivery', title: 'Zomato', desc: 'Decoding unit economics of India\'s dominant delivery network.', readTime: '5 min read' },
  { rank: '2', category: 'Fintech / Payments', title: 'Paytm', desc: 'Understanding soundbox monetization & lending pivot.', readTime: '6 min read' },
  { rank: '3', category: 'Fintech / Rewards', title: 'CRED', desc: 'How premium rewards drive high-value card spending.', readTime: '4 min read' },
  { rank: '4', category: 'DevTools / SaaS', title: 'Postman', desc: 'How a simple helper became a global API standard.', readTime: '7 min read' },
  { rank: '5', category: 'E-Commerce / Social', title: 'Meesho', desc: 'Unpacking the zero-commission marketplace model.', readTime: '5 min read' },
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
    <div className="editorial-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '0 var(--space-4)' }}>
      
      {/* ── Top Auxiliary Navigation ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-2) 0', fontSize: '12px', borderBottom: '1px solid var(--ed-border-subtle)', color: 'var(--ed-muted)' }}>
        <div>
          <span style={{ marginRight: '16px' }}>🌐 www.productbuzz.app</span>
          <span>📧 contact@productbuzz.app</span>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Link href="/login" style={{ textDecoration: 'none', color: 'var(--ed-ink)', fontWeight: 600 }}>Sign In</Link>
          <Link href="/signup" style={{ textDecoration: 'none', color: 'var(--ed-crimson)', fontWeight: 700 }}>Get Started</Link>
        </div>
      </div>

      {/* ── Masthead (Centered Logo & Newspaper Meta) ── */}
      <header style={{ padding: 'var(--space-6) 0 var(--space-4) 0', textAlign: 'center' }}>
        <h1 className="font-editorial-display" style={{
          fontSize: '4.5rem',
          fontWeight: 800,
          margin: 0,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          color: 'var(--ed-ink)',
          textTransform: 'capitalize'
        }}>
          The Product Buzz
        </h1>
        
        <p style={{
          fontFamily: 'sans-serif',
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.25em',
          margin: 'var(--space-2) 0 var(--space-4) 0',
          color: 'var(--ed-crimson)'
        }}>
          ★ TRUSTED DAILY PM INTELLIGENCE ★
        </p>

        {/* Dateline bar */}
        <div className="news-border-double" style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '6px var(--space-4)',
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          <span>VOL. II NO. 182</span>
          <span>NEW DELHI, WEDNESDAY, JULY 1, 2026</span>
          <span>5 MINUTE READS</span>
          <span>FREE ACCESS</span>
        </div>
      </header>

      {/* ── Top News Strip (5 Column Small News Boxes) ── */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        borderBottom: '1px solid var(--ed-border)',
        paddingBottom: 'var(--space-2)',
        marginBottom: 'var(--space-6)'
      }}>
        {topBriefs.map((brief, index) => (
          <div
            key={index}
            className="news-box-small"
            style={{
              borderRight: index < topBriefs.length - 1 ? '1px solid var(--ed-border-subtle)' : 'none',
              paddingRight: 'var(--space-4)',
              paddingLeft: index > 0 ? 'var(--space-4)' : '0'
            }}
          >
            <img src={brief.image} alt={brief.title} />
            <div>
              <span className="news-tag-crimson" style={{ fontSize: '9px' }}>{brief.category}</span>
              <h4>{brief.title}</h4>
              <p style={{ fontSize: '11px', color: 'var(--ed-muted)', margin: 0 }}>{brief.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── Main Front-Page Layout (3-Column Grid) ── */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: 'var(--space-6)',
        marginBottom: 'var(--space-8)'
      }} className="lg:grid-cols-12">
        
        {/* Column 1: Buzz In Short (Left Sidebar - 2/12 cols) */}
        <aside className="lg:col-span-2 news-divider-vertical" style={{ paddingRight: 'var(--space-4)' }}>
          <h3 className="news-sidebar-title">Buzz In Short</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {sidebarShorts.map((item, index) => (
              <div
                key={index}
                style={{
                  borderBottom: index < sidebarShorts.length - 1 ? '1px solid var(--ed-border-subtle)' : 'none',
                  paddingBottom: 'var(--space-3)'
                }}
              >
                <span className="news-tag-crimson" style={{ fontSize: '9px' }}>DEFINITIONS</span>
                <h4 className="font-editorial-display" style={{ fontSize: '14px', fontWeight: 700, margin: '2px 0 4px 0', color: 'var(--ed-ink)' }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--ed-muted)', margin: 0, lineHeight: 1.4 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </aside>

        {/* Column 2: Center Lead Story (Middle - 7/12 cols) */}
        <article className="lg:col-span-7 news-divider-vertical" style={{ paddingRight: 'var(--space-4)' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <span className="news-tag-crimson" style={{ alignSelf: 'flex-start' }}>★ FRONT PAGE FEATURE</span>
            
            <h2 className="news-main-headline">
              Flood of Daily Drills Sweeps Product Management Community
            </h2>
            
            <p className="news-sub-headline">
              Over 50,000 product thinkers build daily guesstimate and metric analysis habits using micro-swiping cards.
            </p>

            {/* Newspaper style photo with caption */}
            <div style={{ margin: 'var(--space-2) 0' }}>
              <img
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1200"
                alt="Product meeting"
                style={{ width: '100%', height: '240px', objectFit: 'cover', filter: 'grayscale(1)' }}
              />
              <p style={{ fontSize: '11px', color: 'var(--ed-muted)', margin: '4px 0 0 0', fontStyle: 'italic', borderBottom: '1px solid var(--ed-border-subtle)', paddingBottom: '6px' }}>
                PM professionals reviewing metric formulas and guesstimate scenarios in a daily brief sprint.
              </p>
            </div>

            {/* Multi-column text body */}
            <div className="news-text-cols-2" style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--ed-ink)', textAlign: 'justify' }}>
              Great Product Managers are not born—they are built through daily discipline. 
              As tech industries consolidate, early-stage and transitioning product leaders face rigorous interviews requiring top-tier instincts. 
              To help PMs build these habits, Product Buzz has deployed a micro-drill engine containing over 60 guesstimate challenge cards.
              <br /><br />
              The drills are designed to take exactly five minutes a day. Subscribers swipe through guesstimate logic, metrics, and root-cause issues, building muscle memory. Try a simulated card below to experience the system.
            </div>

            {/* Simulated Interactive Card */}
            <div style={{
              background: '#ffffff',
              border: '2px solid var(--ed-border)',
              borderRadius: '2px',
              padding: 'var(--space-5)',
              marginTop: 'var(--space-4)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="news-tag-crimson" style={{ fontSize: '10px' }}>
                  🧮 GUESSTIMATE CHALLENGE
                </span>
                <span style={{ fontSize: '11px', color: 'var(--ed-muted)', fontWeight: 600 }}>CARD 1 OF 5</span>
              </div>

              <p style={{ fontSize: '1.25rem', fontFamily: 'Playfair Display', fontWeight: 700, color: 'var(--ed-ink)', margin: 0, lineHeight: 1.3 }}>
                Estimate the daily order volume of a Tier-2 city quick-commerce app in India.
              </p>

              {!drillRevealed ? (
                <button
                  onClick={() => setDrillRevealed(true)}
                  className="news-btn-ghost"
                  style={{ alignSelf: 'flex-start', padding: '4px 10px', fontSize: '11px' }}
                >
                  💡 Tap to reveal helper variables & solution
                </button>
              ) : (
                <div style={{ fontSize: '12px', color: 'var(--ed-muted)', borderLeft: '2px solid var(--ed-crimson)', paddingLeft: '12px', lineHeight: 1.5 }}>
                  <p style={{ fontWeight: 700, margin: '0 0 6px 0', color: 'var(--ed-ink)' }}>Approach & Solution Outline:</p>
                  <ul style={{ margin: 0, paddingLeft: '14px' }}>
                    <li><strong>Target population:</strong> Tier-2 city (~1,000,000 people, ~250,000 households).</li>
                    <li><strong>Q-Commerce adoption:</strong> ~15% active user penetration = 37,500 active ordering households.</li>
                    <li><strong>Frequency:</strong> ~2 orders/week per active household = ~10,700 orders/day total in the city.</li>
                    <li><strong>Market Share:</strong> Assuming this app has a 40% market share = <strong>~4,300 daily orders</strong>.</li>
                  </ul>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    <button onClick={() => { setDrillAnswered(true); setDrillRevealed(false); }} className="news-btn-crimson" style={{ padding: '3px 8px', fontSize: '10px' }}>Got it ✓</button>
                    <button onClick={() => { setDrillAnswered(true); setDrillRevealed(false); }} className="news-btn-ghost" style={{ padding: '3px 8px', fontSize: '10px' }}>Need review</button>
                  </div>
                </div>
              )}

              {drillAnswered && (
                <div style={{
                  border: '1px solid var(--ed-border)',
                  background: 'var(--ed-bg)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '16px',
                  textAlign: 'center',
                  marginTop: '10px'
                }}>
                  <span style={{ fontSize: '1.25rem', fontFamily: 'Playfair Display', fontWeight: 700, marginBottom: '6px' }}>🔥 Habit Loop Triggered!</span>
                  <p style={{ fontSize: '12px', margin: '0 0 12px 0', color: 'var(--ed-muted)' }}>
                    Sign up now to lock in your daily streak, unlock 60+ cards, and see global PM dashboards!
                  </p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Link href="/signup" className="news-btn-crimson" style={{ padding: '5px 10px', fontSize: '11px' }}>Create Account</Link>
                    <button onClick={() => setDrillAnswered(false)} className="news-btn-ghost" style={{ padding: '5px 10px', fontSize: '11px' }}>Try Again</button>
                  </div>
                </div>
              )}
            </div>

            <div style={{ marginTop: 'var(--space-4)' }}>
              <Link href="/signup" className="news-btn-crimson" style={{ gap: 'var(--space-2)' }}>
                Start Your Daily Workout →
              </Link>
            </div>
          </div>
        </article>

        {/* Column 3: Trending Dictionary (Right Sidebar - 3/12 cols) */}
        <aside className="lg:col-span-3" style={{ paddingLeft: 'var(--space-2)' }}>
          <h3 className="news-sidebar-title">Trending Deep Dives</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {trendingProducts.map((p) => (
              <Link
                key={p.rank}
                href="/login"
                style={{
                  display: 'flex',
                  gap: 'var(--space-3)',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--ed-border-subtle)',
                  paddingBottom: 'var(--space-3)',
                  cursor: 'pointer'
                }}
                className="group"
              >
                <span className="font-editorial-display" style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  lineHeight: 1,
                  color: 'var(--ed-crimson)'
                }}>
                  {p.rank}
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span className="news-tag-crimson" style={{ fontSize: '9px' }}>
                    {p.category}
                  </span>
                  <h4 className="font-editorial-display" style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    color: 'var(--ed-ink)',
                    margin: 0
                  }}>
                    {p.title}
                  </h4>
                  <p style={{ fontSize: '12px', color: 'var(--ed-muted)', margin: 0, lineHeight: 1.3 }}>
                    {p.desc}
                  </p>
                  <span style={{ fontSize: '10px', color: 'var(--ed-muted)', marginTop: '2px' }}>
                    {p.readTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </section>

      {/* Divider */}
      <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--ed-border)', margin: 'var(--space-8) 0' }}></div>

      {/* ── Bottom Section: Product of the Day Banner ── */}
      <section style={{ marginBottom: 'var(--space-10)' }}>
        <div style={{
          border: '1px solid var(--ed-border)',
          background: '#ffffff',
          display: 'grid',
          gridTemplateColumns: '1fr',
          overflow: 'hidden'
        }} className="md:grid-cols-2">
          <div style={{
            height: '240px',
            backgroundImage: 'url("https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(1)'
          }} className="md:h-auto">
          </div>

          <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'var(--space-3)' }}>
            <div>
              <span className="news-tag-crimson">PRODUCT OF THE DAY</span>
            </div>
            <h2 className="font-editorial-display" style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--ed-ink)', margin: 0 }}>
              Zepto — The Q-Comm Speed Demon
            </h2>
            <p style={{ fontSize: '12px', color: 'var(--ed-muted)', margin: 0, lineHeight: 1.5 }}>
              How Zepto redefined convenience commerce in India, building a $5B business in under 4 years by optimizing dark store layouts and delivery paths.
            </p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
              <Link href="/login" className="news-btn-ink">
                Deep Dive Analysis
              </Link>
              <Link href="/signup" className="news-btn-ghost">
                Unlock 80+ Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Insights Section ── */}
      <section style={{ marginBottom: 'var(--space-12)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', borderBottom: '2px solid var(--ed-border)', paddingBottom: '4px' }}>
          <h2 className="font-editorial-display" style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>
            Latest Insights
          </h2>
          <Link href="/signup" style={{ textDecoration: 'none', color: 'var(--ed-crimson)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>
            View All →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-6)' }} className="md:grid-cols-3">
          {insights.map((insight, i) => (
            <article key={i} style={{ display: 'flex', flexDirection: 'column', border: '1px solid var(--ed-border)', background: '#ffffff', padding: 'var(--space-4)' }}>
              <div style={{ height: '140px', backgroundImage: `url(${insight.image})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(1)', marginBottom: 'var(--space-3)' }}></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flexGrow: 1 }}>
                <span className="news-tag-crimson" style={{ fontSize: '9px' }}>
                  {insight.category}
                </span>
                <h3 className="font-editorial-display" style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--ed-ink)', margin: 0, lineHeight: 1.25 }}>
                  {insight.title}
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--ed-muted)', margin: 0, lineHeight: 1.4 }}>
                  {insight.desc}
                </p>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px dashed var(--ed-border-subtle)', fontSize: '11px', color: 'var(--ed-muted)' }}>
                  <span style={{ fontWeight: 600 }}>{insight.author}</span>
                  <span>{insight.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        borderTop: '3px double var(--ed-border)',
        backgroundColor: 'transparent',
        marginTop: 'auto',
        padding: 'var(--space-8) 0'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-6)' }} className="md:grid-cols-12">
          
          {/* Newsletter Box */}
          <div className="md:col-span-5" style={{
            backgroundColor: '#ffffff',
            padding: 'var(--space-4)',
            border: '1px solid var(--ed-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)'
          }}>
            <h3 className="font-editorial-display" style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
              Intelligence, Delivered.
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--ed-muted)', margin: 0, lineHeight: 1.4 }}>
              Join 50,000+ product leaders receiving our weekly synthesis of strategy, design, and growth.
            </p>
            
            {!subscribed ? (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    flexGrow: 1,
                    backgroundColor: 'var(--ed-bg)',
                    border: '1px solid var(--ed-border)',
                    borderRadius: '2px',
                    padding: '6px 10px',
                    fontSize: '12px',
                    outline: 'none',
                    color: 'var(--ed-ink)'
                  }}
                />
                <button type="submit" className="news-btn-crimson" style={{ padding: '6px 12px', fontSize: '11px' }}>
                  Subscribe
                </button>
              </form>
            ) : (
              <div style={{ fontSize: '12px', color: 'var(--ed-crimson)', fontWeight: 700 }}>
                ✓ Thank you! You&apos;re subscribed.
              </div>
            )}
          </div>

          {/* Links columns */}
          <div className="md:col-span-7" style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-10)', flexWrap: 'wrap' }}>
            <div>
              <span className="font-editorial-display" style={{ fontSize: '1.15rem', fontWeight: 700, display: 'block', marginBottom: '10px' }}>
                ProductBuzz
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                <Link href="/login" style={{ textDecoration: 'none', color: 'var(--ed-muted)' }}>Archives</Link>
                <Link href="/signup" style={{ textDecoration: 'none', color: 'var(--ed-muted)' }}>About</Link>
              </div>
            </div>
            <div>
              <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '10px', color: 'var(--ed-muted)' }}>
                Legal
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                <Link href="/signup" style={{ textDecoration: 'none', color: 'var(--ed-muted)' }}>Privacy Policy</Link>
                <Link href="/signup" style={{ textDecoration: 'none', color: 'var(--ed-muted)' }}>Terms of Service</Link>
              </div>
            </div>
          </div>

        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 'var(--space-6)',
          borderTop: '1px solid var(--ed-border-subtle)',
          marginTop: 'var(--space-6)',
          fontSize: '11px',
          color: 'var(--ed-muted)'
        }}>
          <span>© 2026 The Product Buzz. All rights reserved.</span>
          <span>Made for product thinkers.</span>
        </div>
      </footer>
    </div>
  );
}
