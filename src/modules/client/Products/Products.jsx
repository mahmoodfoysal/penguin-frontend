import React from "react";
import { useLoaderData } from "react-router";
import ProductCard from "./../../../components/ProductCard";

const Products = () => {
  const products = useLoaderData();

  console.log(products.list_data);

  return (
    <div>
      <div className="bg-white min-h-screen font-body selection:bg-accent selection:text-white">
        {/* 1. PAGE HEADER */}
        <div className="border-b border-black/5 bg-base-200/30">
          <div className="container mx-auto px-6 py-12">
            <h1 className="font-heading text-5xl md:text-7xl font-black uppercase tracking-tighter italic">
              All <span className="text-accent text-outline">Products</span>
            </h1>
            <div className="flex gap-2 text-[10px] uppercase tracking-[0.2em] font-bold opacity-50 mt-4">
              <a href="/">Home</a> <span>/</span>{" "}
              <span className="text-black">Products</span>
            </div>
          </div>
        </div>

        {/* 2. MAIN CONTENT AREA */}
        <div className="container mx-auto px-6 py-8 flex flex-col lg:flex-row gap-12">
          {/* LEFT SIDEBAR FILTERS */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-28 space-y-10">
              {/* Price Range Filter */}
              <div>
                <h3 className="font-heading font-black uppercase tracking-widest text-xs mb-6">
                  Price Range
                </h3>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  className="range range-accent range-xs"
                />
                <div className="flex justify-between mt-4 font-heading font-bold text-sm">
                  <span>$0</span>
                  <span>$1000</span>
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <h3 className="font-heading font-black uppercase tracking-widest text-xs mb-6">
                  Brands
                </h3>
                <div className="space-y-3">
                  {["Nike", "Adidas", "Vortex Lab", "Puma"].map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm rounded-none border-black/20 checked:border-accent [--chkbg:theme(colors.accent)] [--chkfg:white]"
                      />
                      <span className="font-body text-sm uppercase tracking-wider group-hover:text-accent transition-colors">
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="font-heading font-black uppercase tracking-widest text-xs mb-6">
                  Type
                </h3>
                <ul className="space-y-2 font-body text-sm uppercase tracking-wider opacity-70">
                  <li className="hover:text-accent cursor-pointer transition-all hover:translate-x-1">
                    Footwear (42)
                  </li>
                  <li className="hover:text-accent cursor-pointer transition-all hover:translate-x-1">
                    Apparel (18)
                  </li>
                  <li className="hover:text-accent cursor-pointer transition-all hover:translate-x-1">
                    Accessories (12)
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          {/* 3. PRODUCT GRID & PAGINATION */}
          <main className="flex-grow">
            {/* Top Bar (Sort) */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-black/5 font-heading text-[10px] font-bold uppercase tracking-[0.2em]">
              <span>Showing 1-12 of 84 Items</span>
              <select className="select select-ghost select-xs focus:bg-transparent font-bold">
                <option>Sort: Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
              {products.list_data.map((item, index) => (
                <ProductCard product={item} key={index}></ProductCard>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-20 flex justify-center">
              <div className="join gap-2">
                <button className="join-item btn btn-outline btn-square rounded-none hover:bg-black border-black/10">
                  1
                </button>
                <button className="join-item btn btn-square rounded-none bg-black text-white border-black">
                  2
                </button>
                <button className="join-item btn btn-outline btn-square rounded-none hover:bg-black border-black/10">
                  3
                </button>
                <button className="join-item btn btn-disabled btn-square rounded-none border-black/10">
                  ...
                </button>
                <button className="join-item btn btn-outline btn-square rounded-none hover:bg-black border-black/10">
                  »
                </button>
              </div>
            </div>
          </main>
        </div>

        {/* 4. FEATURED PRODUCTS (Horizontal Scroll) */}
        <div className="bg-base-200/50 py-20 mt-20">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-10">
              <h2 className="font-heading text-4xl font-black uppercase italic tracking-tighter">
                Featured <span className="text-accent">Drops</span>
              </h2>
              <button className="btn btn-link btn-xs font-heading font-bold uppercase tracking-widest text-black no-underline hover:text-accent">
                Shop All
              </button>
            </div>
            <div className="flex overflow-x-auto gap-6 pb-8 snap-x no-scrollbar">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="min-w-[280px] snap-start group">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-black/5 hover:border-accent transition-colors">
                    <img
                      src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=400"
                      className="rounded-lg mb-4"
                      alt="Featured"
                    />
                    <h5 className="font-heading font-bold uppercase text-sm">
                      Limited Edition Racer
                    </h5>
                    <p className="font-heading font-black text-accent mt-1">
                      $299
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
