'use client';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Pooja } from '@/lib/types';

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
    if (editingId) {
      await api.patch(`/poojas/${editingId}`, form);
    } else {
      await api.post('/poojas', form);
    }
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    refresh();
  };

  const toggleAvailable = async (p: Pooja) => {
    await api.patch(`/poojas/${p.id}`, { isAvailable: !p.isAvailable });
    refresh();
  };

  const deactivate = async (p: Pooja) => {
    await api.delete(`/poojas/${p.id}`);
    refresh();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-display text-3xl text-sanctum">Pooja Management</h1>
        <button
          onClick={() => { setShowForm(!showForm); setEditingId(null); setForm(emptyForm); }}
          className="bg-sanctum text-cream px-4 py-2 rounded-sm text-sm hover:bg-sanctum-dark"
        >
          {showForm ? 'Cancel' : '+ Add Pooja'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-brass/20 rounded-sm p-5 mb-6 grid md:grid-cols-2 gap-4">
          <input placeholder="Name (Malayalam)" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border border-brass/40 rounded-sm px-3 py-2" />
          <input placeholder="Name (English)" value={form.nameEn} onChange={(e) => setForm({ ...form, nameEn: e.target.value })} className="border border-brass/40 rounded-sm px-3 py-2" />
          <input placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="border border-brass/40 rounded-sm px-3 py-2" />
          <input placeholder="Duration (minutes)" type="number" value={form.durationMinutes} onChange={(e) => setForm({ ...form, durationMinutes: Number(e.target.value) })} className="border border-brass/40 rounded-sm px-3 py-2" />
          <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="border border-brass/40 rounded-sm px-3 py-2 md:col-span-2" />
          <button onClick={save} className="bg-brass text-ink px-4 py-2 rounded-sm md:col-span-2 hover:bg-brass-light">
            {editingId ? 'Update Pooja' : 'Create Pooja'}
          </button>
        </div>
      )}

      {isLoading && <p className="text-ink/50">Loading...</p>}
      <div className="bg-white rounded-sm border border-brass/20 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-cream-dark text-left">
            <tr>
              <th className="p-3">Name</th><th className="p-3">Price</th><th className="p-3">Available</th><th className="p-3">Active</th><th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {poojas?.map((p) => (
              <tr key={p.id} className="border-t border-brass/10">
                <td className="p-3">{p.nameEn} <span className="text-ink/40">({p.name})</span></td>
                <td className="p-3">₹{Number(p.price).toFixed(2)}</td>
                <td className="p-3">
                  <button onClick={() => toggleAvailable(p)} className={`px-2 py-1 rounded-sm text-xs ${p.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {p.isAvailable ? 'Available' : 'Unavailable'}
                  </button>
                </td>
                <td className="p-3">{p.isActive ? 'Active' : 'Inactive'}</td>
                <td className="p-3 space-x-2">
                  <button onClick={() => startEdit(p)} className="text-sanctum hover:underline">Edit</button>
                  <button onClick={() => deactivate(p)} className="text-red-700 hover:underline">Deactivate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
