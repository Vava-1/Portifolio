'use client';
import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/agent/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || 'Login failed.');
        setStatus('error');
        return;
      }
      setStatus('ok');
      // Use a hard navigation (window.location) instead of client-side routing.
      // This forces a full page load, which guarantees the proxy middleware
      // sees the newly-set session cookie and lets us through to /admin.
      // Client-side navigation (router.replace) can race with the cookie
      // being written to the browser's cookie jar.
      if (typeof window !== 'undefined') {
        window.location.href = next;
      } else {
        router.replace(next);
        router.refresh();
      }
    } catch {
      setError('Network error.');
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm panel p-7">
      <p className="eyebrow mb-3">Agent admin</p>
      <h1 className="font-display text-2xl font-medium mb-1" style={{ color: 'var(--color-mist)' }}>Sign in</h1>
      <p className="text-sm mb-6" style={{ color: 'var(--color-haze)' }}>Enter your admin password to view the agent dashboard.</p>

      <label className="font-mono text-xs uppercase tracking-wide mb-2 block" style={{ color: 'var(--color-haze)' }}>Password</label>
      <input
        type="password"
        required
        autoFocus
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="input-field mb-5"
        placeholder="Your admin password"
      />

      <button type="submit" disabled={status === 'loading'} className="btn-primary w-full justify-center">
        {status === 'loading' ? 'Signing in...' : status === 'ok' ? 'Redirecting...' : 'Sign in'}
      </button>

      {status === 'error' && (
        <p className="text-sm text-center mt-4" style={{ color: '#F87171' }}>{error}</p>
      )}
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-5" style={{ background: 'var(--color-ink)' }}>
      <Suspense fallback={<div className="panel p-7" style={{ color: 'var(--color-haze)' }}>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
