import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import Forbidden from "../pages/Forbidden";

const AdminRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);

  const location = useLocation();
  console.log(location);

  const hasUser = user && Object.keys(user).length > 0;
  const isAdmin = role && Object.keys(role).length > 0;

  if (hasUser && isAdmin) {
    return children;
  } else return <Forbidden></Forbidden>;
};

export default AdminRoute;
