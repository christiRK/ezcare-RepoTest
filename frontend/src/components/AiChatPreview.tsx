import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, ArrowRight, Stethoscope, Cpu, Heart, Brain, Bone, Settings as Lungs, Shield, Award } from 'lucide-react';

interface ChatMessage {
  type: 'user' | 'ai';
  content: string;
  options?: string[];
}

const painCategories = [
  { name: 'Chest Pain', icon: Heart, color: 'bg-red-100 text-red-600' },
  { name: 'Headache', icon: Brain, color: 'bg-purple-100 text-purple-600' },
  { name: 'Joint Pain', icon: Bone, color: 'bg-amber-100 text-amber-600' },
  { name: 'Breathing', icon: Lungs, color: 'bg-blue-100 text-blue-600' }
];

const AiChatPreview: React.FC = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { 
      type: 'ai', 
      content: "Hello! I'm Ez, your AI Health Assistant. What type of pain are you experiencing today?",
      options: painCategories.map(cat => cat.name)
    }
  ]);
  const [messageCount, setMessageCount] = useState(0);
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleChat = async (userMessage: string) => {
    if (messageCount >= 3) return;
    
    setIsLoading(true);
    
    const messages = chatMessages.map(msg => ({
      role: msg.type === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    try {
      const response = await fetch('http://localhost:8080/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }],
          message_count: messageCount,
        })
      });
      const data = await response.json();
      
      setChatMessages([
        ...chatMessages,
        { type: 'user', content: userMessage },
        { type: 'ai', content: data.content, options: data.options }
      ]);
      setMessageCount(prev => prev + 1);
      setShowSubscribe(data.show_subscribe);
    } catch (error) {
      setChatMessages([
        ...chatMessages,
        { type: 'user', content: userMessage },
        { type: 'ai', content: "Error connecting to the server." }
      ]);
    }
    
    setIsLoading(false);
  };

  const handlePainSelection = (category: string) => {
    setSelectedCategory(category);
    handleChat(category);
  };

  const handleDurationSelection = (duration: string) => {
    handleChat(duration);
  };

  const handleFinalResponse = (response: string) => {
    handleChat(response);
  };

  const handleUserInput = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || messageCount >= 3) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    handleChat(userMessage);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-blue-950 to-blue-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-800/20 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Your Personal{' '}
            <span className="relative inline-block">
              <span className="bg-blue-400/20 backdrop-blur-sm px-4 py-1 rounded-lg text-white transform rotate-2 border border-blue-400/30">
                Health Assistant
              </span>
              <div className="absolute -inset-1 bg-blue-400/10 blur-xl"></div>
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Powered by AI
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-blue-600 p-4">
              <div className="flex items-center gap-3 mb-2">
                <Bot className="w-6 h-6 text-white" />
                <div>
                  <h3 className="text-white font-semibold">Ez - Your 24/7 Health Assistant</h3>
                  <p className="text-blue-100 text-sm">health guidance</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-blue-500/50 rounded-lg p-2 text-sm text-blue-100">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  <span>AI Powered</span>
                </div>
                <span className="mx-2">•</span>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>Doctor Certified</span>
                </div>
                <span className="mx-2">•</span>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Private & Secure</span>
                </div>
              </div>
            </div>

            <div ref={chatContainerRef} className="h-[400px] overflow-y-auto p-4 space-y-4 scroll-smooth">
              <AnimatePresence>
                {chatMessages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="max-w-[80%]">
                      <div className={`rounded-2xl px-4 py-2 ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {message.content.split('\n').map((line, i) => (
                          <p key={i} className="mb-1 last:mb-0">{line}</p>
                        ))}
                      </div>
                      {message.options && messageCount < 3 && (
                        <div className="mt-2 space-y-2">
                          {message.options.map((option, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                if (index === 0) handlePainSelection(option);
                                else if (index === 2) handleDurationSelection(option);
                                else handleFinalResponse(option);
                              }}
                              className="w-full text-left px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-sm text-gray-700"
                              disabled={isLoading}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-100 rounded-2xl px-4 py-2 flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="p-4 border-t border-gray-200">
              <AnimatePresence>
                {showSubscribe ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="bg-blue-50 rounded-xl p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Get Personalized Health Insights</h4>
                      <p className="text-sm text-blue-700 mb-4">Subscribe to unlock advanced features:</p>
                      <ul className="space-y-2 text-sm text-blue-600">
                        <li className="flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          <span>Detailed health recommendations</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Brain className="w-4 h-4" />
                          <span>AI-powered health tracking</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Stethoscope className="w-4 h-4" />
                          <span>Personalized wellness plans</span>
                        </li>
                      </ul>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-blue-600 text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                      onClick={() => alert('Subscription feature will be implemented later.')}
                    >
                      Subscribe to Continue
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleUserInput} className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={messageCount >= 3 ? "Subscribe to continue chatting..." : "Type your message..."}
                      className="flex-1 px-4 py-3 bg-gray-50 rounded-xl outline-none text-gray-600 focus:ring-2 focus:ring-blue-200"
                      disabled={messageCount >= 3 || isLoading}
                    />
                    <button
                      type="submit"
                      disabled={messageCount >= 3 || !inputValue.trim() || isLoading}
                      className={`p-3 rounded-xl transition-colors ${
                        messageCount >= 3 || !inputValue.trim() || isLoading
                          ? 'bg-gray-100 text-gray-400'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <p className="text-sm text-blue-200 text-center max-w-3xl mx-auto mt-8">
          Ez provides general health guidance based on your symptoms. For personalized recommendations, subscribe to our premium service.
        </p>
      </div>
    </section>
  );
};

export default AiChatPreview;