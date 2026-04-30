import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import ProductCard from "../../../../components/ProductCard";
import ComponentLoader from "../../../../pages/ComponentLoader";

const FeaturedItems = () => {
  const { products } = useLoaderData();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Select different random products to contrast with New Arrivals
    const getFeaturedItems = (arr, count) => {
      const result = [];
      const usedIndices = new Set();
      
      // Let's just pick items from the end of the array for variety
      const startIndex = Math.max(0, (arr?.length || 0) - count * 2);

      while (result.length < count && usedIndices.size < arr?.length) {
        const index = startIndex + Math.floor(Math.random() * (arr.length - startIndex));
        if (index < arr.length && !usedIndices.has(index)) {
          usedIndices.add(index);
          result.push(arr[index]);
        } else if (usedIndices.size >= (arr.length - startIndex)) {
            // fallback if we run out of elements in the subset
            const fallbackIndex = Math.floor(Math.random() * arr.length);
            if(!usedIndices.has(fallbackIndex)){
                usedIndices.add(fallbackIndex);
                result.push(arr[fallbackIndex]);
            }
        }
      }

      return result;
    };

    setTimeout(() => {
      setFeaturedProducts(getFeaturedItems(products?.list_data, 4));
    }, 0);
  }, [products]);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto" id="featured">
      <div className="flex justify-between items-end mb-16">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
            Featured Items
          </h2>
          <p className="text-lg text-base-content/60 font-light max-w-2xl">
            Hand-picked by our interior designers. These pieces are guaranteed to elevate your living space.
          </p>
        </div>
        <Link
          to="/products"
          className="hidden sm:flex link link-hover font-bold text-primary uppercase text-sm tracking-widest items-center gap-2 group"
        >
          View Collection
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      </div>

      {!products?.list_data?.length ? (
        <ComponentLoader></ComponentLoader>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {featuredProducts.map((product, index) => (
            <ProductCard product={product} key={index}></ProductCard>
          ))}
        </div>
      )}
      
      <div className="mt-10 sm:hidden text-center">
         <Link to="/products" className="btn btn-outline border-base-300 w-full">
            View Collection
         </Link>
      </div>
    </section>
  );
};

export default FeaturedItems;
