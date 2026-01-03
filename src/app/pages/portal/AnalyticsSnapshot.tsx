import { ArrowRight, TrendingUp, Users, Eye, Target, MousePointerClick } from 'lucide-react';

interface AnalyticsSnapshotProps {
  onViewFullAnalytics: () => void;
}

export function AnalyticsSnapshot({ onViewFullAnalytics }: AnalyticsSnapshotProps) {
  const quickMetrics = [
    { label: 'Users (30d)', value: '3,847', change: '+31%', icon: Users, positive: true },
    { label: 'Pageviews (30d)', value: '12,489', change: '+27%', icon: Eye, positive: true },
    { label: 'Conversions (30d)', value: '142', change: '+45%', icon: Target, positive: true },
    { label: 'Engagement Rate', value: '68.4%', change: '+4%', icon: MousePointerClick, positive: true },
  ];

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl mb-1">Analytics Overview</h3>
          <p className="text-sm text-zinc-500">Last 30 days performance</p>
        </div>
        <button
          onClick={onViewFullAnalytics}
          className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          View Full Analytics
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="p-4 rounded-xl bg-zinc-950/50 border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-cyan-400" />
                <span className="text-xs text-zinc-500">{metric.label}</span>
              </div>
              <div className="text-2xl mb-1">{metric.value}</div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className={`w-3 h-3 ${metric.positive ? 'text-emerald-400' : 'text-red-400'}`} />
                <span className={metric.positive ? 'text-emerald-400' : 'text-red-400'}>
                  {metric.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mini Chart */}
      <div className="mt-6">
        <div className="text-sm text-zinc-400 mb-3">Traffic Trend</div>
        <div className="h-20 flex items-end gap-1">
          {[340, 380, 420, 390, 450, 520, 480, 510, 560, 590, 620, 580, 610, 650, 680, 710, 690, 720, 750, 780, 820, 850, 880, 910, 940, 970, 1000, 1030, 1060, 1090].map(
            (value, index) => (
              <div
                key={index}
                className="flex-1 bg-gradient-to-t from-cyan-500/30 to-violet-500/30 rounded-t"
                style={{ height: `${(value / 1090) * 100}%` }}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
