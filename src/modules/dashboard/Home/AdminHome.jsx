import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router";

const AdminHome = () => {
  return (
    <>
      <div className="flex min-h-screen bg-base-200/30 font-body selection:bg-accent selection:text-white">
        <div className="hidden md:block">
          <SideBar />
        </div>
        <main className="w-full md:flex-grow p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminHome;
