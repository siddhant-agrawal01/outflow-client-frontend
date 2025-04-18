import React from "react";

type CampaignHeaderProps = {
  onCreateClick: () => void;
};

const CampaignHeader: React.FC<CampaignHeaderProps> = ({ onCreateClick }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Campaigns Dashboard
        </h1>
        <p className="text-gray-500">
          Manage and track your outbound campaigns
        </p>
      </div>
      <button
        onClick={onCreateClick}
        className="mt-4 md:mt-0 flex items-center justify-center px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105 shadow-md"
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
        Create Campaign
      </button>
    </div>
  );
};

export default CampaignHeader;
