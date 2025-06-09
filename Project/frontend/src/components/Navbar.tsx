import React, { useState, useEffect } from 'react';
import { Menu, X, Stethoscope } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { Link } from 'react-router-dom'; 

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  }
);

interface NavbarProps {
  transparent?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ transparent = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsLoggedIn(true);
        setUser(session.user);
      }
    };
    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
      setUser(session?.user || null);
      if (event === 'SIGNED_IN' && session) {
        window.location.href = '/dashboard';
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
  }, [isMenuOpen]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div className={`absolute inset-x-0 top-0 h-full transition-all duration-300 ${
        isScrolled ? 'bg-blue-950/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center space-x-2">
            <Stethoscope className="w-8 h-8 text-blue-400" />
            <span className="text-xl md:text-2xl font-bold text-white">EzCare</span>
          </div>
          <div className="hidden lg:flex items-center space-x-8">
            <a href="#solutions" className="text-blue-100 hover:text-white">Solutions</a>
            <a href="#pricing" className="text-blue-100 hover:text-white">Pricing</a>
            <a href="#resources" className="text-blue-100 hover:text-white">Resources</a>
            <a href="#businesses" className="text-blue-100 hover:text-white">Professionals</a>
          </div>
          <div className="hidden lg:flex items-center space-x-6">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="text-blue-100 hover:text-white">Déconnexion</button>
            ) : (
              <>
                <a href="/login" className="text-blue-100 hover:text-white">Connexion</a>
                <a href="/signup" className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-400">S'inscrire</a>
              </>
            )}
          </div>
          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white hover:text-blue-300">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden ${
        isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`} onClick={() => setIsMenuOpen(false)} />
      <div className={`fixed top-0 right-0 w-64 h-full bg-blue-950 transform transition-transform lg:hidden ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full pt-20 pb-6 px-6">
          <div className="flex-1 space-y-4">
            <a href="#solutions" className="block text-blue-100 hover:text-white">Solutions</a>
            <a href="#pricing" className="block text-blue-100 hover:text-white">Pricing</a>
            <a href="#resources" className="block text-blue-100 hover:text-white">Resources</a>
            <a href="#businesses" className="block text-blue-100 hover:text-white">Professionals</a>
          </div>
          <div className="space-y-4 pt-6 border-t border-gray-700">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="block text-blue-100 hover:text-white">Déconnexion</button>
            ) : (
              <>
                <Link to="/login" className="text-blue-100 hover:text-white">Connexion</Link>
                <Link to="/signup" className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-400">S'inscrire</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
