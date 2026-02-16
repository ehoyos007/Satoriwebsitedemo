import { useState, useEffect } from 'react';
import {
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import { useClientData } from '@/app/hooks/useClientData';
import { supabase } from '@/app/lib/supabase';
import type { Database } from '@/app/lib/database.types';

type Project = Database['public']['Tables']['projects']['Row'];
type Milestone = Database['public']['Tables']['project_milestones']['Row'];

interface ProjectWithMilestones extends Project {
  project_milestones: Milestone[];
}

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  onboarding: { label: 'Onboarding', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-400/20' },
  in_progress: { label: 'In Progress', color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-400/20' },
  review: { label: 'In Review', color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-400/20' },
  completed: { label: 'Completed', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-400/20' },
  on_hold: { label: 'On Hold', color: 'text-zinc-400', bg: 'bg-zinc-500/10 border-zinc-400/20' },
};

const milestoneStatusIcon: Record<string, { icon: typeof CheckCircle; color: string }> = {
  completed: { icon: CheckCircle, color: 'text-emerald-400' },
  in_progress: { icon: Clock, color: 'text-cyan-400' },
  pending: { icon: AlertCircle, color: 'text-zinc-500' },
  skipped: { icon: AlertCircle, color: 'text-zinc-600' },
};

export function ProjectPage() {
  const { client, loading: clientLoading } = useClientData();
  const [projects, setProjects] = useState<ProjectWithMilestones[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!client) {
      setLoading(false);
      return;
    }

    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*, project_milestones(*)')
        .eq('client_id', client!.id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        // Sort milestones by display_order within each project
        const sorted = data.map((p: any) => ({
          ...p,
          project_milestones: (p.project_milestones || []).sort(
            (a: Milestone, b: Milestone) => a.display_order - b.display_order
          ),
        }));
        setProjects(sorted);
      }
      setLoading(false);
    }

    fetchProjects();
  }, [client]);

  if (clientLoading || loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl mb-2">
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
              Project Details
            </span>
          </h1>
        </div>
        <div className="glass-panel p-12 rounded-2xl border border-white/10 text-center">
          <div className="animate-pulse text-zinc-500">Loading projects...</div>
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl mb-2">
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
              Project Details
            </span>
          </h1>
          <p className="text-zinc-400">Track your project progress and milestones</p>
        </div>
        <div className="glass-panel p-12 rounded-2xl border border-white/10 text-center">
          <FileText className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-xl mb-2">No active projects yet</h3>
          <p className="text-zinc-500 mb-6">
            Your project details will appear here once your build kicks off.
          </p>
          <a
            href="/book-call"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:scale-105 transition-all"
          >
            Book a Call
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl mb-2">
          <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
            Project Details
          </span>
        </h1>
        <p className="text-zinc-400">Track your project progress and milestones</p>
      </div>

      {projects.map((project) => {
        const status = statusConfig[project.status] || statusConfig.onboarding;

        return (
          <div key={project.id} className="glass-panel p-8 rounded-2xl border border-white/10">
            {/* Project Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl mb-1">{project.name}</h2>
                {project.description && (
                  <p className="text-zinc-400">{project.description}</p>
                )}
              </div>
              <span className={`px-4 py-2 rounded-lg border ${status.bg} ${status.color}`}>
                {status.label}
              </span>
            </div>

            {/* Dates */}
            <div className="flex flex-wrap gap-6 mb-6 text-sm">
              {project.started_at && (
                <div className="flex items-center gap-2 text-zinc-400">
                  <Calendar className="w-4 h-4" />
                  Started: {new Date(project.started_at).toLocaleDateString()}
                </div>
              )}
              {project.estimated_completion && (
                <div className="flex items-center gap-2 text-zinc-400">
                  <Clock className="w-4 h-4" />
                  Est. completion: {new Date(project.estimated_completion).toLocaleDateString()}
                </div>
              )}
              {project.completed_at && (
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle className="w-4 h-4" />
                  Completed: {new Date(project.completed_at).toLocaleDateString()}
                </div>
              )}
            </div>

            {/* Milestones Timeline */}
            {project.project_milestones.length > 0 && (
              <div className="relative">
                <div className="absolute left-4 top-6 bottom-6 w-0.5 bg-zinc-800" />

                <div className="space-y-4">
                  {project.project_milestones.map((milestone) => {
                    const ms = milestoneStatusIcon[milestone.status] || milestoneStatusIcon.pending;
                    const Icon = ms.icon;

                    return (
                      <div key={milestone.id} className="relative flex gap-4">
                        <div
                          className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            milestone.status === 'completed'
                              ? 'bg-emerald-500/20 border border-emerald-400/30'
                              : milestone.status === 'in_progress'
                              ? 'bg-cyan-500/20 border border-cyan-400/30 animate-pulse'
                              : 'bg-zinc-900 border border-white/10'
                          }`}
                        >
                          <Icon className={`w-5 h-5 ${ms.color}`} />
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center justify-between mb-1">
                            <h3
                              className={
                                milestone.status === 'in_progress'
                                  ? 'text-cyan-400'
                                  : milestone.status === 'completed'
                                  ? 'text-white'
                                  : 'text-zinc-500'
                              }
                            >
                              {milestone.title}
                            </h3>
                            {milestone.completed_at && (
                              <span className="text-sm text-zinc-500">
                                {new Date(milestone.completed_at).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                          {milestone.description && (
                            <p className="text-sm text-zinc-400">{milestone.description}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
