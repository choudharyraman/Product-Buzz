'use client';

import React, { useState, useEffect, useCallback } from 'react';
import StreakBadge from '@/components/pm-drill/StreakBadge';
import SwipeDeck from '@/components/pm-drill/SwipeDeck';

export default function PMDrillPage() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isCompletedToday, setIsCompletedToday] = useState(false);
  const [streak, setStreak] = useState(0);
  const [hasMasteredSession, setHasMasteredSession] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);

  // Load profile from Supabase (streak + last_drill_date)
  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];

    async function loadProfile() {
      try {
        const res = await fetch('/api/profile');
        if (res.ok) {
          const { data } = await res.json();
          if (data) {
            setStreak(data.streak_count ?? 0);
            setIsCompletedToday(data.last_drill_date === todayStr);
          }
        } else {
          // Not logged in or profile not found — fall back to localStorage
          const storedStreak = localStorage.getItem('pm-drill-streak');
          const localCompleted = localStorage.getItem(`pm-drill-completed-${todayStr}`) === 'true';
          setStreak(storedStreak ? parseInt(storedStreak, 10) : 0);
          setIsCompletedToday(localCompleted);
        }
      } catch {
        // Offline fallback
        const storedStreak = localStorage.getItem('pm-drill-streak');
        const localCompleted = localStorage.getItem(`pm-drill-completed-${todayStr}`) === 'true';
        setStreak(storedStreak ? parseInt(storedStreak, 10) : 0);
        setIsCompletedToday(localCompleted);
      } finally {
        setProfileLoaded(true);
      }
    }

    loadProfile();
  }, []);

  // Fetch daily drill cards
  useEffect(() => {
    const fetchCards = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/pm-drill');
        const data = await res.json();
        if (data.success) {
          setCards(data.cards);
        } else {
          throw new Error(data.error || 'Failed to fetch cards');
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load today's PM Drill cards. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCards();
  }, []);

  const handleDrillComplete = useCallback(async () => {
    const todayStr = new Date().toISOString().split('T')[0];
    if (isCompletedToday) {
      setHasMasteredSession(true);
      return;
    }

    const nextStreak = streak + 1;
    // Optimistic UI
    setStreak(nextStreak);
    setIsCompletedToday(true);
    setHasMasteredSession(true);

    // Persist to localStorage as offline backup
    localStorage.setItem(`pm-drill-completed-${todayStr}`, 'true');
    localStorage.setItem('pm-drill-streak', nextStreak.toString());

    // Sync to Supabase
    try {
      await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          streak_count: nextStreak,
          last_drill_date: todayStr,
          longest_streak: nextStreak, // server will MAX() this
        }),
      });
    } catch (err) {
      console.error('Failed to sync streak to Supabase:', err);
      // Already updated locally — no rollback needed for UX
    }
  }, [streak, isCompletedToday]);

  return (
    <div className="flex flex-col gap-6 animate-fade-in" style={{ width: '100%', minHeight: '80dvh' }}>

      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--weight-bold)', letterSpacing: '-0.02em' }}>
            PM Drill 🃏
          </h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Sharp tools require daily practice. Workout your PM muscle in 5 minutes.
          </p>
        </div>
        {profileLoaded && <StreakBadge streak={streak} isActive={streak > 0} />}
      </div>

      <hr className="divider" style={{ marginBlock: '0' }} />

      {/* Main Deck Display */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        {isLoading ? (
          <div className="flex flex-col items-center gap-4" style={{ width: '100%', maxWidth: '480px' }}>
            <div className="skeleton" style={{ width: '100%', height: '320px' }} />
            <div className="skeleton" style={{ width: '60%', height: '16px' }} />
          </div>
        ) : error ? (
          <div className="card text-center" style={{ padding: 'var(--space-8)', maxWidth: '400px' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-3)' }}>⚠️</div>
            <p style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>{error}</p>
            <button className="btn btn-primary" onClick={() => window.location.reload()}>Try Again</button>
          </div>
        ) : isCompletedToday && !hasMasteredSession ? (
          <div className="card text-center animate-scale-in" style={{
            padding: 'var(--space-8)',
            maxWidth: '440px',
            background: 'linear-gradient(135deg, var(--bg-elevated) 0%, rgba(16, 185, 129, 0.03) 100%)',
            border: '1px solid var(--border-default)'
          }}>
            <div style={{ fontSize: '4.5rem', marginBottom: 'var(--space-4)' }}>🎉</div>
            <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-bold)', marginBottom: 'var(--space-2)' }}>
              Daily Drill Completed!
            </h2>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
              Excellent discipline. You&apos;ve already completed today&apos;s workout. Your streak is secure at <strong>{streak} {streak === 1 ? 'day' : 'days'}</strong>.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <button
                className="btn btn-primary"
                onClick={() => setIsCompletedToday(false)}
                style={{ width: '100%' }}
              >
                🔄 Redo Today&apos;s Drill
              </button>
              <a href="/hub" className="btn btn-secondary" style={{ width: '100%' }}>
                📰 Go to The Hub
              </a>
            </div>
          </div>
        ) : (
          <SwipeDeck
            cards={cards}
            onComplete={handleDrillComplete}
            streak={streak}
          />
        )}
      </div>

    </div>
  );
}
