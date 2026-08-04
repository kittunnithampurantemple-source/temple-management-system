'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const navItems = [
  { href: '/about', label: 'About' },
  { href: '/history', label: 'History' },
  { href: '/timings', label: 'Timings' },
  { href: '/festivals', label: 'Festivals' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/poojas', label: 'Poojas' },
  { href: '/schemes', label: 'Schemes' },
  { href: '/donate', label: 'Donate' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check auth state on mount and when menu opens
  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(localStorage.getItem('isAuthenticated') === 'true');
    };
    checkAuth();
    // Listen for storage events in case login happens in another tab
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, [showProfileMenu]);

  return (
    <>
      <div className="fixed top-0 w-full z-50 pt-4 px-4 flex flex-col items-center animate-fade-in pointer-events-none">
      <header className="w-full max-w-6xl glass-panel pointer-events-auto rounded-full px-6 py-3 flex items-center justify-between shadow-lg transition-all duration-300 relative">
        <Link href="/" className="flex items-center gap-3 font-display text-xl font-bold text-sanctum tracking-wide hover:scale-105 transition-transform duration-300">
          <div className="w-8 h-8 rounded-full border-2 border-sanctum flex items-center justify-center overflow-hidden">
            {/* Logo space */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-sanctum">
              <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
              <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
            </svg>
          </div>
          <span className="font-inter font-semibold text-lg">Home</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-6 font-inter text-sm font-medium text-ink/80">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="relative group hover:text-sanctum focus-ring transition-colors py-1">
              {item.label}
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-brass transition-all duration-300 group-hover:w-full rounded-full" />
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/poojas"
            className="inline-flex items-center justify-center bg-gradient-to-r from-sanctum to-sanctum-dark text-cream px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-[0_0_20px_rgba(122,31,31,0.4)] hover:-translate-y-0.5 transition-all duration-300 focus-ring"
          >
            Book a Pooja
          </Link>
          
          {/* User Profile Menu */}
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-10 h-10 rounded-full bg-brass/20 flex items-center justify-center text-sanctum hover:bg-brass/40 transition-all duration-300 focus-ring"
              title="User Account"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
              </svg>
            </button>
            
            {showProfileMenu && (
              <div className="absolute right-0 mt-3 w-48 bg-white/95 backdrop-blur-xl border border-brass/20 rounded-2xl shadow-xl overflow-hidden py-2 animate-fade-in">
                {!isLoggedIn ? (
                  <>
                    <Link href="/login" onClick={() => setShowProfileMenu(false)} className="block px-4 py-2.5 text-sm font-bold text-ink/70 hover:bg-brass/10 hover:text-sanctum transition-colors">
                      Sign In
                    </Link>
                    <Link href="/register" onClick={() => setShowProfileMenu(false)} className="block px-4 py-2.5 text-sm font-bold text-ink/70 hover:bg-brass/10 hover:text-sanctum transition-colors">
                      Create Account
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/dashboard" onClick={() => setShowProfileMenu(false)} className="block px-4 py-2.5 text-sm font-bold text-ink/70 hover:bg-brass/10 hover:text-sanctum transition-colors">
                      My Dashboard
                    </Link>
                    <div className="border-t border-brass/20 my-1"></div>
                    <button 
                      onClick={async () => {
                        try {
                          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/auth/logout`, {
                            method: 'POST',
                            credentials: 'omit', 
                          });
                          
                          if (res.ok || res.status === 401) {
                            localStorage.removeItem('isAuthenticated');
                            localStorage.removeItem('accessToken');
                            localStorage.removeItem('refreshToken');
                            setIsLoggedIn(false);
                            toast.success('Logged out successfully!');
                          } else {
                            toast.error('Failed to log out. Server returned an error.');
                          }
                        } catch (error) {
                          toast.error('Network error. Could not connect to the server.');
                        }
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-500/10 transition-colors flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                        <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                      </svg>
                      Sign Out
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile menu button placeholder */}
        <button className="lg:hidden text-sanctum focus-ring p-1">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </header>
      </div>
      <div className="absolute top-[88px] w-full z-40 pointer-events-auto text-center flex justify-center">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-sanctum drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] tracking-wide bg-white/40 px-6 py-1.5 rounded-full backdrop-blur-md border border-white/50">
          ॥ കിട്ടുണ്ണിത്തമ്പുരാൻ ക്ഷേത്രം ॥
        </h1>
      </div>
    </>
  );
}
