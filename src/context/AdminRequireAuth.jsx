import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const AdminRequireAuth = ({ children }) => {
  const { admin } = useContext(AuthContext);

  // If admin is not logged in, redirect to login page
  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
