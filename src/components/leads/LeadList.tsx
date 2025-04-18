/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import LeadCard from "../LeadCard";

type Lead = {
  title: string;
  name: string;
  job_title: string;
  company: string;
  location: string;
  profile_url: string;
  profile_image_url?: string;
  scraped_at: string;
  summary?: string;
  [key: string]: any;
};

type LeadListProps = {
  leads: Lead[];
  onGenerateMessage: (lead: Lead) => void;
};

const LeadList: React.FC<LeadListProps> = ({ leads, onGenerateMessage }) => {
  return (
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
            onMessageClick={() => onGenerateMessage(lead)}
          />
        ))}
      </div>
    </div>
  );
};

export default LeadList;
