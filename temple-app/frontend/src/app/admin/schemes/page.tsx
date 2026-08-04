'use client';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { AdminPageShell, AdminTable, AdminTr, AdminTd, StatusBadge } from '@/components/admin/AdminUI';

export default function AdminSchemesPage() {
  const { data, isLoading } = useQuery<any[]>({
    queryKey: ['admin-schemes'],
    queryFn: () => api.get('/schemes'),
  });

  return (
    <AdminPageShell title="Annual Schemes" icon="📋" subtitle="Manage annual scheme enrollments">
      {isLoading && <p className="text-purple-200/40 text-sm animate-pulse">Loading schemes...</p>}
      <AdminTable
        headers={['Scheme #', 'Scheme Name', 'Devotee', 'Amount', 'Renewal Date', 'Status']}
        isEmpty={!isLoading && (!data || data.length === 0)}
        emptyMessage="No annual schemes found."
      >
        {data?.map((s, i) => (
          <AdminTr key={s.id} index={i}>
            <AdminTd><span className="font-mono text-xs text-purple-300">{s.schemeNumber}</span></AdminTd>
            <AdminTd><span className="font-semibold text-white">{s.schemeName}</span></AdminTd>
            <AdminTd><span className="text-white/80">{s.devoteeName}</span></AdminTd>
            <AdminTd><span className="font-bold text-amber-300">₹{Number(s.amount ?? 0).toFixed(2)}</span></AdminTd>
            <AdminTd><span className="text-purple-200/60 text-xs">{new Date(s.renewalDate).toLocaleDateString('en-IN')}</span></AdminTd>
            <AdminTd><StatusBadge status={s.status ?? 'ACTIVE'} /></AdminTd>
          </AdminTr>
        ))}
      </AdminTable>
    </AdminPageShell>
  );
}
