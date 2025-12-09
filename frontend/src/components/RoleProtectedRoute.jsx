import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

/**
 * Usage:
 * <Route element={<RoleProtectedRoute allowedRoles={['admin']} />}>
 *    <Route path="/admin" element={<AdminPage />} />
 * </Route>
 */
const RoleProtectedRoute = ({
  allowedRoles = [],
  redirectTo = "/dashboard",
}) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role))
    return <Navigate to={redirectTo} replace />;
  return <Outlet />;
};

export default RoleProtectedRoute;