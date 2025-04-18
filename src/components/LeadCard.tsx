import React from "react";

type Props = {
  lead: {
    title: string;
    name: string;
    job_title: string;
    company: string;
    location: string;
    profile_url: string;
    profile_image_url?: string; // Optional since some leads might not have profile images
    scraped_at: string;
    summary?: string;
  };
  onMessageClick: () => void;
};

const LeadCard: React.FC<Props> = ({ lead, onMessageClick }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 mb-6 overflow-hidden">
      <div className="p-5">
        <div className="flex flex-col sm:flex-row">
          <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
            {lead.profile_image_url ? (
              <img
                src={lead.profile_image_url}
                alt={`${lead.name}'s profile`}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-100 shadow-sm"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl border-2 border-gray-100 shadow-sm">
                {lead.name.charAt(0)}
              </div>
            )}
          </div>

          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  {lead.name}
                </h2>
                <div className="text-gray-600 mb-2">
                  <span className="font-medium">
                    {lead.job_title || lead.title}
                  </span>
                  {lead.company && (
                    <span>
                      {" "}
                      @ <span className="text-blue-700">{lead.company}</span>
                    </span>
                  )}
                </div>
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>{lead.location || "Remote"}</span>
                </div>
              </div>
              <div className="mt-2 sm:mt-0">
                <span className="text-xs text-gray-500 block mb-2 sm:text-right">
                  Added: {new Date(lead.scraped_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            {lead.summary && (
              <div className="mt-2 text-sm text-gray-600 border-t border-gray-100 pt-2 line-clamp-2">
                {lead.summary.split("\n\n")[0]}
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 pt-3 border-t border-gray-100">
              <a
                className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium mb-3 sm:mb-0"
                href={lead.profile_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                </svg>
                View LinkedIn Profile
              </a>
              <button
                onClick={onMessageClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 flex items-center justify-center"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  ></path>
                </svg>
                Generate Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadCard;
