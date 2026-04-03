import React from "react";

const PriceRange = ({ maxPrice, setPrice, price }) => {
  return (
    <div>
      {/* Price Range Filter */}
      <h3 className="font-heading font-black uppercase tracking-widest text-xs mb-6">
        Price Range
      </h3>
      <input
        type="range"
        min={0}
        value={price}
        max={maxPrice}
        onChange={(e) => setPrice(e.target.value)}
        className="range range-accent range-xs"
      />
      <div className="flex justify-between mt-4 font-heading font-bold text-sm">
        <span>$0</span>
        <span>${maxPrice}</span>
      </div>
    </div>
  );
};

export default PriceRange;
