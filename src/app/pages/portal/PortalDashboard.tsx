import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Upload,
  MessageSquare,
  FileText,
  CreditCard,
  Settings,
  LogOut,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Rocket,
  StickyNote,
  Sparkles,
  BarChart3,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { AddServicesView } from './AddServicesView';
import { ServiceDetailView } from './ServiceDetailView';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { AnalyticsSnapshot } from './AnalyticsSnapshot';

export function PortalDashboard() {
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [purchasedServices] = useState<string[]>([]);

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
  };

  const handleBackToServices = () => {
    setSelectedServiceId(null);
  };

  // Map portal service IDs to Supabase service slugs
  const portalToSlug: Record<string, string> = {
    gbp: 'gbp-optimization',
    reviews: 'review-screener',
    chatbot: 'ai-chat-bot',
    'local-seo': 'local-seo',
    'google-ads': 'google-ads',
    analytics: 'analytics-dashboards',
    branding: 'branding',
    'graphic-design': 'graphic-design',
    crm: 'custom-crm',
  };

  const handlePurchaseService = (serviceId: string, _notes: string) => {
    const slug = portalToSlug[serviceId] || serviceId;
    navigate(`/checkout?service=${slug}`);
  };

  const projectStages = [
    { id: 1, name: 'Intake Received', status: 'complete', date: 'Jan 2, 2025' },
    { id: 2, name: 'Draft Build', status: 'in-progress', date: 'Est. Jan 8' },
    { id: 3, name: 'Review', status: 'pending', date: 'Est. Jan 10' },
    { id: 4, name: 'Revisions', status: 'pending', date: 'Est. Jan 12' },
    { id: 5, name: 'Final QA', status: 'pending', date: 'Est. Jan 13' },
    { id: 6, name: 'Launch', status: 'pending', date: 'Est. Jan 14' },
  ];

  const recentActivity = [
    { type: 'update', message: 'Kickoff call scheduled for Jan 7 at 2:00 PM', time: '2 hours ago' },
    { type: 'action', message: 'Onboarding intake completed', time: '3 hours ago' },
    { type: 'payment', message: 'Payment received ($999.95)', time: '3 hours ago' },
    { type: 'welcome', message: 'Welcome to Satori Studios!', time: '3 hours ago' },
  ];

  const tasks = [
    {
      id: 1,
      title: 'Join your kickoff call',
      description: 'Tuesday, Jan 7 at 2:00 PM EST',
      status: 'pending',
      priority: 'high',
    },
    {
      id: 2,
      title: 'Upload high-quality service photos (optional)',
      description: 'Help us showcase your work',
      status: 'pending',
      priority: 'medium',
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="glass-panel p-6 rounded-2xl border border-white/10 sticky top-24">
              <div className="mb-6">
                <h3 className="text-sm uppercase tracking-wider text-zinc-500 mb-2">Client Portal</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center border border-cyan-400/30">
                    <span className="text-sm">
                      {profile?.full_name
                        ? profile.full_name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
                        : '?'}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium">{profile?.full_name || 'User'}</div>
                    <div className="text-sm text-zinc-500">{profile?.email || ''}</div>
                  </div>
                </div>
              </div>

              <nav className="space-y-1">
                {[
                  { id: 'overview', label: 'Overview', icon: Rocket },
                  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                  { id: 'project', label: 'Project Details', icon: FileText },
                  { id: 'assets', label: 'Assets & Uploads', icon: Upload },
                  { id: 'notes', label: 'Project Notes', icon: StickyNote },
                  { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 2 },
                  { id: 'add-services', label: 'Add Services', icon: Sparkles },
                  { id: 'billing', label: 'Billing', icon: CreditCard },
                  { id: 'settings', label: 'Settings', icon: Settings },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSelectedServiceId(null);
                    }}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-400/30 text-white'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full bg-cyan-500 text-white text-xs">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-white/10">
                <button
                  onClick={async () => { await signOut(); navigate('/'); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900/50 transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {activeTab === 'overview' && (
              <>
                {/* Header */}
                <div>
                  <h1 className="text-4xl mb-2">
                    Welcome back,{' '}
                    <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
                      {profile?.full_name?.split(' ')[0] || 'there'}
                    </span>
                  </h1>
                  <p className="text-zinc-400">Here's what's happening with your website build</p>
                </div>

                {/* Show purchased services if any */}
                {purchasedServices.length > 0 && (
                  <div className="glass-panel p-6 rounded-xl border border-emerald-400/20 bg-emerald-500/5">
                    <h3 className="mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      Recently Added Services
                    </h3>
                    <div className="space-y-2">
                      {purchasedServices.map((serviceId) => (
                        <div key={serviceId} className="text-sm text-zinc-300">
                          • Service added - setup begins within 48 hours
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Analytics Snapshot */}
                <AnalyticsSnapshot onViewFullAnalytics={() => setActiveTab('analytics')} />

                {/* Project Status */}
                <div className="glass-panel p-8 rounded-2xl border border-white/10">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl mb-1">Project Status</h2>
                      <p className="text-zinc-400">Estimated launch: January 14, 2025</p>
                    </div>
                    <div className="px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-400/20 text-emerald-400">
                      On Track
                    </div>
                  </div>

                  {/* Progress Timeline */}
                  <div className="relative">
                    <div className="absolute left-4 top-6 bottom-6 w-0.5 bg-zinc-800" />

                    <div className="space-y-4">
                      {projectStages.map((stage, index) => (
                        <div key={stage.id} className="relative flex gap-4">
                          <div
                            className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              stage.status === 'complete'
                                ? 'bg-emerald-500/20 border border-emerald-400/30'
                                : stage.status === 'in-progress'
                                ? 'bg-cyan-500/20 border border-cyan-400/30 animate-pulse'
                                : 'bg-zinc-900 border border-white/10'
                            }`}
                          >
                            {stage.status === 'complete' ? (
                              <CheckCircle className="w-5 h-5 text-emerald-400" />
                            ) : stage.status === 'in-progress' ? (
                              <Clock className="w-5 h-5 text-cyan-400" />
                            ) : (
                              <span className="text-sm text-zinc-500">{stage.id}</span>
                            )}
                          </div>
                          <div className="flex-1 pb-6">
                            <div className="flex items-center justify-between mb-1">
                              <h3
                                className={
                                  stage.status === 'in-progress'
                                    ? 'text-cyan-400'
                                    : stage.status === 'complete'
                                    ? 'text-white'
                                    : 'text-zinc-500'
                                }
                              >
                                {stage.name}
                              </h3>
                              <span className="text-sm text-zinc-500">{stage.date}</span>
                            </div>
                            {stage.status === 'in-progress' && (
                              <p className="text-sm text-zinc-400">
                                Our team is building your website. You'll be notified when it's ready for review.
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Required */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Tasks */}
                  <div className="glass-panel p-6 rounded-2xl border border-white/10">
                    <h3 className="text-xl mb-4 flex items-center gap-2">
                      <AlertCircle className="w-6 h-6 text-amber-400" />
                      Action Required
                    </h3>
                    <div className="space-y-3">
                      {tasks.map((task) => (
                        <div
                          key={task.id}
                          className="p-4 rounded-lg bg-zinc-900/50 border border-white/10 hover:border-cyan-400/30 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <h4>{task.title}</h4>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs ${
                                task.priority === 'high'
                                  ? 'bg-red-500/10 border border-red-400/20 text-red-400'
                                  : 'bg-amber-500/10 border border-amber-400/20 text-amber-400'
                              }`}
                            >
                              {task.priority}
                            </span>
                          </div>
                          <p className="text-sm text-zinc-400">{task.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Kickoff Call */}
                  <div className="glass-panel p-6 rounded-2xl border border-cyan-400/30 bg-cyan-500/5">
                    <h3 className="text-xl mb-4 flex items-center gap-2">
                      <Calendar className="w-6 h-6 text-cyan-400" />
                      Upcoming Call
                    </h3>
                    <div className="mb-4">
                      <div className="text-2xl mb-1">15-Minute Kickoff</div>
                      <div className="text-zinc-400">Tuesday, January 7, 2025</div>
                      <div className="text-zinc-400">2:00 PM - 2:15 PM EST</div>
                    </div>
                    <div className="space-y-2">
                      <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:scale-105 transition-all">
                        Join Call (when time)
                      </button>
                      <button className="w-full px-4 py-2 rounded-lg border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all">
                        Reschedule
                      </button>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="glass-panel p-6 rounded-2xl border border-white/10">
                  <h3 className="text-xl mb-4 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-violet-400" />
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/30 border border-white/5"
                      >
                        <div
                          className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            activity.type === 'update'
                              ? 'bg-cyan-400'
                              : activity.type === 'action'
                              ? 'bg-emerald-400'
                              : activity.type === 'payment'
                              ? 'bg-violet-400'
                              : 'bg-amber-400'
                          }`}
                        />
                        <div className="flex-1">
                          <p className="text-zinc-300">{activity.message}</p>
                          <p className="text-sm text-zinc-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <Link
                    to="/portal/assets"
                    className="group glass-panel p-6 rounded-xl border border-white/10 hover:border-cyan-400/30 transition-all"
                  >
                    <Upload className="w-8 h-8 text-cyan-400 mb-3" />
                    <h4 className="mb-1 group-hover:text-cyan-400 transition-colors">Upload Assets</h4>
                    <p className="text-sm text-zinc-500">Add logos, photos, or documents</p>
                  </Link>

                  <Link
                    to="/portal/notes"
                    className="group glass-panel p-6 rounded-xl border border-white/10 hover:border-violet-400/30 transition-all"
                  >
                    <StickyNote className="w-8 h-8 text-violet-400 mb-3" />
                    <h4 className="mb-1 group-hover:text-violet-400 transition-colors">View Notes</h4>
                    <p className="text-sm text-zinc-500">Access your project notes</p>
                  </Link>

                  <Link
                    to="/portal/messages"
                    className="group glass-panel p-6 rounded-xl border border-white/10 hover:border-emerald-400/30 transition-all relative"
                  >
                    <MessageSquare className="w-8 h-8 text-emerald-400 mb-3" />
                    <h4 className="mb-1 group-hover:text-emerald-400 transition-colors">Messages</h4>
                    <p className="text-sm text-zinc-500">2 new messages</p>
                    <span className="absolute top-4 right-4 w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  </Link>
                </div>
              </>
            )}

            {activeTab === 'analytics' && (
              <AnalyticsDashboard />
            )}

            {activeTab === 'add-services' && !selectedServiceId && (
              <AddServicesView onSelectService={handleSelectService} />
            )}

            {activeTab === 'add-services' && selectedServiceId && (
              <ServiceDetailView
                serviceId={selectedServiceId}
                onBack={handleBackToServices}
                onPurchase={handlePurchaseService}
              />
            )}
          </div>
        </div>

      </div>
    </div>
  );
}