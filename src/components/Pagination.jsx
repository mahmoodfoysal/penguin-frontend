import React from "react";

const Pagination = () => {
  return (
    <div className="mt-20 flex justify-center">
      {/* Pagination */}
      <div className="join gap-2">
        <button className="join-item btn btn-outline btn-square rounded-none hover:bg-black border-black/10">
          1
        </button>
        <button className="join-item btn btn-square rounded-none bg-black text-white border-black">
          2
        </button>
        <button className="join-item btn btn-outline btn-square rounded-none hover:bg-black border-black/10">
          3
        </button>
        <button className="join-item btn btn-disabled btn-square rounded-none border-black/10">
          ...
        </button>
        <button className="join-item btn btn-outline btn-square rounded-none hover:bg-black border-black/10">
          »
        </button>
      </div>
    </div>
  );
};

export default Pagination;
