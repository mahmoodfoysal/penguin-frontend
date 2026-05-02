import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slice/cartSlice";

const ProductCard = ({ product, isBestSeller }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Capture stable reference time on mount to maintain component purity
  const [referenceTime] = useState(() => Date.now());

  // Calculate newness based on stable reference time
  const isNew =
    product.createdAt &&
    referenceTime - new Date(product.createdAt).getTime() <
      30 * 24 * 60 * 60 * 1000;

  const handleProductDetails = (item) => {
    navigate(`/product-details/${item._id}/${item.prod_id}`);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <>
      <div onClick={() => handleProductDetails(product)}>
        <div className="group cursor-pointer">
          <div className="relative overflow-hidden rounded-3xl bg-base-200 aspect-[3/4]">
            <img
              src={product.prod_image}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-in-out"
              alt="prod image"
            />
            {/* Badges */}
            <div className="absolute top-5 left-5 z-20 flex flex-col gap-2">
              {isNew && (
                <span className="bg-accent text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest rounded-full shadow-lg w-max">
                  New
                </span>
              )}
              {isBestSeller && (
                <span className="bg-warning text-warning-content text-[10px] font-black px-3 py-1 uppercase tracking-widest rounded-full shadow-lg w-max">
                  Best Seller
                </span>
              )}
            </div>
            {/* Quick-add overlay */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product);
              }}
              className="btn btn-circle btn-primary absolute bottom-5 right-5 translate-y-20 group-hover:translate-y-0 transition-transform duration-300 shadow-xl z-20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
          <div className="mt-5 px-1">
            <h3 className="font-bold text-xl tracking-tight text-base-content group-hover:text-primary transition-colors">
              {product.prod_name}
            </h3>
            <div className="flex justify-between items-center mt-2">
              <span className="text-base-content/60 text-sm font-medium tracking-wide ">
                {product.prod_brand}
              </span>
              <span className="font-extrabold text-xl text-primary">
                ${product.price}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-base-content/60 text-sm font-medium tracking-wide ">
                Stock: {product.stock}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleProductDetails(product);
                }}
                className="text-[11px] font-black uppercase tracking-widest text-base-content/60 hover:text-accent transition-all duration-300 cursor-pointer"
              >
                View Details →
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
