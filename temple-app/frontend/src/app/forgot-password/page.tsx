'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (res.ok) {
        setIsSubmitted(true);
      } else {
        alert('Failed to send reset link. Please check the email and try again.');
      }
    } catch (err) {
      alert('Error connecting to server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-cream overflow-hidden flex items-center justify-center py-20 px-4">
      {/* Elegant Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-brass/15 blur-[120px] animate-ambient-drift" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-sanctum/10 blur-[120px] animate-ambient-drift" style={{ animationDelay: '-5s', animationDirection: 'reverse' }} />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="relative z-10 w-full max-w-[440px] animate-slide-up mt-8">
        <div className="bg-white/70 backdrop-blur-2xl border border-brass/30 rounded-[2.5rem] shadow-2xl p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brass/20 rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-sanctum/10 rounded-full blur-[60px] pointer-events-none" />

          <div className="relative z-10">
            {!isSubmitted ? (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-brass/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                    🔐
                  </div>
                  <h1 className="font-display text-2xl text-sanctum-dark font-bold mb-2 tracking-wide">Reset Password</h1>
                  <p className="text-ink/60 font-medium text-sm">Enter your email and we'll send you a reset link.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-[11px] font-bold text-ink/60 mb-1.5 uppercase tracking-widest">Email Address *</label>
                    <input 
                      required 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/80 border border-brass/30 rounded-xl px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-brass focus:border-transparent transition-all shadow-sm text-sm" 
                      placeholder="john@example.com" 
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-sanctum to-sanctum-dark text-cream py-3.5 rounded-xl font-bold text-sm tracking-wide hover:shadow-[0_0_20px_rgba(153,27,27,0.3)] transition-all duration-300 disabled:opacity-70 transform hover:-translate-y-1 border border-sanctum-dark/50 flex justify-center items-center"
                  >
                    {isLoading ? 'Sending Link...' : 'Send Reset Link'}
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
                  ✉️
                </div>
                <h2 className="font-display text-2xl text-sanctum-dark font-bold mb-3">Check your email</h2>
                <p className="text-ink/80 font-medium text-sm mb-8 leading-relaxed px-2">
                  We have sent a password reset link to <strong>{email}</strong>.
                </p>
                <div className="space-y-3">
                  <Link href="/login" className="block w-full bg-white/80 border-2 border-brass/30 text-ink py-3.5 rounded-xl font-bold hover:bg-white transition-all duration-300 shadow-sm text-center">
                    Back to Login
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

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
