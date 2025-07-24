import React from "react";
import "./Signup.css";

function SignupReview() {
  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>You're All Set!</h2>
        <p>Thank you for signing up. Please check your email for verification instructions.</p>
        <button className="next-btn">Go to Dashboard</button>
      </div>
    </div>
  );
}

export default SignupReview;
