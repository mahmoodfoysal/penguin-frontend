import React from "react";
import SideBar from "./SideBar";
import DashboardHome from "./DashboardHome";
import { Outlet } from "react-router";

const AdminHome = () => {
  return (
    <div>
      <div className="flex min-h-screen bg-base-200/30 font-body selection:bg-accent selection:text-white">
        {/* 1. SIDEBAR NAVIGATION */}
        <SideBar></SideBar>

        {/* 2. MAIN CONTENT AREA */}
        <main className="flex-grow p-6 overflow-y-auto">
          {/* <DashboardHome></DashboardHome> */}
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
};

export default AdminHome;
