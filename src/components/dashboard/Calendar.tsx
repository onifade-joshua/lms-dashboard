import React, { useState } from 'react';
import { format } from 'date-fns';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Importing chevron icons from react-icons

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const formattedDate = format(currentDate, 'MMMM yyyy');
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1));
  };

  const handlePrevYear = () => {
    setCurrentDate(new Date(currentYear - 1, currentMonth));
  };

  const handleNextYear = () => {
    setCurrentDate(new Date(currentYear + 1, currentMonth));
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Calendar</h2>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevYear}
            className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg transition-all hover:bg-blue-700 focus:outline-none"
          >
            <FaChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handlePrevMonth}
            className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg transition-all hover:bg-blue-700 focus:outline-none"
          >
            <FaChevronLeft className="h-5 w-5" />
          </button>
        </div>

        <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{formattedDate}</p>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleNextMonth}
            className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg transition-all hover:bg-blue-700 focus:outline-none"
          >
            <FaChevronRight className="h-5 w-5" />
          </button>
          <button
            onClick={handleNextYear}
            className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg transition-all hover:bg-blue-700 focus:outline-none"
          >
            <FaChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg text-center mb-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">{daysInMonth} Days</p>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-6">
        {/* Days of the week */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-semibold text-gray-600 dark:text-gray-200">{day}</div>
        ))}

        {/* Generate days of the month */}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <div
            key={day}
            className={`text-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer transition-all hover:bg-blue-100 dark:hover:bg-blue-600 hover:text-white dark:hover:text-white ${day === new Date().getDate() && 'bg-blue-500 text-white'}`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
