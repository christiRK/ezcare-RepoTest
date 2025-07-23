import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Shield, Lock, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <img src="/src/assets/logo.svg" alt="EZCare AI" className="h-10 w-auto mb-4" />
            <p className="text-gray-600 mb-4">
              Transforming healthcare with AI to help you feel better, faster.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Products</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Symptom Checker</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Lab Analysis</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Health Tracker</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Family Plan</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">For Providers</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Health Library</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">API Documentation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Medical Disclaimer</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Contact</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} EZCare AI. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-8">
              <div className="flex items-center text-gray-500 text-sm">
                <Shield className="h-4 w-4 mr-1" /> HIPAA Compliant
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <Lock className="h-4 w-4 mr-1" /> SOC 2 Certified
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <Heart className="h-4 w-4 mr-1" /> Made with care
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;