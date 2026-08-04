'use client';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

export default function AdminUsersPage() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', fullName: '', phone: '', role: 'STAFF' });

  const { data: users, isLoading } = useQuery<any[]>({
    queryKey: ['admin-users'],
    queryFn: () => api.get('/users'),
  });

  const create = async () => {
    await api.post('/auth/register', form);
    setShowForm(false);
    setForm({ email: '', password: '', fullName: '', phone: '', role: 'STAFF' });
    queryClient.invalidateQueries({ queryKey: ['admin-users'] });
  };

  const toggleActive = async (u: any) => {
    await api.patch(`/users/${u.id}`, { isActive: !u.isActive });
    queryClient.invalidateQueries({ queryKey: ['admin-users'] });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-display text-3xl text-sanctum">User Management</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-sanctum text-cream px-4 py-2 rounded-sm text-sm hover:bg-sanctum-dark">
          {showForm ? 'Cancel' : '+ Add Staff/Admin'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-brass/20 rounded-sm p-5 mb-6 grid md:grid-cols-2 gap-3">
          <input placeholder="Full Name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="border border-brass/40 rounded-sm px-3 py-2" />
          <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="border border-brass/40 rounded-sm px-3 py-2" />
          <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="border border-brass/40 rounded-sm px-3 py-2" />
          <input placeholder="Temporary Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="border border-brass/40 rounded-sm px-3 py-2" />
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="border border-brass/40 rounded-sm px-3 py-2">
            <option value="STAFF">Staff</option>
            <option value="ADMIN">Admin</option>
          </select>
          <button onClick={create} className="bg-brass text-ink px-4 py-2 rounded-sm hover:bg-brass-light">Create User</button>
        </div>
      )}

      {isLoading && <p className="text-ink/50">Loading...</p>}
      <div className="bg-white rounded-sm border border-brass/20 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-cream-dark text-left">
            <tr><th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Role</th><th className="p-3">Status</th><th className="p-3">Actions</th></tr>
          </thead>
          <tbody>
            {users?.map((u) => (
              <tr key={u.id} className="border-t border-brass/10">
                <td className="p-3">{u.fullName}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.role}</td>
                <td className="p-3">{u.isActive ? 'Active' : 'Disabled'}</td>
                <td className="p-3"><button onClick={() => toggleActive(u)} className="text-sanctum hover:underline">{u.isActive ? 'Disable' : 'Enable'}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
