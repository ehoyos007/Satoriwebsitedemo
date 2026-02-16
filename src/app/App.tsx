import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { CaseStudyWizard } from './pages/admin/CaseStudyWizard';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { NotFoundPage } from './pages/NotFoundPage';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { AnimatedGalaxyBackground } from './components/AnimatedGalaxyBackground';

export default function App() {
  return (
    <ErrorBoundary>
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-[#0a0a0f] text-white relative">
          {/* Animated Galaxy Background - spans entire site */}
          <AnimatedGalaxyBackground
            config={{
              speed: 0.3,
              gridSize: 60,
              particleCount: 40,
              glowIntensity: 0.15,
              styleVariant: 'galaxy', // Options: 'grid' | 'triangles' | 'galaxy'
              gridOpacity: 0.08,
              particleOpacity: 0.12,
            }}
          />

          {/* Content layer - sits above background */}
          <div className="relative" style={{ zIndex: 1 }}>
            <Navigation />
            <Routes>
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

              {/* Admin Tools (protected, admin only) */}
              <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/case-study-wizard" element={<ProtectedRoute requiredRole="admin"><CaseStudyWizard /></ProtectedRoute>} />

              {/* 404 Catch-all */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </AuthProvider>
    </Router>
    </ErrorBoundary>
  );
}
