import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { sendEmailVerification } from "firebase/auth";
import "../Signup.css";

function EmailVer() {
  const navigate = useNavigate();
  const [notice, setNotice] = useState('');

  const checkVerification = () => {
    auth.currentUser.reload().then(() => {
      if (auth.currentUser.emailVerified) {
        navigate("/dashboard");
      } else {
        alert("Email not verified yet. Please check your inbox.");
      }
    });
  };

  const resendEmail = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
      setNotice("Verification email resent. Please check your inbox.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>📩 Verify Your Email</h2>
        <p>We've sent a verification link to your email. Click it to complete sign up.</p>
        <p><strong>Note:</strong> The link will expire in 1 hour.</p>

        {notice && (
          <div className="popup success">
            {notice}
            <span className="close" onClick={() => setNotice("")}>×</span>
          </div>
        )}

        <button className="next-btn" onClick={checkVerification}>
          ✅ I’ve Verified My Email
        </button>

        <button className="next-btn" onClick={resendEmail} style={{ marginTop: "10px", background: "#00796b" }}>
          🔄 Resend Email
        </button>
      </div>
    </div>
  );
}

export default EmailVer;
