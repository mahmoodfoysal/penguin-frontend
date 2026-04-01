import React from "react";

const TopBanner = () => {
  return (
    <>
      <div className="hero min-h-[85vh] bg-base-100 px-6 mt-6">
        <div className="hero-content flex-col lg:flex-row-reverse gap-16 max-w-7xl">
          <div className="relative group flex-1">
            {/* Abstract background shape for unique look */}
            <div className="absolute -inset-10 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700"></div>
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200"
              className="w-full max-w-xl rounded-3xl shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-500 ease-out z-10 relative"
              alt="Featured Essential Product"
            />
          </div>
          <div className="text-left flex-1 lg:pr-16">
            <div className="badge badge-primary badge-outline mb-6 px-4 py-3 uppercase tracking-wider text-xs font-bold">
              Volume 04: Summer 2026
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-none mb-6 tracking-tighter">
              CRAFTED <br />{" "}
              <span className="text-primary italic">ESSENTIALS.</span>
            </h1>
            <p className="max-w-md text-xl text-base-content/70 mb-10 leading-relaxed font-light">
              Moving beyond trends toward timeless design. Experience the
              intersection of pure durability and curated aesthetics.
            </p>
            <div className="flex gap-4">
              <button className="btn btn-primary btn-lg rounded-full px-10 uppercase text-sm tracking-widest font-bold">
                Shop Now
              </button>
              <button className="btn btn-outline btn-lg rounded-full px-10 uppercase text-sm tracking-widest font-bold">
                Explore Volume
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBanner;
