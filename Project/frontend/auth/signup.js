import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Initialize Lucide icons
lucide.createIcons();

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Show error message
function showError(message) {
  const errorAlert = document.getElementById('errorAlert');
  errorAlert.textContent = message;
  errorAlert.classList.remove('hidden');
}

// Hide error message
function hideError() {
  const errorAlert = document.getElementById('errorAlert');
  errorAlert.classList.add('hidden');
}

// Handle Google Sign Up
document.getElementById('googleSignUp').addEventListener('click', async () => {
  try {
    hideError();
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    });

    if (error) {
      console.error('Google Sign Up Error:', error);
      throw error;
    }
  } catch (error) {
    showError('Error signing up with Google. Please try again.');
    console.error('Google Sign Up Error:', error);
  }
});

// Handle Email/Password Sign Up
document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const terms = document.getElementById('terms').checked;

  // Clear any existing errors
  hideError();

  // Validation
  if (!email || !password || !confirmPassword || !firstName || !lastName) {
    showError('Please fill in all required fields');
    return;
  }

  if (password.length < 6) {
    showError('Password must be at least 6 characters long');
    return;
  }

  if (password !== confirmPassword) {
    showError('Passwords do not match');
    return;
  }

  if (!terms) {
    showError('Please accept the Terms of Service and Privacy Policy');
    return;
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName
        }
      }
    });

    if (error) throw error;

    // Redirect to dashboard on success
    window.location.href = '/dashboard';
  } catch (error) {
    if (error.message.includes('weak_password')) {
      showError('Password is too weak. Please use at least 6 characters.');
    } else {
      showError(error.message);
    }
  }
});

// Check if user is already logged in
supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    window.location.href = '/dashboard';
  }
});