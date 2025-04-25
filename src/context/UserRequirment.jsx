import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthUserContext } from "./AuthUser";

export const UserRequireAuth = ({ children }) => {
  const { user } = useContext(AuthUserContext);

  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/account/login" replace />;
  }

  return children;
};
