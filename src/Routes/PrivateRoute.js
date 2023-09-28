import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../Pages/Token";

const PrivateWrapper = () => {
  const isAuthenticated = !!getToken();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateWrapper;
