import React, { useRef, useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { motion, useInView } from 'framer-motion';

ChartJS.register(ArcElement, Tooltip, Legend);

const CourseStatus: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '-100px' });
  const [chartKey, setChartKey] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setChartKey(prev => prev + 1);
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const pieChartData = {
    labels: ["Completed", "In Progress", "Not Started"],
    datasets: [
      {
        data: [40, 30, 30],
        backgroundColor: ["#34D399", "#FBBF24", "#F87171"],
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
      easing: 'easeOutQuart' as const, // 👉 fix here with 'as const'
    },
  };

  return (
    <motion.div
      ref={ref}
      className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-xl font-semibold mb-4">Course Status</h2>

      {/* Render chart only after it scrolls into view */}
      {hasAnimated && (
        <Pie key={chartKey} data={pieChartData} options={pieChartOptions} />
      )}
    </motion.div>
  );
};

export default CourseStatus;
