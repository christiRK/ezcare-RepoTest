import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [role, setRole] = useState('patient');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    if (password.length < 6) {
      setError('Mot de passe trop court (minimum 6 caractères).');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    if (!termsAccepted) {
      setError('Veuillez accepter les conditions d\'utilisation.');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { first_name: firstName, last_name: lastName, role } },
      });
      if (error) throw error;
      setSuccess('Inscription réussie ! Redirection...');
      //Renvoyer vers le bon dashboard selon le role
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'inscription');
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setError('');
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/dashboard` },
      });
      if (error) throw error;
    } catch (err: any) {
      setError('Erreur lors de l\'inscription avec Google.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow relative">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">EzCare</h1>
          <h2 className="mt-6 text-xl font-semibold">Créez votre compte</h2>
          <p className="mt-2 text-gray-600">Commencez votre parcours santé avec EzCare</p>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form onSubmit={handleSignup} className="mt-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Prénom</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Nom</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Confirmer le mot de passe</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Je suis :</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            >
              <option value="patient">Patient</option>
              <option value="medecin">Médecin</option>
            </select>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mr-2"
              />
              J'accepte les <a href="/terms" className="text-blue-500 hover:underline">Conditions</a> et la <a href="/privacy" className="text-blue-500 hover:underline">Politique de confidentialité</a>
            </label>
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400">
            Créer un compte
          </button>
        </form>

        <div className="text-center">
          <p className="text-gray-600">Ou continuez avec</p>
          <button
            onClick={handleGoogleSignUp}
            className="mt-4 w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center justify-center"
          >
            <img src="/google-icon.png" alt="Google" className="w-5 h-5 mr-2" />
            Inscription avec Google
          </button>
        </div>

        <p className="text-center mt-4">
          Déjà un compte ? <a href="/login" className="text-blue-500 hover:underline">Se connecter</a>
        </p>

        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 text-blue-500 hover:underline"
          aria-label="Retour à l'accueil"
        >
          ← Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

export default Signup;