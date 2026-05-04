import React from "react";

const DataNotFound = ({ backMsg, mainMsg1, mainMsg2, handleBtn, btnTxt }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-base-100 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03]">
          <h1 className="font-heading text-[30vw] font-black tracking-tighter uppercase leading-none ">
            {backMsg}
          </h1>
        </div>

        <div className="relative mb-12">
          <div className="w-24 h-24 border-4 border-base-content flex items-center justify-center relative group bg-base-100 z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-12 h-12 text-base-content group-hover:text-accent transition-all duration-300 group-hover:scale-110"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
          </div>

          <div className="absolute inset-0 bg-accent translate-x-3 translate-y-3 -z-0"></div>
        </div>

        <div className="relative z-10 space-y-4">
          <h2 className="font-heading text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8]">
            {mainMsg1}{" "}
            <span className="text-accent text-outline">{mainMsg2}</span>
          </h2>

          <div className="h-1.5 w-24 bg-base-content mx-auto mt-4 mb-8"></div>
          {handleBtn && (
            <button onClick={handleBtn} className="btn btn-accent text-white">
              {btnTxt}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default DataNotFound;
