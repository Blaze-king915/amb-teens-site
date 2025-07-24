// src/components/SignupStep3.js
import React, { useState } from 'react';
import '../Signup.css';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';


const SignupStep3 = ({ formData, prevStep }) => {
  const [errorMsg, setErrorMsg] = useState('');
  const [notice, setNotice] = useState('');
  const navigate = useNavigate();

  const checkStrength = (pwd) => {
    let strengthLevel = 0;
    if (pwd.length >= 8) strengthLevel++;
    if (/[A-Z]/.test(pwd)) strengthLevel++;
    if (/\d/.test(pwd)) strengthLevel++;
    if (/[^A-Za-z0-9]/.test(pwd)) strengthLevel++;
    if (strengthLevel <= 1) return 'weak';
    if (strengthLevel === 2) return 'medium';
    return 'strong';
  };

  const strength = checkStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setErrorMsg('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    if (strength === 'weak') {
      setErrorMsg('Password too weak');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        fullName: formData.fullName,
        age: formData.age,
        dob: formData.dob,
        gender: formData.gender,
        email: formData.email,
        isAMBTeen: formData.isAMBTeen,
        province: formData.province,
        area: formData.area,
        ambChurchName: formData.ambChurchName || '',
        uid: userCredential.user.uid,
        createdAt: new Date(),
      });

      await sendEmailVerification(userCredential.user);
      setNotice('Verification email sent! Please check your inbox.');

      setTimeout(() => {
        navigate('/verify');
      }, 3000);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setErrorMsg('This email is already registered. Please log in.');
      } else {
        setErrorMsg(error.message);
      }
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="progress-bar">
          <div className="progress" style={{ width: '100%' }}>Step 3 of 3</div>
        </div>

        <h2>Sign Up - Step 3</h2>

       {notice && (
  <div className="popup success">
    {notice}
    <span className="close" onClick={() => setNotice('')}>×</span>
    <br />
    <button onClick={() => navigate('/login')} className="next-btn" style={{ marginTop: "10px" }}>
      Go to Login
    </button>
  </div>
)}


        {errorMsg && (
          <div className="popup error">
            {errorMsg}
            <span className="close" onClick={() => setErrorMsg('')}>×</span>
          </div>
        )}

        <div className="review-section">
          <h4>Please confirm your details before submitting:</h4>
          <ul>
            <li><strong>Full Name:</strong> {formData.fullName}</li>
            <li><strong>Age:</strong> {formData.age}</li>
            <li><strong>Date of Birth:</strong> {formData.dob}</li>
            <li><strong>Gender:</strong> {formData.gender}</li>
            <li><strong>Email:</strong> {formData.email}</li>
            <li><strong>AMB Church:</strong> {formData.isAMBTeen ? 'Yes' : 'No'}</li>
            {formData.isAMBTeen && <li><strong>Church Name:</strong> {formData.ambChurchName}</li>}
            {!formData.isAMBTeen && (
              <>
                <li><strong>Province:</strong> {formData.province}</li>
                <li><strong>Area:</strong> {formData.area}</li>
              </>
            )}
            <li>
              <strong>Password Strength:</strong>{' '}
              <span style={{
                color: strength === 'strong' ? 'green' :
                       strength === 'medium' ? 'orange' : 'red',
                fontWeight: 'bold'
              }}>
                {strength.toUpperCase()}
              </span>
            </li>
          </ul>
        </div>

        <div className="btn-group">
          <button type="button" onClick={prevStep} className="back-btn">
            Back
          </button>
          <button type="submit" className="next-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
<ProgressBar currentStep={3} />
export default SignupStep3;
