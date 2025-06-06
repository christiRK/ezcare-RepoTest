import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Activity, Command as Human, Pill, FileText, ArrowRight } from 'lucide-react';

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}> = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-blue-900/50 backdrop-blur-sm rounded-xl p-6 border border-blue-800 hover:border-blue-600 transition-all group"
  >
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-12 h-12 bg-blue-800/50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-blue-200">{description}</p>
        <button className="mt-4 text-blue-300 hover:text-blue-200 transition-colors inline-flex items-center gap-2 group-hover:gap-3">
          Try it now <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  </motion.div>
);

const FeaturesToolkitSection: React.FC = () => {
  const features = [
    {
      icon: <MessageSquare className="w-6 h-6 text-blue-300" />,
      title: "24/7 Smart AI Doctor",
      description: "Talk with a medically-informed AI assistant trained to guide, inform, and support you — always available, always private.",
      delay: 0.1
    },
    {
      icon: <Activity className="w-6 h-6 text-purple-300" />,
      title: "Understand your symptoms instantly",
      description: "Enter symptoms and get intelligent, AI-powered suggestions with no complex forms or guesswork.",
      delay: 0.2
    },
    {
      icon: <Human className="w-6 h-6 text-green-300" />,
      title: "Pinpoint pain visually",
      description: "Tap the part of your body that hurts — EZCare will ask the right questions and guide you with precise, contextual insights.",
      delay: 0.3
    },
    {
      icon: <Pill className="w-6 h-6 text-yellow-300" />,
      title: "Boost your health, smartly",
      description: "Get AI-generated supplement stacks tailored to your symptoms, goals, and habits — no generic advice.",
      delay: 0.4
    },
    {
      icon: <FileText className="w-6 h-6 text-red-300" />,
      title: "Decode your lab tests",
      description: "Upload your lab results and get simple, clear explanations of biomarkers — no medical degree required.",
      delay: 0.5
    }
  ];

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
            AI that actually understands your body.
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            From first symptoms to smarter daily decisions — EZCare AI gives you a complete, intelligent health toolkit, tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-500 transition-all shadow-lg inline-flex items-center gap-2"
          >
            Discover what your body is trying to tell you
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>

        <p className="text-sm text-blue-300 text-center max-w-3xl mx-auto mt-12">
          EZCare's intelligent toolkit combines advanced AI with medical expertise to help you understand and improve your health. From symptom analysis to personalized recommendations, we're here to support your wellness journey.
        </p>
      </div>
    </section>
  );
};

export default FeaturesToolkitSection;