import React from 'react';
import { Calendar, MessageSquare, TrendingUp } from 'lucide-react';

const UserProgress = () => {
  // Mock progress data (in a real app, this would come from an API)
  const progressData = {
    tipsCompleted: 3,
    consultations: 2,
    lastQuiz: '6 days ago',
  };
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">My Progress</h2>
      <div className="bg-white rounded-xl shadow-sm p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center p-3 bg-blue-50 rounded-xl">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <TrendingUp className="h-5 w-5 text-blue-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500">Tips completed today</p>
              <p className="text-lg font-semibold text-gray-800">{progressData.tipsCompleted}</p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-purple-50 rounded-xl">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <MessageSquare className="h-5 w-5 text-purple-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500">AI Doctor consulted this week</p>
              <p className="text-lg font-semibold text-gray-800">{progressData.consultations}x</p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-amber-50 rounded-xl">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Calendar className="h-5 w-5 text-amber-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500">Last health quiz</p>
              <p className="text-lg font-semibold text-gray-800">{progressData.lastQuiz}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProgress;