import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import ProductCard from "../../../../components/ProductCard";

const BestSeller = () => {
  const products = useLoaderData();

  const [bestSellerProd, setBestSellerProd] = useState([]);

  useEffect(() => {
    const getBestSellerItems = (arr, count) => {
      const result = [];
      const usedIndices = new Set();

      while (result.length < count && usedIndices.size < arr?.length) {
        const index = Math.floor(Math.random() * arr?.length);
        if (!usedIndices.has(index)) {
          usedIndices.add(index);
          result.push(arr[index]);
        }
      }

      return result;
    };

    setTimeout(() => {
      setBestSellerProd(getBestSellerItems(products?.list_data, 4));
    }, 0);
  }, [products]);
  return (
    <section className="py-10 px-6 max-w-7xl mx-auto" id="arrivals">
      <div className="flex justify-between items-end mb-16">
        <div className="flex flex-col gap-2">
          <h2 className="text-5xl font-extrabold tracking-tighter">
            Best Seller Items
          </h2>
          <p className="text-lg text-base-content/60 font-light">
            Maximum client order this products
          </p>
        </div>
        <Link
          to="/products"
          className="link link-hover font-bold text-primary uppercase text-sm tracking-widest flex items-center gap-2 group"
        >
          View All
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {bestSellerProd.map((product, index) => (
          <ProductCard product={product} key={index}></ProductCard>
        ))}
      </div>
    </section>
  );
};

export default BestSeller;
