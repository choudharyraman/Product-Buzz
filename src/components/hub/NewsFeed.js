'use client';

import { useState, useMemo } from 'react';
import NewsCard from './NewsCard';
import FeaturedArticle from './FeaturedArticle';
import CategoryFilter from './CategoryFilter';

const ALL_CATEGORIES = [
  { id: 'all', label: 'All', icon: '🌐' },
  { id: 'product', label: 'Product', icon: '📦' },
  { id: 'strategy', label: 'Strategy', icon: '♟️' },
  { id: 'tech', label: 'Tech', icon: '⚡' },
  { id: 'growth', label: 'Growth', icon: '📈' },
  { id: 'design', label: 'Design', icon: '🎨' },
  { id: 'data', label: 'Data', icon: '📊' },
];

function SkeletonCard() {
  return (
    <div
      className="skeleton"
      role="status"
      aria-label="Loading article"
      style={{ height: '280px', borderRadius: 'var(--radius-lg)' }}
    />
  );
}

export default function NewsFeed({ articles = [], isLoading = false }) {
  const [activeCategory, setActiveCategory] = useState('all');

  // Derive which category pills to show based on articles present
  const availableCategories = useMemo(() => {
    if (!articles.length) return ALL_CATEGORIES;
    const foundIds = new Set(
      articles.map((a) => a.categoryId?.toLowerCase()).filter(Boolean)
    );
    return ALL_CATEGORIES.filter(
      (c) => c.id === 'all' || foundIds.has(c.id)
    );
  }, [articles]);

  // Filter articles by active category
  const filteredArticles = useMemo(() => {
    if (activeCategory === 'all') return articles;
    return articles.filter(
      (a) => a.categoryId?.toLowerCase() === activeCategory
    );
  }, [articles, activeCategory]);

  const [featuredArticle, ...gridArticles] = filteredArticles;

  // ── Loading state ─────────────────────────────────────
  if (isLoading) {
    return (
      <div>
        {/* Featured skeleton */}
        <div
          className="skeleton"
          role="status"
          aria-label="Loading featured article"
          style={{
            height: '260px',
            borderRadius: 'var(--radius-xl)',
            marginBottom: 'var(--space-6)',
          }}
        />
        {/* Filter pills skeleton */}
        <div
          className="skeleton"
          style={{
            height: '38px',
            borderRadius: 'var(--radius-full)',
            marginBottom: 'var(--space-6)',
            maxWidth: '420px',
          }}
        />
        {/* Grid skeletons */}
        <div className="news-feed-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  // ── Empty state ───────────────────────────────────────
  if (!isLoading && filteredArticles.length === 0) {
    return (
      <>
        <CategoryFilter
          categories={availableCategories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <div className="empty-state" style={{ marginTop: 'var(--space-8)' }}>
          <span className="icon" aria-hidden="true">📰</span>
          <h3>No articles found</h3>
          <p>
            {activeCategory !== 'all'
              ? 'Try switching to a different category or check back shortly.'
              : 'We couldn\'t fetch the latest PM news. Please try again in a moment.'}
          </p>
        </div>
      </>
    );
  }

  // ── Main feed ─────────────────────────────────────────
  return (
    <div>
      {/* Featured article hero */}
      {featuredArticle && (
        <FeaturedArticle article={featuredArticle} />
      )}

      {/* Category filter pills */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <CategoryFilter
          categories={availableCategories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      {/* News grid */}
      {gridArticles.length > 0 ? (
        <div className="news-feed-grid">
          {gridArticles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span className="icon" aria-hidden="true">📰</span>
          <h3>No articles found</h3>
          <p>Try switching to a different category.</p>
        </div>
      )}
    </div>
  );
}
