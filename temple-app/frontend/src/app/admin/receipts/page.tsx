'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api, apiBaseUrl } from '@/lib/api';
import { AdminPageShell, AdminTable, AdminTr, AdminTd, AdminBtn } from '@/components/admin/AdminUI';

export default function AdminReceiptsPage() {
  const queryClient = useQueryClient();
  const { data: bookings } = useQuery<any[]>({
    queryKey: ['admin-bookings-receipts'],
    queryFn: () => api.get('/bookings'),
  });

  const reprint = async (receiptId: string) => {
    await api.get(`/receipts/${receiptId}/reprint`);
    queryClient.invalidateQueries({ queryKey: ['admin-bookings-receipts'] });
  };

  const withReceipts = bookings?.filter((b) => b.receipt);

  return (
    <AdminPageShell title="Receipt Management" icon="🧾" subtitle="Download and reprint booking receipts">
      <div className="px-1 py-2 rounded-xl border border-purple-400/20 bg-purple-500/10 text-purple-200/70 text-xs mb-2">
        ℹ️ Showing pooja booking receipts. Donation and scheme receipts can be accessed from their respective records.
      </div>
      <AdminTable
        headers={['Receipt #', 'Booking #', 'Pooja', 'Devotee', 'Reprints', 'Actions']}
        isEmpty={!withReceipts || withReceipts.length === 0}
        emptyMessage="No receipts found."
      >
        {withReceipts?.map((b, i) => (
          <AdminTr key={b.id} index={i}>
            <AdminTd><span className="font-mono text-xs text-amber-300">{b.receipt.receiptNumber}</span></AdminTd>
            <AdminTd><span className="font-mono text-xs text-purple-300">{b.bookingNumber}</span></AdminTd>
            <AdminTd><span className="font-semibold text-white">{b.pooja?.nameEn}</span></AdminTd>
            <AdminTd><span className="text-white/80">{b.devoteeName}</span></AdminTd>
            <AdminTd>
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-xs font-bold text-white">
                {b.receipt.reprintCount}
              </span>
            </AdminTd>
            <AdminTd>
              <div className="flex gap-2">
                <AdminBtn href={`${apiBaseUrl}/receipts/${b.receipt.id}/download`} variant="success">⬇ Download</AdminBtn>
                <AdminBtn onClick={() => reprint(b.receipt.id)} variant="ghost">🖨 Reprint</AdminBtn>
              </div>
            </AdminTd>
          </AdminTr>
        ))}
      </AdminTable>
    </AdminPageShell>
  );
}
