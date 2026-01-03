import { CheckCircle, AlertCircle, Loader2, ArrowRight, Search } from 'lucide-react';

export function ConnectionStatus() {
  const connections = [
    {
      name: 'Google Analytics 4',
      status: 'connected' as const,
      lastSync: '2 minutes ago',
    },
    {
      name: 'Google Search Console',
      status: 'connected' as const,
      lastSync: '5 minutes ago',
    },
    {
      name: 'Google Business Profile',
      status: 'not-connected' as const,
      lastSync: null,
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {connections.map((connection) => (
        <div
          key={connection.name}
          className={`glass-panel p-4 rounded-xl border transition-all ${
            connection.status === 'connected'
              ? 'border-emerald-400/20 bg-emerald-500/5'
              : connection.status === 'error'
              ? 'border-red-400/20 bg-red-500/5'
              : 'border-white/10'
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              {connection.status === 'connected' && (
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              )}
              {connection.status === 'loading' && (
                <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
              )}
              {connection.status === 'error' && (
                <AlertCircle className="w-5 h-5 text-red-400" />
              )}
              {connection.status === 'not-connected' && (
                <AlertCircle className="w-5 h-5 text-zinc-500" />
              )}
              <span className="text-sm font-medium">{connection.name}</span>
            </div>
          </div>

          {connection.status === 'connected' && (
            <div className="text-xs text-zinc-500">Last synced: {connection.lastSync}</div>
          )}

          {connection.status === 'not-connected' && (
            <button className="mt-2 flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
              Connect Now
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {connection.status === 'error' && (
            <div className="mt-2">
              <div className="text-xs text-red-400 mb-2">Permission error</div>
              <button className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                Reconnect
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
