import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Globe,
  Mail,
  Phone,
  MapPin,
  Building2,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  ShoppingCart,
  CreditCard,
  FolderKanban,
  Activity,
  Save,
  Loader2,
} from 'lucide-react';
import { supabase } from '@/app/lib/supabase';
import { retryQuery } from '@/app/lib/retry';
import type { Database } from '@/app/lib/database.types';

type ActivityRow = Database['public']['Tables']['activity_log']['Row'];

interface ClientWithProfile {
  id: string;
  user_id: string;
  business_name: string | null;
  business_email: string | null;
  business_phone: string | null;
  business_url: string | null;
  industry: string | null;
  location: string | null;
  notes: string | null;
  onboarding_completed: boolean;
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
  profiles: { full_name: string | null; email: string; phone: string | null } | null;
}

interface OrderRow {
  id: string;
  amount_cents: number;
  status: string;
  created_at: string;
  services: { name: string } | null;
}

interface SubscriptionRow {
  id: string;
  status: string;
  current_period_start: string | null;
  current_period_end: string | null;
  created_at: string;
  services: { name: string } | null;
}

interface ProjectRow {
  id: string;
  name: string;
  status: string;
  description: string | null;
  created_at: string;
  project_milestones: { id: string }[];
}

type DetailTab = 'orders' | 'subscriptions' | 'projects' | 'activity';

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

