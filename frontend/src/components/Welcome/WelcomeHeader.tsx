import React, { useState, useEffect } from 'react';

const WelcomeHeader = () => {
  const [greeting, setGreeting] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  
  // Mock user data
  const user = {
    firstName: 'Jade'
  };
  
  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
    
    // Format current date
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDate(new Date().toLocaleDateString('en-US', options));
  }, []);
  
  return (
    <div className="mb-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
        {greeting}, {user.firstName}! 👋
      </h1>
      <div className="flex flex-col md:flex-row md:items-center mt-2 text-sm">
        <p className="text-gray-600">{currentDate}</p>
        <div className="hidden md:block md:mx-2 text-gray-400">•</div>
        <p className="text-xs text-gray-500 mt-1 md:mt-0">
          HIPAA & GDPR Compliant · Secure by OpenAI API · No data shared
        </p>
      </div>
    </div>
  );
};

export default WelcomeHeader;