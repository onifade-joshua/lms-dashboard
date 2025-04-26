import React, { useState } from 'react';
import { format } from 'date-fns';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Event {
  date: string;
  title: string;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({ date: '', title: '' });

  const formattedDate = format(currentDate, 'MMMM yyyy');
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handlePrevMonth = () => setCurrentDate(new Date(currentYear, currentMonth - 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentYear, currentMonth + 1));
  const handlePrevYear = () => setCurrentDate(new Date(currentYear - 1, currentMonth));
  const handleNextYear = () => setCurrentDate(new Date(currentYear + 1, currentMonth));

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEvent.title.trim() !== '') {
      setEvents([...events, { date: newEvent.date, title: newEvent.title }]);
      setNewEvent({ date: '', title: '' });
      setShowEventForm(false);
    }
  };

  const handleEventInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const getEventsForDay = (day: number) => {
    const date = `${currentYear}-${currentMonth + 1}-${day}`;
    return events.filter(event => event.date === date);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 sm:p-6 md:p-8 max-w-full mx-auto w-full">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6 text-center">
        Calendar
      </h2>

      <div className="flex flex-wrap items-center justify-between mb-4 sm:mb-6 gap-2">
        <div className="flex items-center space-x-2">
          <button onClick={handlePrevYear} className="p-2 text-sm sm:text-base bg-gray-100 dark:bg-gray-700 rounded-full">
            <FaChevronLeft />
          </button>
          <button onClick={handlePrevMonth} className="p-2 text-sm sm:text-base bg-gray-100 dark:bg-gray-700 rounded-full">
            <FaChevronLeft />
          </button>
        </div>

        <p className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 text-center flex-grow">
          {formattedDate}
        </p>

        <div className="flex items-center space-x-2">
          <button onClick={handleNextMonth} className="p-2 text-sm sm:text-base bg-gray-100 dark:bg-gray-700 rounded-full">
            <FaChevronRight />
          </button>
          <button onClick={handleNextYear} className="p-2 text-sm sm:text-base bg-gray-100 dark:bg-gray-700 rounded-full">
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg text-center mb-4 sm:mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">{daysInMonth} Days</p>
      </div>

      {showEventForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-10 px-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-sm w-full overflow-y-auto max-h-[90vh] relative">
            {/* Close Button */}
            <button
              onClick={() => setShowEventForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>

            <h3 className="text-lg font-semibold mb-4">Create Event</h3>
            <form onSubmit={handleEventSubmit}>
              <input
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleEventInputChange}
                placeholder="Event Title"
                className="border p-2 w-full mb-4 rounded"
                required
              />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
                Add Event
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <div className="grid grid-cols-7 gap-2 text-xs sm:text-sm min-w-[320px]">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center font-semibold text-gray-600 dark:text-gray-200">
              {day}
            </div>
          ))}

          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
            const isToday =
              currentDate.getMonth() === new Date().getMonth() &&
              currentDate.getFullYear() === new Date().getFullYear() &&
              day === new Date().getDate();

            return (
              <div
                key={day}
                className={`text-center min-w-[36px] p-1 sm:p-2 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer transition-all hover:bg-blue-100 dark:hover:bg-blue-600 hover:text-white ${
                  isToday ? 'bg-blue-500 text-white' : ''
                }`}
                onClick={() => {
                  setNewEvent({ date: `${currentYear}-${currentMonth + 1}-${day}`, title: '' });
                  setShowEventForm(true);
                }}
              >
                {day}
                {getEventsForDay(day).map((event, index) => (
                  <div key={index} className="text-[10px] text-gray-500 dark:text-gray-200 mt-1 truncate">
                    {event.title}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
