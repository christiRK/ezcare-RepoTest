import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import WelcomeHeader from '../Welcome/WelcomeHeader';
import HealthQuizCard from '../Quiz/HealthQuizCard';
import AiDoctorChat from '../Chat/AiDoctorChat';
import TipsCarousel from '../HealthTips/TipsCarousel';
import UserProgress from '../Progress/UserProgress';
import LifestyleSuggestions from '../Lifestyle/LifestyleSuggestions';
import PremiumFeatures from '../Premium/PremiumFeatures';

type DashboardLayoutProps = {
  children?: React.ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <WelcomeHeader />
            <HealthQuizCard />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AiDoctorChat />
              <div className="space-y-8">
                <TipsCarousel />
                <UserProgress />
              </div>
            </div>
            <LifestyleSuggestions />
            <PremiumFeatures />
          </div>
        );
      case 'chat':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800">AI Health Assistant</h2>
            <AiDoctorChat fullScreen />
          </div>
        );
      case 'tips':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800">Daily Health Tips</h2>
            <TipsCarousel />
            <LifestyleSuggestions />
          </div>
        );
      case 'quiz':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800">Health Assessment</h2>
            <HealthQuizCard fullScreen />
          </div>
        );
      case 'account':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800">Account Settings</h2>
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        defaultValue="Jade"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue="jade@example.com"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Preferences</h3>
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                      <span className="ml-2 text-gray-700">Daily health tips</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                      <span className="ml-2 text-gray-700">Weekly progress summary</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                      <span className="ml-2 text-gray-700">AI chat suggestions</span>
                    </label>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Subscription Plan</h3>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800 font-medium">Free Plan</p>
                    <p className="text-blue-600 text-sm mt-1">Upgrade to Premium for unlimited features</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navbar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 p-6 lg:p-8 pb-20 md:pb-8 md:ml-[240px] max-w-[1600px] mx-auto">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;