// src/components/ProgressBar.js
import React from 'react';
import './ProgressBar.css'; // or wherever you styled it

const ProgressBar = ({ currentStep }) => {
  const percent = Math.min((currentStep / 3) * 100, 100);

  return (
    <div className="progress-bar">
      <div
        className="progress"
        style={{ width: `${percent}%` }}
      >
        Step {currentStep} of 3
      </div>
    </div>
  );
};

export default ProgressBar;
