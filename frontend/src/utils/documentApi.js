import { createAxiosClient } from "./axiosClient.js";

export const fetchDocumentsForCase = async (accessToken, caseId) => {
  const client = createAxiosClient(accessToken);
  const res = await client.get(`/documents/case/${caseId}`);
  return res.data;
};

export const uploadDocumentForCase = async (accessToken, caseId, category, file) => {
  const client = createAxiosClient(accessToken);
  const formData = new FormData();
  formData.append("caseId", caseId);
  formData.append("category", category);
  formData.append("file", file);
  const res = await client.post("/documents/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};


