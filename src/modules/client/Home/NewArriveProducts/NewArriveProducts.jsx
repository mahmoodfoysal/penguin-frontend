import React from "react";
import ProductCard from "../../../../components/ProductCard";

const NewArriveProducts = () => {
  return (
    <>
      <section className="py-24 px-6 max-w-7xl mx-auto" id="arrivals">
        <div className="flex justify-between items-end mb-16">
          <div className="flex flex-col gap-2">
            <h2 className="text-5xl font-extrabold tracking-tighter">
              Newest Arrivals
            </h2>
            <p className="text-lg text-base-content/60 font-light">
              The latest foundational pieces added to our collection.
            </p>
          </div>
          <a
            href="#"
            className="link link-hover font-bold text-primary uppercase text-sm tracking-widest flex items-center gap-2 group"
          >
            View All{" "}
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {[
            {
              id: 1,
              img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600",
              name: "S1 Studio Headphones",
              type: "Hardware",
              price: "$240.00",
            },
            {
              id: 2,
              img: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=600",
              name: "Classic Matte Kettle",
              type: "Home Goods",
              price: "$95.00",
            },
            {
              id: 3,
              img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=600",
              name: "Wired Sound Pods",
              type: "Accessories",
              price: "$160.00",
            },
            {
              id: 4,
              img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=600",
              name: "Void-Black Tee",
              type: "Apparel",
              price: "$55.00",
            },
          ].map((product, index) => (
            <ProductCard product={product} key={index}></ProductCard>
          ))}
        </div>
      </section>
    </>
  );
};

export default NewArriveProducts;
