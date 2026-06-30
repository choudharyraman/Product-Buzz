'use client';

import React from 'react';
import { capitalize } from '@/lib/utils';

export default function DrillCard({ card, isFlipped, onFlip, onResponse }) {
  if (!card) return null;

  const handleBackClick = (e) => {
    // Prevent flipping the card back when clicking action buttons on the back
    e.stopPropagation();
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
    <div className="flip-card-container">
      <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} onClick={onFlip}>
        
        {/* Front of Card */}
        <div className="flip-card-front">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span className={`badge ${getBadgeClass(card.type)}`}>
              {getEmoji(card.type)} {capitalize(card.type)}
            </span>
            <span className="badge badge-neutral" style={{ fontSize: '10px' }}>
              {capitalize(card.difficulty)}
            </span>
          </div>

          <h3 style={{ 
            fontSize: 'var(--text-lg)', 
            fontWeight: 'var(--weight-semibold)',
            lineHeight: 'var(--leading-snug)',
            marginBlock: 'var(--space-4)',
            color: 'var(--text-primary)'
          }}>
            {card.question}
          </h3>

          {card.hint && (
            <p style={{ 
              fontSize: 'var(--text-xs)', 
              color: 'var(--text-muted)', 
              fontStyle: 'italic',
              maxWidth: '85%'
            }}>
              💡 Hint: {card.hint}
            </p>
          )}

          <div style={{ 
            marginTop: 'auto', 
            fontSize: 'var(--text-xs)', 
            color: 'var(--accent)',
            fontWeight: 'var(--weight-medium)' 
          }}>
            Tap card to flip and reveal answer ↓
          </div>
        </div>

        {/* Back of Card */}
        <div className="flip-card-back" onClick={handleBackClick}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
            <span className={`badge ${getBadgeClass(card.type)}`}>
              {getEmoji(card.type)} {capitalize(card.type)}
            </span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
              Answer Analysis
            </span>
          </div>

          <div style={{ 
            flex: 1, 
            width: '100%', 
            overflowY: 'auto', 
            paddingRight: 'var(--space-2)',
            textAlign: 'left',
            marginBlock: 'var(--space-2)'
          }}>
            <p style={{ 
              fontSize: 'var(--text-sm)', 
              color: 'var(--text-primary)', 
              lineHeight: 'var(--leading-relaxed)',
              whiteSpace: 'pre-wrap'
            }}>
              {card.answer}
            </p>
          </div>

          <div style={{ 
            display: 'flex', 
            gap: 'var(--space-3)', 
            width: '100%', 
            marginTop: 'auto' 
          }}>
            <button 
              className="btn btn-secondary" 
              style={{ flex: 1, borderColor: 'var(--error-subtle)', color: '#F87171' }}
              onClick={() => onResponse('no')}
            >
              🔄 Review later
            </button>
            <button 
              className="btn btn-primary" 
              style={{ flex: 1, backgroundColor: 'var(--success)', borderColor: 'var(--success)' }}
              onClick={() => onResponse('yes')}
            >
              ✅ Mastered!
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
