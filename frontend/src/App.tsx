import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Main from './pages/Main';
import Login from './pages/Login';
import Signup from './pages/Signup';
import B2CDashboard from './pages/B2CDashboard';
import Quiz from './pages/Quiz';
import { supabase } from './supabaseClient';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';
import Terms from './components/Terms.jsx';
import Privacy from './components/Privacy.jsx';

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [quizDone, setQuizDone] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const fetchUserSession = async () => {
      console.log('Fetching user session...');
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error fetching session:', error.message);
          throw error;
        }
        if (isMounted) {
          const currentUser = session?.user ?? null;
          console.log('Session data:', currentUser);
          setUser(currentUser);
          setRole(currentUser?.user_metadata?.role || null);

          if (currentUser) {
            const { data: quizData, error: quizError } = await supabase
              .from('medical_profiles')
              .select('last_quiz_completed_at')
              .eq('user_id', currentUser.id)
              .single();

            if (quizError) {
              console.error('Error fetching medical profile:', quizError.message);
              setQuizDone(false);
            } else if (quizData?.last_quiz_completed_at) {
              const lastCompleted = new Date(quizData.last_quiz_completed_at);
              const now = new Date();
              const daysSince = (now.getTime() - lastCompleted.getTime()) / (1000 * 3600 * 24);
              setQuizDone(daysSince <= 14);
            } else {
              setQuizDone(false);
            }
          } else {
            setQuizDone(false);
          }
          setLoading(false);
        }
      } catch (err) {
        console.error('Error in fetchUserSession:', err);
        setLoading(false);
      }
    };

    fetchUserSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        console.log('Auth state changed:', event, session);
        if (isMounted) {
          const currentUser = session?.user ?? null;
          setUser(currentUser);
          setRole(currentUser?.user_metadata?.role || null);

          if (currentUser) {
            const { data: quizData, error: quizError } = await supabase
              .from('medical_profiles')
              .select('last_quiz_completed_at')
              .eq('user_id', currentUser.id)
              .single();

            if (quizError) {
              console.error('Error fetching medical profile:', quizError.message);
              setQuizDone(false);
            } else if (quizData?.last_quiz_completed_at) {
              const lastCompleted = new Date(quizData.last_quiz_completed_at);
              const now = new Date();
              const daysSince = (now.getTime() - lastCompleted.getTime()) / (1000 * 3600 * 24);
              setQuizDone(daysSince <= 14);
            } else {
              setQuizDone(false);
            }
          } else {
            setQuizDone(false);
          }
        }
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    console.log('Loading state is true, rendering "Chargement..."');
    return <div className="min-h-screen flex items-center justify-center text-white">Chargement...</div>;
  }

  console.log('Rendering App with user:', user, 'role:', role, 'quizDone:', quizDone);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {!['/login', '/signup'].includes(location.pathname) && <Navbar transparent={true} />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" replace /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/dashboard" replace /> : <Signup />}
          />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route
            path="/dashboard"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : !quizDone && role === 'patient' ? (
                <Navigate to="/quiz" replace />
              ) : role === 'medecin' ? (
                <div className="text-white text-center mt-20 text-2xl font-bold">
                  Bienvenue sur le dashboard médecin (à implémenter)
                </div>
              ) : (
                <B2CDashboard />
              )
            }
          />
          <Route
            path="/quiz"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <Quiz onQuizComplete={() => setQuizDone(true)} />
              )
            }
          />
        </Routes>
      </div>
      {!['/login', '/signup'].includes(location.pathname) && <Footer />}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}