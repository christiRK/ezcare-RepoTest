import React, { useState } from 'react';
import { Moon, Shield, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

interface Tip {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const TipsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const tips: Tip[] = [
    {
      id: '1',
      title: 'Sleep Better',
      description: "Try to maintain a consistent sleep schedule, even on weekends, to regulate your body's internal clock.",
      icon: <Moon className="h-8 w-8 text-indigo-500" />,
      color: 'bg-indigo-100'
    },
    {
      id: '2',
      title: 'Boost Immunity',
      description: "Include foods rich in vitamin C and zinc in your diet, such as citrus fruits, bell peppers, and nuts.",
      icon: <Shield className="h-8 w-8 text-green-500" />,
      color: 'bg-green-100'
    },
    {
      id: '3',
      title: 'Stress Hacks',
      description: "Practice deep breathing for 5 minutes each day to activate your body's relaxation response.",
      icon: <Zap className="h-8 w-8 text-amber-500" />,
      color: 'bg-amber-100'
    }
  ];
  
  const nextSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === tips.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? tips.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Daily Health Tips</h2>
        <div className="flex space-x-2">
          <button 
            onClick={prevSlide}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Previous tip"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <button 
            onClick={nextSlide}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Next tip"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {tips.map((tip) => (
            <div 
              key={tip.id} 
              className="min-w-full p-1"
            >
              <div className={`${tip.color} rounded-2xl p-6 shadow-sm`}>
                <div className="flex items-start">
                  <div className="bg-white p-3 rounded-xl shadow-sm">
                    {tip.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-800 mb-2">{tip.title}</h3>
                    <p className="text-gray-600">{tip.description}</p>
                    <button className="mt-4 px-4 py-2 bg-white rounded-full text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors">
                      Got it!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-4 space-x-2">
          {tips.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all ${
                activeIndex === index ? 'w-6 bg-blue-500' : 'w-2 bg-gray-300'
              }`}
              aria-label={`Go to tip ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TipsCarousel;