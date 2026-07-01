'use client';

import BookmarkButton from './BookmarkButton';

/**
 * Formats a date string into a relative time label.
 * e.g. "2h ago", "Yesterday", "3 days ago", or a short date.
 */
function formatRelativeDate(dateString) {
  if (!dateString) return '';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';

  const now = new Date();
  const diffMs = now - date;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

export default function NewsCard({ article }) {
  if (!article) return null;

  const {
    title,
    url,
    source,
    category,
    publishedAt,
    description,
    imageUrl,
  } = article;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="news-card"
      aria-label={`Read article: ${title}`}
      style={{ position: 'relative' }}
    >
      {/* Bookmark button — persists to Supabase */}
      <div
        style={{
          position: 'absolute',
          top: 'var(--space-3)',
          right: 'var(--space-3)',
          zIndex: 2,
        }}
      >
        <BookmarkButton article={article} />
      </div>

      {/* Article image */}
      {imageUrl && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={imageUrl}
          alt={title}
          className="news-card-image"
          loading="lazy"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      )}

      {/* Card body */}
      <div className="news-card-body">
        <div className="news-card-meta">
          <span className="news-card-source">{source}</span>
          {category && (
            <span className="badge badge-neutral">{category}</span>
          )}
          <span className="news-card-date">{formatRelativeDate(publishedAt)}</span>
        </div>

        <h3 className="news-card-title">{title}</h3>

        {description && (
          <p className="news-card-excerpt">{description}</p>
        )}
      </div>
    </a>
  );
}
