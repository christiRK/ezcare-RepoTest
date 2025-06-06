import React from 'react';
import { Home, MessageSquare, Lightbulb, ClipboardCheck, User } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, onSectionChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'tips', label: 'Tips', icon: Lightbulb },
    { id: 'quiz', label: 'Quiz', icon: ClipboardCheck },
    { id: 'account', label: 'Account', icon: User },
  ];

  return (
    <>
      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50">
        <ul className="flex justify-between px-4 py-2">
          {navItems.map((item) => (
            <li key={item.id} className="text-center">
              <button
                onClick={() => onSectionChange(item.id)}
                className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
                  activeSection === item.id
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-blue-400'
                }`}
              >
                <item.icon size={20} />
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop Side Nav */}
      <nav className="hidden md:block fixed left-0 top-0 bottom-0 w-[240px] bg-white shadow-md z-50">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-blue-600 flex items-center">
              <MessageSquare className="mr-2 h-6 w-6" />
              EZCare AI
            </h2>
          </div>
          <ul className="flex-1 py-6 px-3">
            {navItems.map((item) => (
              <li key={item.id} className="mb-2">
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`flex items-center w-full p-3 rounded-xl transition-all ${
                    activeSection === item.id
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;