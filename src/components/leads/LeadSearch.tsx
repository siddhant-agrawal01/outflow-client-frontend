import React from "react";

type LeadSearchProps = {
  searchUrl: string;
  setSearchUrl: (url: string) => void;
  handleSearch: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
};

const LeadSearch: React.FC<LeadSearchProps> = ({
  searchUrl,
  setSearchUrl,
  handleSearch,
  onKeyPress,
}) => {
  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        value={searchUrl}
        onChange={(e) => setSearchUrl(e.target.value)}
        onKeyPress={onKeyPress}
        placeholder="https://www.linkedin.com/in/username/"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Search
      </button>
    </div>
  );
};

export default LeadSearch;
