import React, { useEffect, useState } from 'react';

const EnrolledCourses: React.FC = () => {
  const [courses, setCourses] = useState([
    { title: "Web Development", progress: 65, instructor: "John Doe", instructorAvatar: "https://i.pravatar.cc/150?img=1" },
    { title: "Cloud Development", progress: 40, instructor: "Jane Smith", instructorAvatar: "https://i.pravatar.cc/150?img=2" },
    { title: "AI/ML", progress: 80, instructor: "David Wilson", instructorAvatar: "https://i.pravatar.cc/150?img=3" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCourses(prevCourses =>
        prevCourses.map(course => {
          let newProgress = course.progress + Math.random() * 2;
          if (newProgress >= 100) {
            newProgress = 0; // Reset to 0 once it reaches 100
          }
          return { ...course, progress: newProgress };
        })
      );
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-10">
      {courses.map((course) => (
        <div key={course.title} className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6">
          <h3 className="text-lg font-semibold">{course.title}</h3>
          <p className="text-xs mt-2 text-gray-500 dark:text-gray-400">
            Instructor: {course.instructor}
          </p>
          <div className="flex items-center space-x-4 mt-2">
            <img
              src={course.instructorAvatar}
              alt={`${course.instructor}'s avatar`}
              className="w-10 h-10 rounded-full border-2 border-blue-500"
            />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{course.instructor}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-800 dark:text-gray-100">
              {Math.round(course.progress)}% completed
            </p>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EnrolledCourses;
