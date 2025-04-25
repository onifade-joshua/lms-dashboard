import React, { useState } from 'react';
import { FaCertificate, FaDownload, FaFilter, FaSearch } from 'react-icons/fa';

const CertificationPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const certifications = [
    { id: 1, name: "Alice Johnson", title: "React Fundamentals", date: "2024-11-10", status: "Completed", avatar: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Bob Smith", title: "Advanced C#", date: "2024-12-20", status: "In Progress", avatar: "https://i.pravatar.cc/150?img=2" },
    { id: 3, name: "Charlie Lee", title: "Project Management", date: "2023-09-15", status: "Expired", avatar: "https://i.pravatar.cc/150?img=3" },
    { id: 4, name: "Dana Scott", title: "Azure Cloud Basics", date: "2025-01-22", status: "Completed", avatar: "https://i.pravatar.cc/150?img=4" },
    { id: 5, name: "Eli Chris", title: "DevOps", date: "2025-03-02", status: "In Progress", avatar: "https://i.pravatar.cc/150?img=5" },
    { id: 6, name: "Mia Ellen", title: "AI/ML", date: "2025-03-02", status: "In Progress", avatar: "https://i.pravatar.cc/150?img=5" },
  ];

  const filteredCerts = certifications.filter(cert => {
    const matchesSearch = cert.name.toLowerCase().includes(searchQuery.toLowerCase()) || cert.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || cert.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6 mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Certifications</h2>
        <button className="flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
          <FaDownload className="mr-2" /> Export
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search by name or certification title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          <FaSearch className="absolute top-2.5 left-3 text-gray-500 dark:text-gray-400" />
        </div>

        <div className="flex items-center gap-2">
          <FaFilter className="text-gray-500 dark:text-gray-300" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded-lg"
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Expired">Expired</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCerts.map(cert => (
          <div key={cert.id} className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow hover:shadow-md transition">
            <div className="flex items-center gap-4">
              <img src={cert.avatar} alt={cert.name} className="w-12 h-12 rounded-full border border-blue-500" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{cert.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{cert.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{cert.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded-full ${cert.status === 'Completed' ? 'bg-green-200 text-green-800' : cert.status === 'Expired' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'}`}>
                {cert.status}
              </span>
              {cert.status === 'Completed' && (
                <button className="text-blue-500 hover:text-blue-700">
                  <FaCertificate />
                </button>
              )}
            </div>
          </div>
        ))}
        {filteredCerts.length === 0 && (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400">No certifications found.</p>
        )}
      </div>
    </div>
  );
};

export default CertificationPage;