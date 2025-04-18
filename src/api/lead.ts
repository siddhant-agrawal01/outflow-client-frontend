import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL

export const fetchLeads = async () => {
  const res = await axios.get(`${API_BASE}/leads`);
  return res.data;
};

export const generateMessage = async (data: {
  name: string;
  job_title: string;
  company: string;
  location: string;
  summary: string;
}) => {
  const res = await axios.post(`${API_BASE}/api/personalized-message`, data);
  return res.data.message;
};

export const searchLeadsByUrl = async (url: string) => {
  const res = await axios.get(
    `${API_BASE}/leads/search?url=${encodeURIComponent(url)}`
  );
  return res.data;  // array of leads
};