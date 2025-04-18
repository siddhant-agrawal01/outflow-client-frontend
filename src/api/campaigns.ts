/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL

export const fetchCampaigns = () =>
  axios.get(`${API_BASE}/campaigns`).then(res => res.data);

export const fetchCampaign = (id: string) =>
  axios.get(`${API_BASE}/campaigns/${id}`).then(res => res.data);

export const createCampaign = (data: any) =>
  axios.post(`${API_BASE}/campaigns`, data).then(res => res.data);

export const updateCampaign = (id: string, data: any) =>
  axios.put(`${API_BASE}/campaigns/${id}`, data).then(res => res.data);

export const deleteCampaign = (id: string) =>
  axios.delete(`${API_BASE}/campaigns/${id}`).then(res => res.data);
