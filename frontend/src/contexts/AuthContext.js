import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  const login = (tokenValue, userObj) => {
    setToken(tokenValue);
    setUser(userObj || null);
    navigate('/');
  };

  const register = (tokenValue, userObj) => {
    setToken(tokenValue);
    setUser(userObj || null);
    navigate('/');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, setToken, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}