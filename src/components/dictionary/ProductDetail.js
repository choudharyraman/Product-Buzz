'use client';

import { useState } from 'react';

// Deterministic color from name initial
const LOGO_COLORS = [
  '#7C3AED', '#6366F1', '#EC4899', '#F59E0B',
  '#10B981', '#3B82F6', '#EF4444', '#8B5CF6',
  '#06B6D4', '#84CC16',
];
function getLogoColor(name) {
  const code = (name || 'A').charCodeAt(0);
  return LOGO_COLORS[code % LOGO_COLORS.length];
}

// ------- Sub-components -------

function SectionDivider() {
  return <hr className="divider" />;
}

function SectionTitle({ children }) {
  return <h2 className="section-title">{children}</h2>;
}

function MetricPill({ value }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.25rem 0.75rem',
        borderRadius: 'var(--radius-full)',
        fontSize: 'var(--text-xs)',
        fontWeight: 'var(--weight-semibold)',
        background: 'var(--accent-subtle)',
        color: '#A78BFA',
        border: '1px solid var(--accent-border)',
        whiteSpace: 'nowrap',
      }}
    >
      {value}
    </span>
  );
}

// ------- Main component -------

export default function ProductDetail({ product, onClose }) {
  const [showBack] = useState(typeof onClose === 'function');

  if (!product) return null;

  const {
    name,
    tagline,
    logo,
    category,
    region,
    founded,
    founders,
    hq,
    businessModel,
    problem,
    keyFeatures = [],
    businessModelDetail,
    growthStory,
    keyMetrics = [],
    pmLessons = [],
  } = product;

  const logoColor = getLogoColor(name);
  const initial = (name || '?')[0].toUpperCase();

  return (
    <article
      className="animate-fade-in"
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-8)',
        overflowY: 'auto',
      }}
    >
      {/* Mobile back button */}
      {showBack && (
        <button
          className="btn btn-ghost btn-sm"
          onClick={onClose}
          style={{ marginBottom: 'var(--space-4)', gap: 'var(--space-2)' }}
          aria-label="Back to product list"
        >
          ← Back
        </button>
      )}

      {/* ── Section 1: Header ── */}
      <header>
        <div className="flex items-center gap-4" style={{ marginBottom: 'var(--space-4)' }}>
          {/* Logo */}
          <div
            className="product-logo"
            style={{ width: 64, height: 64, fontSize: '2rem', flexShrink: 0 }}
            aria-hidden="true"
          >
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo} alt={`${name} logo`} />
            ) : (
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                  background: `${logoColor}22`,
                  color: logoColor,
                  fontWeight: 700,
                  fontSize: '1.75rem',
                  borderRadius: 'inherit',
                }}
              >
                {initial}
              </span>
            )}
          </div>

          {/* Name + badges */}
          <div style={{ minWidth: 0 }}>
            <h1
              style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--weight-bold)',
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}
            >
              {name}
            </h1>
            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--text-secondary)',
                marginTop: 'var(--space-1)',
              }}
            >
              {tagline}
            </p>
            <div className="flex flex-wrap gap-2" style={{ marginTop: 'var(--space-3)' }}>
              {region === 'india' ? (
                <span className="badge badge-india">🇮🇳 India</span>
              ) : (
                <span className="badge badge-global">🌍 Global</span>
              )}
              {category && <span className="badge badge-neutral">{category}</span>}
              {businessModel && <span className="badge badge-accent">{businessModel}</span>}
            </div>
          </div>
        </div>

        {/* Metadata row */}
        <div
          className="flex flex-wrap gap-6"
          style={{
            marginTop: 'var(--space-4)',
            padding: 'var(--space-4)',
            background: 'var(--bg-overlay)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          {founded && (
            <div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Founded</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', fontWeight: 500 }}>{founded}</p>
            </div>
          )}
          {founders && (
            <div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Founders</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', fontWeight: 500 }}>{founders}</p>
            </div>
          )}
          {hq && (
            <div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>HQ</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', fontWeight: 500 }}>{hq}</p>
            </div>
          )}
        </div>
      </header>

      {/* ── Section 2: The Problem ── */}
      {problem && (
        <>
          <SectionDivider />
          <section aria-labelledby="problem-title">
            <SectionTitle><span id="problem-title">🎯 The Problem</span></SectionTitle>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
              {problem}
            </p>
          </section>
        </>
      )}

      {/* ── Section 3: Key Features ── */}
      {keyFeatures.length > 0 && (
        <>
          <SectionDivider />
          <section aria-labelledby="features-title">
            <SectionTitle><span id="features-title">⚡ Key Features</span></SectionTitle>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
              }}
            >
              {keyFeatures.map((feature, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--space-3)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-secondary)',
                    lineHeight: 'var(--leading-relaxed)',
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      flexShrink: 0,
                      marginTop: '0.45rem',
                    }}
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      {/* ── Section 4: Business Model ── */}
      {(businessModel || businessModelDetail) && (
        <>
          <SectionDivider />
          <section aria-labelledby="bm-title">
            <SectionTitle><span id="bm-title">💼 Business Model</span></SectionTitle>
            {businessModel && (
              <span
                className="badge badge-warm"
                style={{ marginBottom: 'var(--space-3)', display: 'inline-flex' }}
              >
                {businessModel}
              </span>
            )}
            {businessModelDetail && (
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)', marginTop: 'var(--space-2)' }}>
                {businessModelDetail}
              </p>
            )}
          </section>
        </>
      )}

      {/* ── Section 5: Growth Story ── */}
      {growthStory && (
        <>
          <SectionDivider />
          <section aria-labelledby="growth-title">
            <SectionTitle><span id="growth-title">📈 Growth Story</span></SectionTitle>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
              {growthStory}
            </p>
          </section>
        </>
      )}

      {/* ── Section 6: Key Metrics ── */}
      {keyMetrics.length > 0 && (
        <>
          <SectionDivider />
          <section aria-labelledby="metrics-title">
            <SectionTitle><span id="metrics-title">📊 Key Metrics</span></SectionTitle>
            <div className="flex flex-wrap gap-2">
              {keyMetrics.map((metric, i) => (
                <MetricPill key={i} value={metric} />
              ))}
            </div>
          </section>
        </>
      )}

      {/* ── Section 7: PM Lessons ── */}
      {pmLessons.length > 0 && (
        <>
          <SectionDivider />
          <section
            aria-labelledby="lessons-title"
            style={{
              background: 'var(--accent-subtle)',
              border: '1px solid var(--accent-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-6)',
            }}
          >
            <SectionTitle>
              <span id="lessons-title" style={{ color: '#A78BFA' }}>🎯 PM Lessons</span>
            </SectionTitle>
            <ol
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
                counterReset: 'pm-lesson',
              }}
            >
              {pmLessons.map((lesson, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--space-3)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-secondary)',
                    lineHeight: 'var(--leading-relaxed)',
                  }}
                >
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 24,
                      height: 24,
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--accent)',
                      color: 'white',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700,
                      flexShrink: 0,
                      marginTop: '0.1rem',
                    }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  {lesson}
                </li>
              ))}
            </ol>
          </section>
        </>
      )}
    </article>
  );
}
