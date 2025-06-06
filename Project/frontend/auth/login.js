import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);

// Show error message
function showError(message) {
  const errorAlert = document.getElementById('errorAlert');
  errorAlert.textContent = message;
  errorAlert.classList.remove('hidden');
}

// Show success message
function showSuccess(message) {
  const successAlert = document.getElementById('successAlert');
  successAlert.textContent = message;
  successAlert.classList.remove('hidden');
}

// Hide all messages
function hideMessages() {
  document.getElementById('errorAlert').classList.add('hidden');
  document.getElementById('successAlert').classList.add('hidden');
}

// Handle Google Sign In
document.getElementById('googleSignIn').addEventListener('click', async () => {
  try {
    hideMessages();
    
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

    if (error) throw error;
  } catch (error) {
    showError('Error signing in with Google. Please try again.');
    console.error('Google Sign In Error:', error);
  }
});

// Handle Email/Password Sign In
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Clear any existing messages
  hideMessages();

  // Basic validation
  if (!email || !password) {
    showError('Please enter both email and password');
    return;
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    showSuccess('Login successful! Redirecting...');
    
    // Redirect to dashboard after successful login
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 1000);
  } catch (error) {
    if (error.message === 'Invalid login credentials') {
      showError('Invalid email or password. Please check your credentials.');
    } else {
      showError('An error occurred during login. Please try again.');
    }
    console.error('Login error:', error);
  }
});

// Handle Forgot Password
document.getElementById('forgotPassword').addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  
  // Clear any existing messages
  hideMessages();

  if (!email) {
    showError('Please enter your email address to reset your password');
    return;
  }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password.html`,
    });

    if (error) throw error;

    showSuccess('Password reset instructions have been sent to your email');
  } catch (error) {
    showError('Error sending password reset email. Please try again.');
    console.error('Password reset error:', error);
  }
});

// Check if user is already logged in
supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    window.location.href = '/dashboard';
  }
});

// Initialize Lucide icons when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
});