import React, { useState } from 'react';
import { Droplet, Activity, BedDouble, Salad } from 'lucide-react';

interface Suggestion {
  id: string;
  title: string;
  icon: React.ReactNode;
  completed: boolean;
}

const LifestyleSuggestions = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    {
      id: '1',
      title: 'Drink more water',
      icon: <Droplet className="h-6 w-6 text-blue-500" />,
      completed: false
    },
    {
      id: '2',
      title: 'Walk 5k steps today',
      icon: <Activity className="h-6 w-6 text-green-500" />,
      completed: false
    },
    {
      id: '3',
      title: 'Sleep 7–9 hours',
      icon: <BedDouble className="h-6 w-6 text-indigo-500" />,
      completed: false
    },
    {
      id: '4',
      title: 'Add greens to your lunch',
      icon: <Salad className="h-6 w-6 text-emerald-500" />,
      completed: false
    }
  ]);
  
  const toggleCompleted = (id: string) => {
    setSuggestions(prev => 
      prev.map(suggestion => 
        suggestion.id === id 
          ? { ...suggestion, completed: !suggestion.completed } 
          : suggestion
      )
    );
  };
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Lifestyle Suggestions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {suggestions.map(suggestion => (
          <div 
            key={suggestion.id}
            className={`bg-white rounded-xl p-4 border transition-all ${
              suggestion.completed 
                ? 'border-green-200 bg-green-50' 
                : 'border-gray-200 hover:border-blue-200 hover:shadow-md'
            }`}
          >
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-gray-50">
                {suggestion.icon}
              </div>
              <h3 className="ml-3 font-medium text-gray-800">{suggestion.title}</h3>
            </div>
            <button
              onClick={() => toggleCompleted(suggestion.id)}
              className={`mt-4 w-full py-2 rounded-lg font-medium transition-colors ${
                suggestion.completed
                  ? 'bg-green-100 text-green-800'
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
            >
              {suggestion.completed ? 'Completed' : 'Mark as Done'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LifestyleSuggestions;