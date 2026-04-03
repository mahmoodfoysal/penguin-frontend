import React, { useState } from "react";

const Category = ({ categoryList, handleFilterProducts }) => {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (categoryName) => {
    setOpenCategory(
      openCategory === categoryName.par_cat_name
        ? null
        : categoryName.par_cat_name,
    );
    handleFilterProducts(categoryName);
  };

  return (
    <div>
      {/* 1. CATEGORIES WITH SUB-CATEGORIES (NEW) */}
      <h3 className="font-heading font-black uppercase tracking-widest text-xs mb-6">
        Categories
      </h3>
      <h4
        onClick={() => handleFilterProducts(null)}
        className="font-heading font-black uppercase tracking-widest text-[13px] mb-6 cursor-pointer"
      >
        All Category
      </h4>
      <div className="space-y-4">
        {categoryList.map((category, index) => {
          const isOpen = openCategory === category.par_cat_name;

          return (
            <div key={index} className="group">
              {/* Parent Name (The Toggle) */}
              <div
                onClick={() => toggleCategory(category)}
                className={`flex items-center justify-between cursor-pointer border-b pb-2 transition-colors ${
                  isOpen
                    ? "border-accent text-accent"
                    : "border-black/5 text-black hover:border-accent hover:text-accent"
                }`}
              >
                <span className="font-heading font-bold text-sm uppercase tracking-wider">
                  {category.par_cat_name}
                </span>
                <span
                  className={`text-[10px] transition-transform duration-300 ${isOpen ? "rotate-180 opacity-100" : "rotate-0 opacity-30"}`}
                >
                  ▼
                </span>
              </div>

              {/* Sub-Categories (Animated Collapse) */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100 mt-3"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <ul className="overflow-hidden ml-4 space-y-2 border-l-2 border-accent/20 pl-4">
                  {category.sub_categories?.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <a
                        href={`#${subIndex}`}
                        className="font-body text-xs uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-accent transition-all block py-1"
                      >
                        {subItem.sub_cat_name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
