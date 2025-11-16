// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import api from "../api/api"; // <-- verify this path exists

export const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  loading: true,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);           // user data
  const [token, setToken] = useState(null);         // JWT token
  const [loading, setLoading] = useState(true);     // initial loading flag

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");
      if (savedToken) {
        setToken(savedToken);
        // attach to axios instance (if api exists)
        if (api && api.defaults) api.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
        console.log("[Auth] loaded token from localStorage");
      }
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        console.log("[Auth] loaded user from localStorage");
      }
    } catch (err) {
      console.error("[Auth] error reading localStorage:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (jwtToken, userData) => {
    try {
      setToken(jwtToken);
      setUser(userData || null);
      localStorage.setItem("token", jwtToken);
      if (userData) localStorage.setItem("user", JSON.stringify(userData));
      if (api && api.defaults) api.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
      console.log("[Auth] login saved token and user");
    } catch (err) {
      console.error("[Auth] login error:", err);
    }
  };

  const logout = () => {
    try {
      setToken(null);
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (api && api.defaults && api.defaults.headers.common) {
        delete api.defaults.headers.common["Authorization"];
      }
      console.log("[Auth] logged out");
    } catch (err) {
      console.error("[Auth] logout error:", err);
    }
  };

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}