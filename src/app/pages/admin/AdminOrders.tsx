import { useState, useEffect, useMemo } from 'react';
import {
  ShoppingCart,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  ExternalLink,
  Search,
} from 'lucide-react';
import { supabase } from '@/app/lib/supabase';
import { retryQuery } from '@/app/lib/retry';
import type { Database } from '@/app/lib/database.types';

type OrderRow = Database['public']['Tables']['orders']['Row'];
type OrderStatus = Database['public']['Enums']['order_status'];

interface OrderWithJoins extends OrderRow {
  clients: { business_name: string | null } | null;
  services: { name: string } | null;
}

const orderStatusBadge: Record<string, { color: string; icon: typeof CheckCircle }> = {
  paid: { color: 'bg-emerald-500/10 border-emerald-400/20 text-emerald-400', icon: CheckCircle },
  pending: { color: 'bg-amber-500/10 border-amber-400/20 text-amber-400', icon: Clock },
  failed: { color: 'bg-red-500/10 border-red-400/20 text-red-400', icon: XCircle },
  refunded: { color: 'bg-zinc-500/10 border-zinc-400/20 text-zinc-400', icon: AlertCircle },
  cancelled: { color: 'bg-zinc-500/10 border-zinc-400/20 text-zinc-400', icon: XCircle },
};

const statusTabs: { label: string; value: OrderStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Paid', value: 'paid' },
  { label: 'Failed', value: 'failed' },
  { label: 'Refunded', value: 'refunded' },
  { label: 'Cancelled', value: 'cancelled' },
];

export function AdminOrders() {
  const [orders, setOrders] = useState<OrderWithJoins[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await retryQuery(() =>
          supabase
            .from('orders')
            .select('*, clients(business_name), services(name)')
            .order('created_at', { ascending: false })
        );

        if (res.error) throw res.error;
        setOrders((res.data as OrderWithJoins[]) || []);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError('Failed to load orders.');
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const filtered = useMemo(() => {
    let result = orders;
    if (statusFilter !== 'all') {
      result = result.filter((o) => o.status === statusFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (o) =>
          (o.clients?.business_name || '').toLowerCase().includes(q) ||
          (o.services?.name || '').toLowerCase().includes(q)
      );
    }
    return result;
  }, [orders, statusFilter, search]);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: orders.length };
    for (const o of orders) {
      counts[o.status] = (counts[o.status] || 0) + 1;
    }
    return counts;
  }, [orders]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl mb-2">
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
              Orders
            </span>
          </h1>
        </div>
        <div className="glass-panel p-12 rounded-2xl border border-white/10 text-center">
          <div className="animate-pulse text-zinc-500">Loading orders...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/5 border border-red-400/20 text-red-400 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}

      <div>
        <h1 className="text-4xl mb-2">
          <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
            Orders
          </span>
        </h1>
        <p className="text-zinc-400">All client orders and payments</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          placeholder="Search by client or service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-zinc-900/50 border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400/40"
        />
      </div>

      {/* Status filter tabs */}
      <div className="flex flex-wrap gap-2">
        {statusTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setStatusFilter(tab.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              statusFilter === tab.value
                ? 'bg-cyan-500/20 border border-cyan-400/30 text-cyan-400'
                : 'bg-zinc-900/50 border border-white/5 text-zinc-400 hover:text-white hover:border-white/10'
            }`}
          >
            {tab.label}
            {statusCounts[tab.value] !== undefined && (
              <span className="ml-2 text-xs opacity-60">({statusCounts[tab.value] || 0})</span>
            )}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <ShoppingCart className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <p className="text-zinc-500">
              {orders.length === 0 ? 'No orders yet' : 'No orders match your filters'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-zinc-900/50">
                  <th className="text-left px-4 py-3 text-zinc-500 font-medium">Date</th>
                  <th className="text-left px-4 py-3 text-zinc-500 font-medium">Client</th>
                  <th className="text-left px-4 py-3 text-zinc-500 font-medium">Service</th>
                  <th className="text-right px-4 py-3 text-zinc-500 font-medium">Amount</th>
                  <th className="text-left px-4 py-3 text-zinc-500 font-medium">Status</th>
                  <th className="text-left px-4 py-3 text-zinc-500 font-medium">Stripe</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => {
                  const badge = orderStatusBadge[order.status];
                  const BadgeIcon = badge?.icon || AlertCircle;
                  return (
                    <tr
                      key={order.id}
                      className="border-b border-white/5 hover:bg-zinc-900/30 transition-colors"
                    >
                      <td className="px-4 py-3 text-zinc-300 whitespace-nowrap">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-white">
                        {order.clients?.business_name || 'Unknown'}
                      </td>
                      <td className="px-4 py-3 text-zinc-300">
                        {order.services?.name || 'Unknown'}
                      </td>
                      <td className="px-4 py-3 text-right text-white font-medium whitespace-nowrap">
                        ${(order.amount_cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${badge?.color || 'text-zinc-400'}`}
                        >
                          <BadgeIcon className="w-3 h-3" />
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {order.stripe_payment_intent_id ? (
                          <a
                            href={`https://dashboard.stripe.com/payments/${order.stripe_payment_intent_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span className="text-xs">View</span>
                          </a>
                        ) : (
                          <span className="text-zinc-600 text-xs">--</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
