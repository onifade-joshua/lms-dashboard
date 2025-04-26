import React from 'react';
import { FaBook, FaCertificate, FaClock, FaCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const KPI: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {[
        { label: "Enrolled Courses", value: "12", icon: <FaBook size={24} className="text-blue-500" /> },
        { label: "Certificates Earned", value: "5", icon: <FaCertificate size={24} className="text-green-500" /> },
        { label: "Hours Spent", value: "320", icon: <FaClock size={24} className="text-yellow-500" /> },
        { label: "Upcoming Deadlines", value: "3", icon: <FaCalendarAlt size={24} className="text-red-500" /> }
      ]
        .map((stat) => (
          <motion.div
            key={stat.label}
            className="bg-white dark:bg-gray-800 shadow rounded-2xl p-4 text-center hover:shadow-lg transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-2">
              {stat.icon}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </motion.div>
      ))}
    </div>
  );
};

export default KPI;
