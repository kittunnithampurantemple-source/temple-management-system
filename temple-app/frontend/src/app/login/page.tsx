'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGoogleLogin } from '@react-oauth/google';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('isAuthenticated', 'true');
        if (data.accessToken) localStorage.setItem('accessToken', data.accessToken);
        if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken);
        router.push('/');
      } else {
        const data = await response.json();
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      setError('Error connecting to server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/auth/google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: codeResponse.code }),
        });
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('isAuthenticated', 'true');
          if (data.accessToken) localStorage.setItem('accessToken', data.accessToken);
          if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken);
          router.push('/');
        } else {
          setError('Google authentication failed on server');
          setIsLoading(false);
        }
      } catch (err) {
        setError('Network error during Google login');
        setIsLoading(false);
      }
    },
    onError: () => {
      setError('Google popup closed or failed');
    }
  });

  return (
    <div className="relative min-h-screen bg-cream overflow-hidden flex items-center justify-center py-20 px-4">
      {/* Elegant Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-brass/15 blur-[120px] animate-ambient-drift" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-sanctum/10 blur-[120px] animate-ambient-drift" style={{ animationDelay: '-5s', animationDirection: 'reverse' }} />
        <div className="absolute top-[40%] left-[30%] w-[50vw] h-[50vw] rounded-full bg-orange-500/5 blur-[100px] animate-ambient-drift" style={{ animationDelay: '-10s' }} />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="relative z-10 w-full max-w-[440px] animate-slide-up mt-8">
        {/* Floating Glassmorphic Card */}
        <div className="bg-white/70 backdrop-blur-2xl border border-brass/30 rounded-[2.5rem] shadow-2xl p-8 md:p-10 relative overflow-hidden">
          
          {/* Subtle Card Glows */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-brass/20 rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-sanctum/10 rounded-full blur-[60px] pointer-events-none" />

          <div className="relative z-10">
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl text-sanctum-dark font-bold mb-2 tracking-wide">Welcome Back</h1>
              <div className="w-12 h-1 bg-gradient-to-r from-sanctum to-brass mx-auto rounded-full mb-3" />
              <p className="text-ink/60 font-medium text-sm">Please sign in to your account.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
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

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-[11px] font-bold text-ink/60 uppercase tracking-widest">Password *</label>
                  <Link href="/forgot-password" className="text-[11px] font-bold text-sanctum hover:underline">Forgot Password?</Link>
                </div>
                <div className="relative">
                  <input 
                    required 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/80 border border-brass/30 rounded-xl px-4 py-3 pr-12 text-ink focus:outline-none focus:ring-2 focus:ring-brass focus:border-transparent transition-all shadow-sm text-sm" 
                    placeholder="••••••••" 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink/70 transition-colors"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input type="checkbox" id="remember" className="w-4 h-4 rounded border-brass/30 text-sanctum focus:ring-sanctum cursor-pointer" />
                <label htmlFor="remember" className="ml-2 text-sm font-medium text-ink/70 cursor-pointer">Remember me for 30 days</label>
              </div>

              {error && (
                <div className="text-red-500 text-xs font-bold text-center mt-2 bg-red-500/10 py-2 rounded-lg border border-red-500/20">
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-sanctum to-sanctum-dark text-cream py-3.5 rounded-xl font-bold text-sm tracking-wide hover:shadow-[0_0_20px_rgba(153,27,27,0.3)] transition-all duration-300 disabled:opacity-70 transform hover:-translate-y-1 border border-sanctum-dark/50 mt-4 flex justify-center items-center"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="relative flex py-6 items-center">
              <div className="flex-grow border-t border-brass/30"></div>
              <span className="flex-shrink-0 mx-4 text-ink/40 text-[10px] font-bold uppercase tracking-widest">Or</span>
              <div className="flex-grow border-t border-brass/30"></div>
            </div>

            <button 
              type="button" 
              onClick={() => googleLogin()}
              className="w-full bg-white/90 border-2 border-brass/20 text-ink py-3 rounded-xl font-bold text-sm hover:bg-white hover:border-brass/40 transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <p className="text-center mt-6 text-sm text-ink/70 font-medium">
              Don't have an account? <Link href="/register" className="text-sanctum font-bold hover:underline">Sign up</Link>
            </p>
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
