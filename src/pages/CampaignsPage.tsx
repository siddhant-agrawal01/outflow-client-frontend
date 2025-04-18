/* eslint-disable @typescript-eslint/no-explicit-any */
// frontend/src/pages/CampaignsPage.tsx
import React, { useEffect, useState } from "react";
import {
  fetchCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} from "../api/campaigns";
import CampaignForm from "../components/CampaignForm";

const CampaignsPage: React.FC = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "ALL" | "ACTIVE" | "INACTIVE"
  >("ALL");

  const load = () => {
    setLoading(true);
    fetchCampaigns()
      .then(setCampaigns)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = (data: any) =>
    createCampaign(data).then(() => {
      load();
      setShowForm(false);
    });

  const handleUpdate = (data: any) =>
    updateCampaign(editing._id, data).then(() => {
      load();
      setEditing(null);
      setShowForm(false);
    });

  const handleDelete = (id: string) => deleteCampaign(id).then(() => load());

  // Filter campaigns based on search term and status
  const filteredCampaigns = campaigns.filter((c) => {
    const matchesSearch = c.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "ALL" ||
      (filterStatus === "ACTIVE" && c.status === "ACTIVE") ||
      (filterStatus === "INACTIVE" && c.status !== "ACTIVE");
    return matchesSearch && matchesStatus;
  });

  // Get campaign metrics
  const activeCampaigns = campaigns.filter((c) => c.status === "ACTIVE").length;
  const totalLeads = campaigns.reduce((sum, c) => sum + c.leads.length, 0);

  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with metrics */}
        <div className="mb-10">
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
              onClick={() => {
                setEditing(null);
                setShowForm(true);
              }}
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

          {/* Metrics cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 mr-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Total Campaigns
                  </div>
                  <div className="text-2xl font-semibold text-gray-900">
                    {campaigns.length}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 mr-4">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Active Campaigns
                  </div>
                  <div className="text-2xl font-semibold text-gray-900">
                    {activeCampaigns}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 mr-4">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Total Leads
                  </div>
                  <div className="text-2xl font-semibold text-gray-900">
                    {totalLeads}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="w-full md:w-auto mb-4 md:mb-0 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              className="w-full md:w-72 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-4">
            <select
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value as "ALL" | "ACTIVE" | "INACTIVE")
              }
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active Only</option>
              <option value="INACTIVE">Inactive Only</option>
            </select>

            <button
              onClick={() => load()}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
              title="Refresh"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Campaign form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-md mb-8 overflow-hidden border border-gray-100">
            <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
              <h2 className="text-xl font-semibold text-gray-900">
                {editing ? "Edit Campaign" : "Create New Campaign"}
              </h2>
            </div>
            <div className="p-6">
              <CampaignForm
                initialData={editing}
                onSubmit={editing ? handleUpdate : handleCreate}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        )}

        {/* Campaign list */}
        {loading && campaigns.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
            <div className="flex items-center justify-center space-x-2">
              <svg
                className="animate-spin h-8 w-8 text-blue-500"
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
              <span className="text-lg font-medium text-gray-700">
                Loading campaigns...
              </span>
            </div>
          </div>
        ) : campaigns.length === 0 ? (
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
                Create your first campaign to start reaching out to your leads
                and track your outreach efforts.
              </p>
              <button
                onClick={() => {
                  setEditing(null);
                  setShowForm(true);
                }}
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
        ) : filteredCampaigns.length === 0 ? (
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
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Campaign Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Leads
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCampaigns.map((c) => (
                    <tr key={c._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-700 font-medium text-lg">
                              {c.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {c.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {c.leads.length}{" "}
                              {c.leads.length === 1 ? "lead" : "leads"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {c.status === "ACTIVE" ? (
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-green-100 text-green-800">
                            <span className="h-2 w-2 bg-green-500 rounded-full mr-1.5 mt-1"></span>
                            Active
                          </span>
                        ) : (
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-gray-100 text-gray-800">
                            <span className="h-2 w-2 bg-gray-500 rounded-full mr-1.5 mt-1"></span>
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex -space-x-1 overflow-hidden mr-2">
                            {[...Array(Math.min(3, c.leads.length))].map(
                              (_, i) => (
                                <div
                                  key={i}
                                  className="h-6 w-6 rounded-full bg-gray-200 border border-white flex items-center justify-center text-xs text-gray-600"
                                >
                                  {i + 1}
                                </div>
                              )
                            )}
                          </div>
                          {c.leads.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{c.leads.length - 3} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => {
                            setEditing(c);
                            setShowForm(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 mr-6 focus:outline-none focus:underline inline-flex items-center"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            ></path>
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(c._id)}
                          className="text-red-600 hover:text-red-900 focus:outline-none focus:underline inline-flex items-center"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            ></path>
                          </svg>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Loading overlay */}
            {loading && campaigns.length > 0 && (
              <div className="fixed bottom-8 right-8 bg-white py-2 px-4 rounded-lg shadow-lg border border-gray-200 flex items-center z-10">
                <svg
                  className="animate-spin h-5 w-5 text-blue-600 mr-3"
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
                <span className="text-gray-700">Refreshing campaigns...</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignsPage;
