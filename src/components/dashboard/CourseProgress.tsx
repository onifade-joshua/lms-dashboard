import React, { useRef, useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { motion, useInView } from 'framer-motion';

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const CourseProgress: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '-100px' });
  const [chartKey, setChartKey] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setChartKey(prev => prev + 1);
      setHasAnimated(true); // Only animate once
    }
  }, [isInView, hasAnimated]);

  const chartData = {
    labels: ['Web Dev', 'Cloud Dev', 'AI/ML', 'Data Science'],
    datasets: [
      {
        label: 'Course Completion (%)',
        data: [65, 40, 80, 50],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart' as const, // fixed typing issue
    },
  };

  return (
    <motion.div
      ref={ref}
      className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6 mb-10"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-xl font-semibold mb-4">Course Progress Overview</h2>

      {/* Render the chart only when it comes into view */}
      {hasAnimated && (
        <Bar key={chartKey} data={chartData} options={chartOptions} />
      )}
    </motion.div>
  );
};

export default CourseProgress;
