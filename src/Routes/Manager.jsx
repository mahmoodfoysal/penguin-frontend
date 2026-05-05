import React from "react";
import { useSelector } from "react-redux";
import Forbidden from "../pages/Forbidden";

const Manager = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);
  const userInfo = useSelector((state) => state.auth.userInfo);

  if (
    user?.token &&
    (role?.role_id === 200 || role?.role_id === 201 || role?.role_id === 202) &&
    userInfo.email === role?.email
  ) {
    return children;
  } else return <Forbidden></Forbidden>;
};

export default Manager;
