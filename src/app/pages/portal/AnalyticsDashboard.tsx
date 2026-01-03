import { motion } from 'motion/react';
import {
  TrendingUp,
  TrendingDown,
  Users,
  MousePointerClick,
  Eye,
  Clock,
  Target,
  Calendar,
  ChevronDown,
  Download,
  Share2,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  Search,
  Filter,
  ArrowRight,
  Minus,
} from 'lucide-react';
import { useState } from 'react';
import { ConnectionStatus } from './analytics/ConnectionStatus';
import { TopPagesTable } from './analytics/TopPagesTable';
import { SEOPerformance } from './analytics/SEOPerformance';
import { PageDetailView } from './analytics/PageDetailView';
import { KeywordDetailView } from './analytics/KeywordDetailView';

export function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState('last-30-days');
  const [compareEnabled, setCompareEnabled] = useState(false);
  const [trafficSegment, setTrafficSegment] = useState('all');
  const [deviceFilter, setDeviceFilter] = useState('all');
  const [selectedView, setSelectedView] = useState<'overview' | 'seo' | 'page-detail' | 'keyword-detail'>('overview');
  const [selectedPageUrl, setSelectedPageUrl] = useState<string | null>(null);
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);

  // Placeholder data
  const metrics = {
    users: { current: 3847, previous: 2934, change: 31.1 },
    sessions: { current: 5234, previous: 4102, change: 27.6 },
    pageviews: { current: 12489, previous: 9876, change: 26.5 },
    engagementRate: { current: 68.4, previous: 64.2, change: 4.2 },
    avgEngagementTime: { current: '2m 34s', previous: '2m 18s', change: 11.6 },
    conversions: { current: 142, previous: 98, change: 44.9 },
    leads: { current: 89, previous: 64, change: 39.1 },
  };

  const handlePageClick = (pageUrl: string) => {
    setSelectedPageUrl(pageUrl);
    setSelectedView('page-detail');
  };

  const handleKeywordClick = (keyword: string) => {
    setSelectedKeyword(keyword);
    setSelectedView('keyword-detail');
  };

  const handleBackToOverview = () => {
    setSelectedView('overview');
    setSelectedPageUrl(null);
    setSelectedKeyword(null);
  };

  if (selectedView === 'page-detail' && selectedPageUrl) {
    return <PageDetailView pageUrl={selectedPageUrl} onBack={handleBackToOverview} />;
  }

  if (selectedView === 'keyword-detail' && selectedKeyword) {
    return <KeywordDetailView keyword={selectedKeyword} onBack={handleBackToOverview} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl mb-2">
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
              Analytics
            </span>
          </h1>
          <p className="text-zinc-400">Website performance and SEO insights</p>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedView('overview')}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedView === 'overview'
                ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-400/30 text-white'
                : 'bg-zinc-900/50 border border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setSelectedView('seo')}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedView === 'seo'
                ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-400/30 text-white'
                : 'bg-zinc-900/50 border border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            SEO Performance
          </button>
        </div>
      </div>

      {/* Connection Status */}
      <ConnectionStatus />

      {selectedView === 'overview' && (
        <>
          {/* Global Filters */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Date Range */}
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Date Range</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="w-full pl-10 pr-8 py-2.5 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none text-sm appearance-none"
                  >
                    <option value="last-7-days">Last 7 days</option>
                    <option value="last-30-days">Last 30 days</option>
                    <option value="last-90-days">Last 90 days</option>
                    <option value="custom">Custom range</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                </div>
              </div>

              {/* Traffic Segment */}
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Traffic Source</label>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <select
                    value={trafficSegment}
                    onChange={(e) => setTrafficSegment(e.target.value)}
                    className="w-full pl-10 pr-8 py-2.5 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none text-sm appearance-none"
                  >
                    <option value="all">All Traffic</option>
                    <option value="organic">Organic Search</option>
                    <option value="paid">Paid Search</option>
                    <option value="direct">Direct</option>
                    <option value="referral">Referral</option>
                    <option value="social">Social</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                </div>
              </div>

              {/* Device Filter */}
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Device</label>
                <div className="relative">
                  <Monitor className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <select
                    value={deviceFilter}
                    onChange={(e) => setDeviceFilter(e.target.value)}
                    className="w-full pl-10 pr-8 py-2.5 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none text-sm appearance-none"
                  >
                    <option value="all">All Devices</option>
                    <option value="mobile">Mobile</option>
                    <option value="desktop">Desktop</option>
                    <option value="tablet">Tablet</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                </div>
              </div>

              {/* Compare Toggle */}
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Compare</label>
                <label className="flex items-center gap-3 px-4 py-2.5 bg-zinc-900/50 border border-white/10 rounded-lg cursor-pointer hover:border-cyan-400/30 transition-colors">
                  <input
                    type="checkbox"
                    checked={compareEnabled}
                    onChange={(e) => setCompareEnabled(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">Previous period</span>
                </label>
              </div>
            </div>
          </div>

          {/* KPI Overview */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              title="Users"
              value={metrics.users.current.toLocaleString()}
              change={metrics.users.change}
              previousValue={metrics.users.previous.toLocaleString()}
              icon={Users}
              showCompare={compareEnabled}
            />
            <KPICard
              title="Sessions"
              value={metrics.sessions.current.toLocaleString()}
              change={metrics.sessions.change}
              previousValue={metrics.sessions.previous.toLocaleString()}
              icon={MousePointerClick}
              showCompare={compareEnabled}
            />
            <KPICard
              title="Pageviews"
              value={metrics.pageviews.current.toLocaleString()}
              change={metrics.pageviews.change}
              previousValue={metrics.pageviews.previous.toLocaleString()}
              icon={Eye}
              showCompare={compareEnabled}
            />
            <KPICard
              title="Engagement Rate"
              value={`${metrics.engagementRate.current}%`}
              change={metrics.engagementRate.change}
              previousValue={`${metrics.engagementRate.previous}%`}
              icon={Target}
              showCompare={compareEnabled}
            />
            <KPICard
              title="Avg Engagement Time"
              value={metrics.avgEngagementTime.current}
              change={metrics.avgEngagementTime.change}
              previousValue={metrics.avgEngagementTime.previous}
              icon={Clock}
              showCompare={compareEnabled}
            />
            <KPICard
              title="Conversions"
              value={metrics.conversions.current.toLocaleString()}
              change={metrics.conversions.change}
              previousValue={metrics.conversions.previous.toLocaleString()}
              icon={Target}
              showCompare={compareEnabled}
              highlight
            />
            <KPICard
              title="Leads Captured"
              value={metrics.leads.current.toLocaleString()}
              change={metrics.leads.change}
              previousValue={metrics.leads.previous.toLocaleString()}
              icon={Users}
              showCompare={compareEnabled}
              highlight
            />
          </div>

          {/* Traffic Chart */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl mb-6">Traffic Over Time</h3>
            <TrafficChart />
          </div>

          {/* Traffic Breakdown */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Channel Breakdown */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10">
              <h3 className="text-xl mb-6">Traffic by Source</h3>
              <ChannelBreakdown />
            </div>

            {/* Device Breakdown */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10">
              <h3 className="text-xl mb-6">Device Distribution</h3>
              <DeviceBreakdown />
            </div>
          </div>

          {/* Top Pages */}
          <TopPagesTable onPageClick={handlePageClick} />

          {/* Top Cities */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl mb-6 flex items-center gap-2">
              <Globe className="w-6 h-6 text-cyan-400" />
              Top Locations
            </h3>
            <TopLocationsTable />
          </div>

          {/* Conversions */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl mb-6">Conversion Events</h3>
            <ConversionsTable />
          </div>

          {/* Insights */}
          <div className="glass-panel p-6 rounded-2xl border border-emerald-400/20 bg-emerald-500/5">
            <h3 className="text-xl mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
              Insights & Recommendations
            </h3>
            <div className="space-y-3">
              <InsightItem
                type="positive"
                message="Organic traffic increased 31% this period. Your SEO efforts are paying off."
              />
              <InsightItem
                type="warning"
                message="Contact page has 847 views but only 23 conversions (2.7%). Consider testing a clearer CTA."
              />
              <InsightItem
                type="info"
                message="Mobile traffic is 64% of total. Ensure all CTAs are thumb-friendly."
              />
            </div>
          </div>

          {/* Export Options */}
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all">
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all">
              <Download className="w-4 h-4" />
              Export PDF
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all">
              <Share2 className="w-4 h-4" />
              Share Report
            </button>
          </div>
        </>
      )}

      {selectedView === 'seo' && (
        <SEOPerformance onKeywordClick={handleKeywordClick} onPageClick={handlePageClick} />
      )}
    </div>
  );
}

// KPI Card Component
interface KPICardProps {
  title: string;
  value: string;
  change: number;
  previousValue: string;
  icon: any;
  showCompare: boolean;
  highlight?: boolean;
}

function KPICard({ title, value, change, previousValue, icon: Icon, showCompare, highlight }: KPICardProps) {
  const isPositive = change > 0;

  return (
    <div className={`glass-panel p-6 rounded-xl border transition-all ${
      highlight
        ? 'border-emerald-400/20 bg-emerald-500/5'
        : 'border-white/10'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm text-zinc-400">{title}</span>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          highlight
            ? 'bg-emerald-500/10 border border-emerald-400/20'
            : 'bg-cyan-500/10 border border-cyan-400/20'
        }`}>
          <Icon className={`w-5 h-5 ${highlight ? 'text-emerald-400' : 'text-cyan-400'}`} />
        </div>
      </div>
      <div className="text-3xl mb-2">{value}</div>
      {showCompare && (
        <div className="flex items-center gap-2 text-sm">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          ) : change < 0 ? (
            <TrendingDown className="w-4 h-4 text-red-400" />
          ) : (
            <Minus className="w-4 h-4 text-zinc-400" />
          )}
          <span className={isPositive ? 'text-emerald-400' : change < 0 ? 'text-red-400' : 'text-zinc-400'}>
            {isPositive ? '+' : ''}{change.toFixed(1)}%
          </span>
          <span className="text-zinc-500">vs {previousValue}</span>
        </div>
      )}
    </div>
  );
}

// Traffic Chart (Simple visualization)
function TrafficChart() {
  const data = [340, 380, 420, 390, 450, 520, 480, 510, 560, 590, 620, 580, 610, 650, 680, 710, 690, 720, 750, 780, 820, 850, 880, 910, 940, 970, 1000, 1030, 1060, 1090];
  const max = Math.max(...data);

  return (
    <div className="space-y-4">
      <div className="h-64 flex items-end gap-1">
        {data.map((value, index) => (
          <div
            key={index}
            className="flex-1 bg-gradient-to-t from-cyan-500/50 to-violet-500/50 rounded-t hover:from-cyan-500 hover:to-violet-500 transition-all cursor-pointer relative group"
            style={{ height: `${(value / max) * 100}%` }}
          >
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-zinc-900 border border-white/10 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {value} users
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-zinc-500">
        <span>30 days ago</span>
        <span>Today</span>
      </div>
    </div>
  );
}

// Channel Breakdown
function ChannelBreakdown() {
  const channels = [
    { name: 'Organic Search', value: 42, users: 1617, color: 'from-emerald-500 to-cyan-500' },
    { name: 'Direct', value: 28, users: 1077, color: 'from-cyan-500 to-blue-500' },
    { name: 'Referral', value: 18, users: 693, color: 'from-violet-500 to-purple-500' },
    { name: 'Social', value: 8, users: 308, color: 'from-pink-500 to-rose-500' },
    { name: 'Paid Search', value: 4, users: 154, color: 'from-amber-500 to-orange-500' },
  ];

  return (
    <div className="space-y-4">
      {channels.map((channel) => (
        <div key={channel.name}>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-zinc-300">{channel.name}</span>
            <span className="text-zinc-400">{channel.users.toLocaleString()} ({channel.value}%)</span>
          </div>
          <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${channel.color}`}
              style={{ width: `${channel.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// Device Breakdown
function DeviceBreakdown() {
  const devices = [
    { name: 'Mobile', value: 64, users: 2462, icon: Smartphone, color: 'from-cyan-500 to-blue-500' },
    { name: 'Desktop', value: 32, users: 1231, icon: Monitor, color: 'from-violet-500 to-purple-500' },
    { name: 'Tablet', value: 4, users: 154, icon: Tablet, color: 'from-emerald-500 to-cyan-500' },
  ];

  return (
    <div className="space-y-4">
      {devices.map((device) => {
        const Icon = device.icon;
        return (
          <div key={device.name} className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-zinc-900/50 border border-white/10 flex items-center justify-center flex-shrink-0">
              <Icon className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-zinc-300">{device.name}</span>
                <span className="text-zinc-400">{device.users.toLocaleString()} ({device.value}%)</span>
              </div>
              <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${device.color}`}
                  style={{ width: `${device.value}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Top Locations Table
function TopLocationsTable() {
  const locations = [
    { city: 'Austin, TX', users: 847, sessions: 1203, conversions: 34 },
    { city: 'Houston, TX', users: 623, sessions: 891, conversions: 21 },
    { city: 'Dallas, TX', users: 512, sessions: 734, conversions: 18 },
    { city: 'San Antonio, TX', users: 389, sessions: 567, conversions: 14 },
    { city: 'Round Rock, TX', users: 267, sessions: 398, conversions: 9 },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm text-zinc-500 border-b border-white/10">
            <th className="pb-3">Location</th>
            <th className="pb-3 text-right">Users</th>
            <th className="pb-3 text-right">Sessions</th>
            <th className="pb-3 text-right">Conversions</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {locations.map((location, index) => (
            <tr key={index} className="border-b border-white/5 hover:bg-zinc-900/30 transition-colors">
              <td className="py-3">{location.city}</td>
              <td className="py-3 text-right text-zinc-400">{location.users.toLocaleString()}</td>
              <td className="py-3 text-right text-zinc-400">{location.sessions.toLocaleString()}</td>
              <td className="py-3 text-right text-emerald-400">{location.conversions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Conversions Table
function ConversionsTable() {
  const conversions = [
    { event: 'Contact Form Submit', count: 67, users: 64, trend: '+12%' },
    { event: 'Click to Call', count: 45, users: 43, trend: '+34%' },
    { event: 'Booking Button Click', count: 23, users: 22, trend: '+8%' },
    { event: 'Chat Started', count: 7, users: 7, trend: 'new' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm text-zinc-500 border-b border-white/10">
            <th className="pb-3">Event Name</th>
            <th className="pb-3 text-right">Count</th>
            <th className="pb-3 text-right">Users</th>
            <th className="pb-3 text-right">Trend</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {conversions.map((conversion, index) => (
            <tr key={index} className="border-b border-white/5 hover:bg-zinc-900/30 transition-colors">
              <td className="py-3">{conversion.event}</td>
              <td className="py-3 text-right text-emerald-400">{conversion.count}</td>
              <td className="py-3 text-right text-zinc-400">{conversion.users}</td>
              <td className="py-3 text-right">
                <span className={conversion.trend === 'new' ? 'text-cyan-400' : 'text-emerald-400'}>
                  {conversion.trend}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Insight Item
interface InsightItemProps {
  type: 'positive' | 'warning' | 'info';
  message: string;
}

function InsightItem({ type, message }: InsightItemProps) {
  const config = {
    positive: { icon: TrendingUp, color: 'text-emerald-400' },
    warning: { icon: Target, color: 'text-amber-400' },
    info: { icon: TrendingUp, color: 'text-cyan-400' },
  };

  const { icon: Icon, color } = config[type];

  return (
    <div className="flex items-start gap-3 p-4 rounded-lg bg-zinc-950/50 border border-white/5">
      <Icon className={`w-5 h-5 ${color} mt-0.5 flex-shrink-0`} />
      <p className="text-sm text-zinc-300">{message}</p>
    </div>
  );
}
