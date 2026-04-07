import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const HomeCategory = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const handleImageCategory = async () => {
      try {
        const result = await axios.get(
          "http://localhost:5000/api/admin/get-image-category",
        );
        setCategories(result.data?.list_data);
      } catch (error) {
        console.log(error);
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
      <section className="px-6 py-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((item, index) => (
            <div
              key={index}
              className={`relative group h-64 overflow-hidden rounded-sm cursor-pointer transition-all duration-300 ${item.bgColor}`}
              onClick={() => handleRelatedProducts(item)}
            >
              {/* Text Overlay */}
              <div className={`absolute top-6 left-6 z-10 text-black`}>
                <h2 className="text-2xl font-black leading-none uppercase tracking-tighter">
                  {item.cat_name}
                </h2>
              </div>

              {/* Image Styling - Positioned to the right/bottom like the reference */}
              <div className="absolute right-0 bottom-0 w-3/5 h-full transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500 ease-out">
                <img
                  src={item.cat_img}
                  alt={item.cat_name}
                  className="w-full h-full object-contain object-right-bottom mix-blend-multiply opacity-90"
                />
              </div>

              {/* Subtle Gradient for readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none"></div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HomeCategory;
