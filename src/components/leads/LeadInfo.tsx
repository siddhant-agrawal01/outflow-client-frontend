import React from "react";

const LeadInfo: React.FC = () => {
  return (
    <div className="mb-6">
      <div className="bg-white rounded-md shadow-sm p-4">
        <div className="flex items-center text-gray-500 text-sm">
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            ></path>
          </svg>
          Click on "Generate Message" to create a personalized outreach message
          for each lead.
        </div>
      </div>
    </div>
  );
};

export default LeadInfo;
