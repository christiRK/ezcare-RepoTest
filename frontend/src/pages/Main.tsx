import React from 'react';
import HeroSection from '../components/HeroSection';
import CtaSection from '../components/CtaSection';
import AiChatPreview from '../components/AiChatPreview';
import FaqSection from '../components/FaqSection';
import FeaturesToolkitSection from '../components/FeaturesToolkitSection';
import PricingSection from '../components/PricingSection';
import TrustSection from '../components/TrustSection';
import SmartDashboardSection from '../components/SmartDashboardSection';
import ProfessionalSection from '../components/ProfessionalSection';
import UserTestimonialsSection from '../components/UserTestimonialsSection';

const Main: React.FC = () => {
  return (
    <div>
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
      {/* Ajoute d'autres composants ou sections ici */}
    </div>
  );
};

export default Main;
