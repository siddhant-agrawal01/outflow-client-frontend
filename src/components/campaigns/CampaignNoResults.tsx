import React from "react";

const CampaignNoResults: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
      <svg
        className="w-12 h-12 text-gray-400 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <h3 className="text-lg font-medium text-gray-900 mb-1">
        No matching campaigns found
      </h3>
      <p className="text-sm text-gray-500">
        Try adjusting your search or filter criteria
      </p>
    </div>
  );
};

export default CampaignNoResults;
