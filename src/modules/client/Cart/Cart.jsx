import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQty,
  decrementQty,
  removeFromCart,
  clearCart,
} from "../../../store/slice/cartSlice.js";
import PageHeader from "../../../components/PageHeader";
import { Link, useNavigate } from "react-router";

const Cart = () => {
  const pageInfo = [
    {
      parent_route_name: "",
      path: "",
    },
    {
      curren_route: "Manage your cart",
    },
    {
      first_name: "Your",
      last_name: "Cart",
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartList = useSelector((state) => state.cart.cart);

  // const totalPrice = cartList.reduce(
  //   (acc, item) => acc + item.price * item.quantity,
  //   0,
  // );

  const handleItemIncrement = (product) => {
    dispatch(incrementQty(product._id));
  };

  const handleItemdecrement = (product) => {
    dispatch(decrementQty(product._id));
  };

  const handleRemoveItem = (product) => {
    dispatch(removeFromCart(product._id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
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

  const totalTax = useMemo(() => {
    return subTotal * 0.06;
  }, [subTotal]);
  return (
    <div>
      {cartList.length}
      <div className="bg-white min-h-screen font-body selection:bg-accent selection:text-white">
        <PageHeader pageInfo={pageInfo}></PageHeader>

        {/* 2. MAIN CONTENT */}
        <div className="container mx-auto px-6 py-10">
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
                    {cartList.map((item, index) => (
                      <tr key={index} className="group">
                        {/* Product Name & Image */}
                        <td className="py-8">
                          <div className="flex items-center gap-6">
                            <div className="w-20 h-24 bg-base-200 flex-shrink-0 rounded-sm overflow-hidden border border-black/5">
                              <img
                                src={item.prod_image}
                                className="w-full h-full object-cover mix-blend-multiply"
                                alt="product"
                              />
                            </div>
                            <div>
                              <h4 className="font-heading font-black uppercase text-sm leading-tight">
                                {item.prod_name}
                              </h4>
                              <p className="text-[10px] uppercase font-bold opacity-40 mt-1 tracking-widest">
                                Size: Standard
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="py-8 text-center font-heading font-bold text-sm">
                          ${item.price}
                        </td>

                        {/* Quantity Selector */}
                        <td className="py-8 text-center">
                          <div className="inline-flex items-center border border-black/10 px-2 py-1 gap-4">
                            <button
                              onClick={() => handleItemdecrement(item)}
                              className="hover:text-accent font-black text-xl cursor-pointer"
                            >
                              -
                            </button>
                            <span className="font-heading font-bold text-md ">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleItemIncrement(item)}
                              className="hover:text-accent font-black text-xl cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </td>

                        {/* Total */}
                        <td className="py-8 text-center font-heading font-black text-accent text-sm">
                          ${item.price * item.quantity}
                        </td>

                        {/* Action */}
                        <td className="py-8 text-right">
                          <button
                            onClick={() => handleRemoveItem(item)}
                            className="text-[10px] font-black uppercase tracking-tighter hover:text-red-500 transition-colors underline decoration-2 underline-offset-4"
                          >
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
                <Link
                  onClick={() => navigate(-1)}
                  className="text-xs font-heading font-black uppercase tracking-widest border-b-2 border-black pb-1 hover:border-accent hover:text-accent transition-all"
                >
                  ← Continue Shopping
                </Link>
                <button
                  onClick={() => handleClearCart()}
                  className="text-xs font-heading font-black uppercase tracking-widest opacity-40 hover:opacity-100 cursor-pointer"
                >
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
                    <span>${Number(subTotal).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-heading font-bold text-xs uppercase tracking-widest">
                    <span className="opacity-50">Shipping</span>
                    {cartList?.length > 5 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      <span>${Number(shippingCost).toFixed(2)}</span>
                    )}
                  </div>
                  <div className="flex justify-between font-heading font-bold text-xs uppercase tracking-widest">
                    <span className="opacity-50">Estimated Tax</span>
                    <span>${Number(totalTax).toFixed(2)}</span>
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
                      ${Number(subTotal + shippingCost + totalTax)?.toFixed(2)}
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
