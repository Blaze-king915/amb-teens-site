import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import SignupStep1 from './components/SignupStep1';
import SignupStep2 from './components/SignupStep2';
import SignupStep3 from './components/SignupStep3';
import EmailVer from './components/EmailVer';
import Dashboard from './components/Dashboard';
import VerifyEmail from './components/VerifyEmail';
import Login from './components/Login';
import Lessons from './pages/Lessons';
import ProtectedRoute from './components/ProtectedRoute';
import Lesson48 from './pages/lessons/Lesson48';
import { AuthProvider } from './hooks/useAuth';
import { AppProvider } from './context/AppContext';
import LessonViewer from './pages/LessonViewer';


import './index.css';

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    dob: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAmbChurch: false,
    churchName: '',
    province: '',
    area: '',
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <AuthProvider>
      <AppProvider> {/* ✅ Wrap everything inside this */}
        <Router>
          <Toaster position="top-center" reverseOrder={false} />
          <Routes>
            <Route
              path="/"
              element={
                step === 1 ? (
                  <SignupStep1 nextStep={nextStep} formData={formData} setFormData={setFormData} />
                ) : step === 2 ? (
                  <SignupStep2 nextStep={nextStep} prevStep={prevStep} formData={formData} setFormData={setFormData} />
                ) : (
                  <SignupStep3 prevStep={prevStep} formData={formData} />
                )
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/lessons"
              element={
                <ProtectedRoute>
                  <Dashboard childPage={<Lessons />} />
                </ProtectedRoute>
              }
            />

            <Route
  path="/lessons/:lessonId"
  element={
    <ProtectedRoute>
      <Dashboard childPage={<LessonViewer />} />
    </ProtectedRoute>
  }
/>


            <Route path="/verify" element={<VerifyEmail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-email" element={<EmailVer />} />
          </Routes>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;



