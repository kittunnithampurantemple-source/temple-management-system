'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api, apiBaseUrl } from '@/lib/api';
import { AdminPageShell, AdminFormCard, AdminInput, AdminBtn } from '@/components/admin/AdminUI';

function todayStr() { return new Date().toISOString().slice(0, 10); }
function monthAgoStr() { const d = new Date(); d.setMonth(d.getMonth() - 1); return d.toISOString().slice(0, 10); }

export default function AdminReportsPage() {
  const [from, setFrom] = useState(monthAgoStr());
  const [to, setTo] = useState(todayStr());

  const { data, refetch, isFetching } = useQuery({
    queryKey: ['report-summary', from, to],
    queryFn: () => api.get(`/reports/summary?from=${from}&to=${to}`),
  });

  return (
    <AdminPageShell title="Reports" icon="📊" subtitle="Generate revenue and operational summaries">
      <AdminFormCard>
        <div>
          <label className="block text-xs font-semibold text-purple-200/70 uppercase tracking-wider mb-2">From Date</label>
          <AdminInput type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-purple-200/70 uppercase tracking-wider mb-2">To Date</label>
          <AdminInput type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
        <div className="md:col-span-2 flex flex-wrap gap-3 mt-2">
          <button onClick={() => refetch()} className="flex-1 py-3 px-6 rounded-xl font-bold text-white text-sm transition-all duration-300 hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>
            {isFetching ? '⏳ Generating...' : '✓ Run Report'}
          </button>
          <a href={`${apiBaseUrl}/reports/export/pdf?from=${from}&to=${to}`} target="_blank" className="flex-1 flex items-center justify-center py-3 px-6 rounded-xl font-bold text-rose-300 text-sm border border-rose-500/40 bg-rose-500/10 hover:bg-rose-500/20 transition-all duration-300">
            📄 Export PDF
          </a>
          <a href={`${apiBaseUrl}/reports/export/excel?from=${from}&to=${to}`} target="_blank" className="flex-1 flex items-center justify-center py-3 px-6 rounded-xl font-bold text-emerald-300 text-sm border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all duration-300">
            📊 Export Excel
          </a>
        </div>
      </AdminFormCard>

      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 relative z-10">
          <div className="relative overflow-hidden rounded-2xl border border-rose-700/40 bg-gradient-to-br from-rose-900 via-rose-800 to-rose-950 p-6 shadow-xl shadow-rose-900/50">
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <p className="text-xs font-semibold uppercase tracking-widest text-rose-200 mb-2 relative z-10">Pooja Revenue</p>
            <p className="font-display text-3xl font-bold text-white drop-shadow-lg relative z-10">₹{data.poojaRevenue.toFixed(2)}</p>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-amber-600/40 bg-gradient-to-br from-amber-800 via-yellow-700 to-orange-900 p-6 shadow-xl shadow-amber-900/50">
             <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-200 mb-2 relative z-10">Donation Revenue</p>
            <p className="font-display text-3xl font-bold text-white drop-shadow-lg relative z-10">₹{data.donationRevenue.toFixed(2)}</p>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-purple-700/40 bg-gradient-to-br from-purple-900 via-fuchsia-900 to-indigo-950 p-6 shadow-xl shadow-purple-900/50">
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-200 mb-2 relative z-10">Total Revenue</p>
            <p className="font-display text-3xl font-bold text-white drop-shadow-lg relative z-10">₹{data.totalRevenue.toFixed(2)}</p>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-emerald-700/40 bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-950 p-6 shadow-xl shadow-emerald-900/50">
             <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-200 mb-2 relative z-10">Bookings & Donations</p>
            <p className="font-display text-3xl font-bold text-white drop-shadow-lg relative z-10">{data.bookingCount} / {data.donationCount}</p>
          </div>
        </div>
      )}
      <div className="mt-8 px-4 py-3 rounded-xl border border-purple-400/20 bg-purple-500/5 text-purple-200/60 text-sm">
        <span className="font-bold mr-2 text-purple-300">Tip:</span> 
        Use the date-range picker above for Daily, Monthly, or Yearly reporting. Exports are bounded to the chosen period.
      </div>
    </AdminPageShell>
  );
}
