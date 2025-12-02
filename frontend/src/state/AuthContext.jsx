import React, { createContext, useContext, useEffect, useState } from "react";
import { getMe, loginRequest, registerRequest } from "../utils/authApi.js";

const AuthContext = createContext(null);

const STORAGE_KEY = "ai_judiciary_auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setAccessToken(parsed.accessToken);
        setUser(parsed.user);
      } catch {
        // ignore
      }
    }
    setLoading(false);
  }, []);

  const saveSession = (data) => {
    setUser(data.user);
    setAccessToken(data.accessToken);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ user: data.user, accessToken: data.accessToken })
    );
  };

  const login = async (email, password) => {
    const data = await loginRequest(email, password);
    saveSession(data);
  };

  const register = async (payload) => {
    await registerRequest(payload);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const refreshProfile = async () => {
    if (!accessToken) return;
    const me = await getMe(accessToken);
    const updated = { user: me.user, accessToken };
    saveSession(updated);
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, loading, login, register, logout, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


