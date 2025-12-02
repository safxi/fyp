import { createAxiosClient } from "./axiosClient.js";

export const fetchNotifications = async (accessToken) => {
  const client = createAxiosClient(accessToken);
  const res = await client.get("/notifications");
  return res.data;
};

export const markNotificationRead = async (accessToken, id) => {
  const client = createAxiosClient(accessToken);
  const res = await client.patch(`/notifications/${id}/read`);
  return res.data;
};


