import React, { useState, useEffect } from 'react';
import { Menu, X, Stethoscope } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

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
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
    document.body.style.overflow = isMenuOpen || isLoginModalOpen ? 'hidden' : 'unset';
  }, [isMenuOpen, isLoginModalOpen]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Veuillez entrer un email et un mot de passe');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setIsLoginModalOpen(false);
      setEmail('');
      setPassword('');
    } catch (error: any) {
      setError(error.message === 'Invalid login credentials'
        ? 'Email ou mot de passe incorrect'
        : 'Erreur lors de la connexion');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          queryParams: { access_type: 'offline', prompt: 'consent' },
        },
      });
      if (error) throw error;
    } catch (error: any) {
      setError('Erreur lors de la connexion avec Google');
    }
  };

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
                <button onClick={() => setIsLoginModalOpen(true)} className="text-blue-100 hover:text-white">Connexion</button>
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
                <button onClick={() => setIsLoginModalOpen(true)} className="block text-blue-100 hover:text-white">Connexion</button>
                <a href="/signup" className="block w-full bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-400">S'inscrire</a>
              </>
            )}
          </div>
        </div>
      </div>
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Connexion</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 mb-4">
                Se connecter
              </button>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center justify-center"
              >
                <img src="/google-icon.png" alt="Google" className="w-5 h-5 mr-2" /> Connexion avec Google
              </button>
              <button type="button" onClick={() => setIsLoginModalOpen(false)} className="w-full mt-4 text-gray-600 hover:text-gray-800">
                Annuler
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;