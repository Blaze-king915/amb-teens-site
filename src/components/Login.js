import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../Signup.css'; // Reuse same styles

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showVerifyMsg, setShowVerifyMsg] = useState(false);
  const [sendingVerification, setSendingVerification] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setShowVerifyMsg(false);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.emailVerified) {
  // ✅ Trigger onboarding tour
  localStorage.setItem('justLoggedIn', 'true');

  // ✅ Go to dashboard
  navigate('/dashboard');


      } else {
        // Email NOT verified - show message + resend button
        setShowVerifyMsg(true);
        // Optionally sign out user so they can't stay logged in
        await auth.signOut();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleResendVerification = async () => {
    setSendingVerification(true);
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
      } else {
        // If no currentUser, sign them in temporarily to send email
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        await auth.signOut();
      }
      alert('Verification email sent! Please check your inbox.');
    } catch (err) {
      alert('Error sending verification email: ' + err.message);
    }
    setSendingVerification(false);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <label>Email:</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>

      {error && <p className="error-msg">{error}</p>}

      {showVerifyMsg && (
        <div className="verify-message">
          <p>Please verify your email before continuing.</p>
          <button onClick={handleResendVerification} disabled={sendingVerification}>
            {sendingVerification ? 'Sending...' : 'Resend Verification Email'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
