import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);

  // show a simple loading placeholder while auth is initializing
  if (loading) return <div style={{padding:20}}>Loading...</div>;

  // If authenticated, render children; otherwise redirect to login
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}