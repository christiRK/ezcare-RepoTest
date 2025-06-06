import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-gray-900">{question}</h3>
        {isOpen ? <ChevronUp className="h-5 w-5 text-blue-600" /> : <ChevronDown className="h-5 w-5 text-blue-600" />}
      </button>
      
      {isOpen && (
        <div className="mt-3 text-gray-600 pl-0">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FaqSection: React.FC = () => {
  const faqs = [
    {
      question: "How accurate is EZCare AI's symptom checker?",
      answer: "EZCare AI is designed to provide information that is accurate and up-to-date based on the latest medical research. Our AI system is trained on millions of medical data points and constantly updated. However, it's important to remember that even the best AI cannot replace a healthcare professional, which is why we clearly indicate when you should seek medical attention."
    },
    {
      question: "Is my health data secure and private?",
      answer: "Absolutely. We take your privacy extremely seriously. All your health data is encrypted and secured according to HIPAA standards. We never sell your personal information to third parties, and you have complete control over your data, including the right to delete it at any time."
    },
    {
      question: "Can EZCare AI help with mental health concerns?",
      answer: "Yes, EZCare AI can provide preliminary guidance for common mental health concerns such as anxiety and depression. However, for serious mental health issues, we strongly recommend consulting with a qualified mental health professional, and our system will always direct you to appropriate resources."
    },
    {
      question: "How does EZCare AI compare to just searching symptoms online?",
      answer: "Unlike random internet searches that can lead to anxiety-inducing results, EZCare AI provides personalized, evidence-based information specific to your situation. Our AI filters out unlikely conditions and provides contextual information rather than showing you worst-case scenarios that aren't relevant to your specific symptoms and health profile."
    },
    {
      question: "Can I use EZCare AI for my children or elderly parents?",
      answer: "Yes, you can create family profiles for children and elderly family members that you care for. However, please note that symptom assessment for infants under 1 year old should always be verified with a healthcare provider, and our system will emphasize this guidance."
    },
    {
      question: "Does EZCare AI replace the need to see a doctor?",
      answer: "No, EZCare AI is designed to complement, not replace, traditional healthcare. It helps you better understand your symptoms and provides guidance on whether you should seek medical attention, but it cannot diagnose conditions with absolute certainty or prescribe treatments. Always follow up with a healthcare provider for serious or persistent symptoms."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Get answers to common questions about EZCare AI
          </p>
        </div>
        
        <div className="space-y-1">
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;