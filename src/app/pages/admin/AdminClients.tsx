import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  MapPin,
  Building2,
} from 'lucide-react';
import { supabase } from '@/app/lib/supabase';
import { retryQuery } from '@/app/lib/retry';

interface ClientRow {
  id: string;
  business_name: string | null;
  business_email: string | null;
  industry: string | null;
  location: string | null;
  onboarding_completed: boolean;
  created_at: string;
  profiles: { full_name: string | null; email: string } | null;
}

type FilterChip = 'all' | 'onboarded' | 'pending';

export function AdminClients() {
  const [clients, setClients] = useState<ClientRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterChip>('all');

  useEffect(() => {
    async function fetchClients() {
      try {
        const { data, error: fetchErr } = await retryQuery(() =>
          supabase
            .from('clients')
            .select('id, business_name, business_email, industry, location, onboarding_completed, created_at, profiles!clients_user_id_fkey(full_name, email)')
            .order('created_at', { ascending: false })
        );

        if (fetchErr) throw fetchErr;
        setClients((data as any) || []);
      } catch (err) {
        console.error('Failed to fetch clients:', err);
        setError('Failed to load clients. Please try refreshing the page.');
      } finally {
        setLoading(false);
      }
    }

    fetchClients();
  }, []);

  const filtered = useMemo(() => {
    let result = clients;

    // Filter by onboarding status
    if (filter === 'onboarded') {
      result = result.filter((c) => c.onboarding_completed);
    } else if (filter === 'pending') {
      result = result.filter((c) => !c.onboarding_completed);
    }

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          (c.business_name || '').toLowerCase().includes(q) ||
          (c.business_email || '').toLowerCase().includes(q) ||
          (c.profiles?.email || '').toLowerCase().includes(q) ||
          (c.profiles?.full_name || '').toLowerCase().includes(q)
      );
    }

    return result;
  }, [clients, filter, search]);

  const filterChips: { key: FilterChip; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: clients.length },
    { key: 'onboarded', label: 'Onboarded', count: clients.filter((c) => c.onboarding_completed).length },
    { key: 'pending', label: 'Pending', count: clients.filter((c) => !c.onboarding_completed).length },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl mb-2">
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
              Clients
            </span>
          </h1>
        </div>
        <div className="glass-panel p-12 rounded-2xl border border-white/10 text-center">
          <div className="animate-pulse text-zinc-500">Loading clients...</div>
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
            Clients
          </span>
        </h1>
        <p className="text-zinc-400">Manage all client accounts</p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-zinc-900/50 border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400/50 transition-colors"
          />
        </div>

        <div className="flex gap-2">
          {filterChips.map((chip) => (
            <button
              key={chip.key}
              onClick={() => setFilter(chip.key)}
              className={`px-4 py-2 rounded-lg text-sm border transition-all ${
                filter === chip.key
                  ? 'bg-cyan-500/10 border-cyan-400/30 text-cyan-400'
                  : 'bg-zinc-900/50 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
              }`}
            >
              {chip.label}
              <span className="ml-1.5 text-xs opacity-60">{chip.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Clients Table */}
      <div className="glass-panel rounded-2xl border border-white/10">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl mb-2">
              {search || filter !== 'all' ? 'No matching clients' : 'No clients yet'}
            </h3>
            <p className="text-zinc-500">
              {search || filter !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'Clients will appear here once they sign up.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-zinc-500 border-b border-white/10">
                  <th className="px-6 py-4">Business</th>
                  <th className="px-6 py-4 hidden md:table-cell">Contact</th>
                  <th className="px-6 py-4 hidden lg:table-cell">Industry</th>
                  <th className="px-6 py-4 hidden lg:table-cell">Location</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 hidden sm:table-cell">Joined</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filtered.map((client) => (
                  <tr
                    key={client.id}
                    className="border-b border-white/5 hover:bg-zinc-900/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <Link
                        to={`/admin/clients/${client.id}`}
                        className="hover:text-cyan-400 transition-colors"
                      >
                        <div className="font-medium">
                          {client.business_name || 'Unnamed Business'}
                        </div>
                        <div className="text-zinc-500 text-xs mt-0.5 md:hidden">
                          {client.profiles?.email || client.business_email || '-'}
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div>{client.profiles?.full_name || '-'}</div>
                      <div className="text-zinc-500 text-xs mt-0.5">
                        {client.profiles?.email || client.business_email || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell text-zinc-400">
                      {client.industry ? (
                        <span className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5" />
                          {client.industry}
                        </span>
                      ) : (
                        <span className="text-zinc-600">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell text-zinc-400">
                      {client.location ? (
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          {client.location}
                        </span>
                      ) : (
                        <span className="text-zinc-600">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {client.onboarding_completed ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs border bg-emerald-500/10 border-emerald-400/20 text-emerald-400">
                          <CheckCircle className="w-3 h-3" />
                          Onboarded
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs border bg-amber-500/10 border-amber-400/20 text-amber-400">
                          <Clock className="w-3 h-3" />
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell text-zinc-500">
                      {new Date(client.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
