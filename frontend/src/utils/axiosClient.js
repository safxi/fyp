import axios from "axios";

export const createAxiosClient = (accessToken) => {
  const instance = axios.create({
    baseURL: "/api",
  });

  instance.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  return instance;
};


