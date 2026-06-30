'use client';

import React from 'react';
import Link from 'next/link';

export default function DrillResult({ total = 5, gotIt = 0, reviewCount = 0, onRestart, streak = 0 }) {
  const getHeaderInfo = () => {
    const score = gotIt / total;
    if (score >= 0.8) {
      return { emoji: '🎯', title: 'Outstanding Workout!', desc: 'You nailed your PM drill today. Your product instincts are razor sharp!' };
    } else if (score >= 0.5) {
      return { emoji: '💪', title: 'Strong Session!', desc: 'Solid workout. A few terms to review, but you are building robust instincts.' };
    } else {
      return { emoji: '📖', title: 'Keep Learning!', desc: 'No sweat! Daily learning is a marathon. Review these concepts to cement them.' };
    }
  };

  const { emoji, title, desc } = getHeaderInfo();

  return (
    <div className="card animate-scale-in" style={{ 
      maxWidth: '480px', 
      margin: '0 auto', 
      textAlign: 'center', 
      padding: 'var(--space-8)',
      background: 'linear-gradient(135deg, var(--bg-elevated) 0%, rgba(124, 58, 237, 0.05) 100%)',
      border: '1px solid var(--border-default)'
    }}>
      <div style={{ fontSize: '4rem', marginBottom: 'var(--space-4)' }}>{emoji}</div>
      
      <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--weight-bold)', marginBottom: 'var(--space-2)' }}>
        {title}
      </h2>
      
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
        {desc}
      </p>

      {/* Streak Badge */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-6)' }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: 'var(--space-2)',
          padding: 'var(--space-2) var(--space-5)',
          background: 'var(--warm-subtle)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: 'var(--radius-full)',
          fontWeight: 'var(--weight-bold)',
          color: 'var(--warm)',
          animation: 'streakPulse 2s infinite'
        }}>
          <span>🔥</span>
          <span>{streak} Day Learning Streak!</span>
        </div>
      </div>

      {/* Stats Summary */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-around', 
        background: 'var(--bg-secondary)', 
        padding: 'var(--space-4)', 
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)',
        marginBottom: 'var(--space-8)'
      }}>
        <div>
          <div style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-bold)', color: 'var(--success)' }}>
            {gotIt}
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: '4px' }}>
            Mastered
          </div>
        </div>
        
        <div style={{ borderLeft: '1px solid var(--border-subtle)', height: '40px' }} />
        
        <div>
          <div style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-bold)', color: '#F87171' }}>
            {reviewCount}
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: '4px' }}>
            To Review
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <button className="btn btn-primary btn-lg" onClick={onRestart} style={{ width: '100%' }}>
          🧠 Drill again
        </button>
        <Link href="/hub" className="btn btn-secondary btn-lg" style={{ width: '100%' }}>
          📰 Read global PM news
        </Link>
      </div>
    </div>
  );
}
