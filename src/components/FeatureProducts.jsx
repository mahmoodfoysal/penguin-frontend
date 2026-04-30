import React from "react";

const FeatureProducts = () => {
  return (
    <div className="bg-base-200/50 py-20 mt-20">
      {/* 4. FEATURED PRODUCTS (Horizontal Scroll) */}
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-10">
          <h2 className="font-heading text-4xl font-black uppercase italic tracking-tighter">
            Featured <span className="text-accent">Drops</span>
          </h2>
          <button className="btn btn-link btn-xs font-heading font-bold uppercase tracking-widest text-base-content no-underline hover:text-accent">
            Shop All
          </button>
        </div>
        <div className="flex overflow-x-auto gap-6 pb-8 snap-x no-scrollbar">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="min-w-[280px] snap-start group">
              <div className="bg-base-100 p-4 rounded-xl shadow-sm border border-base-content/5 hover:border-accent transition-colors">
                <img
                  src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=400"
                  className="rounded-lg mb-4"
                  alt="Featured"
                />
                <h5 className="font-heading font-bold uppercase text-sm">
                  Limited Edition Racer
                </h5>
                <p className="font-heading font-black text-accent mt-1">$299</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureProducts;
