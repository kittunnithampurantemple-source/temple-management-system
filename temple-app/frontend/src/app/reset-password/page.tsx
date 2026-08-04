'use client';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token.');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      if (res.ok) {
        setIsSuccess(true);
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to reset password. The link might be expired.');
      }
    } catch (err) {
      setError('Error connecting to server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-[440px] animate-slide-up mt-8">
      <div className="bg-white/70 backdrop-blur-2xl border border-brass/30 rounded-[2.5rem] shadow-2xl p-8 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-brass/20 rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-sanctum/10 rounded-full blur-[60px] pointer-events-none" />

        <div className="relative z-10">
          {!isSuccess ? (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-brass/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  🔑
                </div>
                <h1 className="font-display text-2xl text-sanctum-dark font-bold mb-2 tracking-wide">New Password</h1>
                <p className="text-ink/60 font-medium text-sm">Please enter your new password below.</p>
              </div>

              {error && (
                <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100 text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[11px] font-bold text-ink/60 mb-1.5 uppercase tracking-widest">New Password *</label>
                  <input 
                    required 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={!token}
                    className="w-full bg-white/80 border border-brass/30 rounded-xl px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-brass focus:border-transparent transition-all shadow-sm text-sm" 
                  />
                </div>
                
                <div>
                  <label className="block text-[11px] font-bold text-ink/60 mb-1.5 uppercase tracking-widest">Confirm Password *</label>
                  <input 
                    required 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={!token}
                    className="w-full bg-white/80 border border-brass/30 rounded-xl px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-brass focus:border-transparent transition-all shadow-sm text-sm" 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading || !token}
                  className="w-full bg-gradient-to-r from-sanctum to-sanctum-dark text-cream py-3.5 rounded-xl font-bold text-sm tracking-wide hover:shadow-[0_0_20px_rgba(153,27,27,0.3)] transition-all duration-300 disabled:opacity-70 transform hover:-translate-y-1 border border-sanctum-dark/50 flex justify-center items-center"
                >
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>

              <div className="mt-8 text-center">
                <Link href="/login" className="text-sm font-bold text-ink/60 hover:text-sanctum transition-colors flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Login
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-6 animate-slide-up">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner text-4xl">
                ✨
              </div>
              <h2 className="font-display text-2xl text-sanctum-dark font-bold mb-3">Password Updated</h2>
              <p className="text-ink/80 font-medium text-sm mb-8 leading-relaxed px-2">
                Your password has been successfully reset. You can now log in with your new password.
              </p>
              <div className="space-y-3">
                <Link href="/login" className="block w-full bg-gradient-to-r from-sanctum to-sanctum-dark text-cream py-3.5 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(153,27,27,0.3)] transition-all duration-300 text-center">
                  Login Now
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="relative min-h-screen bg-cream overflow-hidden flex items-center justify-center py-20 px-4">
      {/* Elegant Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-brass/15 blur-[120px] animate-ambient-drift" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-sanctum/10 blur-[120px] animate-ambient-drift" style={{ animationDelay: '-5s', animationDirection: 'reverse' }} />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <Suspense fallback={<div className="relative z-10 font-bold text-sanctum">Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide-up {
          0% { transform: translateY(40px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes ambient-drift {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(3% , -5%) scale(1.05); }
          66% { transform: translate(-2%, 4%) scale(0.95); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-ambient-drift {
          animation: ambient-drift 20s ease-in-out infinite;
        }
      `}} />
    </div>
  );
}
