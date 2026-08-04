'use client';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Pooja, Booking } from '@/lib/types';
import { AdminPageShell, AdminFormCard, AdminTable, AdminTr, AdminTd, AdminBtn, AdminPrimaryBtn, AdminInput, AdminSelect, StatusBadge } from '@/components/admin/AdminUI';

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
    await api.patch(`/bookings/${id}/status`, { status }); refresh();
  };

  const submitOffline = async () => {
    await api.post('/bookings/offline', offlineForm);
    setShowOfflineForm(false); refresh();
  };

  return (
    <AdminPageShell
      title="Booking Management" icon="📅" subtitle="Manage devotee pooja bookings"
      action={
        <AdminPrimaryBtn onClick={() => setShowOfflineForm(!showOfflineForm)}>
          {showOfflineForm ? '✕ Cancel' : '+ Offline Booking'}
        </AdminPrimaryBtn>
      }
    >
      {showOfflineForm && (
        <AdminFormCard>
          <AdminSelect label="Pooja" value={offlineForm.poojaId} onChange={(e) => setOfflineForm({ ...offlineForm, poojaId: e.target.value })}>
            <option value="">Select Pooja</option>
            {poojas?.map((p) => <option key={p.id} value={p.id}>{p.nameEn} — ₹{Number(p.price).toFixed(2)}</option>)}
          </AdminSelect>
          <AdminInput label="Date" type="date" value={offlineForm.poojaDate} onChange={(e) => setOfflineForm({ ...offlineForm, poojaDate: e.target.value })} />
          <AdminInput label="Devotee Name" placeholder="Full Name" value={offlineForm.devoteeName} onChange={(e) => setOfflineForm({ ...offlineForm, devoteeName: e.target.value })} />
          <AdminInput label="Nakshatra" placeholder="Star Sign (Optional)" value={offlineForm.nakshatra} onChange={(e) => setOfflineForm({ ...offlineForm, nakshatra: e.target.value })} />
          <AdminInput label="Email" placeholder="Email Address (Optional)" value={offlineForm.email} onChange={(e) => setOfflineForm({ ...offlineForm, email: e.target.value })} />
          <AdminInput label="Phone" placeholder="Phone Number" value={offlineForm.phone} onChange={(e) => setOfflineForm({ ...offlineForm, phone: e.target.value })} />
          <AdminInput label="Address" placeholder="Full Address (Optional)" value={offlineForm.address} onChange={(e) => setOfflineForm({ ...offlineForm, address: e.target.value })} className="md:col-span-2" />
          <AdminSelect label="Payment Method" value={offlineForm.paymentMethod} onChange={(e) => setOfflineForm({ ...offlineForm, paymentMethod: e.target.value })}>
            {paymentMethods.map((m) => <option key={m} value={m}>{m}</option>)}
          </AdminSelect>
          <AdminInput label="Payment Reference" placeholder="Cheque no. / TXN Ref (if applicable)" value={offlineForm.offlineReference} onChange={(e) => setOfflineForm({ ...offlineForm, offlineReference: e.target.value })} />
          <div className="md:col-span-2">
            <button onClick={submitOffline}
              className="w-full py-3 rounded-xl font-bold text-white text-sm transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>
              ✓ Create Booking & Print Receipt
            </button>
          </div>
        </AdminFormCard>
      )}

      {isLoading && <p className="text-purple-200/40 text-sm animate-pulse">Loading bookings...</p>}

      <AdminTable
        headers={['Booking #', 'Pooja', 'Devotee', 'Date', 'Amount', 'Status', 'Action']}
        isEmpty={!isLoading && (!bookings || bookings.length === 0)}
        emptyMessage="No bookings yet."
      >
        {bookings?.map((b, i) => (
          <AdminTr key={b.id} index={i}>
            <AdminTd><span className="font-mono text-xs text-purple-300">{b.bookingNumber}</span></AdminTd>
            <AdminTd><span className="font-semibold text-white">{b.pooja?.nameEn}</span></AdminTd>
            <AdminTd><span className="text-white/80">{b.devoteeName}</span></AdminTd>
            <AdminTd><span className="text-purple-200/60 text-xs">{new Date(b.poojaDate).toLocaleDateString('en-IN')}</span></AdminTd>
            <AdminTd><span className="font-bold text-amber-300">₹{Number(b.amount).toFixed(2)}</span></AdminTd>
            <AdminTd>
              <select
                value={b.status}
                onChange={(e) => updateStatus(b.id, e.target.value)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-white/10 border border-white/10 focus:outline-none focus:border-violet-400/60 cursor-pointer"
              >
                {statuses.map((s) => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
              </select>
            </AdminTd>
            <AdminTd>
              <StatusBadge status={b.status} />
            </AdminTd>
          </AdminTr>
        ))}
      </AdminTable>
    </AdminPageShell>
  );
}
