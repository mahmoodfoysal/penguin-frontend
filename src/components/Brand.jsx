import React from "react";

const Brand = () => {
  return (
    <div>
      {/* Brand Filter */}
      <h3 className="font-heading font-black uppercase tracking-widest text-xs mb-6">
        Brands
      </h3>
      <div className="space-y-3">
        {["Nike", "Adidas", "Vortex Lab", "Puma"].map((brand) => (
          <label
            key={brand}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              className="checkbox checkbox-sm rounded-none border-black/20 checked:border-accent [--chkbg:theme(colors.accent)] [--chkfg:white]"
            />
            <span className="font-body text-sm uppercase tracking-wider group-hover:text-accent transition-colors">
              {brand}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Brand;
