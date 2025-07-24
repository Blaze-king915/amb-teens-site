// src/pages/LessonViewer.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// 📚 Import lesson components
import Lesson48 from './lessons/Lesson48';
// import Lesson49 from './lessons/Lesson49';
// import Lesson50 from './lessons/Lesson50';

// 🧩 Layout components
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import OnboardingTour from '../components/OnboardingTour';

// 🗺️ Map of lesson IDs to corresponding components
const lessonMap = {
  '48': <Lesson48 />,
  // '49': <Lesson49 />,
  // '50': <Lesson50 />,
};

const LessonViewer = () => {
  const { lessonId } = useParams();
  const [manualStart, setManualStart] = useState(false);

  // Convert the route param to string just in case
  const lessonComponent = lessonMap[String(lessonId)];

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 md:ml-64 bg-gray-100 min-h-screen relative">
        <Navbar
          onStartTour={() => {
            localStorage.removeItem('tourCompleted');
            setManualStart(true);
          }}
        />

        <OnboardingTour manualStart={manualStart} />

        <main className="p-4 md:p-8 pt-20 pb-24">
          {lessonComponent ? (
            lessonComponent
          ) : (
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold text-red-600">🚫 Lesson Not Found</h2>
              <p className="text-gray-700 mt-2">
                No lesson exists with ID: <strong>{lessonId}</strong>
              </p>
            </div>
          )}
        </main>

        <BottomNav />
      </div>
    </div>
  );
};

export default LessonViewer;
