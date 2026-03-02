import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { AuthProvider } from './contexts/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { PricingPage } from './pages/PricingPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { DesignSystemPage } from './pages/DesignSystemPage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { AnimatedGalaxyBackground } from './components/AnimatedGalaxyBackground';

// Lazy-loaded service detail pages (individual service pages loaded on demand)
const WebsiteBuildPage = lazy(() => import('./pages/services/WebsiteBuildPage').then(m => ({ default: m.WebsiteBuildPage })));
const GoogleBusinessProfilePage = lazy(() => import('./pages/services/GoogleBusinessProfilePage').then(m => ({ default: m.GoogleBusinessProfilePage })));
const ReviewScreenerPage = lazy(() => import('./pages/services/ReviewScreenerPage').then(m => ({ default: m.ReviewScreenerPage })));
const AIChatBotPage = lazy(() => import('./pages/services/AIChatBotPage').then(m => ({ default: m.AIChatBotPage })));
const LocalSEOPage = lazy(() => import('./pages/services/LocalSEOPage').then(m => ({ default: m.LocalSEOPage })));
const GoogleAdsPage = lazy(() => import('./pages/services/GoogleAdsPage').then(m => ({ default: m.GoogleAdsPage })));
const AnalyticsDashboardsPage = lazy(() => import('./pages/services/AnalyticsDashboardsPage').then(m => ({ default: m.AnalyticsDashboardsPage })));
const BrandingPage = lazy(() => import('./pages/services/BrandingPage').then(m => ({ default: m.BrandingPage })));
const GraphicDesignPage = lazy(() => import('./pages/services/GraphicDesignPage').then(m => ({ default: m.GraphicDesignPage })));
const CustomCRMPage = lazy(() => import('./pages/services/CustomCRMPage').then(m => ({ default: m.CustomCRMPage })));

// Lazy-loaded checkout/onboarding (only needed in purchase flow)
const CheckoutPage = lazy(() => import('./pages/checkout/CheckoutPage').then(m => ({ default: m.CheckoutPage })));
const CheckoutSuccessPage = lazy(() => import('./pages/checkout/CheckoutSuccessPage').then(m => ({ default: m.CheckoutSuccessPage })));
const CreateAccountPage = lazy(() => import('./pages/checkout/CreateAccountPage').then(m => ({ default: m.CreateAccountPage })));
const OnboardingWizard = lazy(() => import('./pages/onboarding/OnboardingWizard').then(m => ({ default: m.OnboardingWizard })));
const OnboardingSuccess = lazy(() => import('./pages/onboarding/OnboardingSuccess').then(m => ({ default: m.OnboardingSuccess })));

