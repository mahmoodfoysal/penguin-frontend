import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const PublicRoutes = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const userInfo = useSelector((state) => state.auth.userInfo);

  const isAuthenticated =
    (user && Object.keys(user).length > 0) ||
    (userInfo && Object.keys(userInfo).length > 0);

  // ✅ If logged in → redirect away from login page
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PublicRoutes;
