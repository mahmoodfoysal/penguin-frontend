import React, { useState } from "react";

const SubCategory = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <div>
      <div className="p-4 min-h-screen bg-base-100 relative overflow-x-hidden font-body">
        {/* 1. HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="font-heading text-5xl font-black uppercase tracking-tighter text-base-content">
              Sub <span className="text-accent text-outline">Categories</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mt-2">
              Manage Store Sub Categories
            </p>
          </div>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="bg-base-content text-base-100 px-8 py-3 font-heading font-black uppercase tracking-[0.2em] text-xs hover:bg-accent transition-all flex items-center gap-3 group shadow-xl shadow-black/5 rounded-sm cursor-pointer"
          >
            Add New Sub-Category
            <span className="text-lg group-hover:scale-125 transition-transform">
              +
            </span>
          </button>
        </div>

        {/* 2. SUB-CATEGORY LIST VIEW */}
        <div className="bg-base-100 border border-base-content/5 rounded-sm shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-base-200/50 font-heading text-[10px] uppercase tracking-[0.2em] font-black opacity-50 border-b border-base-content/5">
                <th className="px-8 py-5">Sub-Category</th>
                <th className="px-8 py-5">Parent Collection</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {[
                { sub: "Running Shoes", parent: "Footwear", status: "Active" },
                { sub: "Graphic Tees", parent: "Apparel", status: "Active" },
                { sub: "Gym Bags", parent: "Accessories", status: "Hidden" },
                {
                  sub: "Streetwear Hoodies",
                  parent: "Apparel",
                  status: "Active",
                },
              ].map((item, i) => (
                <tr
                  key={i}
                  className="group hover:bg-base-200/30 transition-colors"
                >
                  <td className="px-8 py-6 font-heading font-bold text-sm uppercase tracking-tight group-hover:text-accent">
                    {item.sub}
                  </td>
                  <td className="px-8 py-6 text-[10px] font-black uppercase tracking-widest opacity-60">
                    {item.parent}
                  </td>
                  <td className="px-8 py-6">
                    <span
                      className={`text-[9px] font-black uppercase tracking-tighter px-2 py-1 border ${item.status === "Active" ? "border-green-500 text-green-500" : "border-base-content/20 opacity-40"}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-6">
                      <button className="text-[9px] font-black uppercase tracking-widest hover:text-accent border-b border-transparent hover:border-accent transition-all">
                        Edit
                      </button>
                      <button className="text-[9px] font-black uppercase tracking-widest text-red-500 hover:opacity-50 transition-all">
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 3. SIDE DRAWER (RIGHT-SIDE SLIDE) */}
        {/* Dark Overlay Backdrop */}
        {isDrawerOpen && (
          <div
            className="fixed inset-0 bg-base-content/40 backdrop-blur-md z-[100] transition-opacity cursor-crosshair"
            onClick={() => setIsDrawerOpen(false)}
          />
        )}

        {/* Drawer Body */}
        <aside
          className={`fixed top-0 right-0 h-full w-full max-w-md bg-base-100 z-[101] shadow-2xl transition-transform duration-500 ease-in-out transform ${
            isDrawerOpen ? "translate-x-0" : "translate-x-full"
          } border-l border-base-content/5`}
        >
          <div className="h-full flex flex-col p-8">
            {/* Drawer Header */}
            <div className="flex justify-between items-center mb-12">
              <h2 className="font-heading text-4xl font-black uppercase italic tracking-tighter leading-none">
                New <span className="text-accent">Category</span>
              </h2>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="text-2xl font-black hover:text-accent rotate-45 transition-transform"
              >
                +
              </button>
            </div>

            {/* Form Fields */}
            <div className="flex-grow space-y-12">
              {/* 1. Dropdown Field */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                  Select Parent Collection
                </label>
                <select className="w-full border-b-2 border-base-content/10 focus:border-accent outline-none py-3 text-xs font-bold bg-transparent uppercase tracking-wider cursor-pointer transition-colors appearance-none">
                  <option value="">Choose Category...</option>
                  <option>Footwear</option>
                  <option>Apparel</option>
                  <option>Accessories</option>
                  <option>Limited Drops</option>
                </select>
              </div>

              {/* 2. Input Field 1 */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                  Sub-Category Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Basketball Shoes"
                  className="w-full border-b-2 border-base-content/10 focus:border-accent outline-none py-3 text-xs font-bold transition-colors bg-transparent placeholder:text-black/10 uppercase"
                />
              </div>

              {/* 3. Input Field 2 */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                  SEO Meta Description
                </label>
                <input
                  type="text"
                  placeholder="Brief description for search engines"
                  className="w-full border-b-2 border-base-content/10 focus:border-accent outline-none py-3 text-xs font-bold transition-colors bg-transparent placeholder:text-black/10"
                />
              </div>
            </div>

            {/* Drawer Footer Buttons */}
            <div className="pt-5 border-t border-base-content/5 flex justify-center gap-4">
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="px-8 border border-base-content/10 py-3 font-heading font-black uppercase tracking-widest text-[10px] hover:bg-base-content hover:text-base-100 transition-all cursor-pointer rounded-sm"
              >
                Cancel
              </button>
              <button className="px-8 bg-base-content text-base-100 py-3 font-heading font-black uppercase tracking-widest text-[10px] hover:bg-accent transition-colors cursor-pointer rounded-sm">
                Save
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SubCategory;
