import React, { useEffect, useState } from 'react';
import { FaBook, FaPuzzlePiece, FaMedal } from 'react-icons/fa';
import StatCard from './StatCard';
import { auth } from '../firebase';
import Announcement from './Announcement';
import OnboardingTour from './OnboardingTour'; // ✅ Use this instead of TutorialTip

const DashboardHome = () => {
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    const user = auth.currentUser;
    if (user?.displayName) {
      setUserName(user.displayName);
    } else if (user?.email) {
      setUserName(user.email.split('@')[0]);
    }
  }, []);

  const stats = [
    {
      title: 'Lessons Completed',
      value: '5',
      icon: <FaBook />,
      color: 'green',
    },
    {
      title: 'Quiz Score',
      value: '87%',
      icon: <FaPuzzlePiece />,
      color: 'blue',
    },
    {
      title: 'Rank',
      value: '#4',
      icon: <FaMedal />,
      color: 'purple',
    },
  ];

  const recentActivities = [
    {
      type: 'Lesson',
      title: 'Lesson 52 - Incomplete',
      date: 'Last visited: 2 days ago',
    },
    {
      type: 'Quiz',
      title: 'Quiz 50 - Completed (87%)',
      date: 'Last taken: 1 day ago',
    },
  ];

  return (
    <div className="pt-24 px-4 md:px-8">
      {/* 🎯 Guided Onboarding Tour */}
      <OnboardingTour />

      {/* 📢 Announcement (with Joyride target class) */}
      <div className="mb-6 announcement-box">
        <Announcement />
      </div>

      {/* 👋 Welcome */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Welcome back, {userName}! 👋
      </h1>

      {/* 📊 Stats (with first stat targeted) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div key={stat.title} className={index === 0 ? 'stat-card' : ''}>
            <StatCard
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          </div>
        ))}
      </div>

      {/* 🕓 Recent Activity */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Your Recent Activity
        </h2>

        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <p className="text-gray-800 font-medium">📘 {activity.title}</p>
              <p className="text-sm text-gray-500">{activity.date}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardHome;
