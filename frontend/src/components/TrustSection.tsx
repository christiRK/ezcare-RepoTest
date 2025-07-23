import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Award, CheckCircle, Server, UserCheck, FileCheck, Star, Database, Key, Cloud, Settings } from 'lucide-react';

const TrustSection: React.FC = () => {
  const radius = 120;
  const orbitingIcons = [
    { icon: Lock, color: 'bg-green-500', angle: 0 },
    { icon: Server, color: 'bg-purple-500', angle: 45 },
    { icon: UserCheck, color: 'bg-yellow-500', angle: 90 },
    { icon: FileCheck, color: 'bg-red-500', angle: 135 },
    { icon: Database, color: 'bg-blue-500', angle: 180 },
    { icon: Key, color: 'bg-indigo-500', angle: 225 },
    { icon: Cloud, color: 'bg-cyan-500', angle: 270 },
    { icon: Settings, color: 'bg-orange-500', angle: 315 }
  ];

  return (
    <section className="py-8 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-32 top-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
        <div className="absolute -right-32 bottom-0 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
            Your Health. Your Privacy. Our Responsibility.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every interaction is secured, encrypted, and backed by real medical experts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Security Animation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative lg:-mr-12 -ml-24"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Orbiting Security Icons */}
              {orbitingIcons.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.6,
                    ease: "easeOut"
                  }}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    width: '64px',
                    height: '64px'
                  }}
                >
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      x: radius * Math.cos(item.angle * (Math.PI / 180)),
                      y: radius * Math.sin(item.angle * (Math.PI / 180)),
                    }}
                    transition={{
                      rotate: {
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                      },
                      x: {
                        duration: 0,
                      },
                      y: {
                        duration: 0,
                      }
                    }}
                    className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center shadow-lg`}
                    style={{
                      transform: `translate(-50%, -50%) rotate(${-item.angle}deg)`,
                    }}
                  >
                    <item.icon className="w-8 h-8 text-white" />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Trust Content */}
          <div className="space-y-6">
            {/* Trust Points */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">HIPAA & GDPR Compliant</h3>
                  <p className="text-gray-600 text-sm">Your data is protected by the highest international security standards</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Server className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">European Data Processing</h3>
                  <p className="text-gray-600 text-sm">All data is processed on secure European servers with end-to-end encryption</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Expert Verification</h3>
                  <p className="text-gray-600 text-sm">Every health insight is verified by certified medical professionals</p>
                </div>
              </div>
            </motion.div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-200">
              <a href="https://fr.trustpilot.com/review/ezcareai.com" target="_blank" rel="noopener noreferrer" className="flex items-center bg-white px-3 py-1.5 rounded-lg shadow-sm">
                <img src="https://cdn.trustpilot.net/brand-assets/4.1.0/logo-black.svg" alt="Trustpilot" className="h-5" />
                <div className="flex ml-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-[#00B67A] fill-[#00B67A]" />
                  ))}
                </div>
                <span className="text-gray-700 text-xs ml-1.5">4.8/5</span>
              </a>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg shadow-sm">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-gray-700 text-xs">HIPAA Certified</span>
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 text-white px-6 py-3 rounded-full text-base font-semibold hover:bg-blue-700 transition-all shadow-lg"
            >
              Start now!
            </motion.button>

            {/* SEO Text */}
            <p className="text-xs text-gray-500 mt-4">
              EZCare is a fully GDPR and HIPAA-compliant AI healthcare assistant hosted in Europe, designed for security and trust. We partner with certified doctors and foundations to ensure medical precision, privacy, and ethical AI use.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;