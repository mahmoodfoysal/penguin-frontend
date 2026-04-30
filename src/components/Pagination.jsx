import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  return (
    <div className="mt-20 flex justify-center">
      <div className="join gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          className="join-item btn btn-outline btn-square rounded-none border-base-content/10"
        >
          «
        </button>

        {getPagination().map((page, index) => (
          <button
            key={index}
            onClick={() => page !== "..." && onPageChange(page)}
            className={`join-item btn btn-square rounded-none ${
              currentPage === page
                ? "bg-base-content text-base-100 border-base-content"
                : "btn-outline border-base-content/10 hover:bg-base-content hover:text-base-100"
            } ${page === "..." ? "btn-disabled" : ""}`}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          className="join-item btn btn-outline btn-square rounded-none border-base-content/10"
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Pagination;
