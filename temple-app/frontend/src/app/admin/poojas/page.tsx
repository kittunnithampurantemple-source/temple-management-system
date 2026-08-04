'use client';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Pooja } from '@/lib/types';
import { AdminPageShell, AdminFormCard, AdminTable, AdminTr, AdminTd, AdminBtn, AdminPrimaryBtn, AdminInput, AdminTextarea, StatusBadge } from '@/components/admin/AdminUI';

const emptyForm = { name: '', nameEn: '', description: '', price: 0, durationMinutes: 30 };

export default function AdminPoojasPage() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { data: poojas, isLoading } = useQuery<Pooja[]>({
    queryKey: ['admin-poojas'],
    queryFn: () => api.get('/poojas/admin/all'),
  });

  const refresh = () => queryClient.invalidateQueries({ queryKey: ['admin-poojas'] });

  const startEdit = (p: Pooja) => {
    setEditingId(p.id);
    setForm({ name: p.name, nameEn: p.nameEn, description: p.description || '', price: Number(p.price), durationMinutes: p.durationMinutes });
    setShowForm(true);
  };

  const save = async () => {
    if (editingId) await api.patch(`/poojas/${editingId}`, form);
    else await api.post('/poojas', form);
    setForm(emptyForm); setEditingId(null); setShowForm(false); refresh();
  };

  const toggleAvailable = async (p: Pooja) => {
    await api.patch(`/poojas/${p.id}`, { isAvailable: !p.isAvailable }); refresh();
  };

  const deactivate = async (p: Pooja) => {
    await api.delete(`/poojas/${p.id}`); refresh();
  };

  return (
    <AdminPageShell
      title="Pooja Management" icon="🪔" subtitle="Manage temple pooja offerings"
      action={
        <AdminPrimaryBtn onClick={() => { setShowForm(!showForm); setEditingId(null); setForm(emptyForm); }}>
          {showForm ? '✕ Cancel' : '+ Add Pooja'}
        </AdminPrimaryBtn>
      }
    >
      {showForm && (
        <AdminFormCard>
          <AdminInput placeholder="Name (Malayalam)" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <AdminInput placeholder="Name (English)" value={form.nameEn} onChange={(e) => setForm({ ...form, nameEn: e.target.value })} />
          <AdminInput placeholder="Price (₹)" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
          <AdminInput placeholder="Duration (minutes)" type="number" value={form.durationMinutes} onChange={(e) => setForm({ ...form, durationMinutes: Number(e.target.value) })} />
          <AdminTextarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <div className="md:col-span-2">
            <button onClick={save}
              className="w-full py-3 rounded-xl font-bold text-white text-sm transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>
              {editingId ? '✓ Update Pooja' : '+ Create Pooja'}
            </button>
          </div>
        </AdminFormCard>
      )}

      {isLoading && <p className="text-purple-200/40 text-sm animate-pulse">Loading poojas...</p>}

      <AdminTable
        headers={['Pooja Name', 'Price', 'Duration', 'Availability', 'Status', 'Actions']}
        isEmpty={!isLoading && (!poojas || poojas.length === 0)}
        emptyMessage="No poojas found. Click '+ Add Pooja' to create one."
      >
        {poojas?.map((p, i) => (
          <AdminTr key={p.id} index={i}>
            <AdminTd>
              <div>
                <div className="font-semibold text-white">{p.nameEn}</div>
                <div className="text-xs text-purple-200/50 mt-0.5 font-mal">{p.name}</div>
              </div>
            </AdminTd>
            <AdminTd><span className="font-bold text-amber-300">₹{Number(p.price).toFixed(2)}</span></AdminTd>
            <AdminTd><span className="text-purple-200/60">{p.durationMinutes} min</span></AdminTd>
            <AdminTd>
              <button onClick={() => toggleAvailable(p)}>
                <StatusBadge status={p.isAvailable ? 'ACTIVE' : 'INACTIVE'} />
              </button>
            </AdminTd>
            <AdminTd><StatusBadge status={p.isActive ? 'ACTIVE' : 'INACTIVE'} /></AdminTd>
            <AdminTd>
              <div className="flex gap-2">
                <AdminBtn onClick={() => startEdit(p)} variant="default">✏️ Edit</AdminBtn>
                <AdminBtn onClick={() => deactivate(p)} variant="danger">🗑 Deactivate</AdminBtn>
              </div>
            </AdminTd>
          </AdminTr>
        ))}
      </AdminTable>
    </AdminPageShell>
  );
}
