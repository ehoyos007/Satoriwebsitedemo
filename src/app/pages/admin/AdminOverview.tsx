import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  DollarSign,
  FolderKanban,
  ShoppingCart,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import { supabase } from '@/app/lib/supabase';
import { retryQuery } from '@/app/lib/retry';
import type { Database } from '@/app/lib/database.types';

type ActivityRow = Database['public']['Tables']['activity_log']['Row'];

const activityTypeLabels: Record<string, string> = {
  signup: 'New signup',
  purchase: 'Purchase',
  payment: 'Payment',
  project_update: 'Project update',
  milestone: 'Milestone',
  booking: 'Booking',
  service_change: 'Service change',
  note: 'Note',
  system: 'System',
};

export function AdminOverview() {
  const [stats, setStats] = useState({ clients: 0, revenue: 0, activeProjects: 0, pendingOrders: 0 });
  const [activity, setActivity] = useState<ActivityRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [clientsRes, ordersRes, projectsRes, activityRes] = await Promise.all([
          retryQuery(() => supabase.from('clients').select('id', { count: 'exact', head: true })),
          retryQuery(() => supabase.from('orders').select('amount_cents, status')),
          retryQuery(() => supabase.from('projects').select('id, status')),
          retryQuery(() =>
            supabase.from('activity_log').select('*').order('created_at', { ascending: false }).limit(20)
          ),
        ]);

        if (clientsRes.error) throw clientsRes.error;
        if (ordersRes.error) throw ordersRes.error;
        if (projectsRes.error) throw projectsRes.error;
        if (activityRes.error) throw activityRes.error;

        const paidOrders = (ordersRes.data || []).filter((o) => o.status === 'paid');
        const totalRevenue = paidOrders.reduce((sum, o) => sum + o.amount_cents, 0);
        const pendingOrders = (ordersRes.data || []).filter((o) => o.status === 'pending').length;
        const activeProjects = (projectsRes.data || []).filter(
          (p) => p.status === 'in_progress' || p.status === 'review'
        ).length;

        setStats({
          clients: clientsRes.count || 0,
          revenue: totalRevenue,
          activeProjects,
          pendingOrders,
        });
        setActivity(activityRes.data || []);
      } catch (err) {
        console.error('Failed to fetch admin overview:', err);
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl mb-2">
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
              Admin Overview
            </span>
          </h1>
        </div>
        <div className="glass-panel p-12 rounded-2xl border border-white/10 text-center">
          <div className="animate-pulse text-zinc-500">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Clients', value: stats.clients.toString(), icon: Users, color: 'text-cyan-400', bg: 'from-cyan-500/20 to-cyan-500/5' },
    { label: 'Total Revenue', value: `$${(stats.revenue / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}`, icon: DollarSign, color: 'text-emerald-400', bg: 'from-emerald-500/20 to-emerald-500/5' },
    { label: 'Active Projects', value: stats.activeProjects.toString(), icon: FolderKanban, color: 'text-violet-400', bg: 'from-violet-500/20 to-violet-500/5' },
    { label: 'Pending Orders', value: stats.pendingOrders.toString(), icon: ShoppingCart, color: 'text-amber-400', bg: 'from-amber-500/20 to-amber-500/5' },
  ];

  const quickActions = [
    { label: 'View Clients', path: '/admin/clients' },
    { label: 'View Projects', path: '/admin/projects' },
    { label: 'View Orders', path: '/admin/orders' },
    { label: 'Manage Availability', path: '/admin/availability' },
    { label: 'View Bookings', path: '/admin/bookings' },
    { label: 'Edit Services', path: '/admin/services' },
  ];

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
            Admin Overview
          </span>
        </h1>
        <p className="text-zinc-400">Dashboard summary and recent activity</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="glass-panel p-5 rounded-2xl border border-white/10"
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.bg} flex items-center justify-center mb-3`}>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
            <div className="text-2xl font-semibold">{card.value}</div>
            <div className="text-sm text-zinc-500 mt-1">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10">
        <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.path}
              to={action.path}
              className="flex items-center justify-between px-4 py-3 rounded-lg bg-zinc-900/50 border border-white/5 hover:border-cyan-400/30 hover:bg-cyan-500/5 transition-all text-sm text-zinc-300 hover:text-white"
            >
              {action.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10">
        <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
        {activity.length === 0 ? (
          <p className="text-zinc-500 text-sm">No recent activity</p>
        ) : (
          <div className="space-y-3">
            {activity.map((item) => (
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
      </div>
    </div>
  );
}
