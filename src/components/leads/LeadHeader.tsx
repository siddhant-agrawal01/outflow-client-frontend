import React from "react";

const LeadHeader: React.FC = () => {
  return (
    <div className="bg-blue-600 rounded-lg shadow-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-white">Leads Dashboard</h1>
          <p className="text-blue-100 mt-1">
            Manage and connect with your potential clients
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeadHeader;
