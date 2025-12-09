import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ redirectTo = "/login" }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to={redirectTo} replace />;
  return <Outlet />;
};

export default ProtectedRoute;
