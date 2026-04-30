import React from "react";

const SearchBar = ({ searchProductList, setSearchProductList }) => {
  return (
    <div className="space-y-3 mb-4">
      {/* SEARCH */}
      <label className="text-sm font-black uppercase tracking-[0.2em] opacity-40">
        Search Inventory
      </label>
      <div className="relative group">
        <input
          type="text"
          placeholder="KEYWORDS..."
          className="w-full border-b-2 border-base-content/10 focus:border-accent outline-none py-3 text-xs font-bold transition-colors bg-transparent uppercase tracking-tighter pr-10"
          value={searchProductList}
          onChange={(e) => setSearchProductList(e.target.value)}
        />

        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-3 ">
          {/* CLEAR / CROSS BUTTON */}
          {searchProductList.length > 0 && (
            <button
              onClick={() => setSearchProductList("")}
              className="text-base-content/30 hover:text-accent transition-colors p-1 cursor-pointer"
              title="Clear Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-3.5 h-3.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
