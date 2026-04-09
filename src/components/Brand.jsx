import React from "react";
import "./Brand.css";

const Brand = ({ handleBrandChange, getBrandList, selectedBrands }) => {
  return (
    <div>
      {/* Brand Filter */}
      <h3 className="font-heading font-black uppercase tracking-widest text-sm mb-4">
        Brands
      </h3>
      <div className="space-y-2 brand-scroll">
        {getBrandList.map((brand, index) => (
          <label key={index} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedBrands.some(
                (b) => b.trim().toLowerCase() === brand.trim().toLowerCase(),
              )}
              onChange={() => handleBrandChange(brand)}
              className="checkbox checkbox-xs"
            />
            <span>{brand}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Brand;
