import React from "react";

const Pagination = () => {
  return (
    <div className="mt-20 flex justify-center">
      {/* Pagination */}
      <div className="join gap-2">
        <button className="join-item btn btn-outline btn-square rounded-none hover:bg-base-content border-base-content/10">
          1
        </button>
        <button className="join-item btn btn-square rounded-none bg-base-content text-base-100 border-base-content">
          2
        </button>
        <button className="join-item btn btn-outline btn-square rounded-none hover:bg-base-content border-base-content/10">
          3
        </button>
        <button className="join-item btn btn-disabled btn-square rounded-none border-base-content/10">
          ...
        </button>
        <button className="join-item btn btn-outline btn-square rounded-none hover:bg-base-content border-base-content/10">
          »
        </button>
      </div>
    </div>
  );
};

export default Pagination;
