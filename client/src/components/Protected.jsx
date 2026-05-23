import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const { exp } = JSON.parse(jsonPayload);
    return Date.now() >= exp * 1000;
  } catch (e) {
    return true; // Treat invalid tokens as expired
  }
};

function Protected() {
  const token = localStorage.getItem("token");

  if (token && !isTokenExpired(token)) {
    return <Outlet />;
  }

  // Clear expired/invalid token if present
  if (token) {
    localStorage.removeItem("token");
  }

  return <Navigate to={"/user/login"} replace />;
}

export default Protected;
