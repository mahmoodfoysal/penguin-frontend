import React from "react";
import { useNavigate } from "react-router";

const EmptyScreen = ({ text }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="min-h-[70vh] bg-base-100 text-base-content font-body flex flex-col items-center justify-center p-8 overflow-hidden relative selection:bg-accent selection:text-white">
        <div className="relative z-10 text-center max-w-4xl flex flex-col items-center gap-8">
          <div className="w-64 h-64 md:w-80 md:h-80 relative flex items-center justify-center group">
            <div className="absolute inset-0 border-2 border-base-content/5 scale-110 group-hover:scale-125 transition-transform duration-700"></div>
            <div className="absolute inset-0 border border-accent/20 -rotate-3 group-hover:rotate-3 transition-transform duration-700"></div>

            {/* REPLACE THIS WITH YOUR EMPTY SEARCH/PRODUCT IMAGE 
             e.g., <img src="/images/no-results.png" alt="No Gear Found" className="w-full h-full object-contain grayscale" />
          */}
            <div className="relative flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={0.5}
                stroke="currentColor"
                className="w-32 h-32 md:w-48 md:h-48 text-base-content/20 group-hover:text-accent/40 transition-colors duration-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
              <span className="absolute bottom-4 font-mono text-[10px] font-bold tracking-[0.5em] opacity-20 uppercase">
                No Data Found
              </span>
            </div>
          </div>

          {/* TYPOGRAPHY AREA */}
          <div className="space-y-4">
            <h1 className="font-heading text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
              {text.first}{" "}
              <span className="text-accent text-outline">{text.second}</span>
            </h1>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <button
              onClick={() => navigate(-1)}
              className="bg-base-content text-base-100 px-10 py-5 font-heading font-black uppercase tracking-[0.3em] text-[10px] hover:bg-accent transition-all group relative overflow-hidden"
            >
              <span className="relative z-10">Go Back</span>
              <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmptyScreen;
