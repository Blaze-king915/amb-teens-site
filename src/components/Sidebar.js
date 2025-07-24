// src/components/Sidebar.js
import React from 'react';
import {
  FaTachometerAlt,
  FaBook,
  FaPuzzlePiece,
  FaMedal,
  FaCog,
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: <FaTachometerAlt />, class: 'sidebar-dashboard' },
    { name: 'Lessons', path: '/lessons', icon: <FaBook />, class: 'sidebar-lessons' },
    { name: 'Quizzes', path: '/quizzes', icon: <FaPuzzlePiece />, class: 'sidebar-quizzes' },
    { name: 'Leaderboard', path: '/leaderboard', icon: <FaMedal />, class: 'sidebar-leaderboard' },
    { name: 'Settings', path: '/settings', icon: <FaCog />, class: 'sidebar-settings' },
  ];

  return (
    <div className="hidden md:block bg-white w-64 h-screen fixed top-0 left-0 shadow-lg z-50">
      <div className="text-center py-6 font-bold text-xl border-b">AMB Teens</div>
      <ul className="p-4 space-y-2">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              to={link.path}
              className={`flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 transition ${
                location.pathname === link.path ? 'bg-blue-100 font-semibold' : ''
              } ${link.class}`} // ✅ this enables Joyride targeting
            >
              <span className="text-blue-600">{link.icon}</span>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
