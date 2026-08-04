'use client';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Pooja, Booking } from '@/lib/types';

const statuses = ['PENDING_PAYMENT', 'CONFIRMED', 'SCHEDULED', 'COMPLETED', 'CANCELLED'];
const paymentMethods = ['CASH', 'COUNTER_UPI', 'BANK_TRANSFER', 'CHEQUE'];

export default function AdminBookingsPage() {
  const queryClient = useQueryClient();
  const [showOfflineForm, setShowOfflineForm] = useState(false);
  const [offlineForm, setOfflineForm] = useState({
    poojaId: '', poojaDate: '', devoteeName: '', nakshatra: '', email: '', phone: '', address: '',
    paymentMethod: 'CASH', offlineReference: '',
  });

  const { data: bookings, isLoading } = useQuery<Booking[]>({
    queryKey: ['admin-bookings'],
    queryFn: () => api.get('/bookings'),
  });

  const { data: poojas } = useQuery<Pooja[]>({
    queryKey: ['admin-poojas-for-offline'],
    queryFn: () => api.get('/poojas/admin/all'),
  });

  const refresh = () => queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });

  const updateStatus = async (id: string, status: string) => {
    await api.patch(`/bookings/${id}/status`, { status });
    refresh();
  };

  const submitOffline = async () => {
    await api.post('/bookings/offline', offlineForm);
    setShowOfflineForm(false);
    refresh();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-display text-3xl text-sanctum">Booking Management</h1>
        <button onClick={() => setShowOfflineForm(!showOfflineForm)} className="bg-sanctum text-cream px-4 py-2 rounded-sm text-sm hover:bg-sanctum-dark">
          {showOfflineForm ? 'Cancel' : '+ Offline Counter Booking'}
        </button>
      </div>

      {showOfflineForm && (
        <div className="bg-white border border-brass/20 rounded-sm p-5 mb-6 grid md:grid-cols-2 gap-3">
          <select value={offlineForm.poojaId} onChange={(e) => setOfflineForm({ ...offlineForm, poojaId: e.target.value })} className="border border-brass/40 rounded-sm px-3 py-2">
            <option value="">Select Pooja</option>
            {poojas?.map((p) => <option key={p.id} value={p.id}>{p.nameEn} - ₹{Number(p.price).toFixed(2)}</option>)}
          </select>
          <input type="date" value={offlineForm.poojaDate} onChange={(e) => setOfflineForm({ ...offlineForm, poojaDate: e.target.value })} className="border border-brass/40 rounded-sm px-3 py-2" />
          <input placeholder="Devotee Name" value={offlineForm.devoteeName} onChange={(e) => setOfflineForm({ ...offlineForm, devoteeName: e.target.value })} className="border border-brass/40 rounded-sm px-3 py-2" />
          <input placeholder="Nakshatra" value={offlineForm.nakshatra} onChange={(e) => setOfflineForm({ ...offlineForm, nakshatra: e.target.value })} className="border border-brass/40 rounded-sm px-3 py-2" />
          <input placeholder="Email" value={offlineForm.email} onChange={(e) => setOfflineForm({ ...offlineForm, email: e.target.value })} className="border border-brass/40 rounded-sm px-3 py-2" />
          <input placeholder="Phone" value={offlineForm.phone} onChange={(e) => setOfflineForm({ ...offlineForm, phone: e.target.value })} className="border border-brass/40 rounded-sm px-3 py-2" />
          <input placeholder="Address" value={offlineForm.address} onChange={(e) => setOfflineForm({ ...offlineForm, address: e.target.value })} className="border border-brass/40 rounded-sm px-3 py-2 md:col-span-2" />
          <select value={offlineForm.paymentMethod} onChange={(e) => setOfflineForm({ ...offlineForm, paymentMethod: e.target.value })} className="border border-brass/40 rounded-sm px-3 py-2">
            {paymentMethods.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <input placeholder="Reference (cheque no. / txn ref)" value={offlineForm.offlineReference} onChange={(e) => setOfflineForm({ ...offlineForm, offlineReference: e.target.value })} className="border border-brass/40 rounded-sm px-3 py-2" />
          <button onClick={submitOffline} className="bg-brass text-ink px-4 py-2 rounded-sm md:col-span-2 hover:bg-brass-light">Create Booking & Receipt</button>
        </div>
      )}

      {isLoading && <p className="text-ink/50">Loading...</p>}
      <div className="bg-white rounded-sm border border-brass/20 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-cream-dark text-left">
            <tr>
              <th className="p-3">Booking #</th><th className="p-3">Pooja</th><th className="p-3">Devotee</th>
              <th className="p-3">Date</th><th className="p-3">Amount</th><th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((b) => (
              <tr key={b.id} className="border-t border-brass/10">
                <td className="p-3">{b.bookingNumber}</td>
                <td className="p-3">{b.pooja?.nameEn}</td>
                <td className="p-3">{b.devoteeName}</td>
                <td className="p-3">{new Date(b.poojaDate).toLocaleDateString('en-IN')}</td>
                <td className="p-3">₹{Number(b.amount).toFixed(2)}</td>
                <td className="p-3">
                  <select value={b.status} onChange={(e) => updateStatus(b.id, e.target.value)} className="border border-brass/30 rounded-sm px-2 py-1 text-xs">
                    {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
