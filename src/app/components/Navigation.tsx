import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, LogIn, Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useState, useRef } from 'react';
import logoImage from '@/assets/satori-logo.png';
import { useAuth } from '@/app/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/app/components/ui/dropdown-menu';

function getInitials(name: string | null | undefined): string {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setServicesOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 150);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Pricing', path: '/pricing' },
  ];

  const serviceItems = [
    { name: 'Website Build', path: '/services/website-build' },
    { name: 'Google Business Profile', path: '/services/google-business-profile' },
    { name: 'Review Screener', path: '/services/review-screener' },
    { name: 'Local SEO', path: '/services/local-seo' },
    { name: 'Google Ads', path: '/services/google-ads' },
    { name: 'Analytics Dashboards', path: '/services/analytics-dashboards' },
    { name: 'AI Chat Bot', path: '/services/ai-chat-bot' },
    { name: 'Branding', path: '/services/branding' },
    { name: 'Graphic Design', path: '/services/graphic-design' },
    { name: 'Custom CRM', path: '/services/custom-crm' },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoImage} alt="Satori Studios" className="h-8 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative transition-colors ${
                  location.pathname === item.path
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-[21px] left-0 right-0 h-[2px]"
                    style={{
                      background: 'linear-gradient(90deg, rgba(34, 211, 238, 0.8), rgba(167, 139, 250, 0.8))',
                      boxShadow: '0 0 8px rgba(34, 211, 238, 0.6)',
                    }}
                  />
                )}
              </Link>
            ))}

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className={`relative transition-colors flex items-center gap-1 ${
                  location.pathname.startsWith('/services')
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                {location.pathname.startsWith('/services') && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-[21px] left-0 right-0 h-[2px]"
                    style={{
                      background: 'linear-gradient(90deg, rgba(34, 211, 238, 0.8), rgba(167, 139, 250, 0.8))',
                      boxShadow: '0 0 8px rgba(34, 211, 238, 0.6)',
                    }}
                  />
                )}
              </button>

              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-2 w-64 glass-panel border border-white/10 rounded-lg shadow-2xl overflow-hidden"
                >
                  <Link
                    to="/services"
                    className="block px-4 py-3 text-zinc-300 hover:text-cyan-400 hover:bg-cyan-500/5 transition-colors border-b border-white/5"
                  >
                    All Services
                  </Link>
                  {serviceItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-4 py-3 text-zinc-300 hover:text-cyan-400 hover:bg-cyan-500/5 transition-colors border-b border-white/5 last:border-0"
                    >
                      {item.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-700 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all text-zinc-300 hover:text-white">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500/30 to-violet-500/30 flex items-center justify-center border border-cyan-400/30 text-xs">
                      {getInitials(profile?.full_name)}
                    </div>
                    <span className="hidden lg:inline text-sm max-w-[120px] truncate">
                      {profile?.full_name || user.email}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-zinc-900 border-white/10 text-white">
                  <DropdownMenuLabel className="text-zinc-400 font-normal">
                    <div className="text-sm text-white">{profile?.full_name || 'User'}</div>
                    <div className="text-xs text-zinc-500 truncate">{user.email}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem
                    className="text-zinc-300 focus:text-white focus:bg-cyan-500/10 cursor-pointer"
                    onClick={() => navigate('/portal')}
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Portal
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem
                    className="text-zinc-300 focus:text-white focus:bg-red-500/10 cursor-pointer"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-700 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all text-zinc-300 hover:text-white"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Client Login</span>
              </Link>
            )}
            <Link
              to="/checkout?service=website-build"
              className="group relative px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
            >
              <span className="relative z-10">Buy Website — $999.95</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              to="/book-call"
              className="hidden md:block px-5 py-2.5 rounded-lg border border-zinc-700 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all"
            >
              Book a Call
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-zinc-700 hover:border-cyan-400/50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 glass-panel overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
              {/* Mobile Nav Items */}
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg transition-all ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-400/30 text-white'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Services Accordion */}
              <div>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                    location.pathname.startsWith('/services')
                      ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-400/30 text-white'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileServicesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 space-y-1 overflow-hidden"
                    >
                      <Link
                        to="/services"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-6 py-2 text-sm text-zinc-400 hover:text-cyan-400 transition-colors"
                      >
                        All Services
                      </Link>
                      {serviceItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-6 py-2 text-sm text-zinc-400 hover:text-cyan-400 transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile CTAs */}
              <div className="pt-3 border-t border-white/5 space-y-3">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-2 text-zinc-400">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/30 to-violet-500/30 flex items-center justify-center border border-cyan-400/30 text-xs text-white">
                        {getInitials(profile?.full_name)}
                      </div>
                      <div>
                        <div className="text-sm text-white">{profile?.full_name || 'User'}</div>
                        <div className="text-xs text-zinc-500">{user.email}</div>
                      </div>
                    </div>
                    <Link
                      to="/portal"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg border border-zinc-700 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all text-zinc-300 hover:text-white"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Portal
                    </Link>
                    <button
                      onClick={() => { handleSignOut(); setMobileMenuOpen(false); }}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg border border-zinc-700 hover:border-red-400/50 hover:bg-red-500/5 transition-all text-zinc-300 hover:text-white"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg border border-zinc-700 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all text-zinc-300 hover:text-white"
                  >
                    <LogIn className="w-4 h-4" />
                    Client Login
                  </Link>
                )}
                <Link
                  to="/checkout?service=website-build"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full px-5 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-center transition-all hover:scale-105"
                >
                  Buy Website — $999.95
                </Link>
                <Link
                  to="/book-call"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full px-5 py-3 rounded-lg border border-zinc-700 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all text-center"
                >
                  Book a Call
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
