import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

const PricingSection: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  
  const plans = [
    {
      name: "Basic",
      description: "Essential health insights for individuals",
      price: isAnnual ? 9.99 : 14.99,
      period: isAnnual ? "/month, billed annually" : "/month",
      features: [
        "Symptom checker",
        "Basic health insights",
        "Medical term explanations",
        "Health journal",
        "Limited consults",
        "Email support"
      ],
      notIncluded: [
        "Lab result analysis",
        "Personalized health plans",
        "Doctor consultations",
        "Family accounts",
        "Priority support"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Plus",
      description: "Comprehensive health management for families",
      price: isAnnual ? 19.99 : 29.99,
      period: isAnnual ? "/month, billed annually" : "/month",
      features: [
        "Everything in Basic",
        "Unlimited symptom checks",
        "Lab result analysis",
        "Personalized health plans",
        "Up to 3 family members",
        "Priority support",
        "Chat consultations"
      ],
      notIncluded: [
        "Video consultations with specialists",
        "Medication analysis",
        "Health trends & analytics",
      ],
      cta: "Get Plus",
      popular: true
    },
    {
      name: "Premium",
      description: "Complete healthcare solution with specialist access",
      price: isAnnual ? 49.99 : 69.99,
      period: isAnnual ? "/month, billed annually" : "/month",
      features: [
        "Everything in Plus",
        "Up to 6 family members",
        "Video consultations",
        "Specialist referrals",
        "Comprehensive health analytics",
        "Medication analysis & reminders",
        "24/7 priority support",
        "Concierge health service"
      ],
      notIncluded: [],
      cta: "Get Premium",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that works for you
          </p>
          
          <div className="flex items-center justify-center mt-8">
            <span className={`mr-3 ${isAnnual ? 'font-semibold text-blue-600' : 'text-gray-500'}`}>Annual (Save 20%)</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isAnnual ? 'bg-blue-600' : 'bg-gray-300'}`}
            >
              <span 
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-1'}`} 
              />
            </button>
            <span className={`ml-3 ${!isAnnual ? 'font-semibold text-blue-600' : 'text-gray-500'}`}>Monthly</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative rounded-2xl shadow-lg overflow-hidden card-hover transition-all ${plan.popular ? 'border-2 border-blue-600 transform md:-translate-y-4' : 'border border-gray-200'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
                  <span className="text-gray-500 ml-2">{plan.period}</span>
                </div>
                
                <button className={`w-full py-3 px-6 rounded-lg font-semibold mb-8 transition-colors ${plan.popular ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}>
                  {plan.cta}
                </button>
                
                <div className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.notIncluded.map((feature, i) => (
                    <div key={i} className="flex items-center text-gray-400">
                      <X className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center bg-gray-50 p-8 rounded-xl shadow-sm">
          <h3 className="text-2xl font-semibold mb-4">Enterprise Solutions</h3>
          <p className="text-gray-600 mb-6">Custom plans for healthcare providers, employers, and insurance companies.</p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;