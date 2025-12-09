import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as authApi from "../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("authUser");
    return u ? JSON.parse(u) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("authToken"));
  const [loading, setLoading] = useState(false);

  const saveSession = (tokenVal, userObj) => {
    localStorage.setItem("authToken", tokenVal);
    localStorage.setItem("authUser", JSON.stringify(userObj));
    setToken(tokenVal);
    setUser(userObj);
  };

  const clearSession = useCallback(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setToken(null);
    setUser(null);
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const data = await authApi.login(credentials);
      saveSession(data.token, data.user);
      setLoading(false);
      return { ok: true, user: data.user };
    } catch (err) {
      setLoading(false);
      const message =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err.message;
      return { ok: false, error: message };
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const data = await authApi.register(payload);
      setLoading(false);
      return { ok: true, message: data.message };
    } catch (err) {
      setLoading(false);
      return { ok: false, error: err?.response?.data?.error || err.message };
    }
  };

  const logout = () => {
    clearSession();
    navigate("/login");
  };

  useEffect(() => {
    if (token && !user) clearSession();
  }, [token, user, clearSession]);

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};