// Lazy-loaded portal pages (behind auth — not needed until login)
const PortalLayout = lazy(() => import('./pages/portal/PortalLayout').then(m => ({ default: m.PortalLayout })));
const OverviewPage = lazy(() => import('./pages/portal/OverviewPage').then(m => ({ default: m.OverviewPage })));
const AnalyticsDashboard = lazy(() => import('./pages/portal/AnalyticsDashboard').then(m => ({ default: m.AnalyticsDashboard })));
const PageDetailPage = lazy(() => import('./pages/portal/analytics/PageDetailPage').then(m => ({ default: m.PageDetailPage })));
const KeywordDetailPage = lazy(() => import('./pages/portal/analytics/KeywordDetailPage').then(m => ({ default: m.KeywordDetailPage })));
const PortalServicesPage = lazy(() => import('./pages/portal/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ServiceDetailPage = lazy(() => import('./pages/portal/ServiceDetailPage').then(m => ({ default: m.ServiceDetailPage })));
const ProjectPage = lazy(() => import('./pages/portal/ProjectPage').then(m => ({ default: m.ProjectPage })));
const AssetsPage = lazy(() => import('./pages/portal/AssetsPage').then(m => ({ default: m.AssetsPage })));
const NotesPage = lazy(() => import('./pages/portal/NotesPage').then(m => ({ default: m.NotesPage })));
const MessagesPage = lazy(() => import('./pages/portal/MessagesPage').then(m => ({ default: m.MessagesPage })));
const BillingPage = lazy(() => import('./pages/portal/BillingPage').then(m => ({ default: m.BillingPage })));
const SettingsPage = lazy(() => import('./pages/portal/SettingsPage').then(m => ({ default: m.SettingsPage })));

// Lazy-loaded auth pages (infrequently visited)
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage').then(m => ({ default: m.ForgotPasswordPage })));
const ResetPasswordPage = lazy(() => import('./pages/auth/ResetPasswordPage').then(m => ({ default: m.ResetPasswordPage })));
const AuthCallbackPage = lazy(() => import('./pages/auth/AuthCallbackPage').then(m => ({ default: m.AuthCallbackPage })));

// Lazy-loaded booking pages
const BookCallPage = lazy(() => import('./pages/booking/BookCallPage').then(m => ({ default: m.BookCallPage })));
const ScheduleCallPage = lazy(() => import('./pages/booking/ScheduleCallPage').then(m => ({ default: m.ScheduleCallPage })));
const BookingConfirmation = lazy(() => import('./pages/booking/BookingConfirmation').then(m => ({ default: m.BookingConfirmation })));

// Lazy-loaded admin pages (code-split so marketing pages stay fast)
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout').then(m => ({ default: m.AdminLayout })));
const AdminOverview = lazy(() => import('./pages/admin/AdminOverview').then(m => ({ default: m.AdminOverview })));
const AdminClients = lazy(() => import('./pages/admin/AdminClients').then(m => ({ default: m.AdminClients })));
const AdminClientDetail = lazy(() => import('./pages/admin/AdminClientDetail').then(m => ({ default: m.AdminClientDetail })));
const AdminProjects = lazy(() => import('./pages/admin/AdminProjects').then(m => ({ default: m.AdminProjects })));
const AdminProjectDetail = lazy(() => import('./pages/admin/AdminProjectDetail').then(m => ({ default: m.AdminProjectDetail })));
const AdminOrders = lazy(() => import('./pages/admin/AdminOrders').then(m => ({ default: m.AdminOrders })));
const AdminSubscriptions = lazy(() => import('./pages/admin/AdminSubscriptions').then(m => ({ default: m.AdminSubscriptions })));
const AdminAvailability = lazy(() => import('./pages/admin/AdminAvailability').then(m => ({ default: m.AdminAvailability })));
const AdminBookings = lazy(() => import('./pages/admin/AdminBookings').then(m => ({ default: m.AdminBookings })));
const AdminServices = lazy(() => import('./pages/admin/AdminServices').then(m => ({ default: m.AdminServices })));
const LazyCaseStudyWizard = lazy(() => import('./pages/admin/CaseStudyWizard').then(m => ({ default: m.CaseStudyWizard })));

function PageLoadingFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Group routes so internal navigation (e.g. portal tabs) doesn't trigger page transitions
function getRouteGroup(pathname: string): string {
  if (pathname.startsWith('/portal')) return '/portal';
  if (pathname.startsWith('/onboarding')) return '/onboarding';
  if (pathname.startsWith('/booking')) return '/booking';
  if (pathname.startsWith('/checkout')) return '/checkout';
  if (pathname.startsWith('/admin')) return '/admin';
  return pathname;
}

function AnimatedRoutes() {
  const location = useLocation();
  const routeGroup = getRouteGroup(location.pathname);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={routeGroup}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      >
        <Suspense fallback={<PageLoadingFallback />}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/website-build" element={<WebsiteBuildPage />} />
          <Route path="/services/google-business-profile" element={<GoogleBusinessProfilePage />} />
          <Route path="/services/review-screener" element={<ReviewScreenerPage />} />
          <Route path="/services/ai-chat-bot" element={<AIChatBotPage />} />
          <Route path="/services/local-seo" element={<LocalSEOPage />} />
          <Route path="/services/google-ads" element={<GoogleAdsPage />} />
          <Route path="/services/analytics-dashboards" element={<AnalyticsDashboardsPage />} />
          <Route path="/services/branding" element={<BrandingPage />} />
          <Route path="/services/graphic-design" element={<GraphicDesignPage />} />
          <Route path="/services/custom-crm" element={<CustomCRMPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/design-system" element={<DesignSystemPage />} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />

          {/* Checkout Flow */}
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
          <Route path="/checkout/create-account" element={<CreateAccountPage />} />

          {/* Onboarding Flow (protected) */}
          <Route path="/onboarding" element={<ProtectedRoute><OnboardingWizard /></ProtectedRoute>} />
          <Route path="/onboarding/success" element={<ProtectedRoute><OnboardingSuccess /></ProtectedRoute>} />

          {/* Portal (protected) */}
          <Route path="/portal" element={<ProtectedRoute><PortalLayout /></ProtectedRoute>}>
            <Route index element={<OverviewPage />} />
            <Route path="analytics" element={<AnalyticsDashboard />} />
            <Route path="analytics/page/:pageUrl" element={<PageDetailPage />} />
            <Route path="analytics/keyword/:keyword" element={<KeywordDetailPage />} />
            <Route path="services" element={<PortalServicesPage />} />
            <Route path="services/:serviceId" element={<ServiceDetailPage />} />
            <Route path="project" element={<ProjectPage />} />
            <Route path="assets" element={<AssetsPage />} />
            <Route path="notes" element={<NotesPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="billing" element={<BillingPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Book a Call Flow */}
          <Route path="/book-call" element={<BookCallPage />} />
          <Route path="/booking/schedule" element={<ScheduleCallPage />} />
          <Route path="/booking/confirmation" element={<BookingConfirmation />} />

          {/* Admin Portal (protected, admin only, lazy-loaded) */}
          <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminOverview />} />
            <Route path="clients" element={<AdminClients />} />
            <Route path="clients/:clientId" element={<AdminClientDetail />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="projects/:projectId" element={<AdminProjectDetail />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="subscriptions" element={<AdminSubscriptions />} />
            <Route path="availability" element={<AdminAvailability />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="case-study-wizard" element={<LazyCaseStudyWizard />} />
          </Route>

          {/* 404 Catch-all */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <div className="min-h-screen bg-[#0a0a0f] text-white relative">
          {/* Animated Galaxy Background - spans entire site */}
          <AnimatedGalaxyBackground
            config={{
              speed: 0.3,
              gridSize: 60,
              particleCount: 40,
              glowIntensity: 0.15,
              styleVariant: 'galaxy',
              gridOpacity: 0.08,
              particleOpacity: 0.12,
            }}
          />

          {/* Content layer - sits above background */}
          <div className="relative" style={{ zIndex: 1 }}>
            <Navigation />
            <AnimatedRoutes />
            <Footer />
          </div>
          <Analytics />
          <SpeedInsights />
        </div>
      </AuthProvider>
    </Router>
    </ErrorBoundary>
  );
}
