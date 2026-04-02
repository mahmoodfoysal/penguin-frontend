import React from "react";

const PriceRange = () => {
  return (
    <div>
      {/* Price Range Filter */}
      <h3 className="font-heading font-black uppercase tracking-widest text-xs mb-6">
        Price Range
      </h3>
      <input
        type="range"
        min="0"
        max="1000"
        className="range range-accent range-xs"
      />
      <div className="flex justify-between mt-4 font-heading font-bold text-sm">
        <span>$0</span>
        <span>$1000</span>
      </div>
    </div>
  );
};

export default PriceRange;
