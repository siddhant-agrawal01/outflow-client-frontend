import React, { useEffect, useState } from "react";
import { fetchLeads, searchLeadsByUrl, generateMessage } from "../api/lead";
import MessageModal from "../components/MessageModal";

import LeadHeader from "../components/leads/LeadHeader";
import LeadSearch from "../components/leads/LeadSearch";
import LeadInfo from "../components/leads/LeadInfo";
import LeadList from "../components/leads/LeadList";
import LoadingIndicator from "../components/leads/LoadingIndicator";
import EmptyState from "../components/leads/EmptyState";
import ErrorState from "../components/leads/ErrorState";

const LeadsPage: React.FC = () => {
  const [leads, setLeads] = useState([]);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchUrl, setSearchUrl] = useState("");

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

  useEffect(() => {
    loadLeads();
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!searchUrl.trim()) {
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

      const cleanedMessage = result
        .replace(/\*\*.*?\*\*/g, "") 
        .replace(/\*\s*(.*?)\s*\*/g, "$1") 
        .replace(/\[.*?\]/g, "") 
        .replace(/\n{3,}/g, "\n\n") 
        .replace(/\*\*/g, "") 
        .replace(/\*/g, "") 
        .replace(/Suggestions for filling in the bracketed section:.*$/s, "") 
        .replace(/Why this works:.*$/s, "") 
        .replace(/Remember to tailor.*$/s, "") 
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

  const renderContent = () => {
    if (isLoading && leads.length === 0) {
      return <LoadingIndicator />;
    }

    if (error) {
      return <ErrorState error={error} />;
    }

    if (leads.length === 0) {
      return <EmptyState />;
    }

    return <LeadList leads={leads} onGenerateMessage={handleGenerateMessage} />;
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LeadHeader />

        <LeadSearch
          searchUrl={searchUrl}
          setSearchUrl={setSearchUrl}
          handleSearch={handleSearch}
          onKeyPress={onKeyPress}
        />

        {isLoading && <p className="text-center text-gray-500">Loading…</p>}

        <LeadInfo />

        {renderContent()}

        {isLoading && leads.length > 0 && <LoadingIndicator isInline />}

        {showModal && (
          <MessageModal message={message} onClose={() => setShowModal(false)} />
        )}
      </div>
    </div>
  );
};

export default LeadsPage;
