import { createAxiosClient } from "./axiosClient.js";

export const fetchHearingsCalendar = async (accessToken) => {
  const client = createAxiosClient(accessToken);
  const res = await client.get("/hearings/calendar");
  return res.data;
};


