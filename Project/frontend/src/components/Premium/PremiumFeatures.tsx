import React from 'react';
import { Lock, Share2, UserPlus } from 'lucide-react';

const PremiumFeatures = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Get More From EZCare</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-md">
          <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Lock className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Upgrade to Premium</h3>
          <p className="text-blue-100 mb-4 text-sm">Unlock unlimited consultations and personalized health plans</p>
          <button className="bg-white text-blue-600 hover:bg-blue-50 rounded-full px-4 py-2 font-medium text-sm transition-colors w-full">
            Upgrade Now
          </button>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-amber-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Share2 className="h-6 w-6 text-amber-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Refer a Friend</h3>
          <p className="text-gray-600 mb-4 text-sm">Share EZCare and both get a free week of Premium</p>
          <button className="bg-amber-100 text-amber-600 hover:bg-amber-200 rounded-full px-4 py-2 font-medium text-sm transition-colors w-full">
            Share Link
          </button>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <UserPlus className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Book with a real doctor</h3>
          <p className="text-gray-600 mb-4 text-sm">Schedule a virtual consultation with a healthcare professional</p>
          <button className="bg-green-100 text-green-600 hover:bg-green-200 rounded-full px-4 py-2 font-medium text-sm transition-colors w-full">
            Find Doctors
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumFeatures;