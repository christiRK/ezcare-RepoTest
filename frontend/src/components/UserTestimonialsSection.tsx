import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Activity,
  FileText,
  Star,
  Trophy,
} from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  title: string;
  quote: string;
  image_url: string;
  feature: string;
  feature_icon: string;
  color: string;
  rating: number;
}

interface TrustBadge {
  name: string;
  image_url: string;
  description: string;
  rating: number;
}

const icons: { [key: string]: React.ReactNode } = {
  Brain: <Brain className="w-4 h-4 text-purple-600" />,
  Activity: <Activity className="w-4 h-4 text-blue-600" />,
  FileText: <FileText className="w-4 h-4 text-green-600" />,
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  title,
  quote,
  image_url,
  feature,
  feature_icon,
  color,
  rating,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={`bg-white rounded-xl p-6 shadow-lg border-t-4 ${color}`}
    >
      <div className="flex items-center gap-4 mb-4">
        <img
          src={image_url}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-gray-600">{title}</p>
        </div>
      </div>
      <p className="text-gray-700 italic mb-4">"{quote}"</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
          {icons[feature_icon]}
          <span className="text-sm text-gray-600">{feature}</span>
        </div>
        <div className="flex">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const UserTestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<TestimonialCardProps[]>([]);
  const [badges, setBadges] = useState<TrustBadge[]>([]);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${API_URL}/api/testimonials`);
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    const fetchBadges = async () => {
      try {
        const response = await fetch(`${API_URL}/api/trust-badges`);
        const data = await response.json();
        setBadges(data);
      } catch (error) {
        console.error('Error fetching badges:', error);
      }
    };

    fetchTestimonials();
    fetchBadges();
  }, []);

  return (
    <>
      <div className="relative w-full h-24 overflow-hidden bg-gradient-to-b from-white to-blue-50">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(50%_100%_at_50%_0%,rgba(56,189,248,0.13)_0%,rgba(56,189,248,0)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
        </div>
      </div>

      <section className="py-24 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-blue-100/50 rounded-full mix-blend-multiply filter blur-[64px] opacity-70" />
          <div className="absolute left-0 bottom-0 w-1/3 h-1/3 bg-purple-100/50 rounded-full mix-blend-multiply filter blur-[64px] opacity-70" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built for People. Trusted by Real Users.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From busy professionals to health-conscious students, EZCare is already changing lives worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
            {badges.map((badge, index) => (
              <div key={index} className="bg-white px-6 py-3 rounded-xl shadow-sm flex items-center gap-3">
                {badge.image_url && <img src={badge.image_url} alt={badge.name} className="h-6" />}
                {badge.rating && (
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#00B67A] fill-[#00B67A]" />
                    ))}
                  </div>
                )}
                <span className="text-gray-700">{badge.description}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all shadow-lg inline-flex items-center gap-2"
              onClick={() => window.location.href = '/success-stories'}
            >
              Read More Success Stories
              <Trophy className="w-5 h-5" />
            </motion.button>
          </div>

          <p className="text-sm text-gray-500 text-center max-w-3xl mx-auto mt-12">
            EZCare is trusted by users worldwide as a private AI health assistant. Whether you're managing stress, checking symptoms, or optimizing your performance, our users rely on certified guidance and secure technology.
          </p>
        </div>
      </section>

      <div className="relative w-full h-24 overflow-hidden bg-gradient-to-b from-white to-gray-50">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(50%_100%_at_50%_100%,rgba(56,189,248,0.13)_0%,rgba(56,189,248,0)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
        </div>
      </div>
    </>
  );
};

export default UserTestimonialsSection;
