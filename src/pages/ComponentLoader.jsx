import React from "react";

const ComponentLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full py-20 animate-in fade-in duration-700">
      <div className="relative">
        {/* Outer Orbital Ring 1 */}
        <div className="w-24 h-24 rounded-full border-4 border-teal-500/10 border-t-teal-500 animate-[spin_1.5s_linear_infinite]"></div>

        {/* Outer Orbital Ring 2 - Reverse */}
        <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent border-b-teal-300/30 animate-[spin_2s_linear_infinite_reverse]"></div>

        {/* Inner Core */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 bg-teal-500 rounded-full shadow-[0_0_25px_rgba(20,184,166,0.5)] animate-pulse flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full opacity-50"></div>
          </div>
        </div>

        {/* Floating Particles/Dots */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce delay-75"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -mb-4 w-1.5 h-1.5 bg-teal-300 rounded-full animate-bounce delay-300"></div>
      </div>

      {/* Loading Text */}
      <div className="mt-12 text-center space-y-2">
        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-teal-500/50 animate-pulse">
          Please Wait...
        </h4>
        <div className="flex items-center gap-1 justify-center">
          <span className="text-sm font-black uppercase tracking-tighter opacity-70">
            Loading
          </span>
          <span className="flex gap-1 pt-1">
            <span className="w-1 h-1 bg-teal-500 rounded-full animate-bounce duration-500"></span>
            <span className="w-1 h-1 bg-teal-500 rounded-full animate-bounce duration-500 delay-150"></span>
            <span className="w-1 h-1 bg-teal-500 rounded-full animate-bounce duration-500 delay-300"></span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ComponentLoader;
