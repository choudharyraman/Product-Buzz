'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const isSupabaseConfigured = 
        process.env.NEXT_PUBLIC_SUPABASE_URL && 
        process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('https://');

      if (!isSupabaseConfigured) {
        // Developer Mock Login Bypass
        document.cookie = `product_buzz_mock_user=${JSON.stringify({ email, name: 'PM Learner' })}; path=/; max-age=86400;`;
        router.push('/dashboard');
        router.refresh();
        return;
      }

      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

      if (signInError) {
        setError(signInError.message);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="auth-container">
      <div className="auth-card animate-scale-in">
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)', textDecoration: 'none' }}>
            <div style={{
              width: 40, height: 40,
              background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
              borderRadius: 'var(--radius-md)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.2rem', color: 'white', fontWeight: 700,
            }}>⚡</div>
            <span style={{ fontWeight: 800, fontSize: 'var(--text-xl)', letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
              Product<span style={{ color: 'var(--accent)' }}>Buzz</span>
            </span>
          </Link>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginTop: 'var(--space-6)', marginBottom: 'var(--space-2)', letterSpacing: '-0.03em' }}>
            Welcome back
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
            Sign in to continue your PM journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>
              Email
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="input"
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>
              Password
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input"
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div style={{
              padding: 'var(--space-3) var(--space-4)',
              background: 'var(--error-subtle)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-sm)',
              color: 'var(--error)',
            }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading} id="login-submit" style={{ marginTop: 'var(--space-2)', width: '100%' }}>
            {isLoading ? 'Signing in...' : 'Sign in →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginTop: 'var(--space-6)' }}>
          Don&apos;t have an account?{' '}
          <Link href="/signup" style={{ color: 'var(--accent)', fontWeight: 'var(--weight-medium)' }}>
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}
