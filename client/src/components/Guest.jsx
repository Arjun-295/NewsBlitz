import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function GuestRoutes() {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/user/news-feed" replace />;
  }
  return <Outlet />;
}

export default GuestRoutes;
