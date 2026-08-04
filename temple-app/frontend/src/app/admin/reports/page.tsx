'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api, apiBaseUrl } from '@/lib/api';

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
    <div>
      <h1 className="font-display text-3xl text-sanctum mb-6">Reports</h1>

      <div className="bg-white border border-brass/20 rounded-sm p-5 mb-6 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-xs text-ink/50 mb-1">From</label>
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="border border-brass/40 rounded-sm px-3 py-2" />
        </div>
        <div>
          <label className="block text-xs text-ink/50 mb-1">To</label>
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="border border-brass/40 rounded-sm px-3 py-2" />
        </div>
        <button onClick={() => refetch()} className="bg-sanctum text-cream px-4 py-2 rounded-sm hover:bg-sanctum-dark">
          {isFetching ? 'Loading...' : 'Run Report'}
        </button>
        <a href={`${apiBaseUrl}/reports/export/pdf?from=${from}&to=${to}`} target="_blank" className="border border-brass text-brass-dark px-4 py-2 rounded-sm hover:bg-brass/10">
          Export PDF
        </a>
        <a href={`${apiBaseUrl}/reports/export/excel?from=${from}&to=${to}`} target="_blank" className="border border-brass text-brass-dark px-4 py-2 rounded-sm hover:bg-brass/10">
          Export Excel
        </a>
      </div>

      {data && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-brass/20 rounded-sm p-4"><p className="text-xs text-ink/50">Pooja Revenue</p><p className="font-display text-2xl text-sanctum">₹{data.poojaRevenue.toFixed(2)}</p></div>
          <div className="bg-white border border-brass/20 rounded-sm p-4"><p className="text-xs text-ink/50">Donation Revenue</p><p className="font-display text-2xl text-sanctum">₹{data.donationRevenue.toFixed(2)}</p></div>
          <div className="bg-white border border-brass/20 rounded-sm p-4"><p className="text-xs text-ink/50">Total Revenue</p><p className="font-display text-2xl text-sanctum">₹{data.totalRevenue.toFixed(2)}</p></div>
          <div className="bg-white border border-brass/20 rounded-sm p-4"><p className="text-xs text-ink/50">Bookings / Donations</p><p className="font-display text-2xl text-sanctum">{data.bookingCount} / {data.donationCount}</p></div>
        </div>
      )}
      <p className="text-xs text-ink/40 mt-6">
        Use this same date-range picker for Daily (same day), Monthly, or Yearly reports by adjusting From/To.
      </p>
    </div>
  );
}
