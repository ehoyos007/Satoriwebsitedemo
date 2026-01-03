import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { PricingPage } from './pages/PricingPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { DesignSystemPage } from './pages/DesignSystemPage';
import { WebsiteBuildPage } from './pages/services/WebsiteBuildPage';
import { GoogleBusinessProfilePage } from './pages/services/GoogleBusinessProfilePage';
import { ReviewScreenerPage } from './pages/services/ReviewScreenerPage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { CreateAccountPage } from './pages/checkout/CreateAccountPage';
import { OnboardingWizard } from './pages/onboarding/OnboardingWizard';
import { OnboardingSuccess } from './pages/onboarding/OnboardingSuccess';
import { PortalDashboard } from './pages/portal/PortalDashboard';
import { BookCallPage } from './pages/booking/BookCallPage';
import { ScheduleCallPage } from './pages/booking/ScheduleCallPage';
import { BookingConfirmation } from './pages/booking/BookingConfirmation';
import { LoginPage } from './pages/LoginPage';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { AnimatedGalaxyBackground } from './components/AnimatedGalaxyBackground';

export default function App() {
  return (
    <Router>
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
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/design-system" element={<DesignSystemPage />} />
            
            {/* Login */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Checkout Flow */}
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/checkout/create-account" element={<CreateAccountPage />} />
            
            {/* Onboarding Flow */}
            <Route path="/onboarding" element={<OnboardingWizard />} />
            <Route path="/onboarding/success" element={<OnboardingSuccess />} />
            
            {/* Portal */}
            <Route path="/portal" element={<PortalDashboard />} />
            
            {/* Book a Call Flow */}
            <Route path="/book-call" element={<BookCallPage />} />
            <Route path="/booking/schedule" element={<ScheduleCallPage />} />
            <Route path="/booking/confirmation" element={<BookingConfirmation />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}