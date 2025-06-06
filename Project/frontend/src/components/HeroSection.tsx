import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Star, Shield, Award } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800 flex flex-col items-center justify-center relative px-4 py-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-soft-light filter blur-xl opacity-10 animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-300 rounded-full mix-blend-soft-light filter blur-xl opacity-10 animate-pulse-slow animation-delay-2000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-5xl mx-auto relative z-10 mt-16"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          The only{' '}
          <span className="relative inline-block">
            <span className="bg-blue-400/20 backdrop-blur-sm px-4 py-1 rounded-lg text-white transform rotate-2 border border-blue-400/30">
              AI Health
            </span>
            <div className="absolute -inset-1 bg-blue-400/10 blur-xl"></div>
          </span>
          {' '}Assistant you need to{' '}
          <span className="relative inline-block">
            <span className="text-blue-300 animate-pulse-slow glow-blue">
              10x your health
            </span>
            <div className="absolute -inset-1 bg-blue-400/10 blur-xl"></div>
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
          Experience healthcare reimagined through advanced AI and medical expertise
        </p>

        <motion.button
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 text-white text-lg md:text-xl px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-blue-400 transition-all duration-300 mb-12 relative group"
        >
          <span className={`block transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
            Get Started
          </span>
          <span className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            Free Trial
          </span>
          <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg transition-opacity opacity-0 group-hover:opacity-100"></div>
        </motion.button>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-24">
          <a href="https://fr.trustpilot.com/review/ezcareai.com" target="_blank" rel="noopener noreferrer" className="flex items-center bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-300/10 hover:bg-white/10 transition-colors">
            <img src="https://cdn.trustpilot.net/brand-assets/4.1.0/logo-white.svg" alt="Trustpilot" className="h-5 mr-2" />
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-[#00B67A] fill-[#00B67A]" />
              ))}
            </div>
            <span className="text-white text-sm ml-2">4.8/5</span>
          </a>
          <div className="flex items-center bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-300/10">
            <Shield className="w-4 h-4 text-blue-300 mr-2" />
            <span className="text-white text-sm">HIPAA Compliant</span>
          </div>
          <div className="flex items-center bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-300/10">
            <Award className="w-4 h-4 text-blue-300 mr-2" />
            <span className="text-white text-sm">#1 in Digital Health</span>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 cursor-pointer"
        >
          <ChevronDown className="w-8 h-8 text-blue-300" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;