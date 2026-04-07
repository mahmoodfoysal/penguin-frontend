import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const user = useSelector((state) => state.auth.user);
  const isPageLoading = useSelector((state) => state.auth.isPageLoading);

  const location = useLocation();

  if (isPageLoading) {
    return (
      <span className="loading loading-bars loading-xl text-center"></span>
    );
  }
  const isLoggedIn =
    (userInfo && Object.keys(userInfo).length > 0) ||
    (user && Object.keys(user).length > 0) ||
    (Array.isArray(user) && user.length > 0);

  if (isLoggedIn) {
    return children;
  }

  return <Navigate state={{ from: location }} to="/login" replace />;
};

export default PrivateRoute;
