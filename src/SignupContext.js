import React, { createContext, useContext, useState } from "react";

const SignupContext = createContext();

export const SignupProvider = ({ children }) => {
  const [formData, setFormData] = useState({});
  return (
    <SignupContext.Provider value={{ formData, setFormData }}>
      {children}
    </SignupContext.Provider>
  );
};

export const useSignup = () => useContext(SignupContext);
