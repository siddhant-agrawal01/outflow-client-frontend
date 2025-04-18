/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

type Props = {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel?: () => void;
};

const CampaignForm: React.FC<Props> = ({ initialData, onSubmit, onCancel }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [status, setStatus] = useState(initialData?.status || "ACTIVE");
  const [leads, setLeads] = useState(initialData?.leads?.join("\n") || "");
  const [accountIDs, setAccountIDs] = useState(
    initialData?.accountIDs?.join("\n") || ""
  );

  const handleSubmit = () => {
    onSubmit({
      name,
      description,
      status,
      leads: leads
        .split("\n")
        .map((s: string) => s.trim())
        .filter(Boolean),
      accountIDs: accountIDs
        .split("\n")
        .map((s: string) => s.trim())
        .filter(Boolean),
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-200">
        {initialData ? "Edit Campaign" : "Create New Campaign"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="campaign-name"
            className="block text-sm font-medium text-gray-700"
          >
            Campaign Name
          </label>
          <input
            id="campaign-name"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter campaign name"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="campaign-status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            id="campaign-status"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>

        <div className="space-y-2 col-span-1 md:col-span-2">
          <label
            htmlFor="campaign-description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="campaign-description"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the purpose of this campaign"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="campaign-leads"
            className="block text-sm font-medium text-gray-700"
          >
            Leads URLs
            <span className="block text-xs text-gray-500 mt-1">
              One URL per line
            </span>
          </label>
          <textarea
            id="campaign-leads"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={leads}
            onChange={(e) => setLeads(e.target.value)}
            placeholder="https://example.com/lead1&#10;https://example.com/lead2"
            rows={5}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="campaign-accounts"
            className="block text-sm font-medium text-gray-700"
          >
            Account IDs
            <span className="block text-xs text-gray-500 mt-1">
              One ID per line
            </span>
          </label>
          <textarea
            id="campaign-accounts"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={accountIDs}
            onChange={(e) => setAccountIDs(e.target.value)}
            placeholder="acc_123456&#10;acc_789012"
            rows={5}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-8 pt-5 border-t border-gray-200">
        {onCancel && (
          <button
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
        <button
          className="px-4 py-2 rounded-md shadow-sm bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={handleSubmit}
        >
          {initialData ? "Update Campaign" : "Create Campaign"}
        </button>
      </div>
    </div>
  );
};

export default CampaignForm;
