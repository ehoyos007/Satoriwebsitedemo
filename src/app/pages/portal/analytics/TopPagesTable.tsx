import { ArrowUpDown, ExternalLink, TrendingUp, TrendingDown } from 'lucide-react';
import { useState } from 'react';

interface TopPagesTableProps {
  onPageClick: (pageUrl: string) => void;
}

export function TopPagesTable({ onPageClick }: TopPagesTableProps) {
  const [sortBy, setSortBy] = useState<'pageviews' | 'users' | 'conversions'>('pageviews');

  const pages = [
    {
      title: 'Home Page',
      url: '/',
      pageviews: 3847,
      users: 2934,
      engagementRate: 72.3,
      avgTime: '3m 12s',
      conversions: 45,
      conversionRate: 1.5,
      trend: 'up' as const,
    },
    {
      title: 'Services - Plumbing',
      url: '/services/plumbing',
      pageviews: 2156,
      users: 1823,
      engagementRate: 68.9,
      avgTime: '2m 45s',
      conversions: 34,
      conversionRate: 1.9,
      trend: 'up' as const,
    },
    {
      title: 'Contact Us',
      url: '/contact',
      pageviews: 1847,
      users: 1629,
      engagementRate: 45.2,
      avgTime: '1m 23s',
      conversions: 23,
      conversionRate: 1.4,
      trend: 'down' as const,
    },
    {
      title: 'About',
      url: '/about',
      pageviews: 1234,
      users: 1067,
      engagementRate: 82.1,
      avgTime: '4m 08s',
      conversions: 12,
      conversionRate: 1.1,
      trend: 'up' as const,
    },
    {
      title: 'Emergency Services',
      url: '/emergency',
      pageviews: 987,
      users: 876,
      engagementRate: 91.4,
      avgTime: '2m 56s',
      conversions: 28,
      conversionRate: 3.2,
      trend: 'up' as const,
    },
  ];

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl">Top Pages</h3>
        <div className="flex gap-2 text-sm">
          <button
            onClick={() => setSortBy('pageviews')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              sortBy === 'pageviews'
                ? 'bg-cyan-500/20 border border-cyan-400/30 text-cyan-400'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Pageviews
          </button>
          <button
            onClick={() => setSortBy('users')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              sortBy === 'users'
                ? 'bg-cyan-500/20 border border-cyan-400/30 text-cyan-400'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setSortBy('conversions')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              sortBy === 'conversions'
                ? 'bg-cyan-500/20 border border-cyan-400/30 text-cyan-400'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Conversions
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-zinc-500 border-b border-white/10">
              <th className="pb-3">Page</th>
              <th className="pb-3 text-right">
                <button className="flex items-center gap-1 ml-auto hover:text-white transition-colors">
                  Pageviews
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="pb-3 text-right">
                <button className="flex items-center gap-1 ml-auto hover:text-white transition-colors">
                  Users
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="pb-3 text-right">Engagement</th>
              <th className="pb-3 text-right">Avg Time</th>
              <th className="pb-3 text-right">
                <button className="flex items-center gap-1 ml-auto hover:text-white transition-colors">
                  Conversions
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="pb-3 text-right">CVR</th>
              <th className="pb-3"></th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {pages.map((page, index) => (
              <tr
                key={index}
                onClick={() => onPageClick(page.url)}
                className="border-b border-white/5 hover:bg-zinc-900/30 transition-colors cursor-pointer"
              >
                <td className="py-4">
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      {page.title}
                      {page.trend === 'up' ? (
                        <TrendingUp className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-400" />
                      )}
                    </div>
                    <div className="text-xs text-zinc-500">{page.url}</div>
                  </div>
                </td>
                <td className="py-4 text-right text-zinc-300">{page.pageviews.toLocaleString()}</td>
                <td className="py-4 text-right text-zinc-300">{page.users.toLocaleString()}</td>
                <td className="py-4 text-right text-zinc-400">{page.engagementRate}%</td>
                <td className="py-4 text-right text-zinc-400">{page.avgTime}</td>
                <td className="py-4 text-right text-emerald-400">{page.conversions}</td>
                <td className="py-4 text-right">
                  <span className={page.conversionRate >= 2 ? 'text-emerald-400' : 'text-zinc-400'}>
                    {page.conversionRate}%
                  </span>
                </td>
                <td className="py-4">
                  <ExternalLink className="w-4 h-4 text-zinc-600 hover:text-cyan-400 transition-colors" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
