'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const PM_LEVELS = [
  { value: 'aspiring', label: '🌱 Aspiring PM — Student or pre-PM' },
  { value: 'transitioning', label: '🔄 Transitioning — Switching from another field' },
  { value: 'junior', label: '🚀 Early-stage PM — 0-2 years' },
  { value: 'senior', label: '⚡ Experienced PM — 3+ years' },
];

export default function SignupPage() {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', pmLevel: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (field) => (e) => setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setIsLoading(true);

    try {
      const isSupabaseConfigured = 
        process.env.NEXT_PUBLIC_SUPABASE_URL && 
        process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('https://');

      if (!isSupabaseConfigured) {
        // Developer Mock Signup Bypass
        document.cookie = `product_buzz_mock_user=${JSON.stringify({ email: formData.email, name: formData.fullName })}; path=/; max-age=86400;`;
        setSuccess(true);
        return;
      }

      const supabase = createClient();
      const { error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            pm_level: formData.pmLevel,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  if (success) {
    return (
      <div className="auth-container">
        <div className="auth-card animate-scale-in" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>🎉</div>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>You&apos;re in!</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
            Check your email to confirm your account, then come back to start your PM journey.
          </p>
          <Link href="/login" className="btn btn-primary" style={{ width: '100%' }}>Go to Sign In →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card animate-scale-in">
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
            Create your account
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
            Free forever. No credit card needed.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>
              Full Name
            </label>
            <input
              id="signup-name"
              type="text"
              value={formData.fullName}
              onChange={handleChange('fullName')}
              placeholder="Alex Kumar"
              className="input"
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
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
              id="signup-password"
              type="password"
              value={formData.password}
              onChange={handleChange('password')}
              placeholder="Min. 8 characters"
              className="input"
              required
              autoComplete="new-password"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>
              Where are you in your PM journey?
            </label>
            <select
              id="signup-pm-level"
              value={formData.pmLevel}
              onChange={handleChange('pmLevel')}
              className="input"
              style={{ cursor: 'pointer' }}
            >
              <option value="">Select your level</option>
              {PM_LEVELS.map((l) => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>
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

          <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading} id="signup-submit" style={{ marginTop: 'var(--space-2)', width: '100%' }}>
            {isLoading ? 'Creating account...' : 'Create Account →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginTop: 'var(--space-6)' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'var(--accent)', fontWeight: 'var(--weight-medium)' }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
