import React from "react";

const Category = ({
  categoryList,
  openCategory,
  toggleCategory,
  handleSubCategory,
}) => {
  return (
    <div>
      <h3 className="font-heading font-black uppercase tracking-widest text-sm mb-4">
        Categories
      </h3>

      <div className="space-y-4">
        {categoryList.map((category, index) => {
          const isOpen = openCategory === category.par_cat_name;

          return (
            <div key={index} className="group">
              <div
                onClick={() => toggleCategory(category)}
                className={`flex items-center justify-between cursor-pointer border-b pb-2 transition-colors ${
                  isOpen
                    ? "border-accent text-accent"
                    : "border-base-content/5 text-base-content hover:border-accent hover:text-accent"
                }`}
              >
                <span className="font-heading font-bold text-xs uppercase tracking-wider">
                  {category.par_cat_name}
                </span>
                <span
                  className={`text-[10px] transition-transform duration-300 ${
                    isOpen ? "rotate-180 opacity-100" : "rotate-0 opacity-30"
                  }`}
                >
                  ▼
                </span>
              </div>

              {isOpen && (
                <ul className="overflow-hidden ml-4 space-y-2 border-l-2 border-accent/20 pl-4">
                  {category.sub_categories?.map((subItem, subIndex) => (
                    <li
                      key={subIndex}
                      onClick={() => handleSubCategory(subItem)}
                      className="font-body text-xs uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-accent transition-all block py-1 cursor-pointer"
                    >
                      {subItem.sub_cat_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
