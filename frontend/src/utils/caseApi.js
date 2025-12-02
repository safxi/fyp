import { createAxiosClient } from "./axiosClient.js";

export const fetchCases = async (accessToken) => {
  const client = createAxiosClient(accessToken);
  const res = await client.get("/cases");
  return res.data;
};

export const fetchCaseById = async (accessToken, id) => {
  const client = createAxiosClient(accessToken);
  const res = await client.get(`/cases/${id}`);
  return res.data;
};

export const createCaseApi = async (accessToken, payload) => {
  const client = createAxiosClient(accessToken);
  const res = await client.post("/cases", payload);
  return res.data;
};


