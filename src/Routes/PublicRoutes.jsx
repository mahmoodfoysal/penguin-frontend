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

  if (isAuthenticated) {
    const from = location.state?.from?.pathname || "/home";
    return <Navigate to={from} replace />;
  }

  return children;
};

export default PublicRoutes;
