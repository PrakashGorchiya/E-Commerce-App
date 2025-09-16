// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Element }) => {
  const token = localStorage.getItem("token"); // Get token from localStorage

  // If the user is not authenticated, redirect to the login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the requested element (e.g., Admin)
  return <Element />;
};

export default ProtectedRoute;
