import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ allowedRoles }) => {
  const userRole = Cookies.get("role");
  console.log(userRole);  // Debug the role value

  // if (!userRole) return <Navigate to="/main/home"/>; // Redirect to login if not authenticated

  return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;
