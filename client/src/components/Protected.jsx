import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function Protected() {
  const token = localStorage.getItem("token");
  if (token) {
    return <Outlet />;
  }
  return <Navigate to={"/user/login"} replace />;
}

export default Protected;
