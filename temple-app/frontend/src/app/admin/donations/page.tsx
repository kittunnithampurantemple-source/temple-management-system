'use client';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { AdminPageShell, AdminTable, AdminTr, AdminTd, StatusBadge } from '@/components/admin/AdminUI';

export default function AdminDonationsPage() {
  const { data, isLoading } = useQuery<any[]>({
    queryKey: ['admin-donations'],
    queryFn: () => api.get('/donations'),
  });

  return (
    <AdminPageShell title="Donation Management" icon="💛" subtitle="Track all temple donations">
      {isLoading && <p className="text-purple-200/40 text-sm animate-pulse">Loading donations...</p>}
      <AdminTable
        headers={['Donation #', 'Type', 'Donor Name', 'Amount', 'Payment', 'Date']}
        isEmpty={!isLoading && (!data || data.length === 0)}
        emptyMessage="No donations recorded yet."
      >
        {data?.map((d, i) => (
          <AdminTr key={d.id} index={i}>
            <AdminTd><span className="font-mono text-xs text-purple-300">{d.donationNumber}</span></AdminTd>
            <AdminTd><StatusBadge status={d.donationType} /></AdminTd>
            <AdminTd><span className="font-semibold text-white">{d.donorName}</span></AdminTd>
            <AdminTd><span className="font-bold text-amber-300">₹{Number(d.amount).toFixed(2)}</span></AdminTd>
            <AdminTd><span className="text-purple-200/60 text-xs uppercase tracking-wide">{d.paymentMethod?.replace(/_/g, ' ')}</span></AdminTd>
            <AdminTd><span className="text-purple-200/60 text-xs">{new Date(d.createdAt).toLocaleDateString('en-IN')}</span></AdminTd>
          </AdminTr>
        ))}
      </AdminTable>
    </AdminPageShell>
  );
}
