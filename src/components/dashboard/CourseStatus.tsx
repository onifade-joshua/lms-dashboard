// components/dashboard/CourseStatus.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const CourseStatus: React.FC = () => {
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

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">Course Status</h2>
      <Pie data={pieChartData} options={{ responsive: true }} />
    </div>
  );
};

export default CourseStatus;
