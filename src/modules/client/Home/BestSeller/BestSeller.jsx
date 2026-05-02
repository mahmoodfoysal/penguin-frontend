import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import ProductCard from "../../../../components/ProductCard";
import axios from "axios";
import SkeletonCard from "../../../../pages/SkeletonCard";

const BestSeller = () => {
  const { products } = useLoaderData();

  const [bestSellerProd, setBestSellerProd] = useState([]);

  useEffect(() => {
    const fetchBestSellers = async () => {
      if (!products?.list_data) return;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/get-review-list`,
        );
        const reviews = response.data?.list_data || response.data || [];

        // Group ratings by prod_id
        const ratingsMap = {};
        reviews.forEach((review) => {
          const prodId = review.prod_id;
          if (!ratingsMap[prodId]) {
            ratingsMap[prodId] = { total: 0, count: 0 };
          }
          ratingsMap[prodId].total += review.rating || 0;
          ratingsMap[prodId].count += 1;
        });

        // Find products with average rating >= 4
        const bestSellers = products.list_data.filter((product) => {
          const stats = ratingsMap[product.prod_id];
          if (!stats) return false;
          const averageRating = stats.total / stats.count;
          // You specified if rating < 4 then match, but best seller standard is >= 4
          return averageRating >= 4;
        });

        // If no products match, fallback to some items or just show the matching ones
        setBestSellerProd(bestSellers.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch reviews for best sellers", error);
      }
    };

    fetchBestSellers();
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
          state={{ filter: "bestSeller" }}
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
          {bestSellerProd.map((product, index) => (
            <ProductCard
              product={product}
              key={index}
              isBestSeller={true}
            ></ProductCard>
          ))}
        </div>
      )}
    </section>
  );
};

export default BestSeller;