const projectStatusConfig: Record<string, { label: string; color: string; bg: string }> = {
  onboarding: { label: 'Onboarding', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-400/20' },
  in_progress: { label: 'In Progress', color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-400/20' },
  review: { label: 'In Review', color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-400/20' },
  completed: { label: 'Completed', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-400/20' },
  on_hold: { label: 'On Hold', color: 'text-zinc-400', bg: 'bg-zinc-500/10 border-zinc-400/20' },
};

const activityTypeLabels: Record<string, string> = {
  signup: 'Signup',
  purchase: 'Purchase',
  payment: 'Payment',
  project_update: 'Project update',
  milestone: 'Milestone',
  booking: 'Booking',
  service_change: 'Service change',
  note: 'Note',
  system: 'System',
};

export function AdminClientDetail() {
  const { clientId } = useParams<{ clientId: string }>();
  const [client, setClient] = useState<ClientWithProfile | null>(null);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionRow[]>([]);
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [activityLog, setActivityLog] = useState<ActivityRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<DetailTab>('orders');

  // Notes state
  const [notes, setNotes] = useState('');
  const [notesSaving, setNotesSaving] = useState(false);
  const [notesSaved, setNotesSaved] = useState(false);

  useEffect(() => {
    if (!clientId) return;

    async function fetchAll() {
      try {
        const [clientRes, ordersRes, subsRes, projectsRes, activityRes] = await Promise.all([
          retryQuery(() =>
            supabase
              .from('clients')
              .select('*, profiles!clients_user_id_fkey(full_name, email, phone)')
              .eq('id', clientId!)
              .single()
          ),
          retryQuery(() =>
            supabase
              .from('orders')
              .select('id, amount_cents, status, created_at, services(name)')
              .eq('client_id', clientId!)
              .order('created_at', { ascending: false })
          ),
          retryQuery(() =>
            supabase
              .from('subscriptions')
              .select('id, status, current_period_start, current_period_end, created_at, services(name)')
              .eq('client_id', clientId!)
              .order('created_at', { ascending: false })
          ),
          retryQuery(() =>
            supabase
              .from('projects')
              .select('id, name, status, description, created_at, project_milestones(id)')
              .eq('client_id', clientId!)
              .order('created_at', { ascending: false })
          ),
          retryQuery(() =>
            supabase
              .from('activity_log')
              .select('*')
              .eq('client_id', clientId!)
              .order('created_at', { ascending: false })
              .limit(50)
          ),
        ]);

        if (clientRes.error) throw clientRes.error;
        if (ordersRes.error) throw ordersRes.error;
        if (subsRes.error) throw subsRes.error;
        if (projectsRes.error) throw projectsRes.error;
        if (activityRes.error) throw activityRes.error;

        setClient(clientRes.data as any);
        setNotes((clientRes.data as any)?.notes || '');
        setOrders((ordersRes.data as any) || []);
        setSubscriptions((subsRes.data as any) || []);
        setProjects((projectsRes.data as any) || []);
        setActivityLog((activityRes.data as any) || []);
      } catch (err) {
        console.error('Failed to fetch client detail:', err);
        setError('Failed to load client details. Please try refreshing.');
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, [clientId]);

  const handleSaveNotes = async () => {
    if (!clientId) return;
    setNotesSaving(true);
    setNotesSaved(false);

    try {
      const { error: updateErr } = await supabase
        .from('clients')
        .update({ notes })
        .eq('id', clientId);

      if (updateErr) throw updateErr;
      setNotesSaved(true);
      setTimeout(() => setNotesSaved(false), 3000);
    } catch (err) {
      console.error('Failed to save notes:', err);
      setError('Failed to save notes. Please try again.');
    } finally {
      setNotesSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl mb-2">
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
              Client Details
            </span>
          </h1>
        </div>
        <div className="glass-panel p-12 rounded-2xl border border-white/10 text-center">
          <div className="animate-pulse text-zinc-500">Loading client...</div>
        </div>
      </div>
    );
  }

  if (error && !client) {
    return (
      <div className="space-y-6">
        <Link
          to="/admin/clients"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Clients
        </Link>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/5 border border-red-400/20 text-red-400 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="space-y-6">
        <Link
          to="/admin/clients"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Clients
        </Link>
        <div className="glass-panel p-12 rounded-2xl border border-white/10 text-center">
          <h3 className="text-xl mb-2">Client not found</h3>
          <p className="text-zinc-500">This client may have been removed or the link is invalid.</p>
        </div>
      </div>
    );
  }

  const tabs: { key: DetailTab; label: string; icon: typeof ShoppingCart; count: number }[] = [
    { key: 'orders', label: 'Orders', icon: ShoppingCart, count: orders.length },
    { key: 'subscriptions', label: 'Subscriptions', icon: CreditCard, count: subscriptions.length },
    { key: 'projects', label: 'Projects', icon: FolderKanban, count: projects.length },
    { key: 'activity', label: 'Activity', icon: Activity, count: activityLog.length },
  ];

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        to="/admin/clients"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Clients
      </Link>

      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/5 border border-red-400/20 text-red-400 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Client Header Card */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-semibold mb-1">
              {client.business_name || 'Unnamed Business'}
            </h1>
            {client.profiles?.full_name && (
              <p className="text-zinc-400">{client.profiles.full_name}</p>
            )}
          </div>
          {client.onboarding_completed ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border bg-emerald-500/10 border-emerald-400/20 text-emerald-400 self-start">
              <CheckCircle className="w-3.5 h-3.5" />
              Onboarded
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border bg-amber-500/10 border-amber-400/20 text-amber-400 self-start">
              <Clock className="w-3.5 h-3.5" />
              Onboarding Pending
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
          {client.business_url && (
            <div className="flex items-center gap-2 text-zinc-400">
              <Globe className="w-4 h-4 flex-shrink-0" />
              <a
                href={client.business_url.startsWith('http') ? client.business_url : `https://${client.business_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors truncate"
              >
                {client.business_url}
              </a>
            </div>
          )}
          {(client.business_email || client.profiles?.email) && (
            <div className="flex items-center gap-2 text-zinc-400">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{client.business_email || client.profiles?.email}</span>
            </div>
          )}
          {(client.business_phone || client.profiles?.phone) && (
            <div className="flex items-center gap-2 text-zinc-400">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>{client.business_phone || client.profiles?.phone}</span>
            </div>
          )}
          {client.industry && (
            <div className="flex items-center gap-2 text-zinc-400">
              <Building2 className="w-4 h-4 flex-shrink-0" />
              <span>{client.industry}</span>
            </div>
          )}
          {client.location && (
            <div className="flex items-center gap-2 text-zinc-400">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>{client.location}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-zinc-500">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>Joined {new Date(client.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm border whitespace-nowrap transition-all ${
              activeTab === tab.key
                ? 'bg-cyan-500/10 border-cyan-400/30 text-cyan-400'
                : 'bg-zinc-900/50 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            <span className="text-xs opacity-60">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10">
        {activeTab === 'orders' && (
          <>
            <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-cyan-400" />
              Orders
            </h2>
            {orders.length === 0 ? (
              <p className="text-zinc-500 text-sm">No orders for this client</p>
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
                          <td className="py-3">{order.services?.name || 'Service'}</td>
                          <td className="py-3 text-right">${(order.amount_cents / 100).toFixed(2)}</td>
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
          </>
        )}

        {activeTab === 'subscriptions' && (
          <>
            <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-cyan-400" />
              Subscriptions
            </h2>
            {subscriptions.length === 0 ? (
              <p className="text-zinc-500 text-sm">No subscriptions for this client</p>
            ) : (
              <div className="space-y-3">
                {subscriptions.map((sub) => {
                  const badge = subStatusBadge[sub.status] || subStatusBadge.active;
                  return (
                    <div
                      key={sub.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-zinc-900/50 border border-white/10"
                    >
                      <div>
                        <h4 className="font-medium">{sub.services?.name || 'Service'}</h4>
                        <div className="flex gap-4 mt-1 text-xs text-zinc-500">
                          {sub.current_period_start && (
                            <span>From: {new Date(sub.current_period_start).toLocaleDateString()}</span>
                          )}
                          {sub.current_period_end && (
                            <span>To: {new Date(sub.current_period_end).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs border ${badge.color}`}>
                        {sub.status.replace('_', ' ')}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {activeTab === 'projects' && (
          <>
            <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
              <FolderKanban className="w-5 h-5 text-cyan-400" />
              Projects
            </h2>
            {projects.length === 0 ? (
              <p className="text-zinc-500 text-sm">No projects for this client</p>
            ) : (
              <div className="space-y-3">
                {projects.map((project) => {
                  const status = projectStatusConfig[project.status] || projectStatusConfig.onboarding;
                  return (
                    <div
                      key={project.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-zinc-900/50 border border-white/10"
                    >
                      <div>
                        <h4 className="font-medium">{project.name}</h4>
                        {project.description && (
                          <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1">{project.description}</p>
                        )}
                        <div className="flex gap-4 mt-1 text-xs text-zinc-500">
                          <span>{project.project_milestones.length} milestone{project.project_milestones.length !== 1 ? 's' : ''}</span>
                          <span>{new Date(project.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs border ${status.bg} ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {activeTab === 'activity' && (
          <>
            <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              Activity Log
            </h2>
            {activityLog.length === 0 ? (
              <p className="text-zinc-500 text-sm">No activity recorded for this client</p>
            ) : (
              <div className="space-y-3">
                {activityLog.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0"
                  >
                    <div className="w-2 h-2 mt-2 rounded-full bg-cyan-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm">{item.message}</div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-zinc-500">
                        <span>{activityTypeLabels[item.type] || item.type}</span>
                        <span>{new Date(item.created_at).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Admin Notes */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10">
        <h2 className="text-lg font-medium mb-4">Admin Notes</h2>
        <textarea
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
            setNotesSaved(false);
          }}
          placeholder="Add internal notes about this client..."
          rows={4}
          className="w-full p-3 rounded-lg bg-zinc-900/50 border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400/50 transition-colors resize-y"
        />
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={handleSaveNotes}
            disabled={notesSaving}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/20 transition-all text-sm disabled:opacity-50"
          >
            {notesSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {notesSaving ? 'Saving...' : 'Save Notes'}
          </button>
          {notesSaved && (
            <span className="flex items-center gap-1 text-sm text-emerald-400">
              <CheckCircle className="w-4 h-4" />
              Saved
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
