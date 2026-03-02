import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Upload,
  MessageSquare,
  FileText,
  CreditCard,
  Settings,
  LogOut,
  StickyNote,
  Sparkles,
  BarChart3,
  Rocket,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';
import { SEO } from '@/app/components/SEO';

const navItems = [
  { path: '/portal', label: 'Overview', icon: Rocket, exact: true },
  { path: '/portal/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/portal/project', label: 'Project Details', icon: FileText },
  { path: '/portal/assets', label: 'Assets & Uploads', icon: Upload },
  { path: '/portal/notes', label: 'Project Notes', icon: StickyNote },
  { path: '/portal/messages', label: 'Messages', icon: MessageSquare },
  { path: '/portal/services', label: 'Add Services', icon: Sparkles },
  { path: '/portal/billing', label: 'Billing', icon: CreditCard },
  { path: '/portal/settings', label: 'Settings', icon: Settings },
];

export function PortalLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, signOut } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const isActive = (item: typeof navItems[number]) => {
    if (item.exact) {
      return location.pathname === item.path;
    }
    return location.pathname.startsWith(item.path);
  };

  const currentPage = navItems.find((item) => isActive(item));

  const sidebarContent = (
    <>
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
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setMobileNavOpen(false)}
            className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive(item)
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
          </Link>
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
    </>
  );

  return (
    <div className="min-h-screen pt-16">
      <SEO title="Client Portal" path="/portal" description="Manage your project, view analytics, and track progress in your Satori Studios client portal." noIndex />

      {/* Mobile Portal Nav Toggle */}
      <div className="lg:hidden sticky top-16 z-40 glass-panel border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="flex items-center justify-between w-full py-3 text-white"
          >
            <div className="flex items-center gap-3">
              {currentPage && <currentPage.icon className="w-5 h-5 text-cyan-400" />}
              <span className="font-medium">{currentPage?.label || 'Portal'}</span>
            </div>
            {mobileNavOpen ? (
              <X className="w-5 h-5 text-zinc-400" />
            ) : (
              <Menu className="w-5 h-5 text-zinc-400" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {mobileNavOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-white/5"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                {sidebarContent}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="glass-panel p-6 rounded-2xl border border-white/10 sticky top-24">
              {sidebarContent}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
