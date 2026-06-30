'use client';

import React from 'react';

export default function StreakBadge({ streak = 0, isActive = false }) {
  return (
    <div className={`streak-counter ${isActive ? 'active' : ''}`} title={`${streak} day learning streak`}>
      <span>🔥</span>
      <span>{streak} {streak === 1 ? 'day' : 'days'}</span>
    </div>
  );
}
