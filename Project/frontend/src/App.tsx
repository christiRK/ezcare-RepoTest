import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [quizDone, setQuizDone] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserSession = async () => {
      const { data } = await supabase.auth.getSession();
      const currentUser = data.session?.user ?? null;
      setUser(currentUser);
      setRole(currentUser?.user_metadata?.role || null);
      setLoading(false);
    };

    fetchUserSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        setRole(currentUser?.user_metadata?.role || null);

        if (currentUser) {
          const { data } = await supabase
            .from('medical_profiles')
            .select('last_quiz_completed_at')
            .eq('user_id', currentUser.id)
            .single();

          if (data?.last_quiz_completed_at) {
            const lastCompleted = new Date(data.last_quiz_completed_at);
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
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 flex flex-col">
        {!['/login', '/signup'].includes(window.location.pathname) && <Navbar transparent={true} />}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <Signup />} />

            <Route
              path="/dashboard"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !quizDone && role === 'patient' ? (
                  <Navigate to="/quiz" />
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
                  <Navigate to="/login" />
                ) : (
                  <Quiz onQuizComplete={() => setQuizDone(true)} />
                )
              }
            />
          </Routes>
        </div>
        {!['/login', '/signup'].includes(window.location.pathname) && <Footer />}
      </div>
    </Router>
  );
}

export default App;
