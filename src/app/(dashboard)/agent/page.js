'use client';

import { useState, useRef, useEffect } from 'react';
import { SUGGESTED_PROMPTS } from '@/lib/gemini';
import Link from 'next/link';

function MessageBubble({ message }) {
  return (
    <div
      className={`message-bubble ${message.role === 'user' ? 'user' : 'agent'}`}
      style={{ whiteSpace: 'pre-wrap' }}
    >
      {message.content}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="message-bubble agent" style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '12px 16px' }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--text-muted)',
            animation: 'pulse 1.4s ease infinite',
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function AgentPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey! I'm Buzz, your PM Coach. 🎯\n\nAsk me anything about product management — frameworks, metrics, case studies, or just practice a guesstimate. What's on your mind?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    const userMessage = text || input.trim();
    if (!userMessage || isLoading) return;

    setInput('');
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.content || 'Sorry, I could not generate a response.' },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Network error. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Hey! I'm Buzz, your PM Coach. 🎯\n\nAsk me anything about product management — frameworks, metrics, case studies, or just practice a guesstimate. What's on your mind?",
      },
    ]);
  };

  const showSuggestions = messages.length <= 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100dvh - var(--topbar-height) - var(--mobile-nav-height, 0px))' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--space-4) var(--space-6)',
        borderBottom: '1px solid var(--border-subtle)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{
            width: 40, height: 40, borderRadius: 'var(--radius-full)',
            background: 'linear-gradient(135deg, var(--accent), #A855F7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.2rem',
          }}>
            🤖
          </div>
          <div>
            <div style={{ fontWeight: 'var(--weight-semibold)', color: 'var(--text-primary)', fontSize: 'var(--text-base)' }}>
              Buzz — PM Coach
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)' }} />
              Powered by Gemini
            </div>
          </div>
        </div>
        <button onClick={handleReset} className="btn btn-ghost btn-sm">
          New chat
        </button>
      </div>

      {/* Messages */}
      <div className="chat-messages" style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-6)' }}>
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      {showSuggestions && (
        <div style={{ padding: '0 var(--space-6) var(--space-4)', flexShrink: 0 }}>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-2)', fontWeight: 'var(--weight-semibold)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Try asking
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            {SUGGESTED_PROMPTS.slice(0, 4).map((prompt) => (
              <button
                key={prompt}
                onClick={() => sendMessage(prompt)}
                className="btn btn-secondary btn-sm"
                style={{ fontWeight: 'var(--weight-regular)', fontSize: 'var(--text-xs)' }}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div style={{
        padding: 'var(--space-4) var(--space-6)',
        borderTop: '1px solid var(--border-subtle)',
        flexShrink: 0,
        display: 'flex',
        gap: 'var(--space-3)',
        alignItems: 'flex-end',
      }}>
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Buzz anything about product management..."
          className="input"
          disabled={isLoading}
          rows={1}
          style={{
            flex: 1,
            resize: 'none',
            minHeight: '44px',
            maxHeight: '120px',
            overflowY: 'auto',
            lineHeight: 'var(--leading-relaxed)',
          }}
          onInput={(e) => {
            e.target.style.height = 'auto';
            e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
          }}
        />
        <button
          onClick={() => sendMessage()}
          disabled={!input.trim() || isLoading}
          className="btn btn-primary"
          style={{ flexShrink: 0, height: '44px' }}
          aria-label="Send message"
        >
          {isLoading ? '...' : '↑'}
        </button>
      </div>
    </div>
  );
}
