import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [checking, setChecking] = useState(true);
  const [notice, setNotice] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Reload user to get updated emailVerified status
    auth.currentUser?.reload().then(() => {
      if (auth.currentUser?.emailVerified) {
        navigate('/dashboard'); // Redirect to dashboard if verified
      } else {
        setChecking(false); // Show the verify prompt
      }
    });
  }, [navigate]);

  const resendVerification = async () => {
    try {
      await auth.currentUser.sendEmailVerification();
      setNotice('Verification email resent! Please check your inbox.');
    } catch (error) {
      setNotice('Failed to resend email. Try again later.');
    }
  };

  if (checking) {
    return <p style={{textAlign: 'center', marginTop: '3rem'}}>Checking verification status...</p>;
  }

  return (
    <div style={{
      maxWidth: 400,
      margin: '3rem auto',
      padding: '2rem',
      borderRadius: '10px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      textAlign: 'center',
    }}>
      <h2>Email Verification Required</h2>
      <p>Please verify your email by clicking the link sent to your inbox.</p>
      <p>Check your spam folder if you do not see it.</p>

      {notice && (
        <div style={{
          backgroundColor: '#4caf50',
          color: 'white',
          padding: '10px 15px',
          borderRadius: 6,
          marginBottom: '1rem',
          fontWeight: '600'
        }}>
          {notice}
        </div>
      )}

      <button
        onClick={resendVerification}
        style={{
          backgroundColor: '#26a69a',
          color: 'white',
          border: 'none',
          padding: '0.8rem 1.5rem',
          borderRadius: 8,
          cursor: 'pointer',
          fontWeight: 'bold',
          marginTop: '1rem'
        }}
      >
        Resend Verification Email
      </button>
    </div>
  );
};

export default VerifyEmail;
