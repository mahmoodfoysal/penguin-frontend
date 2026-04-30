import React from "react";
import { Link, useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };
  return (
    <div className="min-h-screen bg-base-100 text-base-content font-body flex flex-col items-center justify-center p-8 overflow-hidden relative selection:bg-accent selection:text-white">
      {/* 1. MASSIVE 404 WATERMARK */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none">
        <h2 className="font-heading text-[35vw] font-black italic uppercase leading-none tracking-tighter">
          404
        </h2>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="relative z-10 text-center max-w-2xl flex flex-col items-center">
        {/* BROKEN LINK ICON */}
        <div className="mb-10 relative group">
          <div className="w-24 h-24 border-4 border-base-content flex items-center justify-center bg-base-100 relative z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-10 h-10 text-base-content group-hover:text-accent group-hover:rotate-12 transition-all duration-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
          </div>
          {/* Brutalist Accent Offset */}
          <div className="absolute inset-0 bg-accent translate-x-3 translate-y-3 -z-0"></div>
        </div>

        {/* HEADER */}
        <h1 className="font-heading text-6xl md:text-9xl font-black uppercase italic tracking-tighter leading-[0.8] mb-8">
          Path <br />
          <span className="text-accent text-outline">Missing</span>
        </h1>

        <div className="h-1 w-24 bg-base-content mb-8"></div>

        {/* ERROR MESSAGE */}

        {/* NAVIGATION BUTTONS */}
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <Link to="/home">
            <button className="bg-base-content text-base-100 px-12 py-4 font-heading font-black uppercase tracking-[0.3em] text-[11px] hover:bg-accent transition-all group relative overflow-hidden shadow-2xl cursor-pointer rounded-md">
              <span className="relative z-10">Return to Home</span>
              <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            </button>
          </Link>

          <button
            onClick={back}
            className="border-2 border-base-content px-12 py-4 font-heading font-black uppercase tracking-[0.3em] text-[11px] hover:bg-base-content hover:text-base-100 transition-all active:scale-95 cursor-pointer rounded-md"
          >
            Previous Sector
          </button>
        </div>
      </div>

      {/* 3. TACTICAL DECORATION */}
      <div className="absolute top-12 left-12 hidden md:block"></div>

      <div className="absolute bottom-12 right-12 hidden md:block">
        <div className="flex items-center gap-4 opacity-10">
          <div className="w-12 h-1 bg-base-content"></div>
          <p className="text-[8px] font-black uppercase tracking-[0.8em]">
            Signal Lost
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
