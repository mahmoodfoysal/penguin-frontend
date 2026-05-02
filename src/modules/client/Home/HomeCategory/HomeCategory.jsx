import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import SkeletonCard from "../../../../pages/SkeletonCard";

const HomeCategory = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const handleImageCategory = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/admin/get-image-category`,
        );
        if (result.data?.list_data?.length) {
          setCategories(result.data.list_data);
        } else {
          throw new Error("No categories found");
        }
      } catch (error) {
        console.log("Error loading categories, using fallback:", error);
      }
    };
    handleImageCategory();
  }, []);

  const handleRelatedProducts = (item) => {
    navigate("/products", {
      state: { categoryId: item.cat_id },
    });
  };
  return (
    <>
      <section className="px-6 py-12 max-w-[1400px] mx-auto w-full w-100">
        {!categories?.length ? (
          <SkeletonCard></SkeletonCard>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {categories.slice(0, 4).map((item, index) => {
              // Safely parse bgColor
              let bg = "";
              if (item?.bgColor && typeof item.bgColor === "string") {
                bg = item.bgColor.replace("bg-[", "").replace("]", "");
              }

              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: bg || undefined,
                    minHeight: "256px",
                  }}
                  className={`relative group w-full overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl border border-base-200 ${!bg ? "bg-base-200" : ""}`}
                  onClick={() => handleRelatedProducts(item)}
                >
                  {/* Text Overlay */}
                  <div
                    className={`absolute top-6 left-6 z-10 ${bg ? "text-base-content" : "text-base-content"} max-w-[70%]`}
                  >
                    <h2 className="text-2xl font-black leading-none uppercase tracking-tighter drop-shadow-sm">
                      {item?.cat_name || "Category"}
                    </h2>
                  </div>

                  {/* Image Styling */}
                  <div className="absolute right-0 bottom-0 w-3/5 h-full transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500 ease-out flex items-end justify-end">
                    {item?.cat_img && (
                      <img
                        src={item.cat_img}
                        alt={item?.cat_name || "category"}
                        className="w-full h-full object-contain object-right-bottom  opacity-90"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    )}
                  </div>

                  {/* Subtle Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-base-100/40 to-transparent pointer-events-none"></div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
};

export default HomeCategory;
