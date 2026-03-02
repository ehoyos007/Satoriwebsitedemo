import { useState, useEffect } from 'react';
import {
  CreditCard,
  ExternalLink,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Receipt,
} from 'lucide-react';
import { useClientData } from '@/app/hooks/useClientData';
import { supabase } from '@/app/lib/supabase';
import { retryQuery, retryFetch } from '@/app/lib/retry';

interface OrderRow {
  id: string;
  amount_cents: number;
  status: string;
  created_at: string;
  services: { name: string; slug: string } | null;
}

interface SubscriptionRow {
  id: string;
  status: string;
  current_period_start: string | null;
  current_period_end: string | null;
  created_at: string;
  services: { name: string; slug: string } | null;
}

const orderStatusBadge: Record<string, { color: string; icon: typeof CheckCircle }> = {
  paid: { color: 'bg-emerald-500/10 border-emerald-400/20 text-emerald-400', icon: CheckCircle },
  pending: { color: 'bg-amber-500/10 border-amber-400/20 text-amber-400', icon: Clock },
  failed: { color: 'bg-red-500/10 border-red-400/20 text-red-400', icon: XCircle },
  refunded: { color: 'bg-zinc-500/10 border-zinc-400/20 text-zinc-400', icon: AlertCircle },
  cancelled: { color: 'bg-zinc-500/10 border-zinc-400/20 text-zinc-400', icon: XCircle },
};

const subStatusBadge: Record<string, { color: string }> = {
  active: { color: 'bg-emerald-500/10 border-emerald-400/20 text-emerald-400' },
  past_due: { color: 'bg-red-500/10 border-red-400/20 text-red-400' },
  cancelled: { color: 'bg-zinc-500/10 border-zinc-400/20 text-zinc-400' },
  paused: { color: 'bg-amber-500/10 border-amber-400/20 text-amber-400' },
};

export function BillingPage() {
  const { client, loading: clientLoading } = useClientData();
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    if (!client) {
      setLoading(false);
      return;
    }

    async function fetchBilling() {
      try {
        const [ordersRes, subsRes] = await Promise.all([
          retryQuery(() =>
            supabase.from('orders').select('id, amount_cents, status, created_at, services(name, slug)').eq('client_id', client!.id).order('created_at', { ascending: false })
          ),
          retryQuery(() =>
            supabase.from('subscriptions').select('id, status, current_period_start, current_period_end, created_at, services(name, slug)').eq('client_id', client!.id).order('created_at', { ascending: false })
          ),
        ]);

        if (ordersRes.error) throw ordersRes.error;
        if (subsRes.error) throw subsRes.error;

        setOrders(ordersRes.data as any);
        setSubscriptions(subsRes.data as any);
      } catch (err) {
        console.error('Failed to fetch billing data:', err);
        setError('Failed to load billing data. Please try refreshing the page.');
      } finally {
        setLoading(false);
      }
    }

    fetchBilling();
  }, [client]);

  const handleManageSubscription = async () => {
    if (!client?.stripe_customer_id) return;
    setPortalLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await retryFetch('/api/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(session?.access_token && { 'Authorization': `Bearer ${session.access_token}` }),
        },
        body: JSON.stringify({ stripeCustomerId: client.stripe_customer_id }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create billing portal session');
      }
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Failed to create portal session:', err);
      setError('Failed to open billing portal. Please try again.');
    }

    setPortalLoading(false);
  };

  if (clientLoading || loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl mb-2">
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
              Billing
            </span>
          </h1>
        </div>
        <div className="glass-panel p-12 rounded-2xl border border-white/10 text-center">
          <div className="animate-pulse text-zinc-500">Loading billing...</div>
        </div>
      </div>
    );
  }

  const activeSubs = subscriptions.filter((s) => s.status === 'active' || s.status === 'past_due');

  return (
    <div className="space-y-6">
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/5 border border-red-400/20 text-red-400 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl mb-2">
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
              Billing
            </span>
          </h1>
          <p className="text-zinc-400">Manage subscriptions and view payment history</p>
        </div>
        {client?.stripe_customer_id && (
          <button
            onClick={handleManageSubscription}
            disabled={portalLoading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            {portalLoading ? 'Loading...' : 'Manage Subscription'}
          </button>
        )}
      </div>

      {/* Active Subscriptions */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10">
        <h2 className="text-xl mb-4 flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-cyan-400" />
          Active Subscriptions
        </h2>

        {activeSubs.length === 0 ? (
          <p className="text-zinc-500 text-sm">No active subscriptions</p>
        ) : (
          <div className="space-y-3">
            {activeSubs.map((sub) => {
              const badge = subStatusBadge[sub.status] || subStatusBadge.active;
              return (
                <div
                  key={sub.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-zinc-900/50 border border-white/10"
                >
                  <div>
                    <h4>{(sub as any).services?.name || 'Service'}</h4>
                    {sub.current_period_end && (
                      <p className="text-sm text-zinc-500 mt-1">
                        Renews {new Date(sub.current_period_end).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs border ${badge.color}`}>
                    {sub.status.replace('_', ' ')}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Order History */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10">
        <h2 className="text-xl mb-4 flex items-center gap-2">
          <Receipt className="w-6 h-6 text-violet-400" />
          Order History
        </h2>

        {orders.length === 0 ? (
          <p className="text-zinc-500 text-sm">No orders yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-zinc-500 border-b border-white/10">
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Service</th>
                  <th className="pb-3 text-right">Amount</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {orders.map((order) => {
                  const badge = orderStatusBadge[order.status] || orderStatusBadge.pending;
                  const StatusIcon = badge.icon;
                  return (
                    <tr key={order.id} className="border-b border-white/5">
                      <td className="py-3 text-zinc-400">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3">
                        {(order as any).services?.name || 'Service'}
                      </td>
                      <td className="py-3 text-right">
                        ${(order.amount_cents / 100).toFixed(2)}
                      </td>
                      <td className="py-3 text-right">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${badge.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {order.status}
                        </span>
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
