'use client';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { AdminPageShell, AdminFormCard, AdminTable, AdminTr, AdminTd, AdminBtn, AdminPrimaryBtn, AdminInput, AdminSelect, StatusBadge } from '@/components/admin/AdminUI';

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
    <AdminPageShell
      title="User Management" icon="👥" subtitle="Manage admin and staff accounts"
      action={
        <AdminPrimaryBtn onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '+ Add Staff/Admin'}
        </AdminPrimaryBtn>
      }
    >
      {showForm && (
        <AdminFormCard>
          <AdminInput label="Full Name" placeholder="e.g. John Doe" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
          <AdminInput label="Email" placeholder="admin@temple.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <AdminInput label="Phone Number" placeholder="Optional" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <AdminInput label="Temporary Password" placeholder="Must be changed on first login" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <AdminSelect label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="STAFF">Staff</option>
            <option value="ADMIN">Admin</option>
          </AdminSelect>
          <div className="flex items-end">
            <button onClick={create}
              className="w-full py-2.5 rounded-xl font-bold text-white text-sm transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>
              ✓ Create User
            </button>
          </div>
        </AdminFormCard>
      )}

      {isLoading && <p className="text-purple-200/40 text-sm animate-pulse">Loading users...</p>}

      <AdminTable
        headers={['Name', 'Email', 'Phone', 'Role', 'Status', 'Actions']}
        isEmpty={!isLoading && (!users || users.length === 0)}
        emptyMessage="No users found."
      >
        {users?.map((u, i) => (
          <AdminTr key={u.id} index={i}>
            <AdminTd>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>
                  {u.fullName?.charAt(0)?.toUpperCase()}
                </div>
                <span className="font-semibold text-white">{u.fullName}</span>
              </div>
            </AdminTd>
            <AdminTd><span className="text-purple-200/70 text-xs">{u.email}</span></AdminTd>
            <AdminTd><span className="text-purple-200/60 text-xs">{u.phone || '—'}</span></AdminTd>
            <AdminTd><StatusBadge status={u.role} /></AdminTd>
            <AdminTd><StatusBadge status={u.isActive ? 'ACTIVE' : 'INACTIVE'} /></AdminTd>
            <AdminTd>
              <AdminBtn
                onClick={() => toggleActive(u)}
                variant={u.isActive ? 'danger' : 'success'}
              >
                {u.isActive ? '🚫 Disable' : '✓ Enable'}
              </AdminBtn>
            </AdminTd>
          </AdminTr>
        ))}
      </AdminTable>
    </AdminPageShell>
  );
}
