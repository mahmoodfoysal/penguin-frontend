import React from "react";

const Checkout = () => {
  return (
    <div>
      <div className="bg-white min-h-screen font-body selection:bg-accent selection:text-white">
        {/* 1. COMPACT HEADER */}
        <div className="border-b border-black/5 py-8">
          <div className="container mx-auto px-6 flex justify-between items-center">
            <h1 className="font-heading text-3xl font-black uppercase tracking-tighter italic">
              Check<span className="text-accent text-outline">out</span>
            </h1>
            <a
              href="/cart"
              className="text-[10px] font-black uppercase tracking-widest border-b border-black pb-1 hover:text-accent hover:border-accent transition-all"
            >
              Back to Bag
            </a>
          </div>
        </div>

        {/* 2. CHECKOUT GRID */}
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* LEFT COLUMN: FORMS */}
            <div className="flex-grow space-y-12">
              {/* A. SHIPPING INFORMATION */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <span className="bg-black text-white w-8 h-8 flex items-center justify-center font-heading font-black text-sm">
                    01
                  </span>
                  <h2 className="font-heading text-2xl font-black uppercase tracking-tight">
                    Shipping <span className="text-accent">Address</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent"
                      placeholder="Doe"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      Street Address
                    </label>
                    <input
                      type="text"
                      className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent"
                      placeholder="123 Vortex Street"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      City
                    </label>
                    <input
                      type="text"
                      className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent"
                      placeholder="New York"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent"
                      placeholder="10001"
                    />
                  </div>
                </div>
              </section>

              {/* B. PAYMENT METHOD */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <span className="bg-black text-white w-8 h-8 flex items-center justify-center font-heading font-black text-sm">
                    02
                  </span>
                  <h2 className="font-heading text-2xl font-black uppercase tracking-tight">
                    Payment <span className="text-accent">Method</span>
                  </h2>
                </div>

                <div className="space-y-4">
                  {/* Credit Card Option */}
                  <div className="border-2 border-black p-6 relative">
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-heading font-black text-xs uppercase tracking-widest">
                        Credit / Debit Card
                      </span>
                      <div className="flex gap-2">
                        <div className="w-8 h-5 bg-black/10 rounded-sm"></div>
                        <div className="w-8 h-5 bg-black/10 rounded-sm"></div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <input
                        type="text"
                        className="w-full border-b border-black/10 focus:border-accent outline-none py-2 text-sm font-mono"
                        placeholder="CARD NUMBER"
                      />
                      <div className="grid grid-cols-2 gap-6">
                        <input
                          type="text"
                          className="w-full border-b border-black/10 focus:border-accent outline-none py-2 text-sm font-mono"
                          placeholder="MM / YY"
                        />
                        <input
                          type="text"
                          className="w-full border-b border-black/10 focus:border-accent outline-none py-2 text-sm font-mono"
                          placeholder="CVC"
                        />
                      </div>
                    </div>
                  </div>

                  {/* PayPal / Other Option */}
                  <div className="border border-black/10 p-6 opacity-50 hover:opacity-100 cursor-pointer transition-opacity">
                    <span className="font-heading font-black text-xs uppercase tracking-widest">
                      PayPal
                    </span>
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN: ORDER SUMMARY */}
            <div className="w-full lg:w-[400px]">
              <div className="sticky top-28 bg-base-200/50 p-8 border border-black/5 rounded-sm">
                <h3 className="font-heading text-xl font-black uppercase italic mb-8">
                  Order <span className="text-accent">Summary</span>
                </h3>

                {/* Mini Product List */}
                <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
                  {[1, 2].map((item) => (
                    <div key={item} className="flex gap-4">
                      <div className="w-16 h-20 bg-white border border-black/5 flex-shrink-0">
                        <img
                          src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=100"
                          className="w-full h-full object-cover mix-blend-multiply"
                          alt="thumb"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-heading font-bold text-[10px] uppercase leading-tight">
                          Apex Phantom v.0{item}
                        </h4>
                        <p className="text-[9px] uppercase opacity-50 font-bold mt-1">
                          Size: US 10 / Qty: 1
                        </p>
                        <p className="font-heading font-black text-xs mt-2">
                          $240.00
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-black/10 pt-6 space-y-3">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-60">
                    <span>Subtotal</span>
                    <span>$480.00</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-60">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between font-heading font-black text-lg uppercase tracking-tighter pt-4 border-t border-black/5 mt-4">
                    <span>Total</span>
                    <span className="text-accent text-2xl">$480.00</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button className="w-full bg-black text-white py-6 mt-10 font-heading font-black uppercase tracking-[0.3em] text-sm hover:bg-accent transition-all group flex items-center justify-center gap-3">
                  Place Order
                  <span className="group-hover:translate-x-2 transition-transform">
                    →
                  </span>
                </button>

                <p className="text-[9px] text-center mt-6 opacity-40 leading-relaxed uppercase font-bold tracking-tighter">
                  By placing this order, you agree to our <br />
                  <span className="underline cursor-pointer">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="underline cursor-pointer">
                    Privacy Policy
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
