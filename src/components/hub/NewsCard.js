'use client';

import { useState } from 'react';

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
  const [bookmarked, setBookmarked] = useState(false);

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

  function handleBookmark(e) {
    e.preventDefault();
    e.stopPropagation();
    setBookmarked((prev) => !prev);
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="news-card"
      aria-label={`Read article: ${title}`}
      style={{ position: 'relative' }}
    >
      {/* Bookmark button */}
      <button
        className="btn btn-ghost btn-icon"
        onClick={handleBookmark}
        aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark article'}
        title={bookmarked ? 'Bookmarked' : 'Bookmark'}
        style={{
          position: 'absolute',
          top: 'var(--space-3)',
          right: 'var(--space-3)',
          zIndex: 2,
          color: bookmarked ? 'var(--accent)' : 'var(--text-muted)',
          transition: 'color var(--transition-fast)',
        }}
      >
        {bookmarked ? (
          /* Filled heart */
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        ) : (
          /* Outline heart */
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        )}
      </button>

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
