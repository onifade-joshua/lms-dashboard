import React, { useState } from 'react';
import { FaSearch, FaDownload, FaFilter } from 'react-icons/fa';

const UserProgression: React.FC = () => {
  const initialUsers = [
    { id: 1, name: "Alice Johnson", coursesProgress: 75, hours: 120, position: "Junior Developer", department: "Engineering", avatar: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Bob Smith", coursesProgress: 60, hours: 90, position: "Intermediate Developer", department: "Engineering", avatar: "https://i.pravatar.cc/150?img=2" },
    { id: 3, name: "Charlie Lee", coursesProgress: 90, hours: 150, position: "Senior Developer", department: "Product", avatar: "https://i.pravatar.cc/150?img=3" },
    { id: 4, name: "David Miller", coursesProgress: 85, hours: 100, position: "Lead Developer", department: "Product", avatar: "https://i.pravatar.cc/150?img=4" },
    { id: 5, name: "Eva Green", coursesProgress: 40, hours: 50, position: "Junior Developer", department: "Design", avatar: "https://i.pravatar.cc/150?img=5" },
    { id: 6, name: "Frank Harris", coursesProgress: 65, hours: 110, position: "Intermediate Developer", department: "Engineering", avatar: "https://i.pravatar.cc/150?img=6" },
    { id: 7, name: "Grace Lee", coursesProgress: 80, hours: 130, position: "Senior Developer", department: "Design", avatar: "https://i.pravatar.cc/150?img=7" },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMore, setShowMore] = useState(true);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewMore = () => {
    const moreUsers = [
      { id: 8, name: "Hannah White", coursesProgress: 50, hours: 75, position: "Junior Developer", department: "Support", avatar: "https://i.pravatar.cc/150?img=8" },
      { id: 9, name: "Isaac Black", coursesProgress: 95, hours: 140, position: "Lead Developer", department: "Engineering", avatar: "https://i.pravatar.cc/150?img=9" },
      { id: 10, name: "Jackie Brown", coursesProgress: 70, hours: 105, position: "Intermediate Developer", department: "Product", avatar: "https://i.pravatar.cc/150?img=10" },
    ];
    setUsers([...users, ...moreUsers]);
    setShowMore(false);
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Position', 'Department', 'Hours', 'Course Progress'];
    const rows = users.map(user => [user.name, user.position, user.department, user.hours, `${user.coursesProgress}%`]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'user_progression.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-4 sm:p-6 mb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">User Progression Dashboard</h2>
        <button
          onClick={exportToCSV}
          className="flex items-center justify-center px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 w-full sm:w-auto"
        >
          <FaDownload className="mr-2" /> Export
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search user name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          />
          <FaSearch className="absolute top-3 left-3 text-gray-500 dark:text-gray-400" />
        </div>
        <button className="p-2 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600">
          <FaFilter />
        </button>
      </div>

      {/* User Cards */}
      <div className="max-h-[26rem] overflow-y-auto space-y-4">
        {filteredUsers.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No users found.</p>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full border-2 border-blue-500"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user.position} - {user.department}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user.hours} hours spent</p>
                </div>
              </div>

              <div className="flex flex-col w-full sm:w-auto">
                <p className="text-sm text-gray-800 dark:text-gray-100">{user.coursesProgress}% completed</p>
                <div className="w-full sm:w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${user.coursesProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* View More */}
      {showMore && (
        <div className="text-center mt-4">
          <button
            onClick={handleViewMore}
            className="text-blue-500 hover:underline dark:hover:text-blue-300"
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProgression;
