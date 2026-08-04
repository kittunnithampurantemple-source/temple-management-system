'use client';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

interface Overview {
  todayRevenue: number;
  monthlyRevenue: number;
  totalDonations: number;
  totalBookings: number;
  pendingPoojas: number;
  completedPoojas: number;
}

const cardThemes = [
  {
    gradient: 'from-rose-500 via-pink-500 to-rose-700',
    icon: '₹',
    iconBg: 'bg-white/20',
    glow: 'shadow-rose-500/30',
    border: 'border-rose-400/30',
    accent: 'text-rose-200',
  },
  {
    gradient: 'from-violet-600 via-purple-500 to-indigo-700',
    icon: '📈',
    iconBg: 'bg-white/20',
    glow: 'shadow-violet-500/30',
    border: 'border-violet-400/30',
    accent: 'text-violet-200',
  },
  {
    gradient: 'from-amber-500 via-yellow-400 to-orange-500',
    icon: '💛',
    iconBg: 'bg-white/20',
    glow: 'shadow-amber-500/30',
    border: 'border-amber-400/30',
    accent: 'text-amber-100',
  },
  {
    gradient: 'from-teal-500 via-emerald-500 to-cyan-600',
    icon: '📅',
    iconBg: 'bg-white/20',
    glow: 'shadow-teal-500/30',
    border: 'border-teal-400/30',
    accent: 'text-teal-100',
  },
  {
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    icon: '⏳',
    iconBg: 'bg-white/20',
    glow: 'shadow-orange-500/30',
    border: 'border-orange-400/30',
    accent: 'text-orange-100',
  },
  {
    gradient: 'from-cyan-500 via-sky-500 to-blue-600',
    icon: '✅',
    iconBg: 'bg-white/20',
    glow: 'shadow-cyan-500/30',
    border: 'border-cyan-400/30',
    accent: 'text-cyan-100',
  },
];

export default function AdminDashboardPage() {
  const { data, isLoading } = useQuery<Overview>({
    queryKey: ['admin-dashboard'],
    queryFn: () => api.get('/admin/dashboard'),
  });

  const cards = [
    { label: "Today's Revenue", value: data ? `₹${data.todayRevenue.toFixed(2)}` : '₹0.00', sub: 'Collected today' },
    { label: 'Monthly Revenue', value: data ? `₹${data.monthlyRevenue.toFixed(2)}` : '₹0.00', sub: 'This month' },
    { label: 'Total Donations', value: data ? `₹${data.totalDonations.toFixed(2)}` : '₹0.00', sub: 'All time' },
    { label: 'Total Bookings', value: data?.totalBookings ?? 0, sub: 'Registered bookings' },
    { label: 'Pending Poojas', value: data?.pendingPoojas ?? 0, sub: 'Awaiting completion' },
    { label: 'Completed Poojas', value: data?.completedPoojas ?? 0, sub: 'Successfully done' },
  ];

  return (
    <div className="relative min-h-full">
      {/* Page background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #C9A227, transparent)' }} />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />

      {/* Header */}
      <div className="relative z-10 mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-2xl shadow-xl shadow-amber-500/30">
            ⚡
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
            <p className="text-sm text-gray-500 mt-0.5">Welcome back! Here's what's happening at the temple.</p>
          </div>
        </div>
        {/* Decorative line */}
        <div className="mt-4 h-px w-full bg-gradient-to-r from-amber-400 via-rose-400 to-violet-400 opacity-40 rounded-full" />
      </div>

      {/* Loading skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-36 rounded-2xl bg-gray-200 animate-pulse" />
          ))}
        </div>
      )}

      {/* Stats Cards */}
      {!isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {cards.map((c, index) => {
            const theme = cardThemes[index % cardThemes.length];
            return (
              <div
                key={c.label}
                className={`relative overflow-hidden rounded-2xl border ${theme.border} bg-gradient-to-br ${theme.gradient} shadow-xl ${theme.glow} hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group`}
              >
                {/* Card background noise/texture */}
                <div className="absolute inset-0 opacity-[0.04]"
                  style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

                {/* Top glow orb */}
                <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition-all duration-500" />

                <div className="relative z-10 p-6">
                  {/* Icon + Label row */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className={`text-xs font-semibold uppercase tracking-widest ${theme.accent} mb-1`}>{c.label}</p>
                      <p className={`text-xs ${theme.accent} opacity-70`}>{c.sub}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-xl ${theme.iconBg} backdrop-blur-sm flex items-center justify-center text-lg shadow-inner border border-white/20`}>
                      {theme.icon}
                    </div>
                  </div>

                  {/* Value */}
                  <p className="text-white font-bold text-3xl tracking-tight drop-shadow-sm">
                    {c.value}
                  </p>
                </div>

                {/* Bottom shine line */}
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Actions Section */}
      <div className="relative z-10 mt-10">
        <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xs">🚀</span>
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Add Pooja', href: '/admin/poojas', icon: '🪔', color: 'from-rose-500 to-pink-600' },
            { label: 'New Booking', href: '/admin/bookings', icon: '📅', color: 'from-violet-500 to-purple-600' },
            { label: 'Record Donation', href: '/admin/donations', icon: '💛', color: 'from-amber-400 to-orange-500' },
            { label: 'View Reports', href: '/admin/reports', icon: '📊', color: 'from-cyan-500 to-teal-600' },
          ].map((action) => (
            <a
              key={action.label}
              href={action.href}
              className={`flex flex-col items-center justify-center gap-2 p-5 rounded-2xl bg-gradient-to-br ${action.color} text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-white/20 group`}
            >
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{action.icon}</span>
              <span>{action.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
