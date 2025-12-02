import { createAxiosClient } from "./axiosClient.js";

export const fetchPendingUsers = async (accessToken) => {
  const client = createAxiosClient(accessToken);
  const res = await client.get("/users/pending");
  return res.data;
};

export const updateUserStatusApi = async (accessToken, id, status) => {
  const client = createAxiosClient(accessToken);
  const res = await client.patch(`/users/${id}/status`, { status });
  return res.data;
};


