import React from "react";

type CampaignEmptyStateProps = {
  onCreateClick: () => void;
};

const CampaignEmptyState: React.FC<CampaignEmptyStateProps> = ({
  onCreateClick,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
      <div className="max-w-md mx-auto">
        <div className="inline-block p-4 bg-blue-50 rounded-full mb-4">
          <svg
            className="w-12 h-12 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
            ></path>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          No campaigns yet
        </h3>
        <p className="text-gray-500 mb-6">
          Create your first campaign to start reaching out to your leads and
          track your outreach efforts.
        </p>
        <button
          onClick={onCreateClick}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Create Your First Campaign
        </button>
      </div>
    </div>
  );
};

export default CampaignEmptyState;
