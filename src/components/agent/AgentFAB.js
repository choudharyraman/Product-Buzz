'use client';

import { useState, useRef, useEffect } from 'react';
import { SUGGESTED_PROMPTS } from '@/lib/gemini';

export default function AgentFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey! I'm Buzz 🎯 Ask me anything about product management.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const sendMessage = async (text) => {
    const userMessage = text || input.trim();
    if (!userMessage || isLoading) return;
    setInput('');
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);
    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.content || 'Sorry, try again.' }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Network error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        className="agent-fab"
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Open Buzz AI Coach"
        title="Chat with Buzz"
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      {/* Chat Drawer */}
      {isOpen && (
        <>
          {/* Backdrop on mobile */}
          <div
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 85,
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(2px)',
            }}
          />
          <div className="chat-drawer">
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: 'var(--space-4) var(--space-5)',
              borderBottom: '1px solid var(--border-subtle)',
              flexShrink: 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 'var(--radius-full)',
                  background: 'linear-gradient(135deg, var(--accent), #A855F7)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1rem',
                }}>🤖</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>Buzz</div>
                  <div style={{ fontSize: 10, color: 'var(--success)' }}>PM Coach · Gemini</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="btn btn-ghost btn-icon" aria-label="Close chat">✕</button>
            </div>

            {/* Messages */}
            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`message-bubble ${msg.role === 'user' ? 'user' : 'agent'}`}
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {msg.content}
                </div>
              ))}
              {isLoading && (
                <div className="message-bubble agent" style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '12px 16px' }}>
                  {[0,1,2].map((i) => (
                    <div key={i} style={{
                      width: 6, height: 6, borderRadius: '50%', background: 'var(--text-muted)',
                      animation: 'pulse 1.4s ease infinite',
                      animationDelay: `${i * 0.2}s`,
                    }} />
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions (first message only) */}
            {messages.length <= 1 && (
              <div style={{ padding: '0 var(--space-4) var(--space-3)', flexShrink: 0 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                  {SUGGESTED_PROMPTS.slice(0, 3).map((p) => (
                    <button key={p} onClick={() => sendMessage(p)} className="btn btn-secondary btn-sm" style={{ fontSize: 11 }}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div style={{
              display: 'flex', gap: 'var(--space-2)', padding: 'var(--space-3) var(--space-4)',
              borderTop: '1px solid var(--border-subtle)', flexShrink: 0,
            }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Buzz..."
                className="input"
                disabled={isLoading}
                style={{ flex: 1, height: 40 }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                className="btn btn-primary btn-icon"
                aria-label="Send"
              >↑</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
