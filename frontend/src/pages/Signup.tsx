import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

type role = "patient" | "medecin";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [role, setRole] = useState<role>("patient");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill out all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password too short (minimum 6 characters).");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!termsAccepted) {
      setError("Please accept the terms of use.");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            role,
          },
        },
      });
      if (error) throw error;

      const { error: errorOne } = await supabase
        .from("users")
        .upsert({ email: email, role: role })
        .select();

      if (errorOne) throw errorOne;

      setSuccess("Sign-up successful! Redirecting...");
      // Force a session update
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session) {
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        console.error("Session not available after sign-up");
        setTimeout(() => navigate("/login"), 1000); // Fallback
      }
    } catch (err: any) {
      setError(err.message || "Error during sign-up");
    } finally {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTermsAccepted(false);
      setRole("patient");
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setError("");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/dashboard` },
      });
      if (error) throw error;
    } catch (err: any) {
      setError("Error during Google sign-up.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow relative">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">EzCare</h1>
          <h2 className="mt-6 text-xl font-semibold">Create Your Account</h2>
          <p className="mt-2 text-gray-600">
            Start your health journey with EzCare
          </p>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form onSubmit={handleSignup} className="mt-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">
                First Name
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </label>
            </div>
            <div>
              <label className="block text-gray-700">
                Last Name
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-gray-700">
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </label>
          </div>

          <div>
            <label className="block text-gray-700">
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </label>
          </div>

          <div>
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">I am:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            >
              <option value="patient">Patient</option>
              <option value="medecin">Doctor</option>
            </select>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mr-2"
              />
              <span className="text-gray-700">I accept the</span>
              <a href="/terms" className="text-blue-500 hover:underline">
                Terms
              </a>
              <span className="text-gray-700">and</span>
              <a href="/privacy" className="text-blue-500 hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400"
          >
            Create Account
          </button>
        </form>

        <div className="text-center">
          <p className="text-gray-600">Or continue with</p>
          <button
            onClick={handleGoogleSignUp}
            className="mt-4 w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center justify-center"
          >
            <img src="/google-icon.png" alt="Google" className="w-5 h-5 mr-2" />
            Sign up with Google
          </button>
        </div>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>

        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 text-blue-500 hover:underline"
          aria-label="Back to home"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default Signup;
