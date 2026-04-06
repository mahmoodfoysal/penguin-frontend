import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const user = useSelector((state) => state.auth.user);

  const location = useLocation();
  console.log(location);

  //   if (isLoading) {
  //     return <span className="loading loading-bars loading-xl text-center"></span>;
  //   }

  if (
    (Array.isArray(user) && user.length > 0) ||
    (userInfo && Object.keys(userInfo).length > 0)
  ) {
    return children;
  } else return <Navigate state={location?.pathname} to="/login"></Navigate>;
};

export default PrivateRoute;
