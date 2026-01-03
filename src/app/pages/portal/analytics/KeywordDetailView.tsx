import { ArrowLeft, TrendingUp, TrendingDown, Eye, MousePointerClick, Target, Lightbulb } from 'lucide-react';

interface KeywordDetailViewProps {
  keyword: string;
  onBack: () => void;
}

export function KeywordDetailView({ keyword, onBack }: KeywordDetailViewProps) {
  const keywordData = {
    query: keyword,
    clicks: 487,
    impressions: 6823,
    ctr: 7.1,
    position: 3.2,
    clicksChange: 34.2,
    impressionsChange: 28.5,
    ctrChange: 4.3,
    positionChange: -1.8,
  };

  const associatedPages = [
    { page: '/', clicks: 234, impressions: 3456, ctr: 6.8, position: 3.1 },
    { page: '/services/plumbing', clicks: 198, impressions: 2789, ctr: 7.1, position: 3.3 },
    { page: '/emergency', clicks: 55, impressions: 578, ctr: 9.5, position: 2.8 },
  ];

  const recommendations = [
    'Position improved from 5.0 to 3.2 in the last 30 days - momentum is strong',
    'CTR is 7.1% vs industry average of 5.4% - title/meta are performing well',
    'Consider creating dedicated landing page for this keyword to capture more traffic',
    'Add FAQ section targeting this keyword to improve position further',
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to SEO Performance
      </button>

      {/* Keyword Header */}
      <div className="glass-panel p-8 rounded-2xl border border-white/10">
        <div className="mb-6">
          <h1 className="text-3xl mb-2">{keywordData.query}</h1>
          <p className="text-zinc-400">Keyword Performance Details</p>
        </div>

        {/* KPIs */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KeywordKPI
            label="Clicks"
            value={keywordData.clicks.toLocaleString()}
            change={keywordData.clicksChange}
            icon={MousePointerClick}
          />
          <KeywordKPI
            label="Impressions"
            value={keywordData.impressions.toLocaleString()}
            change={keywordData.impressionsChange}
            icon={Eye}
          />
          <KeywordKPI
            label="Click-Through Rate"
            value={`${keywordData.ctr}%`}
            change={keywordData.ctrChange}
            icon={Target}
          />
          <KeywordKPI
            label="Avg Position"
            value={keywordData.position.toFixed(1)}
            change={keywordData.positionChange}
            icon={TrendingUp}
            inverseChange
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Trend */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl mb-6">Performance Trend (Last 30 Days)</h3>
            <KeywordTrendChart />
          </div>

          {/* Associated Pages */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl mb-6">Pages Ranking for This Keyword</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-zinc-500 border-b border-white/10">
                    <th className="pb-3">Page</th>
                    <th className="pb-3 text-right">Clicks</th>
                    <th className="pb-3 text-right">Impressions</th>
                    <th className="pb-3 text-right">CTR</th>
                    <th className="pb-3 text-right">Position</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {associatedPages.map((page, index) => (
                    <tr
                      key={index}
                      className="border-b border-white/5 hover:bg-zinc-900/30 transition-colors"
                    >
                      <td className="py-4 text-cyan-400">{page.page}</td>
                      <td className="py-4 text-right text-zinc-300">{page.clicks.toLocaleString()}</td>
                      <td className="py-4 text-right text-zinc-400">{page.impressions.toLocaleString()}</td>
                      <td className="py-4 text-right text-zinc-400">{page.ctr}%</td>
                      <td className="py-4 text-right">
                        <span className={page.position <= 5 ? 'text-emerald-400' : 'text-zinc-400'}>
                          {page.position.toFixed(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Position History */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl mb-6">Position History</h3>
            <PositionChart />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Recommendations */}
          <div className="glass-panel p-6 rounded-2xl border border-emerald-400/20 bg-emerald-500/5 sticky top-24">
            <h3 className="mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-emerald-400" />
              Suggested Actions
            </h3>
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 p-3 rounded-lg bg-zinc-950/50 border border-white/5"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-sm text-zinc-300">{rec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <h3 className="mb-4">Keyword Insights</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-400">Search Volume</span>
                <span className="text-white">High</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Competition</span>
                <span className="text-emerald-400">Medium</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Intent</span>
                <span className="text-white">Transactional</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Opportunity</span>
                <span className="text-cyan-400">Strong</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Keyword KPI Component
interface KeywordKPIProps {
  label: string;
  value: string;
  change: number;
  icon: any;
  inverseChange?: boolean;
}

function KeywordKPI({ label, value, change, icon: Icon, inverseChange }: KeywordKPIProps) {
  const isPositive = inverseChange ? change < 0 : change > 0;
  const displayChange = Math.abs(change);

  return (
    <div className="p-4 rounded-xl border border-white/10 bg-zinc-950/50">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-violet-400" />
        <span className="text-sm text-zinc-400">{label}</span>
      </div>
      <div className="text-2xl mb-2">{value}</div>
      <div className="flex items-center gap-2 text-sm">
        {isPositive ? (
          <TrendingUp className="w-4 h-4 text-emerald-400" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-400" />
        )}
        <span className={isPositive ? 'text-emerald-400' : 'text-red-400'}>
          {isPositive ? '+' : ''}{displayChange.toFixed(1)}%
        </span>
      </div>
    </div>
  );
}

// Keyword Trend Chart
function KeywordTrendChart() {
  const clicksData = [12, 14, 13, 16, 15, 18, 19, 17, 20, 22, 21, 24, 23, 25, 27, 26, 29, 30, 28, 32, 34, 33, 36, 35, 38, 40, 39, 42, 41, 45];
  const impressionsData = clicksData.map((v) => v * 14);
  const maxClicks = Math.max(...clicksData);
  const maxImpressions = Math.max(...impressionsData);

  return (
    <div className="space-y-4">
      <div className="flex gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-500" />
          <span className="text-zinc-400">Clicks</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-violet-500" />
          <span className="text-zinc-400">Impressions</span>
        </div>
      </div>

      <div className="h-48 flex items-end gap-1">
        {clicksData.map((clicks, index) => {
          const impressions = impressionsData[index];
          const clickHeight = (clicks / maxClicks) * 100;
          const impressionHeight = (impressions / maxImpressions) * 100;

          return (
            <div key={index} className="flex-1 flex items-end gap-0.5">
              <div
                className="flex-1 bg-cyan-500/30 rounded-t hover:bg-cyan-500 transition-all cursor-pointer"
                style={{ height: `${clickHeight}%` }}
              />
              <div
                className="flex-1 bg-violet-500/30 rounded-t hover:bg-violet-500 transition-all cursor-pointer"
                style={{ height: `${impressionHeight}%` }}
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-between text-xs text-zinc-500">
        <span>30 days ago</span>
        <span>Today</span>
      </div>
    </div>
  );
}

// Position Chart
function PositionChart() {
  const positionData = [8.2, 7.9, 7.5, 7.1, 6.8, 6.5, 6.1, 5.8, 5.5, 5.2, 4.9, 4.6, 4.4, 4.2, 4.0, 3.9, 3.8, 3.7, 3.6, 3.5, 3.4, 3.4, 3.3, 3.3, 3.2, 3.2, 3.2, 3.1, 3.2, 3.2];
  const minPosition = Math.min(...positionData);
  const maxPosition = Math.max(...positionData);

  return (
    <div className="space-y-4">
      <div className="h-48 flex items-start gap-1">
        {positionData.map((position, index) => {
          // Inverse height calculation since lower position is better
          const normalizedHeight = ((maxPosition - position) / (maxPosition - minPosition)) * 100;

          return (
            <div
              key={index}
              className="flex-1 bg-gradient-to-b from-emerald-500/50 to-cyan-500/50 rounded-b hover:from-emerald-500 hover:to-cyan-500 transition-all cursor-pointer relative group"
              style={{ height: `${normalizedHeight}%` }}
            >
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-zinc-900 border border-white/10 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Position {position.toFixed(1)}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between text-xs text-zinc-500">
        <span>30 days ago (Position {positionData[0].toFixed(1)})</span>
        <span>Today (Position {positionData[positionData.length - 1].toFixed(1)})</span>
      </div>
    </div>
  );
}
