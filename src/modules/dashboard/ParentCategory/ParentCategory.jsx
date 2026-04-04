import React, { useState } from "react";

const ParentCategory = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <div>
      <div className="p-4 min-h-screen bg-white relative overflow-x-hidden">
        {/* 1. TOP BAR WITH ADD BUTTON */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="font-heading text-5xl font-black uppercase  tracking-tighter text-black">
              Parent{" "}
              <span className="text-accent text-outline">Categories</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mt-2">
              Manage Store Parent Categories
            </p>
          </div>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="bg-black text-white px-8 py-3 font-heading font-black uppercase tracking-[0.2em] text-xs hover:bg-accent transition-all flex items-center gap-3 group rounded-sm cursor-pointer"
          >
            Add New Category
            <span className="text-lg group-hover:rotate-90 transition-transform">
              +
            </span>
          </button>
        </div>

        {/* 2. CATEGORY LIST VIEW */}
        <div className="bg-white border border-black/5 rounded-sm shadow-sm">
          <div className="grid grid-cols-1 divide-y divide-black/5">
            {/* Header Row */}
            <div className="hidden md:grid grid-cols-4 px-8 py-4 bg-base-200/50 font-heading text-[10px] uppercase tracking-widest font-black opacity-40">
              <span>Category Name</span>
              <span>Slug / URL</span>
              <span>Items Count</span>
              <span className="text-right">Actions</span>
            </div>

            {/* List Items */}
            {["Footwear", "Apparel", "Accessories", "Limited Drops"].map(
              (cat, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 md:grid-cols-4 px-8 py-6 items-center hover:bg-base-200/30 transition-colors group"
                >
                  <span className="font-heading font-bold text-sm uppercase tracking-tight group-hover:text-accent transition-colors">
                    {cat}
                  </span>
                  <span className="text-[11px] font-mono opacity-40">
                    /shop/{cat.toLowerCase()}
                  </span>
                  <span className="text-[11px] font-black opacity-60">
                    24 Items
                  </span>
                  <div className="flex justify-end gap-4">
                    <button className="text-[9px] font-black uppercase tracking-widest hover:text-accent transition-all border-b border-transparent hover:border-accent">
                      Edit
                    </button>
                    <button className="text-[9px] font-black uppercase tracking-widest text-red-500 hover:underline">
                      Delete
                    </button>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>

        {/* 3. SIDE DRAWER (OVERLAY) */}
        {/* Backdrop */}
        {isDrawerOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />
        )}

        {/* Drawer Content */}
        <aside
          className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] shadow-[-20px_0px_50px_rgba(0,0,0,0.1)] transition-transform duration-500 ease-in-out transform ${
            isDrawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="h-full flex flex-col p-8">
            {/* Drawer Header */}
            <div className="flex justify-between items-center mb-12">
              <h2 className="font-heading text-3xl font-black uppercase italic tracking-tighter">
                New <span className="text-accent">Category</span>
              </h2>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="text-2xl font-black hover:text-accent rotate-45 transition-transform"
              >
                +
              </button>
            </div>

            {/* Form */}
            <div className="flex-grow space-y-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                  Category Display Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Footwear"
                  className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent placeholder:text-black/10"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                  URL Slug (Auto-generated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. footwear"
                  className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent placeholder:text-black/10"
                />
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-5 border-t border-black/5 flex justify-center gap-4">
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="px-8 border border-black/10 py-3 font-heading font-black uppercase tracking-widest text-[10px] hover:bg-black hover:text-white transition-all cursor-pointer rounded-sm"
              >
                Cancel
              </button>
              <button className="px-8 bg-black text-white py-3 font-heading font-black uppercase tracking-widest text-[10px] hover:bg-accent transition-colors cursor-pointer rounded-sm">
                Save
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ParentCategory;
