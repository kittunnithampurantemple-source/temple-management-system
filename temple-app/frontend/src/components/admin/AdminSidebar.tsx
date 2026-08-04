'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { logout } from '@/lib/auth';

const links = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '⚡', color: 'from-amber-500 to-orange-500' },
  { href: '/admin/poojas', label: 'Poojas', icon: '🪔', color: 'from-rose-500 to-pink-600' },
  { href: '/admin/bookings', label: 'Bookings', icon: '📅', color: 'from-violet-500 to-purple-600' },
  { href: '/admin/donations', label: 'Donations', icon: '💛', color: 'from-yellow-400 to-amber-500' },
  { href: '/admin/schemes', label: 'Annual Schemes', icon: '📋', color: 'from-teal-500 to-emerald-600' },
  { href: '/admin/receipts', label: 'Receipts', icon: '🧾', color: 'from-sky-500 to-blue-600' },
  { href: '/admin/users', label: 'Users', icon: '👥', color: 'from-indigo-500 to-violet-600' },
  { href: '/admin/reports', label: 'Reports', icon: '📊', color: 'from-cyan-500 to-teal-600' },
  { href: '/admin/settings', label: 'Settings', icon: '⚙️', color: 'from-slate-500 to-slate-600' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="w-64 min-h-screen flex flex-col relative overflow-hidden" style={{
      background: 'linear-gradient(160deg, #0f0c29 0%, #302b63 50%, #24243e 100%)'
    }}>
      {/* Background decorative orbs */}
      <div className="absolute top-0 left-0 w-40 h-40 rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(circle, #C9A227, transparent)' }} />
      <div className="absolute bottom-20 right-0 w-32 h-32 rounded-full blur-3xl opacity-15" style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />

      {/* Logo */}
      <div className="relative z-10 p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xl shadow-lg shadow-amber-500/30">
            🛕
          </div>
          <div>
            <div className="text-white font-bold text-sm leading-tight">Temple Admin</div>
            <div className="text-amber-400/70 text-xs">Management Portal</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="text-white/30 text-[10px] uppercase tracking-widest font-semibold mb-3 px-3">Main Menu</p>
        {links.map((l) => {
          const isActive = pathname?.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-white/15 text-white shadow-lg backdrop-blur-sm border border-white/20'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-base transition-all duration-300 ${
                isActive
                  ? `bg-gradient-to-br ${l.color} shadow-lg`
                  : 'bg-white/5 group-hover:bg-white/10'
              }`}>
                {l.icon}
              </span>
              <span>{l.label}</span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="relative z-10 p-4 border-t border-white/10">
        <button
          onClick={async () => { await logout(); router.replace('/admin/login'); }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-red-500/20 transition-all duration-300 group"
        >
          <span className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-red-500/30 flex items-center justify-center transition-all duration-300">
            🚪
          </span>
          Log Out
        </button>
      </div>
    </aside>
  );
}
