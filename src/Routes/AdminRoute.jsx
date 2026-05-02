import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import Forbidden from "../pages/Forbidden";

const AdminRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);
  const userInfo = useSelector((state) => state.auth.userInfo);

  if (user?.token && role?.admin && userInfo.email === role?.email) {
    return children;
  } else return <Forbidden></Forbidden>;
};

export default AdminRoute;
