import React, { useState } from 'react';
import { ClipboardCheck, ChevronRight } from 'lucide-react';

const HealthQuizCard = () => {
  // Mock quiz completion state (in a real app, this would come from a backend)
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizProgress, setQuizProgress] = useState(87);
  const [showQuiz, setShowQuiz] = useState(false);
  
  const startQuiz = () => {
    setShowQuiz(true);
  };
  
  const updateQuiz = () => {
    setShowQuiz(true);
  };
  
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-6 text-white shadow-lg mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 md:w-40 md:h-40 opacity-10">
        <ClipboardCheck className="w-full h-full" />
      </div>
      
      <div className="relative z-10">
        <h2 className="text-xl md:text-2xl font-bold mb-2">Quick Health Check Quiz</h2>
        
        {!quizCompleted ? (
          <>
            <p className="text-blue-100 mb-4">
              Answer a few questions to personalize your experience
            </p>
            <button 
              onClick={startQuiz}
              className="bg-white text-blue-600 hover:bg-blue-50 font-medium px-6 py-3 rounded-full inline-flex items-center transition-all shadow-md hover:shadow-lg"
            >
              Start My Health Quiz
              <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </>
        ) : (
          <>
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>Quiz Progress</span>
                <span>{quizProgress}% complete</span>
              </div>
              <div className="w-full h-2 bg-blue-400 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-500 ease-out" 
                  style={{ width: `${quizProgress}%` }}
                ></div>
              </div>
            </div>
            <button 
              onClick={updateQuiz}
              className="bg-white text-blue-600 hover:bg-blue-50 font-medium px-6 py-3 rounded-full inline-flex items-center transition-all shadow-md hover:shadow-lg"
            >
              Update My Answers
              <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </>
        )}
      </div>
      
      {showQuiz && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Health Check Quiz</h3>
            <p className="text-gray-600 mb-6">This is where the quiz questions would appear.</p>
            <button 
              onClick={() => {
                setShowQuiz(false);
                setQuizCompleted(true);
              }}
              className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Close Demo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthQuizCard;