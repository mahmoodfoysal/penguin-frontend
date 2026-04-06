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
import EmptyScreen from "../../../pages/EmptyScreen.jsx";

const Cart = () => {
  const emptyInfo = {
    first: "Cart is",
    second: "empty",
  };
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

  const handleCheckOut = () => {
    navigate("/checkout");
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
      <PageHeader pageInfo={pageInfo}></PageHeader>
      {!cartList.length ? (
        <EmptyScreen text={emptyInfo}></EmptyScreen>
      ) : (
        <div className="bg-white min-h-screen font-body selection:bg-accent selection:text-white">
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
                            <span
                              onClick={() => handleRemoveItem(item)}
                              class="material-icons cursor-pointer hover:text-red-600"
                            >
                              delete_outline
                            </span>
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
                      <span>${Number(totalVat).toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between font-heading font-black text-lg uppercase tracking-tighter pt-4 border-t border-black/5 mt-4">
                      <span>Total Amount</span>
                      <span className="text-accent text-2xl">
                        ${Number(subTotal + shippingCost + totalVat).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-10 space-y-3">
                    <button
                      onClick={handleCheckOut}
                      className="w-full bg-black text-white py-4 font-heading font-black uppercase tracking-[0.3em] text-sm hover:bg-accent transition-colors shadow-xl shadow-black/10 rounded-md cursor-pointer"
                    >
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
        </div>
      )}
    </div>
  );
};

export default Cart;
