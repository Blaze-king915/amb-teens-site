import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const announcements = [
  '🚨 NEW UPDATE: Check out the upgraded quiz section with smart feedback!',
  '⚠️ IMPORTANT: Lessons and quizzes from 1–47 are no longer available. Only Lessons 48 and up are still active!',
];

const flipVariants = {
  initial: { rotateY: 90, opacity: 0 },
  animate: { rotateY: 0, opacity: 1 },
  exit: { rotateY: -90, opacity: 0 },
};

const Announcement = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length);
    }, 6000); // 6 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-yellow-200 border-l-8 border-yellow-500 p-5 rounded-xl mb-6 shadow-md text-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          variants={flipVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.6 }}
          className="text-base sm:text-lg md:text-xl font-semibold text-yellow-900"
        >
          {announcements[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default Announcement;
