// Privacy.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Privacy = () => {
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('../../public/privacy.txt')
      .then(response => response.text())
      .then(text => setContent(text))
      .catch(error => console.error('Error loading privacy policy:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Privacy Policy</h2>
        <div className="prose max-h-[70vh] overflow-y-auto text-gray-700">
          <pre className="whitespace-pre-wrap">{content}</pre>
        </div>
        <button
          onClick={() => navigate('/signup')}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400"
        >
          Back to Sign Up
        </button>
      </div>
    </div>
  );
};

export default Privacy;