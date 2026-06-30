'use client';

import React, { useState, useRef, useEffect } from 'react';
import DrillCard from './DrillCard';
import DrillResult from './DrillResult';

export default function SwipeDeck({ cards = [], onComplete, streak = 0 }) {
  // Queue of cards remaining to be mastered. We copy cards to work on them.
  const [deck, setDeck] = useState([]);
  const [masteredCount, setMasteredCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Drag states
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // Initialize deck
  useEffect(() => {
    if (cards && cards.length > 0) {
      setDeck(cards.map(c => ({ ...c, mastered: false })));
      setMasteredCount(0);
      setReviewCount(0);
      setCurrentIndex(0);
      setIsFlipped(false);
      setIsFinished(false);
    }
  }, [cards]);

  const currentCard = deck[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const processResponse = (status) => {
    if (status === 'yes') {
      // Mastered!
      const updatedDeck = [...deck];
      updatedDeck[currentIndex].mastered = true;
      setDeck(updatedDeck);
      setMasteredCount(prev => prev + 1);

      // Find next unmastered card index
      const nextUnmastered = updatedDeck.findIndex((c, idx) => idx > currentIndex && !c.mastered);
      
      if (nextUnmastered !== -1) {
        setCurrentIndex(nextUnmastered);
        setIsFlipped(false);
      } else {
        // Wrap around if there are any unmastered cards before this index
        const firstUnmastered = updatedDeck.findIndex(c => !c.mastered);
        if (firstUnmastered !== -1) {
          setCurrentIndex(firstUnmastered);
          setIsFlipped(false);
        } else {
          // All mastered!
          setIsFinished(true);
          if (onComplete) onComplete(updatedDeck.length);
        }
      }
    } else {
      // Review later - leave it in the deck and advance index to next unmastered
      setReviewCount(prev => prev + 1);
      
      const updatedDeck = [...deck];
      const nextUnmastered = updatedDeck.findIndex((c, idx) => idx > currentIndex && !c.mastered);
      
      if (nextUnmastered !== -1) {
        setCurrentIndex(nextUnmastered);
        setIsFlipped(false);
      } else {
        const firstUnmastered = updatedDeck.findIndex(c => !c.mastered);
        if (firstUnmastered !== -1) {
          setCurrentIndex(firstUnmastered);
          setIsFlipped(false);
        }
      }
    }
    setDragOffset({ x: 0, y: 0 });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isFinished || !currentCard) return;

      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        handleFlip();
      } else if (e.key === 'ArrowRight' && isFlipped) {
        processResponse('yes');
      } else if (e.key === 'ArrowLeft' && isFlipped) {
        processResponse('no');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, currentIndex, deck, isFinished]);

  // Pointer event handlers for swipe gesture
  const handlePointerDown = (e) => {
    if (isFinished || !currentCard) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setDragOffset({ x: dx, y: dy });
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    e.target.releasePointerCapture(e.pointerId);

    const threshold = 120; // threshold in pixels to trigger swipe
    if (dragOffset.x > threshold) {
      // Swiped right -> Got it! (only if card is flipped)
      if (isFlipped) {
        processResponse('yes');
      } else {
        // Bounce back if not flipped
        setDragOffset({ x: 0, y: 0 });
      }
    } else if (dragOffset.x < -threshold) {
      // Swiped left -> Review later (only if card is flipped)
      if (isFlipped) {
        processResponse('no');
      } else {
        setDragOffset({ x: 0, y: 0 });
      }
    } else {
      // Swipe was too short, snap back
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const handleRestart = () => {
    setDeck(cards.map(c => ({ ...c, mastered: false })));
    setMasteredCount(0);
    setReviewCount(0);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsFinished(false);
    setDragOffset({ x: 0, y: 0 });
  };

  if (isFinished) {
    return (
      <DrillResult
        total={cards.length}
        gotIt={cards.length}
        reviewCount={reviewCount}
        onRestart={handleRestart}
        streak={streak}
      />
    );
  }

  if (!currentCard) {
    return (
      <div className="skeleton" style={{ width: '100%', maxWidth: '480px', height: '320px', marginInline: 'auto' }} />
    );
  }

  // Calculate swipe indicator opacity
  const swipeValue = dragOffset.x;
  const opacityRight = Math.min(Math.max(swipeValue / 120, 0), 1);
  const opacityLeft = Math.min(Math.max(-swipeValue / 120, 0), 1);

  // Rotation tilt calculations
  const rotateDeg = swipeValue * 0.08;

  const cardStyle = {
    transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0) rotate(${rotateDeg}deg)`,
    touchAction: 'none',
    userSelect: 'none',
  };

  // Remaining cards tracker
  const totalCards = cards.length;
  const remaining = deck.filter(c => !c.mastered).length;

  return (
    <div className="flex flex-col items-center gap-4" style={{ width: '100%' }}>
      
      {/* Session Progress Header */}
      <div style={{ width: '100%', maxWidth: '480px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
          Progress: <strong>{masteredCount}</strong> of <strong>{totalCards}</strong> Mastered
        </span>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
          {remaining} card{remaining === 1 ? '' : 's'} remaining
        </span>
      </div>

      {/* Progress Bar */}
      <div style={{ 
        width: '100%', 
        maxWidth: '480px', 
        height: '6px', 
        background: 'var(--bg-secondary)', 
        borderRadius: 'var(--radius-full)',
        overflow: 'hidden',
        border: '1px solid var(--border-subtle)'
      }}>
        <div style={{ 
          width: `${(masteredCount / totalCards) * 100}%`, 
          height: '100%', 
          background: 'var(--success)',
          transition: 'width var(--transition-base)'
        }} />
      </div>

      {/* Swipe Deck Area */}
      <div 
        className="swipe-deck" 
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Fake back card shadows for stacked depth effect */}
        {remaining > 1 && (
          <div className="card" style={{
            position: 'absolute',
            inset: 0,
            transform: 'translate3d(0, 8px, 0) scale(0.96)',
            zIndex: 1,
            opacity: 0.5,
            pointerEvents: 'none'
          }} />
        )}
        {remaining > 2 && (
          <div className="card" style={{
            position: 'absolute',
            inset: 0,
            transform: 'translate3d(0, 16px, 0) scale(0.92)',
            zIndex: 0,
            opacity: 0.25,
            pointerEvents: 'none'
          }} />
        )}

        {/* Swipe Indicators */}
        <div className="swipe-indicator got-it" style={{ opacity: isFlipped ? opacityRight : 0, zIndex: 10 }}>
          Got It!
        </div>
        <div className="swipe-indicator review" style={{ opacity: isFlipped ? opacityLeft : 0, zIndex: 10 }}>
          Review
        </div>

        {/* Active Card */}
        <div 
          className={`swipe-card ${isDragging ? 'dragging' : ''}`} 
          style={{ ...cardStyle, zIndex: 5 }}
        >
          <DrillCard
            card={currentCard}
            isFlipped={isFlipped}
            onFlip={handleFlip}
            onResponse={processResponse}
          />
        </div>
      </div>

      {/* Desktop Helper */}
      <div className="desktop-only text-muted" style={{ fontSize: 'var(--text-xs)', marginTop: 'var(--space-2)' }}>
        ⌨️ Shortcuts: [Space] to Flip | [←] Review Later | [→] Mastered
      </div>
    </div>
  );
}
