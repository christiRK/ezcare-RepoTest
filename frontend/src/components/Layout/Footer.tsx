import React from 'react';
import { Shield, Lock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 md:left-[240px] bg-white border-t border-gray-100 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-center space-y-2 md:space-y-0 md:space-x-6 text-xs text-gray-500">
          <div className="flex items-center justify-center">
            <Lock size={14} className="mr-1" />
            <span>Your data is encrypted and never shared</span>
          </div>
          <div className="flex items-center justify-center">
            <Shield size={14} className="mr-1" />
            <span>Compliant with HIPAA & GDPR</span>
          </div>
          <div className="text-center">Powered securely by ChatGPT API</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;