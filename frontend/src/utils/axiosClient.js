import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export const createAxiosClient = (accessToken) => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
  });

  instance.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  return instance;
};


