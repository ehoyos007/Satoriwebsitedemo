import { ArrowLeft, ExternalLink, TrendingUp, Users, Eye, Clock, Target, StickyNote } from 'lucide-react';
import { useState } from 'react';

interface PageDetailViewProps {
  pageUrl: string;
  onBack: () => void;
}

export function PageDetailView({ pageUrl, onBack }: PageDetailViewProps) {
  const [notes, setNotes] = useState('');

  // Placeholder data for the specific page
  const pageData = {
    title: 'Services - Plumbing',
    url: pageUrl,
    pageviews: 2156,
    users: 1823,
    sessions: 1989,
    engagementRate: 68.9,
    avgTime: '2m 45s',
    conversions: 34,
    conversionRate: 1.9,
    bounceRate: 31.1,
  };

  const trafficSources = [
    { source: 'Organic Search', users: 847, percentage: 46.5 },
    { source: 'Direct', users: 456, percentage: 25.0 },
    { source: 'Referral', users: 312, percentage: 17.1 },
    { source: 'Social', users: 208, percentage: 11.4 },
  ];

  const topKeywords = [
    { query: 'plumbing services austin', clicks: 234, position: 3.2 },
    { query: 'emergency plumber', clicks: 189, position: 4.1 },
    { query: 'water heater repair', clicks: 156, position: 5.8 },
    { query: 'drain cleaning near me', clicks: 123, position: 6.2 },
  ];

  const conversions = [
    { event: 'Contact Form Submit', count: 18 },
    { event: 'Click to Call', count: 12 },
    { event: 'Booking Button Click', count: 4 },
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Analytics
      </button>

      {/* Page Header */}
      <div className="glass-panel p-8 rounded-2xl border border-white/10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl mb-2">{pageData.title}</h1>
            <div className="flex items-center gap-3">
              <span className="text-cyan-400">{pageData.url}</span>
              <a
                href={pageData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-zinc-500 hover:text-cyan-400 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View Live
              </a>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickStat label="Pageviews" value={pageData.pageviews.toLocaleString()} icon={Eye} />
          <QuickStat label="Unique Users" value={pageData.users.toLocaleString()} icon={Users} />
          <QuickStat label="Avg Time on Page" value={pageData.avgTime} icon={Clock} />
          <QuickStat
            label="Conversion Rate"
            value={`${pageData.conversionRate}%`}
            icon={Target}
            highlight
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Trend */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl mb-6">Performance Trend (Last 30 Days)</h3>
            <PageTrendChart />
          </div>

          {/* Traffic Sources */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl mb-6">Traffic Sources</h3>
            <div className="space-y-4">
              {trafficSources.map((source) => (
                <div key={source.source}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-300">{source.source}</span>
                    <span className="text-zinc-400">
                      {source.users.toLocaleString()} ({source.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-violet-500"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Keywords Driving Traffic */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl mb-6">Top Keywords Driving Traffic</h3>
            <div className="space-y-3">
              {topKeywords.map((keyword, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-zinc-950/50 border border-white/5"
                >
                  <div>
                    <div className="mb-1">{keyword.query}</div>
                    <div className="text-sm text-zinc-500">Position {keyword.position.toFixed(1)}</div>
                  </div>
                  <div className="text-cyan-400">{keyword.clicks} clicks</div>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion Events */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl mb-6">Conversions on This Page</h3>
            <div className="space-y-3">
              {conversions.map((conversion, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-zinc-950/50 border border-white/5"
                >
                  <span>{conversion.event}</span>
                  <span className="text-emerald-400">{conversion.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Page Notes */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 sticky top-24">
            <h3 className="mb-4 flex items-center gap-2">
              <StickyNote className="w-5 h-5 text-amber-400" />
              Page Notes
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 min-h-[150px] mb-4"
              placeholder="Add notes about this page's performance or improvement ideas..."
            />
            <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:scale-105 transition-all">
              Save Note
            </button>
          </div>

          {/* Request Update */}
          <div className="glass-panel p-6 rounded-2xl border border-cyan-400/20 bg-cyan-500/5">
            <h3 className="mb-2">Need Optimization?</h3>
            <p className="text-sm text-zinc-400 mb-4">
              Our team can review this page and recommend improvements to increase conversions.
            </p>
            <button className="w-full px-4 py-2 rounded-lg border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/10 transition-all">
              Request Page Review
            </button>
          </div>

          {/* Quick Insights */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <h3 className="mb-4">Quick Insights</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-zinc-400">
                  Engagement rate 22% above site average
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Target className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span className="text-zinc-400">
                  Conversion rate could improve with clearer CTA
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Quick Stat Component
interface QuickStatProps {
  label: string;
  value: string;
  icon: any;
  highlight?: boolean;
}

function QuickStat({ label, value, icon: Icon, highlight }: QuickStatProps) {
  return (
    <div
      className={`p-4 rounded-xl border ${
        highlight ? 'border-emerald-400/20 bg-emerald-500/5' : 'border-white/10 bg-zinc-950/50'
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-4 h-4 ${highlight ? 'text-emerald-400' : 'text-cyan-400'}`} />
        <span className="text-sm text-zinc-400">{label}</span>
      </div>
      <div className="text-2xl">{value}</div>
    </div>
  );
}

// Page Trend Chart
function PageTrendChart() {
  const data = [45, 52, 48, 58, 62, 68, 65, 71, 75, 78, 73, 79, 83, 86, 91, 88, 94, 97, 102, 98, 104, 108, 112, 115, 109, 116, 120, 123, 118, 125];
  const max = Math.max(...data);

  return (
    <div className="space-y-4">
      <div className="h-48 flex items-end gap-1">
        {data.map((value, index) => (
          <div
            key={index}
            className="flex-1 bg-gradient-to-t from-cyan-500/50 to-violet-500/50 rounded-t hover:from-cyan-500 hover:to-violet-500 transition-all cursor-pointer"
            style={{ height: `${(value / max) * 100}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between text-xs text-zinc-500">
        <span>30 days ago</span>
        <span>Today</span>
      </div>
    </div>
  );
}
