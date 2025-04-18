import React, { useEffect, useState } from "react";
import { fetchLeads, searchLeadsByUrl, generateMessage } from "../api/lead";
import LeadCard from "../components/LeadCard";
import MessageModal from "../components/MessageModal";

const LeadsPage: React.FC = () => {
  const [leads, setLeads] = useState([]);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchUrl, setSearchUrl] = useState("");

  useEffect(() => {
    const loadLeads = async () => {
      try {
        setIsLoading(true);
        const data = await fetchLeads();
        setLeads(data);
        setError(null);
      } catch (err) {
        setError("Failed to load leads. Please try again later.");
        console.error("Error fetching leads:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadLeads();
  }, []);
  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!searchUrl.trim()) {
        // if empty, reload all
        await loadLeads();
      } else {
        const data = await searchLeadsByUrl(searchUrl.trim());
        setLeads(data);
      }
    } catch (err) {
      console.error(err);
      setError("Search failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleGenerateMessage = async (lead: any) => {
    try {
      setIsLoading(true);
      const result = await generateMessage({
        name: lead.name,
        job_title: lead.job_title,
        company: lead.company,
        location: lead.location,
        summary: lead.summary || "",
      });

      // Clean up the message to remove instructions, asterisks, etc.
      const cleanedMessage = result
        .replace(/\*\*.*?\*\*/g, "") // Remove **Heading** sections
        .replace(/\*\s*(.*?)\s*\*/g, "$1") // Remove asterisks around text
        .replace(/\[.*?\]/g, "") // Remove bracketed instructions
        .replace(/\n{3,}/g, "\n\n") // Remove excessive newlines
        .replace(/\*\*/g, "") // Remove any remaining double asterisks
        .replace(/\*/g, "") // Remove any remaining single asterisks
        .replace(/Suggestions for filling in the bracketed section:.*$/s, "") // Remove suggestion section
        .replace(/Why this works:.*$/s, "") // Remove "Why this works" section
        .replace(/Remember to tailor.*$/s, "") // Remove "Remember to..." section
        .trim();

      setMessage(cleanedMessage);
      setShowModal(true);
    } catch (err) {
      console.error("Error generating message:", err);
      alert("Failed to generate message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        {/* Search Bar */}
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

        {/* Feedback */}
        {isLoading && <p className="text-center text-gray-500">Loading…</p>}
        {error && <p className="text-center text-red-500 mb-4">{error}</p>}
        {!isLoading && leads.length === 0 && (
          <p className="text-center text-gray-500">
            No leads found. Try a different URL.
          </p>
        )}
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
              Click on "Generate Message" to create a personalized outreach
              message for each lead.
            </div>
          </div>
        </div>

        {isLoading && leads.length === 0 ? (
          <div className="flex justify-center py-12">
            <svg
              className="animate-spin h-8 w-8 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : error ? (
          <div
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        ) : leads.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-6 rounded-lg text-center">
            <svg
              className="mx-auto h-12 w-12 text-yellow-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              ></path>
            </svg>
            <h3 className="mt-2 text-lg font-medium">No leads found</h3>
            <p className="mt-1 text-sm">
              Start by adding new leads to your dashboard.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">
                {leads.length} Leads Available
              </h2>
            
            </div>

            <div className="space-y-4">
              {leads.map((lead, index) => (
                <LeadCard
                  key={index}
                  lead={lead}
                  onMessageClick={() => handleGenerateMessage(lead)}
                />
              ))}
            </div>
          </div>
        )}

        {isLoading && leads.length > 0 && (
          <div className="fixed bottom-4 right-4 bg-white border border-gray-200 shadow-lg rounded-lg px-4 py-2 flex items-center">
            <svg
              className="animate-spin h-5 w-5 text-blue-600 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="text-gray-700">Processing...</span>
          </div>
        )}

        {showModal && (
          <MessageModal message={message} onClose={() => setShowModal(false)} />
        )}
      </div>
    </div>
  );
};

export default LeadsPage;
function loadLeads() {
  throw new Error("Function not implemented.");
}

