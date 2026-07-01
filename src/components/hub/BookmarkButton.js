'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

/**
 * BookmarkButton — persists article bookmarks to Supabase.
 * Falls back gracefully when the user is not logged in (local state only).
 */
export default function BookmarkButton({ article, initialBookmarked = false }) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [isLoading, setIsLoading] = useState(false);

  const toggleBookmark = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLoading) return;

    // Optimistic update
    const next = !bookmarked;
    setBookmarked(next);
    setIsLoading(true);

    try {
      if (next) {
        // Save
        await fetch('/api/bookmarks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            article_url: article.url,
            article_title: article.title,
            article_source: article.source,
            article_image: article.imageUrl || null,
            article_description: article.description || null,
            article_category: article.category || null,
          }),
        });
      } else {
        // Remove
        await fetch('/api/bookmarks', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ article_url: article.url }),
        });
      }
    } catch (err) {
      // Rollback on error
      console.error('Bookmark error:', err);
      setBookmarked(!next);
    } finally {
      setIsLoading(false);
    }
  }, [article, bookmarked, isLoading]);

  return (
    <button
      className="btn btn-ghost btn-icon"
      onClick={toggleBookmark}
      aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark article'}
      title={bookmarked ? 'Bookmarked' : 'Bookmark'}
      disabled={isLoading}
      style={{
        color: bookmarked ? 'var(--accent)' : 'var(--text-muted)',
        transition: 'color var(--transition-fast)',
        opacity: isLoading ? 0.6 : 1,
      }}
    >
      {bookmarked ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      )}
    </button>
  );
}
