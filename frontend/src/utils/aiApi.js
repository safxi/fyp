import { createAxiosClient } from "./axiosClient.js";

export const generateDraftApi = async (accessToken, payload) => {
  const client = createAxiosClient(accessToken);
  const res = await client.post("/ai/draft", payload);
  return res.data;
};


