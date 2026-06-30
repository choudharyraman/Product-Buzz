'use client';

import React, { useState, useEffect } from 'react';
import StreakBadge from '@/components/pm-drill/StreakBadge';
import SwipeDeck from '@/components/pm-drill/SwipeDeck';

export default function PMDrillPage() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Daily completion check
  const [isCompletedToday, setIsCompletedToday] = useState(false);
  const [streak, setStreak] = useState(3); // default streak, would connect to profile
  const [hasMasteredSession, setHasMasteredSession] = useState(false);

  useEffect(() => {
    // Check if user completed the drill today from localStorage
    const todayStr = new Date().toISOString().split('T')[0];
    const completionKey = `pm-drill-completed-${todayStr}`;
    const completed = localStorage.getItem(completionKey) === 'true';
    setIsCompletedToday(completed);

    // Retrieve active streak
    const storedStreak = localStorage.getItem('pm-drill-streak');
    if (storedStreak) {
      setStreak(parseInt(storedStreak, 10));
    } else {
      localStorage.setItem('pm-drill-streak', '3'); // Set a seed streak for a nice experience
    }

    // Fetch daily cards
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
        setError('Failed to load today\'s PM Drill cards. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
  }, []);

  const handleDrillComplete = (count) => {
    const todayStr = new Date().toISOString().split('T')[0];
    localStorage.setItem(`pm-drill-completed-${todayStr}`, 'true');
    
    // Increment streak if not completed today
    if (!isCompletedToday) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      localStorage.setItem('pm-drill-streak', nextStreak.toString());
      setIsCompletedToday(true);
    }
    setHasMasteredSession(true);
  };

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
        <StreakBadge streak={streak} isActive={true} />
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
              Excellent discipline. You have already completed today&apos;s workout. Your streak is secure at <strong>{streak} days</strong>.
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
