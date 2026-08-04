'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink">
      <form onSubmit={onSubmit} className="bg-cream rounded-sm p-8 w-full max-w-sm">
        <h1 className="font-display text-2xl text-sanctum mb-1 text-center">Temple Admin</h1>
        <p className="text-xs text-ink/50 text-center mb-6">Staff & Administrator Login</p>
        <input
          type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-brass/40 rounded-sm px-4 py-2 mb-3 focus-ring"
        />
        <input
          type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-brass/40 rounded-sm px-4 py-2 mb-3 focus-ring"
        />
        {error && <p className="text-red-700 text-sm mb-3">{error}</p>}
        <button disabled={loading} className="w-full bg-sanctum text-cream py-2 rounded-sm hover:bg-sanctum-dark disabled:opacity-50">
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
