import React from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useNavigate } from "react-router";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleProductDetails = (item) => {
    navigate(`/product/${item._id}/${item.prod_id}`);
    console.log(item);
  };

  const handleAddToCart = () => {
    console.log("k");
  };
  return (
    <div onClick={() => handleProductDetails(product)}>
      <div className="group cursor-pointer">
        <div className="relative overflow-hidden rounded-3xl bg-base-200 aspect-[3/4]">
          <img
            src={product.prod_image}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-in-out"
            alt="prod image"
          />
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
            <span className="text-base-content/60 text-sm font-medium tracking-wide italic">
              {product.prod_brand}
            </span>
            <span className="font-extrabold text-xl text-primary">
              $ {product.price}
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-base-content/60 text-sm font-medium tracking-wide italic">
              Stock {product.stock}
            </span>
            <span className="font-extrabold text-xl text-primary">
              <Rating style={{ maxWidth: 100 }} value={2.5} readOnly />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
