import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, FolderKanban, Search } from 'lucide-react';
import { supabase } from '@/app/lib/supabase';
import { retryQuery } from '@/app/lib/retry';

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  onboarding: { label: 'Onboarding', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-400/20' },
  in_progress: { label: 'In Progress', color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-400/20' },
  review: { label: 'In Review', color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-400/20' },
  completed: { label: 'Completed', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-400/20' },
  on_hold: { label: 'On Hold', color: 'text-zinc-400', bg: 'bg-zinc-500/10 border-zinc-400/20' },
};

const statusTabs = ['all', 'onboarding', 'in_progress', 'review', 'completed', 'on_hold'] as const;

interface ProjectRow {
  id: string;
  name: string;
  status: string;
  started_at: string | null;
  estimated_completion: string | null;
  created_at: string;
  clients: { business_name: string | null } | null;
  project_milestones: { id: string; status: string }[];
}

export function AdminProjects() {
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<(typeof statusTabs)[number]>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await retryQuery(() =>
          supabase
            .from('projects')
            .select('id, name, status, started_at, estimated_completion, created_at, clients(business_name), project_milestones(id, status)')
            .order('created_at', { ascending: false })
        );
        if (res.error) throw res.error;
        setProjects((res.data as unknown as ProjectRow[]) || []);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError('Failed to load projects.');
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const filtered = projects.filter((p) => {
    if (activeTab !== 'all' && p.status !== activeTab) return false;
    if (search) {
      const q = search.toLowerCase();
      const clientName = p.clients?.business_name || '';
      return p.name.toLowerCase().includes(q) || clientName.toLowerCase().includes(q);
    }
    return true;
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl mb-2">
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
              Projects
            </span>
          </h1>
        </div>
        <div className="glass-panel p-12 rounded-2xl border border-white/10 text-center">
          <div className="animate-pulse text-zinc-500">Loading projects...</div>
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
            Projects
          </span>
        </h1>
        <p className="text-zinc-400">Manage all client projects and milestones</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          placeholder="Search by project or client name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-zinc-900/50 border border-white/10 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400/40"
        />
      </div>

      {/* Status Tabs */}
      <div className="flex flex-wrap gap-2">
        {statusTabs.map((tab) => {
          const cfg = tab === 'all' ? null : statusConfig[tab];
          const count = tab === 'all' ? projects.length : projects.filter((p) => p.status === tab).length;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                activeTab === tab
                  ? 'bg-cyan-500/10 border-cyan-400/30 text-cyan-400'
                  : 'border-white/5 text-zinc-400 hover:text-white hover:border-white/10'
              }`}
            >
              {tab === 'all' ? 'All' : cfg?.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <FolderKanban className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
            <p className="text-zinc-500">No projects found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Project</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Client</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Milestones</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Started</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Est. Completion</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((project) => {
                  const cfg = statusConfig[project.status] || statusConfig.on_hold;
                  const milestones = project.project_milestones || [];
                  const completedMilestones = milestones.filter((m) => m.status === 'completed').length;
                  return (
                    <tr key={project.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4">
                        <Link to={`/admin/projects/${project.id}`} className="font-medium text-white hover:text-cyan-400 transition-colors">
                          {project.name}
                        </Link>
                      </td>
                      <td className="px-5 py-4 text-zinc-400">
                        {project.clients?.business_name || 'Unknown'}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${cfg.bg} ${cfg.color}`}>
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-zinc-400">
                        {milestones.length > 0 ? (
                          <span>
                            <span className="text-emerald-400">{completedMilestones}</span>
                            <span className="text-zinc-600">/{milestones.length}</span>
                            <span className="text-zinc-600 ml-1">completed</span>
                          </span>
                        ) : (
                          <span className="text-zinc-600">--</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-zinc-400">
                        {project.started_at ? new Date(project.started_at).toLocaleDateString() : '--'}
                      </td>
                      <td className="px-5 py-4 text-zinc-400">
                        {project.estimated_completion ? new Date(project.estimated_completion).toLocaleDateString() : '--'}
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
