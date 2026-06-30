'use client';

// Deterministic color palette for logo placeholders based on first letter
const LOGO_COLORS = [
  '#7C3AED', '#6366F1', '#EC4899', '#F59E0B',
  '#10B981', '#3B82F6', '#EF4444', '#8B5CF6',
  '#06B6D4', '#84CC16',
];

function getLogoColor(name) {
  const code = (name || 'A').charCodeAt(0);
  return LOGO_COLORS[code % LOGO_COLORS.length];
}

export default function ProductCard({ product, onClick }) {
  const { name, tagline, logo, category, region } = product;
  const logoColor = getLogoColor(name);
  const initial = (name || '?')[0].toUpperCase();

  return (
    <article
      className="product-card card-interactive"
      onClick={() => onClick(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(product);
        }
      }}
      aria-label={`View details for ${name}`}
    >
      {/* Logo */}
      <div className="product-logo" aria-hidden="true">
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
              fontSize: '1.25rem',
              borderRadius: 'inherit',
            }}
          >
            {initial}
          </span>
        )}
      </div>

      {/* Name & tagline */}
      <div>
        <p className="product-name">{name}</p>
        <p className="product-tagline">{tagline}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2" style={{ marginTop: 'auto' }}>
        {category && (
          <span className="badge badge-neutral">{category}</span>
        )}
        {region === 'india' ? (
          <span className="badge badge-india">🇮🇳 India</span>
        ) : (
          <span className="badge badge-global">🌍 Global</span>
        )}
      </div>
    </article>
  );
}
