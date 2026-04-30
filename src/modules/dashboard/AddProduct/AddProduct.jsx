import React, { useState } from "react";

const AddProduct = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // For Add New
  const [isDetailsOpen, setIsDetailsOpen] = useState(false); // For Details View
  const [selectedProduct, setSelectedProduct] = useState(null); // Data for Details

  const handleOpenDetails = (id) => {
    // In a real app, you'd fetch by ID or pass the object.
    // Here we'll set mock data for the selected product.
    setSelectedProduct({
      id: id,
      name: `Phantom Racer v.${id}`,
      category: "Footwear",
      price: "$120.00",
      stock: "In Stock (50 units)",
      desc: "High-performance racing shoes with carbon fiber plate and breathable mesh upper.",
    });
    setIsDetailsOpen(true);
  };
  return (
    <div>
      <div className="p-4  min-h-screen bg-base-100 font-body relative overflow-hidden">
        {/* 1. GLOBAL HEADER AREA */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h1 className="font-heading text-5xl font-black uppercase tracking-tighter text-base-content">
              Product <span className="text-accent text-outline">Vault</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mt-2">
              Manage Store Products
            </p>
          </div>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="bg-base-content text-base-100 px-12 py-5 font-heading font-black uppercase tracking-[0.2em] text-[10px] hover:bg-accent transition-all flex items-center gap-4 group shadow-2xl shadow-black/10"
          >
            Add New Product
            <span className="text-xl group-hover:scale-125 transition-transform">
              +
            </span>
          </button>
        </div>

        {/* 2. DATA LIST VIEW (MAIN PAGE) */}
        <div className="bg-base-100 border border-base-content/5 rounded-sm overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-base-content text-base-100 font-heading text-[9px] uppercase tracking-[0.3em] font-black">
                <th className="px-8 py-5">Product Info</th>
                <th className="px-8 py-5">Category</th>
                <th className="px-8 py-5">Price</th>
                <th className="px-8 py-5">Stock</th>
                <th className="px-8 py-5 text-center">Details</th>{" "}
                {/* Added Column */}
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {[1, 2, 3, 4, 5].map((id) => (
                <tr
                  key={id}
                  className="group hover:bg-base-200/40 transition-colors"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-base-200 border border-base-content/5 p-1 group-hover:border-accent transition-colors">
                        <img
                          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=100"
                          className="w-full h-full object-contain grayscale group-hover:grayscale-0"
                          alt="prod"
                        />
                      </div>
                      <div>
                        <p className="font-heading font-bold text-xs uppercase tracking-tight">
                          Phantom Racer v.{id}
                        </p>
                        <p className="text-[9px] opacity-40 font-mono">
                          SKU: VTX-00{id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-[10px] font-black uppercase tracking-widest opacity-60">
                    Footwear
                  </td>
                  <td className="px-8 py-6 font-heading font-black text-accent text-sm">
                    $120.00
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-bold bg-green-50 text-green-600 px-2 py-1 uppercase tracking-tighter border border-green-200">
                      In Stock
                    </span>
                  </td>
                  {/* Details Button Cell */}
                  <td className="px-8 py-6 text-center">
                    <button
                      onClick={() => handleOpenDetails(id)}
                      className="text-[9px] font-black uppercase tracking-widest bg-base-content text-base-100 px-4 py-2 hover:bg-accent transition-all"
                    >
                      Details
                    </button>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-[9px] font-black uppercase tracking-widest hover:text-accent border-b-2 border-transparent hover:border-accent transition-all py-1">
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 3. SHARED BACKDROP */}
        {(isDrawerOpen || isDetailsOpen) && (
          <div
            className="fixed inset-0 bg-base-content/60 backdrop-blur-md z-[100] transition-opacity duration-300"
            onClick={() => {
              setIsDrawerOpen(false);
              setIsDetailsOpen(false);
            }}
          />
        )}

        {/* 4. "ADD NEW" DRAWER (Unchanged) */}
        <aside
          className={`fixed top-0 right-0 h-full w-full max-w-lg bg-base-100 z-[101] shadow-[-30px_0px_60px_rgba(0,0,0,0.2)] transition-transform duration-500 ease-in-out transform ${
            isDrawerOpen ? "translate-x-0" : "translate-x-full"
          } border-l-4 border-base-content`}
        >
          <div className="h-full flex flex-col p-12 overflow-y-auto no-scrollbar">
            <div className="mb-16 border-b border-base-content/5 pb-8">
              <h2 className="font-heading text-4xl font-black uppercase italic tracking-tighter">
                New <span className="text-accent text-outline">Product</span>
              </h2>
              <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-30 mt-2">
                Initialize warehouse entry
              </p>
            </div>

            <div className="flex-grow space-y-12">
              <div className="grid grid-cols-1 gap-12">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                    Product Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Runner 2026"
                    className="w-full border-b-2 border-base-content/10 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent uppercase tracking-tight"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                    Primary Category
                  </label>
                  <select className="w-full border-b-2 border-base-content/10 focus:border-accent outline-none py-3 text-sm font-bold bg-transparent uppercase tracking-wider cursor-pointer appearance-none">
                    <option>Footwear</option>
                    <option>Apparel</option>
                    <option>Accessories</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                    Price (USD)
                  </label>
                  <input
                    type="number"
                    className="w-full border-b-2 border-base-content/10 focus:border-accent outline-none py-3 text-sm font-bold bg-transparent"
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    className="w-full border-b-2 border-base-content/10 focus:border-accent outline-none py-3 text-sm font-bold bg-transparent"
                    placeholder="100"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                  Brief Description
                </label>
                <textarea
                  rows="3"
                  className="w-full border-2 border-base-content/5 p-4 focus:border-accent outline-none text-xs font-medium transition-colors bg-base-200/30 rounded-sm"
                  placeholder="Product specifications..."
                ></textarea>
              </div>
            </div>

            <div className="pt-12 border-t-2 border-base-content mt-12 flex flex-col gap-4">
              <button className="w-full bg-base-content text-base-100 py-6 font-heading font-black uppercase tracking-[0.3em] text-[11px] hover:bg-accent transition-colors">
                Save Entry
              </button>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="w-full border border-base-content/10 py-5 font-heading font-black uppercase tracking-widest text-[11px] hover:bg-base-content hover:text-base-100 transition-all opacity-40 hover:opacity-100"
              >
                Cancel Process
              </button>
            </div>
          </div>
        </aside>

        {/* 5. "DETAILS" VIEW DRAWER */}
        <aside
          className={`fixed top-0 right-0 h-full w-full max-w-lg bg-base-100 z-[101] shadow-[-30px_0px_60px_rgba(0,0,0,0.2)] transition-transform duration-500 ease-in-out transform ${
            isDetailsOpen ? "translate-x-0" : "translate-x-full"
          } border-l-4 border-accent`}
        >
          {selectedProduct && (
            <div className="h-full flex flex-col p-12 overflow-y-auto no-scrollbar">
              <div className="mb-12 flex justify-between items-start">
                <div>
                  <h2 className="font-heading text-4xl font-black uppercase italic tracking-tighter text-base-content">
                    Product <span className="text-accent">Details</span>
                  </h2>
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-30 mt-2">
                    Technical Specifications
                  </p>
                </div>
                <button
                  onClick={() => setIsDetailsOpen(false)}
                  className="text-3xl font-black hover:text-accent rotate-45 transition-transform"
                >
                  +
                </button>
              </div>

              <div className="space-y-10">
                <div className="aspect-square bg-base-200 border border-base-content/5 p-8">
                  <img
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400"
                    className="w-full h-full object-contain "
                    alt="detail-img"
                  />
                </div>

                <div className="grid grid-cols-2 gap-8 border-t border-base-content/5 pt-8">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                      Item Name
                    </p>
                    <p className="font-heading font-bold text-sm uppercase mt-1">
                      {selectedProduct.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                      Category
                    </p>
                    <p className="font-heading font-bold text-sm uppercase mt-1">
                      {selectedProduct.category}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                      Current Price
                    </p>
                    <p className="font-heading font-black text-accent text-lg mt-1">
                      {selectedProduct.price}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                      Stock Status
                    </p>
                    <p className="font-heading font-bold text-sm uppercase mt-1 text-green-600">
                      {selectedProduct.stock}
                    </p>
                  </div>
                </div>

                <div className="border-t border-base-content/5 pt-8">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                    Description
                  </p>
                  <p className="text-xs font-medium leading-relaxed mt-4 opacity-70">
                    {selectedProduct.desc}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsDetailsOpen(false)}
                className="mt-12 w-full bg-base-content text-base-100 py-6 font-heading font-black uppercase tracking-[0.3em] text-[11px] hover:bg-accent transition-colors"
              >
                Close Details
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default AddProduct;
