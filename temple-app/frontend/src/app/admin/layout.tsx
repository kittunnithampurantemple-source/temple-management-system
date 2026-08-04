'use client';
import { usePathname } from 'next/navigation';
import AdminGuard from '@/components/admin/AdminGuard';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) return <>{children}</>;

  return (
    <AdminGuard>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 p-8 min-h-screen relative overflow-hidden">

          {/* ── Deep space base ── */}
          <div className="absolute inset-0 -z-10" style={{
            background: 'radial-gradient(ellipse 120% 80% at 50% -10%, #1a0533 0%, #0d0221 30%, #05010f 70%, #000008 100%)'
          }} />

          {/* ── Star field ── */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            {[...Array(60)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${Math.random() * 2 + 0.5}px`,
                  height: `${Math.random() * 2 + 0.5}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.7 + 0.1,
                  animation: `twinkle ${Math.random() * 4 + 2}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>

          {/* ── Light rays from top center ── */}
          <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
            {/* Main purple/pink glow burst at top */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[600px]" style={{
              background: 'conic-gradient(from 250deg at 50% 0%, transparent 0deg, rgba(139,92,246,0.15) 10deg, rgba(168,85,247,0.25) 15deg, rgba(196,125,255,0.35) 18deg, rgba(139,92,246,0.25) 22deg, rgba(99,60,180,0.1) 28deg, transparent 35deg, transparent 325deg, rgba(99,60,180,0.1) 332deg, rgba(139,92,246,0.25) 338deg, rgba(196,125,255,0.35) 342deg, rgba(168,85,247,0.25) 345deg, rgba(139,92,246,0.15) 350deg, transparent 360deg)',
            }} />

            {/* Individual light beams */}
            {[
              { deg: '-35deg', opacity: 0.12, width: '2px', blur: '3px' },
              { deg: '-22deg', opacity: 0.20, width: '3px', blur: '6px' },
              { deg: '-12deg', opacity: 0.28, width: '4px', blur: '8px' },
              { deg: '-4deg',  opacity: 0.35, width: '5px', blur: '10px' },
              { deg: '0deg',   opacity: 0.45, width: '60px', blur: '20px' },
              { deg: '4deg',   opacity: 0.35, width: '5px', blur: '10px' },
              { deg: '12deg',  opacity: 0.28, width: '4px', blur: '8px' },
              { deg: '22deg',  opacity: 0.20, width: '3px', blur: '6px' },
              { deg: '35deg',  opacity: 0.12, width: '2px', blur: '3px' },
            ].map((beam, i) => (
              <div
                key={i}
                className="absolute top-0 left-1/2 origin-top"
                style={{
                  transform: `translateX(-50%) rotate(${beam.deg})`,
                  width: beam.width,
                  height: '90vh',
                  background: 'linear-gradient(to bottom, rgba(220,180,255,0.9) 0%, rgba(168,85,247,0.6) 20%, rgba(139,92,246,0.3) 50%, transparent 100%)',
                  opacity: beam.opacity,
                  filter: `blur(${beam.blur})`,
                }}
              />
            ))}

            {/* Central bright core */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full" style={{
              background: 'radial-gradient(circle, rgba(220,180,255,0.6) 0%, rgba(168,85,247,0.4) 30%, rgba(139,92,246,0.2) 60%, transparent 100%)',
              filter: 'blur(20px)',
            }} />

            {/* Secondary ambient glow — left */}
            <div className="absolute top-0 left-0 w-1/3 h-1/2" style={{
              background: 'radial-gradient(ellipse at 20% 0%, rgba(99,60,180,0.2) 0%, transparent 70%)',
              filter: 'blur(30px)',
            }} />

            {/* Secondary ambient glow — right */}
            <div className="absolute top-0 right-0 w-1/3 h-1/2" style={{
              background: 'radial-gradient(ellipse at 80% 0%, rgba(99,60,180,0.2) 0%, transparent 70%)',
              filter: 'blur(30px)',
            }} />

            {/* Bottom dark fade */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3" style={{
              background: 'linear-gradient(to top, rgba(5,1,15,0.8) 0%, transparent 100%)',
            }} />
          </div>

          {/* Twinkle keyframe via style tag */}
          <style>{`
            @keyframes twinkle {
              0%, 100% { opacity: 0.1; transform: scale(1); }
              50% { opacity: 0.8; transform: scale(1.3); }
            }
          `}</style>

          {/* Content */}
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
