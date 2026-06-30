'use client';

import { useState, useEffect } from 'react';
import NewsFeed from '@/components/hub/NewsFeed';

// SEO metadata must live in a separate server-only file when 'use client' is present.
// See: src/app/(dashboard)/hub/metadata.js

export default function HubPage() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchedAt, setFetchedAt] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchNews() {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch('/api/news');
        if (!res.ok) {
          throw new Error(`Failed to load news (${res.status})`);
        }
        const data = await res.json();
        if (!cancelled) {
          setArticles(data.articles ?? []);
          setFetchedAt(data.fetchedAt ?? null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Something went wrong.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchNews();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="page-content">
      {/* Page header */}
      <div className="page-header">
        <h1>
          The Hub{' '}
          <span className="gradient-text" aria-hidden="true">📡</span>
        </h1>
        <p className="subtitle">Global PM intelligence, curated daily.</p>
        {fetchedAt && !isLoading && (
          <p
            className="text-xs text-muted"
            style={{ marginTop: 'var(--space-1)' }}
            aria-live="polite"
          >
            Last updated:{' '}
            {new Date(fetchedAt).toLocaleTimeString('en-IN', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        )}
      </div>

      {/* Error banner */}
      {error && !isLoading && (
        <div
          role="alert"
          style={{
            background: 'var(--error-subtle)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-3) var(--space-4)',
            marginBottom: 'var(--space-6)',
            color: 'var(--error)',
            fontSize: 'var(--text-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
          }}
        >
          <span aria-hidden="true">⚠️</span>
          {error} — Showing cached or partial results below.
        </div>
      )}

      {/* Main feed */}
      <NewsFeed articles={articles} isLoading={isLoading} />
    </div>
  );
}
