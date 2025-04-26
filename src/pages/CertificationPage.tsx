import React, { useState, useEffect } from 'react';
import { FaDownload, FaFilter, FaSearch, FaArrowUp } from 'react-icons/fa';

const CertificationPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedCertId, setSelectedCertId] = useState<number | null>(null);
  const [showScroll, setShowScroll] = useState(false);

  const certifications = [
    {
      id: 1,
      name: "Alice Johnson",
      title: "React Fundamentals",
      date: "2024-11-10",
      status: "Completed",
      avatar: "https://i.pravatar.cc/150?img=1",
      labUrl: "https://codesandbox.io/embed/new?codemirror=1"
    },
    {
      id: 2,
      name: "Bob Smith",
      title: "Advanced C#",
      date: "2024-12-20",
      status: "In Progress",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    {
      id: 3,
      name: "Charlie Lee",
      title: "Project Management",
      date: "2023-09-15",
      status: "Expired",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    {
      id: 4,
      name: "Dana Scott",
      title: "Azure Cloud Basics",
      date: "2025-01-22",
      status: "Completed",
      avatar: "https://i.pravatar.cc/150?img=4",
      labUrl: "https://codesandbox.io/embed/new?codemirror=1"
    },
    {
      id: 5,
      name: "Dana Scott",
      title: "Azure Cloud Basics",
      date: "2025-01-22",
      status: "Completed",
      avatar: "https://i.pravatar.cc/150?img=4",
      labUrl: "https://codesandbox.io/embed/new?codemirror=1"
    },
    {
      id: 6,
      name: "Bob Smith",
      title: "Advanced C#",
      date: "2024-12-20",
      status: "In Progress",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    {
      id: 7,
      name: "Alice Johnson",
      title: "React Fundamentals",
      date: "2024-11-10",
      status: "Completed",
      avatar: "https://i.pravatar.cc/150?img=1",
      labUrl: "https://codesandbox.io/embed/new?codemirror=1"
    },
  ];

  const filteredCerts = certifications.filter(cert => {
    const matchesSearch = cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || cert.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const toggleLab = (id: number) => {
    setSelectedCertId(prev => (prev === id ? null : id));
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-900 shadow rounded-2xl p-6 mb-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Certifications</h2>
          <button className="flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            <FaDownload className="mr-2" /> Export
          </button>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search by name or certification title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            <FaSearch className="absolute top-2.5 left-3 text-gray-500 dark:text-gray-400" />
          </div>

          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-500 dark:text-gray-300" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded-lg"
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
        </div>

        {/* Certifications List */}
        <div className="space-y-4">
          {filteredCerts.map(cert => (
            <div key={cert.id} className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={cert.avatar} alt={cert.name} className="w-12 h-12 rounded-full border border-blue-500" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{cert.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{cert.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{cert.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    cert.status === 'Completed' ? 'bg-green-200 text-green-800' :
                    cert.status === 'Expired' ? 'bg-red-200 text-red-800' :
                    'bg-yellow-200 text-yellow-800'
                  }`}>
                    {cert.status}
                  </span>
                  {cert.status === 'Completed' && cert.labUrl && (
                    <button
                      onClick={() => toggleLab(cert.id)}
                      className="block mt-2 text-blue-600 hover:underline text-sm"
                    >
                      {selectedCertId === cert.id ? 'Hide Lab' : 'Launch Lab'}
                    </button>
                  )}
                </div>
              </div>

              {/* Lab View */}
              {selectedCertId === cert.id && cert.labUrl && (
                <div className="mt-4">
                  <iframe
                    src={cert.labUrl}
                    width="100%"
                    height="500"
                    className="rounded border"
                    title={`Lab for ${cert.title}`}
                    allow="fullscreen"
                  />
                </div>
              )}
            </div>
          ))}
          {filteredCerts.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400">No certifications found.</p>
          )}
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg z-50 transition"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}
    </>
  );
};

export default CertificationPage;
