import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';

interface UserProgressionProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const UserProgression: React.FC<UserProgressionProps> = ({ searchQuery, setSearchQuery }) => {
  const initialUsers = [
    { id: 1, name: "Alice Johnson", coursesProgress: 75, hours: 120, position: "Junior Developer", avatar: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Bob Smith", coursesProgress: 60, hours: 90, position: "Intermediate Developer", avatar: "https://i.pravatar.cc/150?img=2" },
    { id: 3, name: "Charlie Lee", coursesProgress: 90, hours: 150, position: "Senior Developer", avatar: "https://i.pravatar.cc/150?img=3" },
    { id: 4, name: "David Miller", coursesProgress: 85, hours: 100, position: "Lead Developer", avatar: "https://i.pravatar.cc/150?img=4" },
    { id: 5, name: "Eva Green", coursesProgress: 40, hours: 50, position: "Junior Developer", avatar: "https://i.pravatar.cc/150?img=5" },
    { id: 6, name: "Frank Harris", coursesProgress: 65, hours: 110, position: "Intermediate Developer", avatar: "https://i.pravatar.cc/150?img=6" },
    { id: 7, name: "Grace Lee", coursesProgress: 80, hours: 130, position: "Senior Developer", avatar: "https://i.pravatar.cc/150?img=7" },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [showMore, setShowMore] = useState(true);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewMore = () => {
    const moreUsers = [
      { id: 8, name: "Hannah White", coursesProgress: 50, hours: 75, position: "Junior Developer", avatar: "https://i.pravatar.cc/150?img=8" },
      { id: 9, name: "Isaac Black", coursesProgress: 95, hours: 140, position: "Lead Developer", avatar: "https://i.pravatar.cc/150?img=9" },
      { id: 10, name: "Jackie Brown", coursesProgress: 70, hours: 105, position: "Intermediate Developer", avatar: "https://i.pravatar.cc/150?img=10" },
    ];
    setUsers([...users, ...moreUsers]);
    setShowMore(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-4 sm:p-6 mb-10">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        User Course Progression
      </h2>

      {/* Search Field */}
      <div className="flex flex-col sm:flex-row items-stretch gap-2 mb-4">
        <div className="relative w-full">
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            placeholder="Search by user name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaFilter className="absolute left-3 top-3 text-gray-600 dark:text-gray-400" />
        </div>
      </div>

      {/* Users List */}
      <div className="max-h-[28rem] overflow-y-auto space-y-4">
        {filteredUsers.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No users found.</p>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <img
                  src={user.avatar}
                  alt={`${user.name}'s avatar`}
                  className="w-12 h-12 rounded-full border-2 border-blue-500"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user.position}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user.hours} hours spent</p>
                </div>
              </div>

              <div className="w-full sm:w-1/3">
                <p className="text-sm text-gray-800 dark:text-gray-100 mb-1">{user.coursesProgress}% completed</p>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
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
