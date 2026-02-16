import { useState, useEffect } from 'react';
import {
  Package,
  Pencil,
  AlertCircle,
  X,
  Check,
  ExternalLink,
} from 'lucide-react';
import { supabase } from '@/app/lib/supabase';
import { retryQuery } from '@/app/lib/retry';
import { useAuth } from '@/app/contexts/AuthContext';
import type { Database } from '@/app/lib/database.types';

type ServiceRow = Database['public']['Tables']['services']['Row'];

function formatPrice(cents: number | null) {
  if (cents === null || cents === undefined) return '--';
  return `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
}

function truncate(str: string | null, len = 20) {
  if (!str) return '--';
  return str.length > len ? str.slice(0, len) + '...' : str;
}

export function AdminServices() {
  const { session } = useAuth();
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingService, setEditingService] = useState<ServiceRow | null>(null);
  const [saving, setSaving] = useState(false);

  // Edit form state
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editSetupPrice, setEditSetupPrice] = useState('');
  const [editMonthlyPrice, setEditMonthlyPrice] = useState('');
  const [editStripeSetupId, setEditStripeSetupId] = useState('');
  const [editStripeMonthlyId, setEditStripeMonthlyId] = useState('');
  const [editFeatures, setEditFeatures] = useState('');
  const [editIsActive, setEditIsActive] = useState(true);
  const [editDisplayOrder, setEditDisplayOrder] = useState(0);

  async function fetchServices() {
    const { data, error: err } = await retryQuery(() =>
      supabase.from('services').select('*').order('display_order', { ascending: true })
    );
    if (err) {
      setError('Failed to load services.');
      console.error(err);
    } else {
      setServices(data || []);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchServices();
  }, []);

  function openEdit(service: ServiceRow) {
    setEditingService(service);
    setEditName(service.name);
    setEditDescription(service.description || '');
    setEditCategory(service.category || '');
    setEditSetupPrice(service.setup_price_cents !== null ? (service.setup_price_cents / 100).toString() : '');
    setEditMonthlyPrice(service.monthly_price_cents !== null ? (service.monthly_price_cents / 100).toString() : '');
    setEditStripeSetupId(service.stripe_setup_price_id || '');
    setEditStripeMonthlyId(service.stripe_monthly_price_id || '');
    setEditFeatures(service.features ? JSON.stringify(service.features, null, 2) : '[]');
    setEditIsActive(service.is_active);
    setEditDisplayOrder(service.display_order ?? 0);
    setError(null);
  }

  function closeEdit() {
    setEditingService(null);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editingService || !session?.access_token) return;
    setSaving(true);
    setError(null);

    // Validate features JSON
    let parsedFeatures: unknown;
    try {
      parsedFeatures = JSON.parse(editFeatures);
    } catch {
      setError('Features must be valid JSON.');
      setSaving(false);
      return;
    }

    const updates: Record<string, unknown> = {
      name: editName,
      description: editDescription || null,
      category: editCategory || null,
      setup_price_cents: editSetupPrice ? Math.round(parseFloat(editSetupPrice) * 100) : null,
      monthly_price_cents: editMonthlyPrice ? Math.round(parseFloat(editMonthlyPrice) * 100) : null,
      stripe_setup_price_id: editStripeSetupId || null,
      stripe_monthly_price_id: editStripeMonthlyId || null,
      features: parsedFeatures,
      is_active: editIsActive,
      display_order: editDisplayOrder,
    };

    try {
      const res = await fetch('/api/admin-update-service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ serviceId: editingService.id, updates }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Update failed (${res.status})`);
      }

      const { service: updated } = await res.json();
      setServices((prev) =>
        prev.map((s) => (s.id === editingService.id ? { ...s, ...updated } : s))
      );
      closeEdit();
    } catch (err: any) {
      setError(err.message || 'Failed to update service.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl mb-2">
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
              Services
            </span>
          </h1>
        </div>
        <div className="glass-panel p-12 rounded-2xl border border-white/10 text-center">
          <div className="animate-pulse text-zinc-500">Loading services...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && !editingService && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/5 border border-red-400/20 text-red-400 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}

      <div>
        <h1 className="text-4xl mb-2">
          <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
            Services
          </span>
        </h1>
        <p className="text-zinc-400">View and edit service listings</p>
      </div>

      {/* Services Table */}
      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
        {/* Desktop table header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 border-b border-white/5 text-xs text-zinc-500 uppercase tracking-wider">
          <div className="col-span-3">Name</div>
          <div className="col-span-1">Category</div>
          <div className="col-span-1 text-right">Setup</div>
          <div className="col-span-1 text-right">Monthly</div>
          <div className="col-span-1 text-center">Active</div>
          <div className="col-span-2">Stripe Setup ID</div>
          <div className="col-span-2">Stripe Monthly ID</div>
          <div className="col-span-1 text-right">Edit</div>
        </div>

        {services.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 text-sm">No services found.</div>
        ) : (
          <div className="divide-y divide-white/5">
            {services.map((service) => (
              <div
                key={service.id}
                className="md:grid md:grid-cols-12 md:gap-4 px-5 py-4 items-center"
              >
                {/* Mobile: stacked layout */}
                <div className="col-span-3">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-cyan-400 flex-shrink-0 md:hidden" />
                    <span className="text-sm font-medium">{service.name}</span>
                  </div>
                  <div className="text-xs text-zinc-500 md:hidden mt-1">
                    {service.category || 'Uncategorized'} | Setup: {formatPrice(service.setup_price_cents)} | Monthly: {formatPrice(service.monthly_price_cents)}
                  </div>
                </div>
                <div className="col-span-1 hidden md:block text-sm text-zinc-400">
                  {service.category || '--'}
                </div>
                <div className="col-span-1 hidden md:block text-sm text-right">
                  {formatPrice(service.setup_price_cents)}
                </div>
                <div className="col-span-1 hidden md:block text-sm text-right">
                  {formatPrice(service.monthly_price_cents)}
                </div>
                <div className="col-span-1 hidden md:flex justify-center">
                  {service.is_active ? (
                    <span className="w-2 h-2 rounded-full bg-emerald-400" title="Active" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-zinc-600" title="Inactive" />
                  )}
                </div>
                <div className="col-span-2 hidden md:block text-xs text-zinc-500 font-mono truncate" title={service.stripe_setup_price_id || ''}>
                  {truncate(service.stripe_setup_price_id)}
                </div>
                <div className="col-span-2 hidden md:block text-xs text-zinc-500 font-mono truncate" title={service.stripe_monthly_price_id || ''}>
                  {truncate(service.stripe_monthly_price_id)}
                </div>
                <div className="col-span-1 flex justify-end mt-2 md:mt-0">
                  <button
                    onClick={() => openEdit(service)}
                    className="p-2 rounded-lg hover:bg-cyan-500/10 text-zinc-400 hover:text-cyan-400 transition-colors"
                    title="Edit service"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal Overlay */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeEdit} />
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium">Edit Service</h2>
              <button onClick={closeEdit} className="text-zinc-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-red-500/5 border border-red-400/20 text-red-400 text-sm mb-4">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900/50 border border-white/10 text-white text-sm focus:border-cyan-400/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-1">Description</label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900/50 border border-white/10 text-white text-sm focus:border-cyan-400/40 focus:outline-none resize-y"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Category</label>
                  <input
                    type="text"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900/50 border border-white/10 text-white text-sm focus:border-cyan-400/40 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={editDisplayOrder}
                    onChange={(e) => setEditDisplayOrder(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900/50 border border-white/10 text-white text-sm focus:border-cyan-400/40 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Setup Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editSetupPrice}
                    onChange={(e) => setEditSetupPrice(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900/50 border border-white/10 text-white text-sm focus:border-cyan-400/40 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Monthly Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editMonthlyPrice}
                    onChange={(e) => setEditMonthlyPrice(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900/50 border border-white/10 text-white text-sm focus:border-cyan-400/40 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Stripe Setup Price ID</label>
                  <input
                    type="text"
                    value={editStripeSetupId}
                    onChange={(e) => setEditStripeSetupId(e.target.value)}
                    placeholder="price_..."
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900/50 border border-white/10 text-white text-sm font-mono focus:border-cyan-400/40 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Stripe Monthly Price ID</label>
                  <input
                    type="text"
                    value={editStripeMonthlyId}
                    onChange={(e) => setEditStripeMonthlyId(e.target.value)}
                    placeholder="price_..."
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900/50 border border-white/10 text-white text-sm font-mono focus:border-cyan-400/40 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-1">Features (JSON)</label>
                <textarea
                  value={editFeatures}
                  onChange={(e) => setEditFeatures(e.target.value)}
                  rows={5}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900/50 border border-white/10 text-white text-sm font-mono focus:border-cyan-400/40 focus:outline-none resize-y"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEditIsActive(!editIsActive)}
                  className={`w-10 h-6 rounded-full transition-colors relative ${
                    editIsActive ? 'bg-emerald-500' : 'bg-zinc-700'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                      editIsActive ? 'left-[18px]' : 'left-0.5'
                    }`}
                  />
                </button>
                <span className="text-sm text-zinc-400">{editIsActive ? 'Active' : 'Inactive'}</span>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeEdit}
                  className="px-5 py-2 rounded-lg bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {saving ? 'Saving...' : (
                    <>
                      <Check className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
