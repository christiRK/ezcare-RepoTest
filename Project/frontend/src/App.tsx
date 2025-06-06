import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AiChatPreview from './components/AiChatPreview';
import TrustSection from './components/TrustSection';
import SmartDashboardSection from './components/SmartDashboardSection';
import UserTestimonialsSection from './components/UserTestimonialsSection';
import ProfessionalSection from './components/ProfessionalSection';
import FeaturesToolkitSection from './components/FeaturesToolkitSection';
import PricingSection from './components/PricingSection';
import FaqSection from './components/FaqSection';
import CtaSection from './components/CtaSection';
import DashboardLayout from './components/Layout/DashboardLayout';
import Login from './components/Login';
import Signup from './components/Signup';
import ResetPassword from './components/ResetPassword';
import Footer from './components/Footer';
import './styles/animations.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar transparent={true} />
      <HeroSection />
      <AiChatPreview />
      <TrustSection />
      <SmartDashboardSection />
      <UserTestimonialsSection />
      <ProfessionalSection />
      <FeaturesToolkitSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
      <Footer />
      <DashboardLayout />;
      <Login />
      <Signup />
      <ResetPassword />

    </div>
  );
}

export default App;