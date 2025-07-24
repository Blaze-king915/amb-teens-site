import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaBook,
  FaPuzzlePiece,
  FaMedal,
  FaCog,
} from 'react-icons/fa';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: <FaTachometerAlt />, label: 'Home', class: 'bottomnav-dashboard' },
    { path: '/lessons', icon: <FaBook />, label: 'Lessons', class: 'bottomnav-lessons' },
    { path: '/quizzes', icon: <FaPuzzlePiece />, label: 'Quiz', class: 'bottomnav-quizzes' },
    { path: '/leaderboard', icon: <FaMedal />, label: 'Rank', class: 'bottomnav-leaderboard' },
    { path: '/settings', icon: <FaCog />, label: 'Settings', class: 'bottomnav-settings' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t shadow-md flex justify-around py-2 z-50">
      {navItems.map((item) => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          className={`flex flex-col items-center text-xs ${item.class} ${
            location.pathname === item.path ? 'text-blue-600 font-semibold' : 'text-gray-500'
          }`}
        >
          <div className="text-lg">{item.icon}</div>
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default BottomNav;
