import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ClipboardList,
  Package,
  ExternalLink,
  Server,
  CheckCircle2,
  XCircle
} from 'lucide-react';

interface AppStatus {
  name: string;
  port: number;
  status: 'checking' | 'online' | 'offline';
  description: string;
  icon: React.ReactNode;
  features: string[];
}

export function AdminDashboard() {
  const [apps, setApps] = useState<AppStatus[]>([
    {
      name: 'Project Tracker',
      port: 5174,
      status: 'checking',
      description: 'Track project progress across 5 phases with 100+ subtasks. Features localStorage persistence for completed tasks.',
      icon: <ClipboardList className="w-8 h-8" />,
      features: ['Phase-based tracking', 'Subtask completion', 'Progress analytics', 'localStorage sync']
    },
    {
      name: 'Services Guide',
      port: 5175,
      status: 'checking',
      description: 'Internal reference for 9 add-on services with pricing, tools, Stripe products, and website copy.',
      icon: <Package className="w-8 h-8" />,
      features: ['9 services documented', 'Pricing calculator', 'Favorites & notes', 'Search & filter']
    }
  ]);

  useEffect(() => {
    // Check app status by attempting to fetch from each port
    const checkAppStatus = async (port: number): Promise<boolean> => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        await fetch(`http://localhost:${port}`, {
          mode: 'no-cors',
          signal: controller.signal
        });

        clearTimeout(timeoutId);
        return true;
      } catch {
        return false;
      }
    };

    const checkAllApps = async () => {
      const updatedApps = await Promise.all(
        apps.map(async (app) => {
          const isOnline = await checkAppStatus(app.port);
          return { ...app, status: isOnline ? 'online' : 'offline' as const };
        })
      );
      setApps(updatedApps);
    };

    checkAllApps();
    const interval = setInterval(checkAllApps, 10000); // Re-check every 10s

    return () => clearInterval(interval);
  }, []);

  const openApp = (port: number) => {
    window.open(`http://localhost:${port}`, '_blank');
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Server className="w-10 h-10 text-cyan-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-zinc-400 text-lg">
            Access internal tools for project management and service documentation.
          </p>
        </motion.div>

        {/* App Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {apps.map((app, index) => (
            <motion.div
              key={app.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors">
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  {app.status === 'checking' ? (
                    <div className="flex items-center gap-2 text-zinc-500">
                      <div className="w-2 h-2 bg-zinc-500 rounded-full animate-pulse" />
                      <span className="text-xs">Checking...</span>
                    </div>
                  ) : app.status === 'online' ? (
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-xs">Online</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-zinc-500">
                      <XCircle className="w-4 h-4" />
                      <span className="text-xs">Offline</span>
                    </div>
                  )}
                </div>

                {/* App Info */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-violet-500/20 rounded-xl text-cyan-400">
                    {app.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-white mb-1">{app.name}</h2>
                    <p className="text-zinc-500 text-sm">localhost:{app.port}</p>
                  </div>
                </div>

                <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
                  {app.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {app.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-2 py-1 bg-zinc-800/50 border border-zinc-700/50 rounded-md text-xs text-zinc-400"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Launch Button */}
                <button
                  onClick={() => openApp(app.port)}
                  disabled={app.status === 'offline'}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
                    app.status === 'online'
                      ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:from-cyan-400 hover:to-violet-400 shadow-lg shadow-cyan-500/25'
                      : app.status === 'checking'
                      ? 'bg-zinc-800 text-zinc-500 cursor-wait'
                      : 'bg-zinc-800/50 text-zinc-600 cursor-not-allowed'
                  }`}
                >
                  <ExternalLink className="w-5 h-5" />
                  {app.status === 'online' ? 'Open App' : app.status === 'checking' ? 'Checking...' : 'Start Server First'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Start Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Quick Start</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-cyan-400 mb-2">Start Project Tracker</h4>
              <code className="block bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-300 font-mono">
                cd SatoriProjectTracker && npm run dev
              </code>
            </div>
            <div>
              <h4 className="text-sm font-medium text-violet-400 mb-2">Start Services Guide</h4>
              <code className="block bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-300 font-mono">
                cd SatoriProducts && npm run dev
              </code>
            </div>
          </div>
        </motion.div>

        {/* Data Storage Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-amber-400 mb-2">Data Storage</h3>
          <p className="text-zinc-400 text-sm">
            Both apps currently use <span className="text-amber-300">localStorage</span> for persistence.
            Data is browser-specific and will be lost if browser data is cleared.
            Supabase integration for cloud sync is planned for Phase 2.
          </p>
          <div className="mt-4 grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-zinc-900/50 rounded-lg p-3">
              <span className="text-zinc-500">Project Tracker:</span>
              <code className="block text-cyan-400 mt-1 text-xs">satori-project-tracker-progress</code>
            </div>
            <div className="bg-zinc-900/50 rounded-lg p-3">
              <span className="text-zinc-500">Services Notes:</span>
              <code className="block text-violet-400 mt-1 text-xs">satori-services-notes</code>
            </div>
            <div className="bg-zinc-900/50 rounded-lg p-3">
              <span className="text-zinc-500">Services Favorites:</span>
              <code className="block text-emerald-400 mt-1 text-xs">satori-services-favorites</code>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
