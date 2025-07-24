import React, { useState, useEffect } from 'react';
import '../Signup.css';
import ProgressBar from './ProgressBar.js';
import { useNavigate } from 'react-router-dom';

const Step1 = ({ nextStep, formData, setFormData }) => {
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState('');
  const navigate = useNavigate();

  const checkPasswordStrength = (password) => {
    if (!password) return '';
    const strongRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    const mediumRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;

    if (strongRegex.test(password)) return 'strong';
    else if (mediumRegex.test(password)) return 'medium';
    else return 'weak';
  };

  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(formData.password));
  }, [formData.password]);

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Please select your gender';
    if (!formData.email) newErrors.email = 'Email is required';

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      nextStep();
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
        <ProgressBar currentStep={1} />

        <h2>Sign Up - Step 1</h2>

        {/* Full Name */}
        <label>Full Name</label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        />
        {errors.fullName && <p className="error-msg">{errors.fullName}</p>}

        {/* Age */}
        <label>Age</label>
        <input
          type="number"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        />
        {errors.age && <p className="error-msg">{errors.age}</p>}

        {/* DOB */}
        <label>Date of Birth</label>
        <input
          type="date"
          value={formData.dob}
          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
        />
        {errors.dob && <p className="error-msg">{errors.dob}</p>}

        {/* Gender */}
        <label>Gender</label>
        <div className="toggle-group">
          <input type="radio" id="male" name="gender" checked={formData.gender === 'Male'} onChange={() => setFormData({ ...formData, gender: 'Male' })} />
          <label htmlFor="male">Male</label>

          <input type="radio" id="female" name="gender" checked={formData.gender === 'Female'} onChange={() => setFormData({ ...formData, gender: 'Female' })} />
          <label htmlFor="female">Female</label>
        </div>
        {errors.gender && <p className="error-msg">{errors.gender}</p>}

        {/* Email */}
        <label>Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <p className="error-msg">{errors.email}</p>}

        {/* Password */}
        <label>Password</label>
        <input
          type="password"
          className={
            passwordStrength === 'strong' ? 'password-strong'
            : passwordStrength === 'medium' ? 'password-medium'
            : formData.password ? 'password-weak' : ''
          }
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        {errors.password && <p className="error-msg">{errors.password}</p>}

        {/* Confirm Password */}
        <label>Confirm Password</label>
        <input
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        />
        {errors.confirmPassword && <p className="error-msg">{errors.confirmPassword}</p>}

        <button type="button" className="next-btn" onClick={handleNext}>
          Next
        </button>

        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Already have an account?{' '}
          <span style={{ color: '#00796b', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => navigate('/login')}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Step1;
