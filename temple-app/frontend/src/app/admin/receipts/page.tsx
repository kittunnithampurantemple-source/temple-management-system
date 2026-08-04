'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api, apiBaseUrl } from '@/lib/api';

export default function AdminReceiptsPage() {
  const queryClient = useQueryClient();
  // Receipts are surfaced through bookings/donations/schemes; here we pull
  // bookings with receipts as a representative combined view.
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
    <div>
      <h1 className="font-display text-3xl text-sanctum mb-6">Receipt Management</h1>
      <p className="text-sm text-ink/50 mb-4">
        Showing pooja booking receipts. Donation and scheme receipts can be downloaded
        the same way from their respective records (id shown on each record).
      </p>
      <div className="bg-white rounded-sm border border-brass/20 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-cream-dark text-left">
            <tr><th className="p-3">Receipt #</th><th className="p-3">Booking #</th><th className="p-3">Reprints</th><th className="p-3">Actions</th></tr>
          </thead>
          <tbody>
            {withReceipts?.map((b) => (
              <tr key={b.id} className="border-t border-brass/10">
                <td className="p-3">{b.receipt.receiptNumber}</td>
                <td className="p-3">{b.bookingNumber}</td>
                <td className="p-3">{b.receipt.reprintCount}</td>
                <td className="p-3 space-x-3">
                  <a href={`${apiBaseUrl}/receipts/${b.receipt.id}/download`} target="_blank" className="text-sanctum hover:underline">Download</a>
                  <button onClick={() => reprint(b.receipt.id)} className="text-brass-dark hover:underline">Reprint</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
