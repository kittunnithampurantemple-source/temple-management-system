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

export default function AdminDashboardPage() {
  const { data, isLoading } = useQuery<Overview>({
    queryKey: ['admin-dashboard'],
    queryFn: () => api.get('/admin/dashboard'),
  });

  const cards = [
    { label: "Today's Revenue", value: data ? `₹${data.todayRevenue.toFixed(2)}` : '—' },
    { label: 'Monthly Revenue', value: data ? `₹${data.monthlyRevenue.toFixed(2)}` : '—' },
    { label: 'Total Donations', value: data ? `₹${data.totalDonations.toFixed(2)}` : '—' },
    { label: 'Total Bookings', value: data?.totalBookings ?? '—' },
    { label: 'Pending Poojas', value: data?.pendingPoojas ?? '—' },
    { label: 'Completed Poojas', value: data?.completedPoojas ?? '—' },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl text-sanctum mb-6">Dashboard Overview</h1>
      {isLoading && <p className="text-ink/50">Loading...</p>}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {cards.map((c) => (
          <div key={c.label} className="bg-white rounded-sm border border-brass/20 p-5">
            <p className="text-sm text-ink/50">{c.label}</p>
            <p className="font-display text-3xl text-sanctum mt-1">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
