import React from "react";
// import { FaCertificate } from "react-icons/fa";

interface Certification {
  id: number;
  name: string;
  title: string;
  date: string;
  status: string;
  avatar: string;
  labUrl?: string;
}

interface Props {
  cert: Certification;
  isExpanded: boolean;
  onToggleLab: () => void;
}

const statusStyles: Record<string, string> = {
  Completed: 'bg-green-200 text-green-800',
  "In Progress": 'bg-yellow-200 text-yellow-800',
  Expired: 'bg-red-200 text-red-800',
};

const CertificationCard: React.FC<Props> = ({ cert, isExpanded, onToggleLab }) => {
  return (
    <>
      <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow hover:shadow-md transition">
        <div className="flex items-center gap-4">
          <img src={cert.avatar} alt={cert.name} className="w-12 h-12 rounded-full border border-blue-500" />
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{cert.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{cert.title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{cert.date}</p>
          </div>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <span className={`text-xs px-2 py-1 rounded-full ${statusStyles[cert.status] || 'bg-gray-200 text-gray-800'}`}>
            {cert.status}
          </span>
          {cert.status === 'Completed' && cert.labUrl && (
            <button
              onClick={onToggleLab}
              className="text-blue-600 hover:underline text-sm mt-1"
              aria-label={`Launch lab for ${cert.title}`}
            >
              Launch Lab
            </button>
          )}
        </div>
      </div>

      {isExpanded && cert.labUrl && (
        <div className="col-span-full mt-4">
          <iframe
            src={cert.labUrl}
            width="100%"
            height="500"
            className="rounded-lg border shadow"
            title={`${cert.title} Virtual Lab`}
            allowFullScreen
          />
        </div>
      )}
    </>
  );
};

export default CertificationCard;
