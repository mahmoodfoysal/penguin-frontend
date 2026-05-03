import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import ProductCard from "../../../../components/ProductCard";
import SkeletonCard from "../../../../pages/SkeletonCard";

const NewestArrivalProducts = () => {
  const { products } = useLoaderData();

  const [newestSellerList, setNewestProduct] = useState([]);

  useEffect(() => {
    const getNewestItems = (arr) => {
      if (!arr) return [];
      const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;

      // Filter for last 30 days
      const newest = arr.filter(
        (item) => new Date(item.createdAt).getTime() >= thirtyDaysAgo,
      );

      return newest.slice(0, 4);
    };

    setTimeout(() => {
      setNewestProduct(
        getNewestItems(
          products?.list_data?.filter((item) => item.status === 1),
        ),
      );
    }, 0);
  }, [products]);
  return (
    <section className="py-10 px-6 max-w-7xl mx-auto" id="arrivals">
      <div className="flex justify-between items-end mb-16">
        <div className="flex flex-col gap-2">
          <h2 className="text-5xl font-extrabold tracking-tighter">
            Newest Arrivals
          </h2>
          <p className="text-lg text-base-content/60 font-light">
            The latest foundational pieces added to our collection.
          </p>
        </div>
        <Link
          to="/products"
          state={{ filter: "newest" }}
          className="link link-hover font-bold text-primary uppercase text-sm tracking-widest flex items-center gap-2 group"
        >
          View All
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      </div>

      {!products?.list_data ? (
        <SkeletonCard></SkeletonCard>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {newestSellerList.map((product, index) => (
            <ProductCard product={product} key={index}></ProductCard>
          ))}
        </div>
      )}
    </section>
  );
};

export default NewestArrivalProducts;
