'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import NewsCard from '@/components/hub/NewsCard';
import ProductCard from '@/components/dictionary/ProductCard';
import productsGlobal from '@/data/products-global.json';
import productsIndia from '@/data/products-india.json';
import { capitalize } from '@/lib/utils';

export default function DashboardPage() {
  const router = useRouter();
  
  // Dynamic stats
  const [stats, setStats] = useState({
    streak: 0,
    articlesRead: 0,
    productsExplored: 0
  });

  // Today's drill states
  const [drillCard, setDrillCard] = useState(null);
  const [isDrillCompleted, setIsDrillCompleted] = useState(false);
  const [isDrillLoading, setIsDrillLoading] = useState(true);

  // Latest News states
  const [news, setNews] = useState([]);
  const [isNewsLoading, setIsNewsLoading] = useState(true);

  // Static product list selection for dictionary preview
  const previewProducts = [...productsGlobal.slice(0, 2), ...productsIndia.slice(0, 1)];

  useEffect(() => {
    // 1. Fetch user stats from localStorage with clean fallbacks to 0
    const storedStreak = localStorage.getItem('pm-drill-streak');
    const storedArticles = localStorage.getItem('pm-articles-read-count');
    const storedProducts = localStorage.getItem('pm-products-explored-count');

    const todayStr = new Date().toISOString().split('T')[0];
    const completedToday = localStorage.getItem(`pm-drill-completed-${todayStr}`) === 'true';
    setIsDrillCompleted(completedToday);

    setStats({
      streak: storedStreak ? parseInt(storedStreak, 10) : 0,
      articlesRead: storedArticles ? parseInt(storedArticles, 10) : 0,
      productsExplored: storedProducts ? parseInt(storedProducts, 10) : 0
    });

    // 2. Fetch today's PM drill card
    const fetchDrill = async () => {
      try {
        setIsDrillLoading(true);
        const res = await fetch('/api/pm-drill');
        const data = await res.json();
        if (data.success && data.cards.length > 0) {
          setDrillCard(data.cards[0]);
        }
      } catch (err) {
        console.error('Failed to load drill card teaser:', err);
      } finally {
        setIsDrillLoading(false);
      }
    };

    // 3. Fetch latest news from Hub API
    const fetchNews = async () => {
      try {
        setIsNewsLoading(true);
        const res = await fetch('/api/news');
        const data = await res.json();
        if (data.articles) {
          setNews(data.articles.slice(0, 3)); // Grab latest 3
        }
      } catch (err) {
        console.error('Failed to load hub articles:', err);
      } finally {
        setIsNewsLoading(false);
      }
    };

    fetchDrill();
    fetchNews();
  }, []);

  const handleArticleClick = (articleId) => {
    // Increment read count in localStorage
    const storedCount = localStorage.getItem('pm-articles-read-count');
    const nextCount = (storedCount ? parseInt(storedCount, 10) : 0) + 1;
    localStorage.setItem('pm-articles-read-count', nextCount.toString());
    
    setStats(prev => ({ ...prev, articlesRead: nextCount }));
  };

  const handleProductClick = (product) => {
    // Increment explored count in localStorage
    const storedCount = localStorage.getItem('pm-products-explored-count');
    const nextCount = (storedCount ? parseInt(storedCount, 10) : 0) + 1;
    localStorage.setItem('pm-products-explored-count', nextCount.toString());
    
    setStats(prev => ({ ...prev, productsExplored: nextCount }));
    router.push(`/dictionary`);
  };

  const getBadgeClass = (type) => {
    switch (type) {
      case 'guesstimate': return 'badge-guesstimate';
      case 'rca': return 'badge-rca';
      case 'metrics': return 'badge-metrics';
      case 'framework': return 'badge-framework';
      case 'case-study': return 'badge-case-study';
      default: return 'badge-neutral';
    }
  };

  const getEmoji = (type) => {
    switch (type) {
      case 'guesstimate': return '📊';
      case 'rca': return '🕵️';
      case 'metrics': return '📈';
      case 'framework': return '🗺️';
      case 'case-study': return '🏢';
      default: return '🧠';
    }
  };

  return (
    <>
      {/* ── Page Header ───────────────────────────────── */}
      <div className="page-header animate-fade-in">
        <h1>Good morning, PM 👋</h1>
        <p className="subtitle">Your daily briefing is ready.</p>
      </div>

      {/* ── Stats Row ─────────────────────────────────── */}
      <section
        className="grid-3 animate-fade-in"
        style={{ marginBottom: 'var(--space-8)', animationDelay: '50ms' }}
        aria-label="Your stats"
      >
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <span className="stat-value" style={{ color: 'var(--warm)' }}>{stats.streak}</span>
            <span style={{ fontSize: '1.5rem' }} aria-hidden="true">🔥</span>
          </div>
          <span className="stat-label">Drill Streak</span>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <span className="stat-value" style={{ color: 'var(--accent)' }}>{stats.articlesRead}</span>
            <span style={{ fontSize: '1.5rem' }} aria-hidden="true">📰</span>
          </div>
          <span className="stat-label">Articles Read</span>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <span className="stat-value" style={{ color: 'var(--success)' }}>{stats.productsExplored}</span>
            <span style={{ fontSize: '1.5rem' }} aria-hidden="true">🚀</span>
          </div>
          <span className="stat-label">Products Explored</span>
        </div>
      </section>

      {/* ── Today's PM Drill ──────────────────────────── */}
      <section
        className="animate-fade-in"
        style={{ marginBottom: 'var(--space-8)', animationDelay: '100ms' }}
        aria-label="Today's PM Drill"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title" style={{ margin: 0 }}>Today&apos;s PM Drill 🃏</h2>
        </div>

        {isDrillLoading ? (
          <div className="skeleton" style={{ width: '100%', height: '140px' }} />
        ) : isDrillCompleted ? (
          <div className="card text-center" style={{ padding: 'var(--space-6)', border: '1px solid var(--success)', background: 'var(--success-subtle)' }}>
            <span style={{ fontSize: '1.5rem', marginRight: 'var(--space-2)' }}>🎉</span>
            <strong style={{ color: 'var(--text-primary)' }}>Daily Drill Mastered!</strong> Come back tomorrow to preserve your streak.
            <div style={{ marginTop: 'var(--space-3)' }}>
              <Link href="/pm-drill" className="btn btn-secondary btn-sm">
                Review cards again
              </Link>
            </div>
          </div>
        ) : drillCard ? (
          <div
            className="card card-hover"
            style={{
              background: 'linear-gradient(135deg, var(--bg-elevated) 0%, rgba(124,58,237,0.06) 100%)',
              borderColor: 'var(--accent-border)',
            }}
          >
            {/* Drill meta */}
            <div className="flex items-center gap-2" style={{ marginBottom: 'var(--space-3)' }}>
              <span className={`badge ${getBadgeClass(drillCard.type)}`}>
                {getEmoji(drillCard.type)} {capitalize(drillCard.type)}
              </span>
              <span className="badge badge-neutral" style={{ fontSize: '10px' }}>
                ⏱ ~5 min
              </span>
            </div>

            {/* Question preview */}
            <p
              className="font-medium"
              style={{
                color: 'var(--text-primary)',
                fontSize: 'var(--text-base)',
                lineHeight: 'var(--leading-snug)',
                marginBottom: 'var(--space-5)',
              }}
            >
              {drillCard.question}
            </p>

            {/* CTA */}
            <Link href="/pm-drill" className="btn btn-primary btn-lg">
              Start Today&apos;s Drill ⚡
            </Link>
          </div>
        ) : (
          <div className="card text-center" style={{ padding: 'var(--space-6)' }}>
            <p style={{ color: 'var(--text-secondary)' }}>Today&apos;s drill card is not ready yet.</p>
          </div>
        )}
      </section>

      {/* ── Latest from The Hub ────────────────────────── */}
      <section
        className="animate-fade-in"
        style={{ marginBottom: 'var(--space-8)', animationDelay: '150ms' }}
        aria-label="Latest from The Hub"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title" style={{ margin: 0 }}>Latest from The Hub 📰</h2>
          <Link href="/hub" className="btn btn-ghost btn-sm" style={{ color: 'var(--accent)' }}>
            View All →
          </Link>
        </div>

        {isNewsLoading ? (
          <div className="grid-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="skeleton" style={{ height: '280px' }} />
            ))}
          </div>
        ) : news.length > 0 ? (
          <div className="grid-3">
            {news.map((item) => (
              <div key={item.id} onClick={() => handleArticleClick(item.id)}>
                <NewsCard article={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center" style={{ padding: 'var(--space-6)' }}>
            <p style={{ color: 'var(--text-secondary)' }}>No articles available right now.</p>
          </div>
        )}
      </section>

      {/* ── Quick Dictionary ───────────────────────────── */}
      <section
        className="animate-fade-in"
        style={{ marginBottom: 'var(--space-8)', animationDelay: '200ms' }}
        aria-label="Quick Dictionary"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title" style={{ margin: 0 }}>Quick Dictionary 📚</h2>
          <Link href="/dictionary" className="btn btn-ghost btn-sm" style={{ color: 'var(--accent)' }}>
            Browse All →
          </Link>
        </div>

        <div className="grid-3">
          {previewProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => handleProductClick(product)}
            />
          ))}
        </div>
      </section>
    </>
  );
}
