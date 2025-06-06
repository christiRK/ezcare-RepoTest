import React from 'react';
import { motion } from 'framer-motion';
import { 
  Stethoscope, 
  Users, 
  FileText, 
  Brain, 
  Shield, 
  Building2, 
  ArrowRight,
  CheckCircle,
  Calendar,
  MessageSquare,
  Video,
  Database
} from 'lucide-react';

const ProfessionalSection: React.FC = () => {
  const integrations = [
    { name: 'Google Meet', icon: Video },
    { name: 'Zoom', icon: Video },
    { name: 'Calendly', icon: Calendar },
    { name: 'Slack', icon: MessageSquare },
    { name: 'EMR Systems', icon: Database }
  ];

  return (
    <>
      {/* Top Decorative Separator */}
      <div className="relative w-full h-24 overflow-hidden bg-gradient-to-b from-white to-gray-50">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(50%_100%_at_50%_0%,rgba(56,189,248,0.13)_0%,rgba(56,189,248,0)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
        </div>
      </div>

      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-blue-100/30 rounded-full mix-blend-multiply filter blur-[64px] opacity-70" />
          <div className="absolute left-0 bottom-0 w-1/3 h-1/3 bg-teal-100/30 rounded-full mix-blend-multiply filter blur-[64px] opacity-70" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful for Patients. Built for Professionals.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're a solo practitioner or a healthcare group, EZCare empowers you to deliver smarter care in less time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left side - Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Stethoscope className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Dr. Sarah's Dashboard</h3>
                    <p className="text-sm text-gray-600">General Practitioner</p>
                  </div>
                </div>
                <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">Online</span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">Today's Patients</span>
                  </div>
                  <p className="text-2xl font-semibold">12/15</p>
                  <p className="text-sm text-gray-600">3 appointments left</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">AI Insights</span>
                  </div>
                  <p className="text-2xl font-semibold">28</p>
                  <p className="text-sm text-gray-600">suggestions today</p>
                </div>
              </div>

              {/* Patient Summary */}
              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 rounded-lg p-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Next Patient Summary</h4>
                    <p className="text-sm text-gray-600 mb-2">John D., 45 - Follow-up consultation</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">Blood Test Results</span>
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">EZScore: 82</span>
                      <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">Sleep Analysis</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Integration Icons */}
              <div className="border-t border-gray-100 pt-4">
                <h4 className="text-sm font-medium text-gray-600 mb-3">Connected Services</h4>
                <div className="flex gap-3">
                  {integrations.map((integration, index) => (
                    <div key={index} className="bg-gray-100 rounded-lg p-2">
                      <integration.icon className="w-5 h-5 text-gray-600" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right side - Features */}
            <div className="space-y-8">
              {/* Feature Groups */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <Stethoscope className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Doctor Dashboard</h3>
                      <p className="text-gray-600">Complete patient overview with AI assistance</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-600">Patient summaries with AI synthesis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-600">Secure note storage & history</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-600">GPT-powered consult support</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-purple-100 p-3 rounded-xl">
                      <Building2 className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Clinic & Team Tools</h3>
                      <p className="text-gray-600">Streamlined practice management</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-600">Staff role management</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-600">Round-robin assignments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-600">EZScore-based group insights</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-teal-100 p-3 rounded-xl">
                      <Shield className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Enterprise API + Data Export</h3>
                      <p className="text-gray-600">Secure integration & compliance</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-600">Bulk report export</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-600">Connect with existing HR or EMR platforms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-600">GDPR/HIPAA-safe compliance package</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">4K+</p>
                  <p className="text-sm text-gray-600">Consultations Analyzed</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-purple-600">20+</p>
                  <p className="text-sm text-gray-600">Clinics Using EZCare</p>
                </div>
                <div className="bg-teal-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-teal-600">95%</p>
                  <p className="text-sm text-gray-600">Time Saved in Intake</p>
                </div>
              </div>

              {/* Doctor Testimonial */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=150"
                    alt="Dr. Julien R."
                    className="w-12 h-12 rounded-full object-cover border-2 border-white"
                  />
                  <div>
                    <h4 className="font-semibold">Dr. Julien R.</h4>
                    <p className="text-sm text-blue-100">General Practitioner</p>
                  </div>
                </div>
                <p className="text-blue-100 mb-4">
                  "EZCare helps me focus on the patient, not the paperwork. The AI insights are remarkably accurate and save me hours each week."
                </p>
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                Request a Demo for Your Clinic
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              {/* SEO Text */}
              <p className="text-sm text-gray-500">
                EZCare AI is designed for healthcare providers, doctors, and clinics who need fast, secure, AI-assisted care delivery. With full GDPR compliance, smart workflows, and integration-ready dashboards, EZCare is a future-ready platform for modern medical teams.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfessionalSection;