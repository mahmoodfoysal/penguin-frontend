import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";

const PublicRoutes = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const location = useLocation();

  const isAuthenticated =
    (user && Object.keys(user).length > 0) ||
    (userInfo && Object.keys(userInfo).length > 0);

  // ✅ If logged in → stay on current page or redirect to previous page
  if (isAuthenticated) {
    // Stay on the same page if they are already on it
    const from = location.state?.from?.pathname || location.pathname;
    return <Navigate to={from} replace />;
  }

  return children;
};

export default PublicRoutes;
