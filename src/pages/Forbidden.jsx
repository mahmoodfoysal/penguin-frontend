import React from "react";
import { useNavigate } from "react-router";

const Forbidden = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-base-100 text-base-content font-body flex flex-col items-center justify-center p-8 overflow-hidden relative selection:bg-accent selection:text-white">
      {/* 1. ANIMATED GRID BACKGROUND (Subtle) */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none select-none"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          运动: "20px 20px",
        }}
      ></div>

      {/* 2. SECURITY ALERT BOX */}
      <div className="relative z-10 text-center max-w-2xl flex flex-col items-center">
        {/* SHIELD ICON WITH ACCENT SHADOW */}
        <div className="mb-10 relative">
          <div className="w-24 h-24 border-4 border-base-content flex items-center justify-center bg-base-100 relative z-10 group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-10 h-10 text-base-content group-hover:text-accent transition-colors duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </div>
          {/* Brutalist Offset */}
          <div className="absolute inset-0 bg-accent translate-x-3 translate-y-3 z-0"></div>
        </div>

        {/* ERROR CODE */}
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-4 block">
          Error Code: 403 // Restricted_Area
        </span>

        {/* MAIN HEADING */}
        <h1 className="font-heading text-6xl md:text-8xl font-black uppercase  tracking-tighter leading-[0.8] mb-8">
          Access <br />
          <span className="text-accent text-outline">Denied</span>
        </h1>

        <div className="h-1 w-20 bg-base-content mb-8"></div>

        {/* DESCRIPTION */}
        <p className="text-xs md:text-sm font-bold uppercase tracking-widest opacity-40 leading-relaxed mb-12 max-w-md mx-auto">
          Your current credentials lack the necessary clearance to enter this
          sector of this route
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <button
            onClick={() => navigate(-1)}
            className="bg-base-content text-base-100 px-12 py-4 font-heading font-black uppercase tracking-[0.3em] text-[11px] hover:bg-accent transition-all group relative overflow-hidden rounded-md"
          >
            <span className="relative z-10">Go Back</span>
            <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
