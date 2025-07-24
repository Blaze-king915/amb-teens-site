import React from 'react';
import { motion } from 'framer-motion';

const colorMap = {
  green: 'bg-green-100 text-green-600',
  blue: 'bg-blue-100 text-blue-600',
  purple: 'bg-purple-100 text-purple-600',
  red: 'bg-red-100 text-red-600',
  yellow: 'bg-yellow-100 text-yellow-600',
};

const StatCard = ({ title, value, icon, color = 'blue' }) => {
  const colorClass = colorMap[color] || colorMap.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 hover:shadow-xl transition"
      aria-label={`Stat card showing ${title} with value ${value}`}
      data-tour={`stat-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className={`${colorClass} p-3 rounded-full text-xl`}>
        {icon}
      </div>
      <div>
        <p className="text-sm md:text-base text-gray-500">{title}</p>
        <h3 className="text-xl md:text-2xl font-bold text-gray-800">{value}</h3>
      </div>
    </motion.div>
  );
};

export default StatCard;
