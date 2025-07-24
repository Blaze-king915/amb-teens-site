// src/components/Dashboard.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import DashboardHome from './DashboardHome';
import BottomNav from './BottomNav';
import OnboardingTour from './OnboardingTour';

const Dashboard = ({ childPage }) => {
  const [manualStart, setManualStart] = useState(false);

  // ✅ Correct usage of childPage or fallback
  const currentPage = childPage || <DashboardHome />;

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
          {currentPage}
        </main>
        <BottomNav />
      </div>
    </div>
  );
};

export default Dashboard;
