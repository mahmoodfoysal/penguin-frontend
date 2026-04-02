import React from "react";

const Cart = () => {
  return (
    <div>
      <div className="bg-white min-h-screen font-body selection:bg-accent selection:text-white">
        {/* 1. HEADER */}
        <div className="border-b border-black/5 bg-base-200/30">
          <div className="container mx-auto px-6 py-12">
            <h1 className="font-heading text-5xl md:text-7xl font-black uppercase tracking-tighter italic">
              Your <span className="text-accent text-outline">Bag</span>
            </h1>
            <p className="font-heading font-bold text-[10px] uppercase tracking-[0.3em] opacity-40 mt-2">
              Items are reserved for 30 minutes
            </p>
          </div>
        </div>

        {/* 2. MAIN CONTENT */}
        <div className="container mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* LEFT: PRODUCT TABLE */}
            <div className="flex-grow">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-black font-heading text-[10px] uppercase tracking-[0.2em] font-black">
                      <th className="pb-4">Product</th>
                      <th className="pb-4 text-center">Price</th>
                      <th className="pb-4 text-center">Quantity</th>
                      <th className="pb-4 text-center">Total</th>
                      <th className="pb-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {[1, 2].map((item) => (
                      <tr key={item} className="group">
                        {/* Product Name & Image */}
                        <td className="py-8">
                          <div className="flex items-center gap-6">
                            <div className="w-20 h-24 bg-base-200 flex-shrink-0 rounded-sm overflow-hidden border border-black/5">
                              <img
                                src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=200"
                                className="w-full h-full object-cover mix-blend-multiply"
                                alt="product"
                              />
                            </div>
                            <div>
                              <h4 className="font-heading font-black uppercase text-sm leading-tight">
                                Apex Phantom v.0{item}
                              </h4>
                              <p className="text-[10px] uppercase font-bold opacity-40 mt-1 tracking-widest">
                                Size: US 10
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="py-8 text-center font-heading font-bold text-sm">
                          $240.00
                        </td>

                        {/* Quantity Selector */}
                        <td className="py-8 text-center">
                          <div className="inline-flex items-center border border-black/10 px-2 py-1 gap-4">
                            <button className="hover:text-accent font-black">
                              -
                            </button>
                            <span className="font-heading font-bold text-xs">
                              1
                            </span>
                            <button className="hover:text-accent font-black">
                              +
                            </button>
                          </div>
                        </td>

                        {/* Total */}
                        <td className="py-8 text-center font-heading font-black text-accent text-sm">
                          $240.00
                        </td>

                        {/* Action */}
                        <td className="py-8 text-right">
                          <button className="text-[10px] font-black uppercase tracking-tighter hover:text-red-500 transition-colors underline decoration-2 underline-offset-4">
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bottom Actions */}
              <div className="mt-8 flex justify-between items-center">
                <a
                  href="/shop"
                  className="text-xs font-heading font-black uppercase tracking-widest border-b-2 border-black pb-1 hover:border-accent hover:text-accent transition-all"
                >
                  ← Continue Shopping
                </a>
                <button className="text-xs font-heading font-black uppercase tracking-widest opacity-40 hover:opacity-100">
                  Clear Cart
                </button>
              </div>
            </div>

            {/* RIGHT: CART TOTAL SIDEBAR */}
            <div className="w-full lg:w-96">
              <div className="bg-base-200/50 p-8 sticky top-28 border border-black/5">
                <h2 className="font-heading text-2xl font-black uppercase italic mb-8 border-b border-black pb-4">
                  Cart <span className="text-accent">Total</span>
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between font-heading font-bold text-xs uppercase tracking-widest">
                    <span className="opacity-50">Sub Total</span>
                    <span>$480.00</span>
                  </div>
                  <div className="flex justify-between font-heading font-bold text-xs uppercase tracking-widest">
                    <span className="opacity-50">Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between font-heading font-bold text-xs uppercase tracking-widest">
                    <span className="opacity-50">Estimated Tax</span>
                    <span>$12.50</span>
                  </div>

                  <div className="border-t-2 border-black pt-6 mt-6 flex justify-between items-end">
                    <div>
                      <span className="font-heading font-black uppercase text-[10px] tracking-widest opacity-40">
                        Total Amount
                      </span>
                      <h3 className="font-heading font-black text-3xl leading-none text-black mt-1">
                        Grand Total
                      </h3>
                    </div>
                    <span className="font-heading font-black text-3xl text-accent">
                      $492.50
                    </span>
                  </div>
                </div>

                <div className="mt-10 space-y-3">
                  <button className="w-full bg-black text-white py-6 font-heading font-black uppercase tracking-[0.3em] text-sm hover:bg-accent transition-colors shadow-xl shadow-black/10">
                    Proceed To Checkout
                  </button>
                  <div className="flex justify-center gap-4 py-4 opacity-30 grayscale">
                    {/* Mock Payment Icons */}
                    <div className="w-8 h-5 bg-black rounded-sm"></div>
                    <div className="w-8 h-5 bg-black rounded-sm"></div>
                    <div className="w-8 h-5 bg-black rounded-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. RELATED ITEMS (Subtle Recommendation) */}
        <div className="container mx-auto px-6 py-20 border-t border-black/5">
          <h3 className="font-heading font-black uppercase text-xl italic mb-10">
            Forgot <span className="text-accent">Something?</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((id) => (
              <div key={id} className="group">
                <div className="aspect-square bg-base-100 border border-black/5 mb-4 overflow-hidden p-4 group-hover:border-accent transition-colors">
                  <img
                    src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=200"
                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all"
                    alt="suggested"
                  />
                </div>
                <h5 className="font-heading font-bold uppercase text-[10px] tracking-widest">
                  Sport Crew Socks
                </h5>
                <p className="font-heading font-black text-accent text-sm mt-1">
                  $15.00
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
