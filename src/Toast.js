// Toast.js
import React from "react";
import "./Toast.css";

function Toast({ message, type }) {
  return (
    <div className={`toast-container ${type}`}>
      <span>{message}</span>
      <button onClick={() => window.location.reload()}>✖</button>
    </div>
  );
}

export default Toast;
