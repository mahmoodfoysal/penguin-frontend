import React, { useMemo, useRef, useState } from "react";
import PageHeader from "../../../components/PageHeader";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Checkout = () => {
  const cartList = useSelector((state) => state.cart.cart);
  const fullName = useRef(null);
  const email = useRef(null);
  const phoneNo = useRef(null);
  const country = useRef(null);
  const city = useRef(null);
  const zipCode = useRef(null);
  const address = useRef(null);
  const bkashNo = useRef(null);
  const transectionNo = useRef(null);
  const cardNumber = useRef(null);
  const expDate = useRef(null);
  const cvcNo = useRef(null);
  const [paymentMethod, setPaymentMethod] = useState(1);

  const navigate = useNavigate();

  // const pageInfo = [
  //   {
  //     parent_route_name: "",
  //     path: "",
  //   },
  //   {
  //     curren_route: "Complete Your Order",
  //   },
  //   {
  //     first_name: "Check",
  //     last_name: "out",
  //   },
  // ];

  const paymentModeList = [
    { id: 1, label: "Cash on Delivery" },
    { id: 2, label: "bKash / MFS" },
    { id: 3, label: "Credit Card" },
  ];

  const countryList = [
    {
      id: 1,
      country_name: "Bangladesh",
    },
    {
      id: 2,
      country_name: "USA",
    },
    {
      id: 3,
      country_name: "Canada",
    },
    {
      id: 4,
      country_name: "China",
    },
  ];

  const handleOrderSubmit = () => {
    console.log(fullName.current.value, paymentMethod.current);
  };

  const subTotal = useMemo(() => {
    return cartList.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartList]);

  const shippingCost = useMemo(() => {
    let cost = 0;

    if (cartList.length > 5) {
      cost = 0;
    } else {
      cost = 2 * cartList?.length;
    }
    return cost;
  }, [cartList]);

  const totalVat = useMemo(() => {
    return subTotal * 0.06;
  }, [subTotal]);

  return (
    <div>
      <div className="bg-white min-h-screen font-body selection:bg-accent selection:text-white">
        {/* 1. COMPACT HEADER */}
        <div className="border-b border-black/5 py-8">
          <div className="container mx-auto px-6 flex justify-between items-center">
            <h1 className="font-heading text-5xl font-black uppercase tracking-tighter italic">
              Check<span className="text-accent text-outline">out</span>
            </h1>
            <Link
              onClick={() => navigate(-1)}
              className="text-[10px] font-black uppercase tracking-widest border-b border-black pb-1 hover:text-accent hover:border-accent transition-all"
            >
              Back to Bag
            </Link>
          </div>
        </div>

        {/* <PageHeader pageInfo={pageInfo}></PageHeader> */}

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
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      ref={fullName}
                      className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      ref={email}
                      className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent"
                      placeholder="user@user.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      Phone No <span className="text-red-600">*</span>
                    </label>
                    <input
                      ref={phoneNo}
                      type="number"
                      className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent"
                      placeholder="019xxxxxx"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      Country <span className="text-red-600">*</span>
                    </label>
                    <select
                      ref={country}
                      className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-3 text-sm font-bold bg-transparent uppercase tracking-wider cursor-pointer"
                    >
                      {countryList.map((item) => (
                        <option
                          key={item.country_name}
                          value={item.country_name}
                        >
                          {item.country_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      City
                    </label>
                    <input
                      ref={city}
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
                      ref={zipCode}
                      type="text"
                      className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent"
                      placeholder="10001"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      Street Address
                    </label>
                    <input
                      ref={address}
                      type="text"
                      className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent"
                      placeholder="123 Vortex Street"
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

                <div className="space-y-6">
                  {/* 1. RADIO SELECTION MODES */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {paymentModeList.map((item, index) => (
                      <label
                        key={index}
                        className="relative flex items-center p-4 border-2 border-black cursor-pointer group hover:bg-black hover:text-white transition-all"
                      >
                        <input
                          type="radio"
                          name="paymentMode"
                          value={item.id}
                          onChange={(e) =>
                            setPaymentMethod(Number(e.target.value))
                          }
                          className="peer hidden"
                          defaultChecked={item.id === 1}
                        />
                        {/* Custom Radio Indicator */}
                        <div className="w-4 h-4 border-2 border-black flex-shrink-0 mr-3 flex items-center justify-center group-hover:border-white peer-checked:bg-accent peer-checked:border-accent">
                          <div className="w-1.5 h-1.5 bg-white scale-0 peer-checked:scale-100 transition-transform"></div>
                        </div>
                        <span className="font-heading font-black text-[10px] uppercase tracking-widest leading-none">
                          {item.label}
                        </span>
                      </label>
                    ))}
                  </div>

                  {/* 2. PAYMENT DETAILS (Conditional Context) */}
                  <div className="space-y-4">
                    {paymentMethod === 1 && (
                      <div className="border-2 border-black p-6 relative">
                        <div className="flex justify-between items-center mb-6">
                          <span className="font-heading font-black text-xs uppercase tracking-widest">
                            When product arrive you must pay first then get the
                            product
                          </span>
                          <div className="flex gap-2">
                            <div className="w-8 h-5 bg-black/10 rounded-sm"></div>
                            <div className="w-8 h-5 bg-black/10 rounded-sm"></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Credit Card Option (Your Original Design) */}
                    {paymentMethod === 2 && (
                      <div className="border-2 border-black p-6 relative">
                        <div className="flex justify-between items-center mb-6">
                          <span className="font-heading font-black text-xs uppercase tracking-widest">
                            Mobile Finance System
                          </span>
                          <div className="flex gap-2">
                            <div className="w-8 h-5 bg-black/10 rounded-sm"></div>
                            <div className="w-8 h-5 bg-black/10 rounded-sm"></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                              Account No <span className="text-red-600">*</span>
                            </label>
                            <input
                              type="number"
                              ref={bkashNo}
                              className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent"
                              placeholder="019xxxxxx"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                              Transection No{" "}
                              <span className="text-red-600">*</span>
                            </label>
                            <input
                              type="text"
                              ref={transectionNo}
                              className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent"
                              placeholder="jdjdjd77djess99#"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Credit Card Option (Your Original Design) */}

                    {paymentMethod === 3 && (
                      <div className="border-2 border-black p-6 relative">
                        <div className="flex justify-between items-center mb-6">
                          <span className="font-heading font-black text-xs uppercase tracking-widest">
                            Card Details
                          </span>
                          <div className="flex gap-2">
                            <div className="w-8 h-5 bg-black/10 rounded-sm"></div>
                            <div className="w-8 h-5 bg-black/10 rounded-sm"></div>
                          </div>
                        </div>
                        <div className="space-y-6">
                          <input
                            ref={cardNumber}
                            type="text"
                            className="w-full border-b border-black/10 focus:border-accent outline-none py-2 text-sm font-mono bg-transparent"
                            placeholder="CARD NUMBER"
                          />
                          <div className="grid grid-cols-2 gap-6">
                            <input
                              ref={expDate}
                              type="text"
                              className="w-full border-b border-black/10 focus:border-accent outline-none py-2 text-sm font-mono bg-transparent"
                              placeholder="MM / YY"
                            />
                            <input
                              ref={cvcNo}
                              type="text"
                              className="w-full border-b border-black/10 focus:border-accent outline-none py-2 text-sm font-mono bg-transparent"
                              placeholder="CVC"
                            />
                          </div>
                        </div>
                      </div>
                    )}
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
                  {cartList.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-16 h-20 bg-white border border-black/5 flex-shrink-0">
                        <img
                          src={item.prod_image}
                          className="w-full h-full object-cover mix-blend-multiply"
                          alt="thumb"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-heading font-bold text-[10px] uppercase leading-tight">
                          {item.prod_name}
                        </h4>
                        <p className="text-[9px] uppercase opacity-50 font-bold mt-1">
                          Size: std / Qty: {item.quantity}
                        </p>
                        <p className="font-heading font-black text-xs mt-2">
                          ${item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-black/10 pt-6 space-y-3">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-60">
                    <span>Subtotal</span>
                    <span>${Number(subTotal).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-60">
                    <span>Shipping</span>
                    {cartList?.length > 5 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      <span>${Number(shippingCost).toFixed(2)}</span>
                    )}
                  </div>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-60">
                    <span>VAT</span>
                    <span>${Number(totalVat).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-heading font-black text-lg uppercase tracking-tighter pt-4 border-t border-black/5 mt-4">
                    <span>Total Amount</span>
                    <span className="text-accent text-2xl">
                      ${Number(subTotal + shippingCost + totalVat).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handleOrderSubmit}
                  className="w-full bg-black text-white py-4 mt-10 font-heading font-black uppercase tracking-[0.3em] text-sm hover:bg-accent transition-all group flex items-center justify-center gap-3 rounded-md"
                >
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
