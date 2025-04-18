/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  fetchCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} from "../api/campaigns";
import CampaignForm from "../components/CampaignForm";
import CampaignHeader from "../components/campaigns/CampaignHeader";
import CampaignMetricsCards from "../components/campaigns/CampaignMetricsCards";
import CampaignFilters from "../components/campaigns/CampaignFilters";
import CampaignTable from "../components/campaigns/CampaignTable";
import CampaignEmptyState from "../components/campaigns/CampaignEmptyState";
import CampaignNoResults from "../components/campaigns/CampaignNoResults";
import CampaignLoading from "../components/campaigns/CampaignLoading";
import LoadingOverlay from "../components/campaigns/LoadingOverlay";
import { Campaign, FilterStatus } from "../components/campaigns/types";

const CampaignsPage: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [editing, setEditing] = useState<Campaign | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("ALL");

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
    updateCampaign(editing?._id || "", data).then(() => {
      load();
      setEditing(null);
      setShowForm(false);
    });

  const handleDelete = (id: string) => {
    // Optimistically remove the campaign from UI
    setCampaigns((prevCampaigns) =>
      prevCampaigns.filter((campaign) => campaign._id !== id)
    );

    // Then send the request to the backend
    deleteCampaign(id).catch((error) => {
      // If there's an error, revert the change and reload
      console.error("Failed to delete campaign:", error);
      load();
    });
  };

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

  const handleCreateClick = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEditClick = (campaign: Campaign) => {
    setEditing(campaign);
    setShowForm(true);
  };

  const renderContent = () => {
    if (loading && campaigns.length === 0) {
      return <CampaignLoading />;
    }

    if (campaigns.length === 0) {
      return <CampaignEmptyState onCreateClick={handleCreateClick} />;
    }

    if (filteredCampaigns.length === 0) {
      return <CampaignNoResults />;
    }

    return (
      <CampaignTable
        campaigns={filteredCampaigns}
        onEdit={handleEditClick}
        onDelete={handleDelete}
      />
    );
  };

  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header section with metrics */}
        <div className="mb-10">
          <CampaignHeader onCreateClick={handleCreateClick} />
          <CampaignMetricsCards campaigns={campaigns} />
        </div>

        {/* Search and filters */}
        <CampaignFilters
          searchTerm={searchTerm}
          filterStatus={filterStatus}
          onSearchChange={setSearchTerm}
          onFilterChange={setFilterStatus}
          onRefresh={load}
        />

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

        {/* Campaign list with conditional rendering */}
        {renderContent()}

        {/* Loading overlay when refreshing existing campaigns */}
        {loading && campaigns.length > 0 && <LoadingOverlay />}
      </div>
    </div>
  );
};

export default CampaignsPage;
