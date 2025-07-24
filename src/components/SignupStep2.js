// src/components/Step2.js
import React, { useState } from 'react';
import '../Signup.css';
import ProgressBar from './ProgressBar';

const Step2 = ({ nextStep, prevStep, formData, setFormData }) => {
  const [errors, setErrors] = useState({});

  const handleToggle = () => {
    const newIsAMBTeen = !formData.isAMBTeen;
    setFormData({
      ...formData,
      isAMBTeen: newIsAMBTeen,
      province: '',
      area: '',
      ambChurchName: '',
    });
  };

  const validate = () => {
    const newErrors = {};

    if (formData.isAMBTeen) {
      if (!formData.ambChurchName) newErrors.ambChurchName = 'Church name is required';
    } else {
      if (!formData.province) newErrors.province = 'Province is required';
      if (!formData.area) newErrors.area = 'Area is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) nextStep();
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
        <ProgressBar currentStep={2} />
        <h2>Sign Up - Step 2</h2>

        <div className="toggle-wrapper">
          <label className="amb-toggle">
            <input
              type="checkbox"
              checked={formData.isAMBTeen}
              onChange={handleToggle}
            />
            <span className="toggle-label">Are you an AMB Teen?</span>
          </label>
        </div>

        {formData.isAMBTeen && (
          <>
            <label>Church Name</label>
            <input
              type="text"
              value={formData.ambChurchName}
              onChange={(e) => setFormData({ ...formData, ambChurchName: e.target.value })}
            />
            {errors.ambChurchName && <p className="error-msg">{errors.ambChurchName}</p>}
          </>
        )}

        {!formData.isAMBTeen && (
          <>
            <label>Province</label>
            <input
              type="text"
              value={formData.province}
              onChange={(e) => setFormData({ ...formData, province: e.target.value })}
            />
            {errors.province && <p className="error-msg">{errors.province}</p>}

            <label>Area</label>
            <input
              type="text"
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: e.target.value })}
            />
            {errors.area && <p className="error-msg">{errors.area}</p>}
          </>
        )}

        <div className="btn-group">
          <button type="button" onClick={prevStep} className="back-btn">Back</button>
          <button type="button" onClick={handleNext} className="next-btn">Next</button>
        </div>
      </form>
    </div>
  );
};

export default Step2;
