'use client';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export default function AdminDonationsPage() {
  const { data, isLoading } = useQuery<any[]>({
    queryKey: ['admin-donations'],
    queryFn: () => api.get('/donations'),
  });

  return (
    <div>
      <h1 className="font-display text-3xl text-sanctum mb-6">Donation Management</h1>
      {isLoading && <p className="text-ink/50">Loading...</p>}
      <div className="bg-white rounded-sm border border-brass/20 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-cream-dark text-left">
            <tr><th className="p-3">Donation #</th><th className="p-3">Type</th><th className="p-3">Donor</th><th className="p-3">Amount</th><th className="p-3">Date</th></tr>
          </thead>
          <tbody>
            {data?.map((d) => (
              <tr key={d.id} className="border-t border-brass/10">
                <td className="p-3">{d.donationNumber}</td>
                <td className="p-3">{d.donationType}</td>
                <td className="p-3">{d.donorName}</td>
                <td className="p-3">₹{Number(d.amount).toFixed(2)}</td>
                <td className="p-3">{new Date(d.createdAt).toLocaleDateString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
