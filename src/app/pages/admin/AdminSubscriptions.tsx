import { useState, useEffect, useMemo } from 'react';
import {
  CreditCard,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { supabase } from '@/app/lib/supabase';
import { retryQuery } from '@/app/lib/retry';
import type { Database } from '@/app/lib/database.types';

type SubscriptionRow = Database['public']['Tables']['subscriptions']['Row'];
type SubscriptionStatus = Database['public']['Enums']['subscription_status'];

interface SubscriptionWithJoins extends SubscriptionRow {
  clients: { business_name: string | null } | null;
  services: { name: string } | null;
}

const subStatusBadge: Record<string, { color: string }> = {
  active: { color: 'bg-emerald-500/10 border-emerald-400/20 text-emerald-400' },
  past_due: { color: 'bg-red-500/10 border-red-400/20 text-red-400' },
  cancelled: { color: 'bg-zinc-500/10 border-zinc-400/20 text-zinc-400' },
  paused: { color: 'bg-amber-500/10 border-amber-400/20 text-amber-400' },
};

const statusTabs: { label: string; value: SubscriptionStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Past Due', value: 'past_due' },
  { label: 'Cancelled', value: 'cancelled' },
  { label: 'Paused', value: 'paused' },
];

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '--';
  return new Date(dateStr).toLocaleDateString();
}

export function AdminSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<SubscriptionWithJoins[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<SubscriptionStatus | 'all'>('all');

  useEffect(() => {
    async function fetchSubscriptions() {
      try {
        const res = await retryQuery(() =>
          supabase
            .from('subscriptions')
            .select('*, clients(business_name), services(name)')
            .order('created_at', { ascending: false })
        );

        if (res.error) throw res.error;
        setSubscriptions((res.data as SubscriptionWithJoins[]) || []);
      } catch (err) {
        console.error('Failed to fetch subscriptions:', err);
        setError('Failed to load subscriptions.');
      } finally {
        setLoading(false);
      }
    }

    fetchSubscriptions();
  }, []);

  const filtered = useMemo(() => {
    if (statusFilter === 'all') return subscriptions;
    return subscriptions.filter((s) => s.status === statusFilter);
  }, [subscriptions, statusFilter]);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: subscriptions.length };
    for (const s of subscriptions) {
      counts[s.status] = (counts[s.status] || 0) + 1;
    }
    return counts;
  }, [subscriptions]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl mb-2">
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
              Subscriptions
            </span>
          </h1>
        </div>
        <div className="glass-panel p-12 rounded-2xl border border-white/10 text-center">
          <div className="animate-pulse text-zinc-500">Loading subscriptions...</div>
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
            Subscriptions
          </span>
        </h1>
        <p className="text-zinc-400">All client subscriptions and recurring billing</p>
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

      {/* Subscriptions Table */}
      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <CreditCard className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <p className="text-zinc-500">
              {subscriptions.length === 0 ? 'No subscriptions yet' : 'No subscriptions match your filter'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-zinc-900/50">
                  <th className="text-left px-4 py-3 text-zinc-500 font-medium">Client</th>
                  <th className="text-left px-4 py-3 text-zinc-500 font-medium">Service</th>
                  <th className="text-left px-4 py-3 text-zinc-500 font-medium">Status</th>
                  <th className="text-left px-4 py-3 text-zinc-500 font-medium">Period Start</th>
                  <th className="text-left px-4 py-3 text-zinc-500 font-medium">Period End</th>
                  <th className="text-left px-4 py-3 text-zinc-500 font-medium">Created</th>
                  <th className="text-left px-4 py-3 text-zinc-500 font-medium">Stripe</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((sub) => {
                  const badge = subStatusBadge[sub.status];
                  return (
                    <tr
                      key={sub.id}
                      className="border-b border-white/5 hover:bg-zinc-900/30 transition-colors"
                    >
                      <td className="px-4 py-3 text-white">
                        {sub.clients?.business_name || 'Unknown'}
                      </td>
                      <td className="px-4 py-3 text-zinc-300">
                        {sub.services?.name || 'Unknown'}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-medium ${badge?.color || 'text-zinc-400'}`}
                        >
                          {sub.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-zinc-300 whitespace-nowrap">
                        {formatDate(sub.current_period_start)}
                      </td>
                      <td className="px-4 py-3 text-zinc-300 whitespace-nowrap">
                        {formatDate(sub.current_period_end)}
                      </td>
                      <td className="px-4 py-3 text-zinc-300 whitespace-nowrap">
                        {formatDate(sub.created_at)}
                      </td>
                      <td className="px-4 py-3">
                        {sub.stripe_subscription_id ? (
                          <a
                            href={`https://dashboard.stripe.com/subscriptions/${sub.stripe_subscription_id}`}
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
