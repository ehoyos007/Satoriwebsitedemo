import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AuthProvider } from './contexts/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { PricingPage } from './pages/PricingPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { DesignSystemPage } from './pages/DesignSystemPage';
import { WebsiteBuildPage } from './pages/services/WebsiteBuildPage';
import { GoogleBusinessProfilePage } from './pages/services/GoogleBusinessProfilePage';
import { ReviewScreenerPage } from './pages/services/ReviewScreenerPage';
import { AIChatBotPage } from './pages/services/AIChatBotPage';
import { LocalSEOPage } from './pages/services/LocalSEOPage';
import { GoogleAdsPage } from './pages/services/GoogleAdsPage';
import { AnalyticsDashboardsPage } from './pages/services/AnalyticsDashboardsPage';
import { BrandingPage } from './pages/services/BrandingPage';
import { GraphicDesignPage } from './pages/services/GraphicDesignPage';
import { CustomCRMPage } from './pages/services/CustomCRMPage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { CheckoutSuccessPage } from './pages/checkout/CheckoutSuccessPage';
import { CreateAccountPage } from './pages/checkout/CreateAccountPage';
import { OnboardingWizard } from './pages/onboarding/OnboardingWizard';
import { OnboardingSuccess } from './pages/onboarding/OnboardingSuccess';
import { PortalLayout } from './pages/portal/PortalLayout';
import { OverviewPage } from './pages/portal/OverviewPage';
import { AnalyticsDashboard } from './pages/portal/AnalyticsDashboard';
import { PageDetailPage } from './pages/portal/analytics/PageDetailPage';
import { KeywordDetailPage } from './pages/portal/analytics/KeywordDetailPage';
import { ServicesPage as PortalServicesPage } from './pages/portal/ServicesPage';
import { ServiceDetailPage } from './pages/portal/ServiceDetailPage';
import { ProjectPage } from './pages/portal/ProjectPage';
import { AssetsPage } from './pages/portal/AssetsPage';
import { NotesPage } from './pages/portal/NotesPage';
import { MessagesPage } from './pages/portal/MessagesPage';
import { BillingPage } from './pages/portal/BillingPage';
import { SettingsPage } from './pages/portal/SettingsPage';
import { BookCallPage } from './pages/booking/BookCallPage';
import { ScheduleCallPage } from './pages/booking/ScheduleCallPage';
import { BookingConfirmation } from './pages/booking/BookingConfirmation';
import { LoginPage } from './pages/LoginPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { AuthCallbackPage } from './pages/auth/AuthCallbackPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { AnimatedGalaxyBackground } from './components/AnimatedGalaxyBackground';

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

function AdminLoadingFallback() {
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
          <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><Suspense fallback={<AdminLoadingFallback />}><AdminLayout /></Suspense></ProtectedRoute>}>
            <Route index element={<Suspense fallback={<AdminLoadingFallback />}><AdminOverview /></Suspense>} />
            <Route path="clients" element={<Suspense fallback={<AdminLoadingFallback />}><AdminClients /></Suspense>} />
            <Route path="clients/:clientId" element={<Suspense fallback={<AdminLoadingFallback />}><AdminClientDetail /></Suspense>} />
            <Route path="projects" element={<Suspense fallback={<AdminLoadingFallback />}><AdminProjects /></Suspense>} />
            <Route path="projects/:projectId" element={<Suspense fallback={<AdminLoadingFallback />}><AdminProjectDetail /></Suspense>} />
            <Route path="orders" element={<Suspense fallback={<AdminLoadingFallback />}><AdminOrders /></Suspense>} />
            <Route path="subscriptions" element={<Suspense fallback={<AdminLoadingFallback />}><AdminSubscriptions /></Suspense>} />
            <Route path="availability" element={<Suspense fallback={<AdminLoadingFallback />}><AdminAvailability /></Suspense>} />
            <Route path="bookings" element={<Suspense fallback={<AdminLoadingFallback />}><AdminBookings /></Suspense>} />
            <Route path="services" element={<Suspense fallback={<AdminLoadingFallback />}><AdminServices /></Suspense>} />
            <Route path="case-study-wizard" element={<Suspense fallback={<AdminLoadingFallback />}><LazyCaseStudyWizard /></Suspense>} />
          </Route>

          {/* 404 Catch-all */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
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
        </div>
      </AuthProvider>
    </Router>
    </ErrorBoundary>
  );
}
