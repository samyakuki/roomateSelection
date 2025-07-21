// src/components/RequireAuth.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem("token");

  // Optional: Check if token is valid JWT
  let isValid = false;
  try {
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      isValid = decoded.exp > currentTime;
    }
  } catch (e) {
    isValid = false;
  }

  return isValid ? children : <Navigate to="/login" replace />;
};

export default RequireAuth;
