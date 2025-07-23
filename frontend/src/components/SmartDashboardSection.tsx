import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Moon, Apple, Watch, Pill, Brain, Bell, BarChart, Trophy } from 'lucide-react';

const SmartDashboardSection: React.FC = () => {
  return (
    <section className="py-24 bg-blue-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-blue-400/10 rounded-full mix-blend-soft-light filter blur-[64px] opacity-70" />
        <div className="absolute left-0 bottom-0 w-1/3 h-1/3 bg-blue-300/10 rounded-full mix-blend-soft-light filter blur-[64px] opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            A Smart Dashboard for Smarter Living
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Your health evolves daily. EZCare evolves with it.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Interactive Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-blue-900/50 backdrop-blur-sm rounded-2xl p-6 space-y-6 border border-blue-800">
              {/* EZScore Section */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Your EZScore™</h3>
                  <p className="text-sm text-blue-200">Updated just now</p>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center"
                >
                  <span className="text-2xl font-bold text-white">87</span>
                </motion.div>
              </div>

              {/* Health Metrics Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-800/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Moon className="w-5 h-5 text-blue-300" />
                    <span className="font-medium text-white">Sleep</span>
                  </div>
                  <p className="text-2xl font-semibold text-white">7.5hrs</p>
                  <p className="text-sm text-green-400">+30min vs. yesterday</p>
                </div>
                <div className="bg-blue-800/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-5 h-5 text-blue-300" />
                    <span className="font-medium text-white">Activity</span>
                  </div>
                  <p className="text-2xl font-semibold text-white">8,432</p>
                  <p className="text-sm text-blue-200">steps today</p>
                </div>
              </div>

              {/* Connected Apps */}
              <div>
                <h4 className="text-sm font-medium text-blue-200 mb-3">Connected Apps</h4>
                <div className="flex gap-3">
                  <div className="bg-blue-800/50 rounded-full p-2">
                    <Apple className="w-6 h-6 text-blue-300" />
                  </div>
                  <div className="bg-blue-800/50 rounded-full p-2">
                    <Watch className="w-6 h-6 text-blue-300" />
                  </div>
                </div>
              </div>

              {/* Today's Recommendation */}
              <div className="bg-blue-800/50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-700/50 rounded-full p-2">
                    <Pill className="w-5 h-5 text-blue-300" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Today's Recommendation</h4>
                    <p className="text-sm text-blue-200">Add Vitamin D to your supplement stack based on your latest blood work and reduced sun exposure.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Features List */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Feature Items */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-800/50 rounded-xl flex items-center justify-center">
                  <BarChart className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Track your EZScore</h3>
                  <p className="text-blue-200">A real-time health index that combines vital signs, activity, sleep, and mood data to give you a clear picture of your well-being.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-800/50 rounded-xl flex items-center justify-center">
                  <Watch className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Sync Your Devices</h3>
                  <p className="text-blue-200">Seamlessly connect with Apple Health, Google Fit, or Garmin to import your activity and sleep data automatically.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-800/50 rounded-xl flex items-center justify-center">
                  <Pill className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Smart Supplement Suggestions</h3>
                  <p className="text-blue-200">Get personalized supplement recommendations based on your blood work, activity levels, and health goals.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-800/50 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Mental Wellness</h3>
                  <p className="text-blue-200">AI-guided breathing exercises and focus sessions tailored to your stress levels and daily routine.</p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial Card */}
            <div className="bg-blue-900/50 backdrop-blur-sm rounded-xl p-6 border border-blue-800">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150"
                  alt="User"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-white">Camille D.</h4>
                  <p className="text-sm text-blue-200">Active User</p>
                </div>
                <Trophy className="w-6 h-6 text-yellow-400 ml-auto" />
              </div>
              <p className="text-blue-100 italic">
                "EZCare replaced 3 health apps for me. I wake up and check it every morning."
              </p>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-500 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              View My Health Dashboard
              <Trophy className="w-5 h-5" />
            </motion.button>

            {/* SEO Text */}
            <p className="text-sm text-blue-300">
              With EZCare, users can monitor their wellness through the EZScore — a dynamic health score powered by AI. Daily insights help improve sleep, activity, recovery, and mental clarity. Everything is synced and personalized, making EZCare a true everyday companion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartDashboardSection;