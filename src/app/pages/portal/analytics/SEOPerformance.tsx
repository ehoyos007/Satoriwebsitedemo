import {
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointerClick,
  Target,
  ArrowUpDown,
  Search,
  Minus,
} from 'lucide-react';
import { useState } from 'react';

interface SEOPerformanceProps {
  onKeywordClick: (keyword: string) => void;
  onPageClick: (pageUrl: string) => void;
}

export function SEOPerformance({ onKeywordClick, onPageClick }: SEOPerformanceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'clicks' | 'impressions' | 'ctr' | 'position'>('clicks');

  const seoMetrics = {
    clicks: { current: 2847, previous: 2134, change: 33.4 },
    impressions: { current: 48234, previous: 39876, change: 21.0 },
    ctr: { current: 5.9, previous: 5.4, change: 0.5 },
    avgPosition: { current: 8.3, previous: 12.1, change: -3.8 },
  };

  const keywords = [
    {
      query: 'plumber austin tx',
      clicks: 487,
      impressions: 6823,
      ctr: 7.1,
      position: 3.2,
      trend: 'up' as const,
    },
    {
      query: 'emergency plumbing austin',
      clicks: 342,
      impressions: 4156,
      ctr: 8.2,
      position: 2.8,
      trend: 'up' as const,
    },
    {
      query: 'water heater repair austin',
      clicks: 289,
      impressions: 5234,
      ctr: 5.5,
      position: 5.1,
      trend: 'same' as const,
    },
    {
      query: 'drain cleaning austin',
      clicks: 234,
      impressions: 3987,
      ctr: 5.9,
      position: 6.3,
      trend: 'up' as const,
    },
    {
      query: 'plumbing services near me',
      clicks: 198,
      impressions: 8965,
      ctr: 2.2,
      position: 11.4,
      trend: 'down' as const,
    },
    {
      query: 'licensed plumber austin',
      clicks: 167,
      impressions: 2456,
      ctr: 6.8,
      position: 4.2,
      trend: 'up' as const,
    },
  ];

  const seoPages = [
    {
      page: '/',
      clicks: 892,
      impressions: 12456,
      ctr: 7.2,
      position: 4.1,
    },
    {
      page: '/services/emergency-plumbing',
      clicks: 567,
      impressions: 8234,
      ctr: 6.9,
      position: 3.8,
    },
    {
      page: '/services/water-heater',
      clicks: 423,
      impressions: 6789,
      ctr: 6.2,
      position: 5.3,
    },
    {
      page: '/services/drain-cleaning',
      clicks: 334,
      impressions: 5123,
      ctr: 6.5,
      position: 4.7,
    },
  ];

  const filteredKeywords = keywords.filter((k) =>
    k.query.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* SEO KPIs */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SEOKPICard
          title="Total Clicks"
          value={seoMetrics.clicks.current.toLocaleString()}
          change={seoMetrics.clicks.change}
          icon={MousePointerClick}
          positive={true}
        />
        <SEOKPICard
          title="Total Impressions"
          value={seoMetrics.impressions.current.toLocaleString()}
          change={seoMetrics.impressions.change}
          icon={Eye}
          positive={true}
        />
        <SEOKPICard
          title="Avg Click-Through Rate"
          value={`${seoMetrics.ctr.current}%`}
          change={seoMetrics.ctr.change}
          icon={Target}
          positive={true}
        />
        <SEOKPICard
          title="Avg Position"
          value={seoMetrics.avgPosition.current.toFixed(1)}
          change={seoMetrics.avgPosition.change}
          icon={TrendingUp}
          positive={true}
          inverseChange={true}
        />
      </div>

      {/* SEO Chart */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10">
        <h3 className="text-xl mb-6">Clicks & Impressions Over Time</h3>
        <SEOChart />
      </div>

      {/* Keywords Table */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl">Top Keywords</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search keywords..."
              className="pl-10 pr-4 py-2 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-zinc-500 border-b border-white/10">
                <th className="pb-3">Keyword</th>
                <th className="pb-3 text-right">
                  <button className="flex items-center gap-1 ml-auto hover:text-white transition-colors">
                    Clicks
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="pb-3 text-right">
                  <button className="flex items-center gap-1 ml-auto hover:text-white transition-colors">
                    Impressions
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="pb-3 text-right">CTR</th>
                <th className="pb-3 text-right">Avg Position</th>
                <th className="pb-3 text-right">Trend</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredKeywords.map((keyword, index) => (
                <tr
                  key={index}
                  onClick={() => onKeywordClick(keyword.query)}
                  className="border-b border-white/5 hover:bg-zinc-900/30 transition-colors cursor-pointer"
                >
                  <td className="py-4">{keyword.query}</td>
                  <td className="py-4 text-right text-cyan-400">{keyword.clicks.toLocaleString()}</td>
                  <td className="py-4 text-right text-zinc-400">{keyword.impressions.toLocaleString()}</td>
                  <td className="py-4 text-right text-zinc-400">{keyword.ctr}%</td>
                  <td className="py-4 text-right">
                    <span className={keyword.position <= 5 ? 'text-emerald-400' : 'text-zinc-400'}>
                      {keyword.position.toFixed(1)}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    {keyword.trend === 'up' && <TrendingUp className="w-4 h-4 text-emerald-400 ml-auto" />}
                    {keyword.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-400 ml-auto" />}
                    {keyword.trend === 'same' && <Minus className="w-4 h-4 text-zinc-500 ml-auto" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SEO Pages Table */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10">
        <h3 className="text-xl mb-6">Top Pages (SEO)</h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-zinc-500 border-b border-white/10">
                <th className="pb-3">Page</th>
                <th className="pb-3 text-right">Clicks</th>
                <th className="pb-3 text-right">Impressions</th>
                <th className="pb-3 text-right">CTR</th>
                <th className="pb-3 text-right">Avg Position</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {seoPages.map((page, index) => (
                <tr
                  key={index}
                  onClick={() => onPageClick(page.page)}
                  className="border-b border-white/5 hover:bg-zinc-900/30 transition-colors cursor-pointer"
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
    </div>
  );
}

// SEO KPI Card
interface SEOKPICardProps {
  title: string;
  value: string;
  change: number;
  icon: any;
  positive: boolean;
  inverseChange?: boolean;
}

function SEOKPICard({ title, value, change, icon: Icon, positive, inverseChange }: SEOKPICardProps) {
  const isPositive = inverseChange ? change < 0 : change > 0;
  const displayChange = Math.abs(change);

  return (
    <div className="glass-panel p-6 rounded-xl border border-white/10">
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm text-zinc-400">{title}</span>
        <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-400/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-violet-400" />
        </div>
      </div>
      <div className="text-3xl mb-2">{value}</div>
      <div className="flex items-center gap-2 text-sm">
        {isPositive ? (
          <TrendingUp className="w-4 h-4 text-emerald-400" />
        ) : change !== 0 ? (
          <TrendingDown className="w-4 h-4 text-red-400" />
        ) : (
          <Minus className="w-4 h-4 text-zinc-400" />
        )}
        <span className={isPositive ? 'text-emerald-400' : change !== 0 ? 'text-red-400' : 'text-zinc-400'}>
          {isPositive ? '+' : change < 0 ? '' : ''}{displayChange.toFixed(1)}{inverseChange && title.includes('Position') ? '' : '%'}
        </span>
        <span className="text-zinc-500">vs last period</span>
      </div>
    </div>
  );
}

// SEO Chart
function SEOChart() {
  const clicksData = [120, 135, 142, 156, 148, 165, 178, 182, 195, 203, 218, 225, 234, 248, 256, 267, 275, 289, 298, 312, 325, 334, 348, 356, 367, 378, 389, 398, 412, 425];
  const impressionsData = clicksData.map((v) => v * 17);
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

      <div className="h-64 flex items-end gap-1">
        {clicksData.map((clicks, index) => {
          const impressions = impressionsData[index];
          const clickHeight = (clicks / maxClicks) * 100;
          const impressionHeight = (impressions / maxImpressions) * 100;

          return (
            <div key={index} className="flex-1 flex items-end gap-0.5 group">
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
