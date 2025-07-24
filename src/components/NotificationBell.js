import React, { useEffect, useRef, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const bellRef = useRef(null);
  const [seen, setSeen] = useState(localStorage.getItem('seenNotification') === 'true');

  const messages = [
    localStorage.getItem('firstLogin') === 'true'
      ? '👋 Welcome! This is your first visit. Enjoy exploring!'
      : '🎉 Welcome back! Continue where you left off.',
  ];

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bellRef.current && !bellRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mark as seen when opened
  useEffect(() => {
    if (open && !seen) {
      localStorage.setItem('seenNotification', 'true');
      setSeen(true);
    }
  }, [open, seen]);

  return (
    <div className="relative" ref={bellRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative text-gray-600 hover:text-blue-600 text-2xl"
      >
        <FaBell />
        {!seen && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute top-9 right-0 w-72 bg-white shadow-xl rounded-lg border z-50"
          >
            <div className="p-3 font-semibold border-b text-gray-700">Notifications</div>
            <ul className="text-sm max-h-48 overflow-y-auto">
              {messages.map((note, i) => (
                <li
                  key={i}
                  className="p-2 hover:bg-gray-100 border-b last:border-none"
                >
                  {note}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;
