'use client';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export default function AdminSchemesPage() {
  const { data, isLoading } = useQuery<any[]>({
    queryKey: ['admin-schemes'],
    queryFn: () => api.get('/schemes'),
  });

  return (
    <div>
      <h1 className="font-display text-3xl text-sanctum mb-6">Annual Scheme Management</h1>
      {isLoading && <p className="text-ink/50">Loading...</p>}
      <div className="bg-white rounded-sm border border-brass/20 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-cream-dark text-left">
            <tr><th className="p-3">Scheme #</th><th className="p-3">Name</th><th className="p-3">Devotee</th><th className="p-3">Renewal Date</th><th className="p-3">Status</th></tr>
          </thead>
          <tbody>
            {data?.map((s) => (
              <tr key={s.id} className="border-t border-brass/10">
                <td className="p-3">{s.schemeNumber}</td>
                <td className="p-3">{s.schemeName}</td>
                <td className="p-3">{s.devoteeName}</td>
                <td className="p-3">{new Date(s.renewalDate).toLocaleDateString('en-IN')}</td>
                <td className="p-3">{s.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
