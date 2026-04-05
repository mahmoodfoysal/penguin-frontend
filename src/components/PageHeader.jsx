import React from "react";
import { Link } from "react-router";

const PageHeader = ({ pageInfo }) => {
  return (
    <div className="border-b border-black/5 bg-base-200/30">
      {/* 1. PAGE HEADER */}
      <div className="container mx-auto px-4 py-4">
        <h1 className="font-heading text-5xl font-black uppercase tracking-tighter">
          {pageInfo[2]?.first_name || ""}{" "}
          <span className="text-accent text-outline">
            {pageInfo[2]?.last_name || ""}
          </span>
        </h1>
        {pageInfo[0]?.path ? (
          <div className="flex gap-2 text-[10px] uppercase tracking-[0.2em] font-bold opacity-50 mt-4">
            <Link to={pageInfo[0]?.path}>{pageInfo[0]?.parent_route_name}</Link>
            <span>/</span>
            <span className="text-black">{pageInfo[1]?.curren_route}</span>
          </div>
        ) : (
          <div className="font-heading font-bold text-[10px] uppercase tracking-[0.3em] opacity-40 mt-2">
            {pageInfo[1]?.curren_route}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
