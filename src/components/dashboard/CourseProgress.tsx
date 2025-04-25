// components/dashboard/CourseProgress.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const CourseProgress: React.FC = () => {
  const chartData = {
    labels: ["Web Dev", "Cloud Dev", "AI/ML", "Data Science"],
    datasets: [
      {
        label: "Course Completion (%)",
        data: [65, 40, 80, 50],
        backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"],
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6 mb-10">
      <h2 className="text-xl font-semibold mb-4">Course Progress Overview</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default CourseProgress;
