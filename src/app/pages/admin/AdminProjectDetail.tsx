import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  AlertCircle,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  Circle,
  Clock,
  SkipForward,
  Loader2,
} from 'lucide-react';
import { supabase } from '@/app/lib/supabase';
import { retryQuery } from '@/app/lib/retry';
import { useAuth } from '@/app/contexts/AuthContext';

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  onboarding: { label: 'Onboarding', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-400/20' },
  in_progress: { label: 'In Progress', color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-400/20' },
  review: { label: 'In Review', color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-400/20' },
  completed: { label: 'Completed', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-400/20' },
  on_hold: { label: 'On Hold', color: 'text-zinc-400', bg: 'bg-zinc-500/10 border-zinc-400/20' },
};

const milestoneStatusConfig: Record<string, { color: string; icon: typeof Circle }> = {
  pending: { color: 'text-zinc-500', icon: Circle },
  in_progress: { color: 'text-cyan-400', icon: Clock },
  completed: { color: 'text-emerald-400', icon: CheckCircle2 },
  skipped: { color: 'text-zinc-600', icon: SkipForward },
};

const projectStatuses = ['onboarding', 'in_progress', 'review', 'completed', 'on_hold'] as const;
const milestoneStatuses = ['pending', 'in_progress', 'completed', 'skipped'] as const;

interface Milestone {
  id: string;
  title: string;
  description: string | null;
  status: string;
  display_order: number;
  started_at: string | null;
  completed_at: string | null;
}

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: string;
  client_id: string;
  started_at: string | null;
  estimated_completion: string | null;
  completed_at: string | null;
  created_at: string;
  clients: { business_name: string | null } | null;
}

export function AdminProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const { user } = useAuth();

  const [project, setProject] = useState<Project | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Add milestone form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [addingMilestone, setAddingMilestone] = useState(false);

  // Delete confirmation
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!projectId) return;
    try {
      const [projRes, msRes] = await Promise.all([
        retryQuery(() =>
          supabase
            .from('projects')
            .select('id, name, description, status, client_id, started_at, estimated_completion, completed_at, created_at, clients(business_name)')
            .eq('id', projectId)
            .single()
        ),
        retryQuery(() =>
          supabase
            .from('project_milestones')
            .select('id, title, description, status, display_order, started_at, completed_at')
            .eq('project_id', projectId)
            .order('display_order', { ascending: true })
        ),
      ]);
      if (projRes.error) throw projRes.error;
      if (msRes.error) throw msRes.error;
      setProject(projRes.data as unknown as Project);
      setMilestones((msRes.data as Milestone[]) || []);
    } catch (err) {
      console.error('Failed to fetch project:', err);
      setError('Failed to load project.');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function updateProjectStatus(newStatus: string) {
    if (!project || !user) return;
    setSaving(true);
    try {
      const updates: Record<string, string> = {
        status: newStatus,
        updated_at: new Date().toISOString(),
      };
      if (newStatus === 'completed' && !project.completed_at) {
        updates.completed_at = new Date().toISOString();
      }
      const { error: err } = await supabase.from('projects').update(updates).eq('id', project.id);
      if (err) throw err;

      await supabase.from('activity_log').insert({
        client_id: project.client_id,
        actor_id: user.id,
        type: 'project_update' as const,
        message: `Project "${project.name}" status changed to ${statusConfig[newStatus]?.label || newStatus}`,
      });

      setProject({ ...project, ...updates });
    } catch (err) {
      console.error('Failed to update project status:', err);
      setError('Failed to update status.');
    } finally {
      setSaving(false);
    }
  }

  async function updateProjectDate(field: 'started_at' | 'estimated_completion' | 'completed_at', value: string) {
    if (!project) return;
    setSaving(true);
    try {
      const updates = {
        [field]: value || null,
        updated_at: new Date().toISOString(),
      };
      const { error: err } = await supabase.from('projects').update(updates).eq('id', project.id);
      if (err) throw err;
      setProject({ ...project, ...updates });
    } catch (err) {
      console.error('Failed to update project date:', err);
      setError('Failed to update date.');
    } finally {
      setSaving(false);
    }
  }

  async function addMilestone() {
    if (!project || !newTitle.trim()) return;
    setAddingMilestone(true);
    try {
      const maxOrder = milestones.length > 0 ? Math.max(...milestones.map((m) => m.display_order)) : 0;
      const { data, error: err } = await supabase
        .from('project_milestones')
        .insert({
          project_id: project.id,
          title: newTitle.trim(),
          description: newDescription.trim() || null,
          display_order: maxOrder + 1,
        })
        .select('id, title, description, status, display_order, started_at, completed_at')
        .single();
      if (err) throw err;
      setMilestones([...milestones, data as Milestone]);
      setNewTitle('');
      setNewDescription('');
      setShowAddForm(false);

      if (user) {
        await supabase.from('activity_log').insert({
          client_id: project.client_id,
          actor_id: user.id,
          type: 'milestone' as const,
          message: `Milestone "${newTitle.trim()}" added to project "${project.name}"`,
        });
      }
    } catch (err) {
      console.error('Failed to add milestone:', err);
      setError('Failed to add milestone.');
    } finally {
      setAddingMilestone(false);
    }
  }

  async function updateMilestoneStatus(milestone: Milestone, newStatus: string) {
    if (!project || !user) return;
    try {
      const updates: Record<string, string | null> = {
        status: newStatus,
        updated_at: new Date().toISOString(),
      };
      if (newStatus === 'completed') {
        updates.completed_at = new Date().toISOString();
      } else if (newStatus === 'in_progress' && !milestone.started_at) {
        updates.started_at = new Date().toISOString();
      }
      if (newStatus !== 'completed') {
        updates.completed_at = null;
      }

      const { error: err } = await supabase.from('project_milestones').update(updates).eq('id', milestone.id);
      if (err) throw err;

      setMilestones((prev) =>
        prev.map((m) => (m.id === milestone.id ? { ...m, ...updates } : m))
      );

      await supabase.from('activity_log').insert({
        client_id: project.client_id,
        actor_id: user.id,
        type: 'milestone' as const,
        message: `Milestone "${milestone.title}" marked as ${newStatus} in project "${project.name}"`,
      });
    } catch (err) {
      console.error('Failed to update milestone:', err);
      setError('Failed to update milestone.');
    }
  }

  async function deleteMilestone(milestoneId: string) {
    if (!project || !user) return;
    try {
      const milestone = milestones.find((m) => m.id === milestoneId);
      const { error: err } = await supabase.from('project_milestones').delete().eq('id', milestoneId);
      if (err) throw err;
      setMilestones((prev) => prev.filter((m) => m.id !== milestoneId));
      setDeleteId(null);

      if (milestone) {
        await supabase.from('activity_log').insert({
          client_id: project.client_id,
          actor_id: user.id,
          type: 'milestone' as const,
          message: `Milestone "${milestone.title}" deleted from project "${project.name}"`,
        });
      }
    } catch (err) {
      console.error('Failed to delete milestone:', err);
      setError('Failed to delete milestone.');
    }
  }

  async function reorderMilestone(index: number, direction: 'up' | 'down') {
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= milestones.length) return;

    const a = milestones[index];
    const b = milestones[swapIndex];

    try {
      await Promise.all([
        supabase.from('project_milestones').update({ display_order: b.display_order, updated_at: new Date().toISOString() }).eq('id', a.id),
        supabase.from('project_milestones').update({ display_order: a.display_order, updated_at: new Date().toISOString() }).eq('id', b.id),
      ]);

      const updated = [...milestones];
      const tempOrder = a.display_order;
      updated[index] = { ...a, display_order: b.display_order };
      updated[swapIndex] = { ...b, display_order: tempOrder };
      updated.sort((x, y) => x.display_order - y.display_order);
      setMilestones(updated);
    } catch (err) {
      console.error('Failed to reorder milestones:', err);
      setError('Failed to reorder milestones.');
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Link to="/admin/projects" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
        <div className="glass-panel p-12 rounded-2xl border border-white/10 text-center">
          <div className="animate-pulse text-zinc-500">Loading project...</div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="space-y-6">
        <Link to="/admin/projects" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
        <div className="glass-panel p-12 rounded-2xl border border-white/10 text-center">
          <p className="text-zinc-500">Project not found.</p>
        </div>
      </div>
    );
  }

  const cfg = statusConfig[project.status] || statusConfig.on_hold;
  const completedCount = milestones.filter((m) => m.status === 'completed').length;
  const progressPct = milestones.length > 0 ? Math.round((completedCount / milestones.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/5 border border-red-400/20 text-red-400 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
          <button onClick={() => setError(null)} className="ml-auto text-red-400/60 hover:text-red-400">dismiss</button>
        </div>
      )}

      <Link to="/admin/projects" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm">
        <ArrowLeft className="w-4 h-4" /> Back to Projects
      </Link>

      {/* Project Header */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">{project.name}</h1>
            <p className="text-zinc-400 text-sm mt-1">{project.clients?.business_name || 'Unknown client'}</p>
            {project.description && <p className="text-zinc-500 text-sm mt-2">{project.description}</p>}
          </div>
          <div className="flex items-center gap-3">
            {saving && <Loader2 className="w-4 h-4 animate-spin text-zinc-500" />}
            <select
              value={project.status}
              onChange={(e) => updateProjectStatus(e.target.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${cfg.bg} ${cfg.color} bg-transparent cursor-pointer focus:outline-none focus:ring-1 focus:ring-cyan-400/40`}
            >
              {projectStatuses.map((s) => (
                <option key={s} value={s} className="bg-zinc-900 text-white">
                  {statusConfig[s].label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Progress bar */}
        {milestones.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-zinc-500 mb-1.5">
              <span>Progress</span>
              <span>{completedCount}/{milestones.length} milestones ({progressPct}%)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5 pt-5 border-t border-white/5">
          <div>
            <label className="block text-xs text-zinc-500 mb-1">Started</label>
            <input
              type="date"
              value={project.started_at ? project.started_at.split('T')[0] : ''}
              onChange={(e) => updateProjectDate('started_at', e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-zinc-900/50 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400/40"
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1">Est. Completion</label>
            <input
              type="date"
              value={project.estimated_completion ? project.estimated_completion.split('T')[0] : ''}
              onChange={(e) => updateProjectDate('estimated_completion', e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-zinc-900/50 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400/40"
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1">Completed</label>
            <input
              type="date"
              value={project.completed_at ? project.completed_at.split('T')[0] : ''}
              onChange={(e) => updateProjectDate('completed_at', e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-zinc-900/50 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400/40"
            />
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Milestones</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 hover:bg-cyan-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Milestone
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="mb-5 p-4 rounded-xl bg-zinc-900/50 border border-white/5 space-y-3">
            <input
              type="text"
              placeholder="Milestone title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-zinc-800/50 border border-white/10 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400/40"
              autoFocus
            />
            <textarea
              placeholder="Description (optional)"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 rounded-lg bg-zinc-800/50 border border-white/10 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400/40 resize-none"
            />
            <div className="flex items-center gap-2">
              <button
                onClick={addMilestone}
                disabled={!newTitle.trim() || addingMilestone}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-cyan-500/20 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {addingMilestone && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Add
              </button>
              <button
                onClick={() => { setShowAddForm(false); setNewTitle(''); setNewDescription(''); }}
                className="px-4 py-2 rounded-lg text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Milestone List */}
        {milestones.length === 0 ? (
          <p className="text-zinc-500 text-sm">No milestones yet. Add one to start tracking progress.</p>
        ) : (
          <div className="space-y-2">
            {milestones.map((milestone, index) => {
              const msCfg = milestoneStatusConfig[milestone.status] || milestoneStatusConfig.pending;
              const MsIcon = msCfg.icon;
              const isDeleting = deleteId === milestone.id;

              return (
                <div
                  key={milestone.id}
                  className="flex items-start gap-3 p-3 rounded-xl bg-zinc-900/30 border border-white/5 hover:border-white/10 transition-all group"
                >
                  <MsIcon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${msCfg.color}`} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className={`font-medium text-sm ${milestone.status === 'completed' ? 'line-through text-zinc-500' : 'text-white'}`}>
                          {milestone.title}
                        </div>
                        {milestone.description && (
                          <div className="text-xs text-zinc-500 mt-0.5">{milestone.description}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    {/* Status dropdown */}
                    <select
                      value={milestone.status}
                      onChange={(e) => updateMilestoneStatus(milestone, e.target.value)}
                      className={`px-2 py-1 rounded text-xs font-medium border border-white/5 bg-transparent ${msCfg.color} cursor-pointer focus:outline-none focus:ring-1 focus:ring-cyan-400/40`}
                    >
                      {milestoneStatuses.map((s) => (
                        <option key={s} value={s} className="bg-zinc-900 text-white">
                          {s.replace('_', ' ')}
                        </option>
                      ))}
                    </select>

                    {/* Reorder */}
                    <button
                      onClick={() => reorderMilestone(index, 'up')}
                      disabled={index === 0}
                      className="p-1 rounded text-zinc-500 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                      title="Move up"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => reorderMilestone(index, 'down')}
                      disabled={index === milestones.length - 1}
                      className="p-1 rounded text-zinc-500 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                      title="Move down"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {/* Delete */}
                    {isDeleting ? (
                      <div className="flex items-center gap-1 ml-1">
                        <button
                          onClick={() => deleteMilestone(milestone.id)}
                          className="px-2 py-1 rounded text-xs font-medium bg-red-500/20 border border-red-400/30 text-red-400 hover:bg-red-500/30 transition-all"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteId(null)}
                          className="px-2 py-1 rounded text-xs text-zinc-400 hover:text-white transition-colors"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteId(milestone.id)}
                        className="p-1 rounded text-zinc-600 hover:text-red-400 transition-colors ml-1"
                        title="Delete milestone"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
