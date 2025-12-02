import axios from "axios";

const base = axios.create({
  baseURL: "/api/auth",
});

export const loginRequest = async (email, password) => {
  const res = await base.post("/login", { email, password });
  return res.data;
};

export const registerRequest = async (payload) => {
  const res = await base.post("/register", payload);
  return res.data;
};

export const getMe = async (accessToken) => {
  const res = await base.get("/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};


