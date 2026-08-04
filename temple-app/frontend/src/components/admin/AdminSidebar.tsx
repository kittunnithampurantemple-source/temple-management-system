'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { logout } from '@/lib/auth';

const links = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/poojas', label: 'Poojas' },
  { href: '/admin/bookings', label: 'Bookings' },
  { href: '/admin/donations', label: 'Donations' },
  { href: '/admin/schemes', label: 'Annual Schemes' },
  { href: '/admin/receipts', label: 'Receipts' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/reports', label: 'Reports' },
  { href: '/admin/settings', label: 'Settings' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="w-56 bg-ink text-cream/90 min-h-screen p-4 flex flex-col">
      <div className="font-display text-xl text-brass mb-6">Temple Admin</div>
      <nav className="flex-1 space-y-1">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`block px-3 py-2 rounded-sm text-sm ${pathname?.startsWith(l.href) ? 'bg-brass text-ink' : 'hover:bg-white/10'}`}
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <button
        onClick={async () => { await logout(); router.replace('/admin/login'); }}
        className="text-sm text-left px-3 py-2 hover:bg-white/10 rounded-sm"
      >
        Log Out
      </button>
    </aside>
  );
}
