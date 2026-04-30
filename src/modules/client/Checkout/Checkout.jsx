import React, { useMemo, useState } from "react";
import PageHeader from "../../../components/PageHeader";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { clearCart } from "../../../store/slice/cartSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import ComponentLoader from "../../../pages/ComponentLoader";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartList = useSelector((state) => state.cart.cart);
  const userInfo = useSelector((state) => state.auth.userInfo);

  const [formData, setFormData] = useState({
    fullName: null,
    email: null,
    phoneNo: null,
    city: null,
    countryInfo: { id: 1, country_name: "Bangladesh" },
    zipCode: null,
    address: null,
    bkashNo: null,
    transectionNo: null,
    cardNumber: null,
    cardExpDate: null,
    cvcNo: null,
  });
  const [paymentMethod, setPaymentMethod] = useState(1);
  const [isInvalid, setIsInvalid] = useState(false);
  const [couponCode, setCouponCode] = useState(null);
  const [couponInfo, setCouponInfo] = useState(null);
  const [isCouponLoading, setIsCouponLoading] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);

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

  const handleCouponCode = async () => {
    setIsCouponLoading(true);
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/get-match-coupon-list/${userInfo?.email}/${couponCode}`,
      );

      if (result.data?.is_valid === true && !result.data?.appliedAt) {
        setCouponInfo(result.data);
        if (result?.data?.operator === "*") {
          subTotal * 5;
        } else if (result?.data?.operator === "-") {
          subTotal - result?.data?.per_dis_amt;
        } else if (result?.data?.operator === "/") {
          subTotal / result?.data?.per_dis_amt;
        }

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Coupon Applied Successfully",
          confirmButtonText: "OK",
        });
      } else if (result.data?.is_valid === true && result.data?.appliedAt) {
        setCouponCode(null);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Coupon Already Used",
          confirmButtonText: "OK",
        });
      } else {
        setCouponCode(null);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Coupon not valid",
          confirmButtonText: "OK",
        });
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsCouponLoading(false);
    }
  };

  const handleOrderSubmit = async () => {
    try {
      setIsInvalid(false);
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to submit this order?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Ok",
      });

      if (
        !userInfo?.name ||
        !userInfo.email ||
        !formData.phoneNo ||
        !formData.countryInfo ||
        !formData.countryInfo.id ||
        !formData.countryInfo.country_name ||
        !formData.city ||
        !formData.zipCode ||
        !formData.address ||
        !cartList.length
      ) {
        setIsInvalid(true);
        Swal.fire({
          icon: "error",
          title: "Invalid or missing required fields",
          text: "Check input field",
          confirmButtonText: "OK",
        });
        return;
      }

      if (paymentMethod === 2) {
        // Bkash payment validation
        if (!formData.bkashNo || !formData.transectionNo) {
          setIsInvalid(true);
          Swal.fire({
            icon: "error",
            title: "Invalid or missing required fields",
            text: "Check input field",
            confirmButtonText: "OK",
          });
          return;
        }
      } else if (paymentMethod === 3) {
        // Card payment validation
        if (!formData.cardNumber || !formData.cardExpDate || !formData.cvcNo) {
          setIsInvalid(true);
          Swal.fire({
            icon: "error",
            title: "Invalid or missing required fields",
            text: "Check input field",
            confirmButtonText: "OK",
          });
          return;
        }
      }

      const orderList = cartList.map((item) => {
        return {
          _id: item._id,
          prod_name: item.prod_name,
          price: item.price,
          prod_image: item.prod_image,
          prod_id: item.prod_id,
          stock: item.stock,
          currency_name: item.currency_name,
          currency_id: item.currency_id,
          discount_price: item.discount_price,
          quantity: item.quantity,
        };
      });

      const data = {
        _id: null,
        full_name: userInfo?.name,
        email: userInfo?.email,
        phone_no: Number(formData.phoneNo),
        city: formData.city,
        country_name: formData.countryInfo?.country_name,
        country_id: formData.countryInfo?.id,

        zip: Number(formData.zipCode),
        address: formData.address,
        card_no: paymentMethod === 3 ? Number(formData.cardNumber) : null,
        card_exp_date: paymentMethod === 3 ? formData.card_exp_date : null,
        card_cvc: paymentMethod === 3 ? Number(formData.cvcNo) : null,
        sub_total: subTotal,
        vat_total: totalVat,
        shipping: shippingCost,
        total_amount: totalAmount,
        discount: discount || 0,
        order_status: "P",
        order_date: formData.cardExpDate,
        payment_method: paymentMethod,
        bkash_no: paymentMethod === 2 ? formData.bkashNo : null,
        bkash_trns_no: paymentMethod === 2 ? formData.transectionNo : null,
        cash_on_delivery: paymentMethod === 1 ? "Cash on delivery" : null,
        order_list: orderList,
      };
      if (confirmation.isConfirmed) {
        setIsOrderLoading(true);
        try {
          const url = `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/admin/insert-update-order-list`;
          const result = await axios.post(url, data);

          if (result.status) {
            if (couponInfo) {
              const url = await axios.patch(
                `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/update-coupon-list/${couponInfo?._id}/${couponInfo?.email}`,
              );
              console.log(url);
            }

            const updateStockPromises = cartList?.map(async (item) => {
              const newStock = item.stock - item.quantity;
              const url = `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/get-product-list/stock/${item?._id}`;

              return await axios.patch(url, { stock: newStock });
            });

            await Promise.all(updateStockPromises);

            Swal.fire({
              icon: "success",
              title: "Order Placed!",
              text: "Your order has been submitted successfully.",
              confirmButtonText: "OK",
            });
            dispatch(clearCart());
            setIsInvalid(false);
            navigate("/home");
            setFormData({
              fullName: null,
              email: null,
              phoneNo: null,
              city: null,
              countryInfo: { id: 1, country_name: "Bangladesh" },
              zipCode: null,
              address: null,
              bkashNo: null,
              transectionNo: null,
              cardNumber: null,
              cardExpDate: null,
              cvcNo: null,
            });
          }
        } finally {
          setIsOrderLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { subTotal, totalVat, totalAmount, shippingCost, discount } =
    useMemo(() => {
      const subTotal = cartList.reduce(
        (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
        0,
      );

      const shippingCost = cartList.length > 5 ? 0 : 2 * cartList.length;
      const totalVat = subTotal * 0.06;

      let discount = 0;

      if (couponInfo?.operator === "*" && !couponInfo?.appliedAt) {
        discount = subTotal * (Number(couponInfo?.per_dis_amt) / 10);
      } else if (couponInfo?.operator === "-" && !couponInfo?.appliedAt) {
        discount = Number(couponInfo?.per_dis_amt) || 0;
      } else if (couponInfo?.operator === "/" && !couponInfo?.appliedAt) {
        discount = subTotal - subTotal / (Number(couponInfo?.per_dis_amt) || 1);
      }
      const totalAmount = subTotal + totalVat + shippingCost - discount;

      return { subTotal, totalVat, totalAmount, shippingCost, discount };
    }, [cartList, couponInfo]);

  return (
    <>
      {!cartList.length ? (
        <ComponentLoader></ComponentLoader>
      ) : (
        <div className="bg-base-100 min-h-screen font-body selection:bg-accent selection:text-white">
          {/* 1. COMPACT HEADER */}
          <div className="border-b border-base-content/5 py-8">
            <div className="container mx-auto px-6 flex justify-between items-center">
              <h1 className="font-heading text-5xl font-black uppercase tracking-tighter italic">
                Check<span className="text-accent text-outline">out</span>
              </h1>
              <Link
                onClick={() => navigate(-1)}
                className="text-[10px] font-black uppercase tracking-widest border-b border-base-content pb-1 hover:text-accent hover:border-accent transition-all"
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
                    <span className="bg-base-content text-base-100 w-8 h-8 flex items-center justify-center font-heading font-black text-sm">
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
                        value={userInfo?.name}
                        className={`w-full border-b-2 ${
                          isInvalid && !userInfo.name
                            ? "border-red-600"
                            : "border-base-content/10"
                        } focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent`}
                        placeholder="John Doe"
                        disabled={userInfo?.name}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                        Email <span className="text-red-600">*</span>
                      </label>
                      <input
                        value={userInfo?.email}
                        type="email"
                        className={`w-full border-b-2 ${
                          isInvalid && !userInfo.email
                            ? "border-red-600"
                            : "border-base-content/10"
                        } focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent`}
                        placeholder="user@user.com"
                        disabled={userInfo?.email}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                        Phone No <span className="text-red-600">*</span>
                      </label>
                      <input
                        value={formData.phoneNo}
                        onChange={(e) =>
                          setFormData({ ...formData, phoneNo: e.target.value })
                        }
                        type="number"
                        className={`w-full border-b-2 ${
                          isInvalid && !formData.phoneNo
                            ? "border-red-600"
                            : "border-base-content/10"
                        } focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent`}
                        placeholder="019xxxxxx"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                        Country <span className="text-red-600">*</span>
                      </label>
                      <select
                        value={JSON.stringify(formData.countryInfo) || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            countryInfo: JSON.parse(e.target.value),
                          })
                        }
                        className={`w-full border-b-2 ${
                          isInvalid &&
                          (!formData.countryInfo || !formData.countryInfo.id)
                            ? "border-red-600"
                            : "border-base-content/10"
                        } focus:border-accent outline-none py-3 text-sm font-bold bg-transparent uppercase tracking-wider cursor-pointer`}
                      >
                        {countryList.map((item) => (
                          <option key={item.id} value={JSON.stringify(item)}>
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
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        type="text"
                        className={`w-full border-b-2 ${
                          isInvalid && !formData.city
                            ? "border-red-600"
                            : "border-base-content/10"
                        } focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent`}
                        placeholder="New York"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                        Zip Code
                      </label>
                      <input
                        value={formData.zipCode}
                        onChange={(e) =>
                          setFormData({ ...formData, zipCode: e.target.value })
                        }
                        type="number"
                        className={`w-full border-b-2 ${
                          isInvalid && !formData.zipCode
                            ? "border-red-600"
                            : "border-base-content/10"
                        } focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent`}
                        placeholder="10001"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                        Street Address
                      </label>
                      <input
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        type="text"
                        className={`w-full border-b-2 ${
                          isInvalid && !formData.address
                            ? "border-red-600"
                            : "border-base-content/10"
                        } focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent`}
                        placeholder="123 Vortex Street"
                      />
                    </div>
                  </div>
                </section>

                {/* B. PAYMENT METHOD */}
                <section>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="bg-base-content text-base-100 w-8 h-8 flex items-center justify-center font-heading font-black text-sm">
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
                          className="relative flex items-center p-4 border-2 border-base-content cursor-pointer group hover:bg-base-content hover:text-base-100 transition-all"
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
                          <div className="w-4 h-4 border-2 border-base-content flex-shrink-0 mr-3 flex items-center justify-center group-hover:border-white peer-checked:bg-accent peer-checked:border-accent">
                            <div className="w-1.5 h-1.5 bg-base-100 scale-0 peer-checked:scale-100 transition-transform"></div>
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
                        <div className="border-2 border-base-content p-6 relative">
                          <div className="flex justify-between items-center mb-6">
                            <span className="font-heading font-black text-xs uppercase tracking-widest">
                              When product arrive you must pay first then get
                              the product
                            </span>
                            <div className="flex gap-2">
                              <div className="w-8 h-5 bg-base-content/10 rounded-sm"></div>
                              <div className="w-8 h-5 bg-base-content/10 rounded-sm"></div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Credit Card Option (Your Original Design) */}
                      {paymentMethod === 2 && (
                        <div className="border-2 border-base-content p-6 relative">
                          <div className="flex justify-between items-center mb-6">
                            <span className="font-heading font-black text-xs uppercase tracking-widest">
                              Mobile Finance System
                            </span>
                            <div className="flex gap-2">
                              <div className="w-8 h-5 bg-base-content/10 rounded-sm"></div>
                              <div className="w-8 h-5 bg-base-content/10 rounded-sm"></div>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                                Account No{" "}
                                <span className="text-red-600">*</span>
                              </label>
                              <input
                                type="number"
                                value={formData.bkashNo}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    bkashNo: e.target.value,
                                  })
                                }
                                className={`w-full border-b-2 ${
                                  isInvalid && !formData.bkashNo
                                    ? "border-red-600"
                                    : "border-base-content/10"
                                } focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent`}
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
                                value={formData.transectionNo}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    transectionNo: e.target.value,
                                  })
                                }
                                className={`w-full border-b-2 ${
                                  isInvalid && !formData.transectionNo
                                    ? "border-red-600"
                                    : "border-base-content/10"
                                } focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent`}
                                placeholder="jdjdjd77djess99#"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Credit Card Option (Your Original Design) */}

                      {paymentMethod === 3 && (
                        <div className="border-2 border-base-content p-6 relative">
                          <div className="flex justify-between items-center mb-6">
                            <span className="font-heading font-black text-xs uppercase tracking-widest">
                              Card Details
                            </span>
                            <div className="flex gap-2">
                              <div className="w-8 h-5 bg-base-content/10 rounded-sm"></div>
                              <div className="w-8 h-5 bg-base-content/10 rounded-sm"></div>
                            </div>
                          </div>
                          <div className="space-y-6">
                            <input
                              value={formData.cardNumber}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  cardNumber: e.target.value,
                                })
                              }
                              type="number"
                              className={`w-full border-b-2 ${
                                isInvalid && !formData.cardNumber
                                  ? "border-red-600"
                                  : "border-base-content/10"
                              } focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent`}
                              placeholder="1222 2222 2222 2222"
                            />
                            <div className="grid grid-cols-2 gap-6">
                              <input
                                value={formData.cardExpDate}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    cardExpDate: e.target.value,
                                  })
                                }
                                type="date"
                                className={`w-full border-b-2 ${
                                  isInvalid && !formData.cardExpDate
                                    ? "border-red-600"
                                    : "border-base-content/10"
                                } focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent`}
                                placeholder="MM / YY"
                              />
                              <input
                                value={formData.cvcNo}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    cvcNo: e.target.value,
                                  })
                                }
                                type="number"
                                className={`w-full border-b-2 ${
                                  isInvalid && !formData.cvcNo
                                    ? "border-red-600"
                                    : "border-base-content/10"
                                } focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent`}
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
                <div className="sticky top-28 bg-base-200/50 p-8 border border-base-content/5 rounded-sm">
                  <h3 className="font-heading text-2xl font-black uppercase italic mb-8">
                    Order <span className="text-accent">Summary</span>
                  </h3>

                  {/* Mini Product List */}
                  <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
                    {cartList.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="w-16 h-20 bg-base-100 border border-base-content/5 flex-shrink-0">
                          <img
                            src={item.prod_image}
                            className="w-full h-full object-cover "
                            alt="thumb"
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-heading font-bold text-xs uppercase leading-tight">
                            {item.prod_name}
                          </h4>
                          <p className="text-[10px] uppercase opacity-50 font-bold mt-1">
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
                  <div className="border-t border-base-content/10 pt-6 space-y-3">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest opacity-60">
                      <span>Subtotal</span>
                      <span>${Number(subTotal).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest opacity-60">
                      <span>Shipping</span>
                      {cartList?.length > 5 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        <span>${Number(shippingCost).toFixed(2)}</span>
                      )}
                    </div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest opacity-60">
                      <span>VAT</span>
                      <span>${Number(totalVat).toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-xs font-bold uppercase tracking-widest opacity-60">
                        <span>Discount</span>
                        <span>${Number(discount).toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between font-heading font-black text-lg uppercase tracking-tighter pt-4 border-t border-base-content/5 gap-4">
                      <input
                        value={couponCode}
                        disabled={
                          couponInfo?.email &&
                          couponInfo?.is_valid == true &&
                          !couponInfo?.appliedAt
                        }
                        onChange={(e) => setCouponCode(e.target.value)}
                        type="text"
                        placeholder="Enter coupon code"
                        className="w-full border-b-2 border-base-content/10 focus:border-accent outline-none  text-sm font-bold transition-colors bg-transparent placeholder:text-black/10"
                      />

                      <button
                        onClick={handleCouponCode}
                        disabled={
                          isCouponLoading ||
                          (couponInfo?.email &&
                            couponInfo?.is_valid == true &&
                            !couponInfo?.appliedAt)
                        }
                        className="w-full bg-base-content text-base-100 py-2 font-heading font-black uppercase tracking-[0.3em] text-sm hover:bg-accent transition-all group flex items-center justify-center gap-1 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isCouponLoading ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          <>
                            Apply
                            <span className="group-hover:translate-x-2 transition-transform">
                              →
                            </span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex justify-between font-heading font-black text-lg uppercase tracking-tighter pt-4 border-t border-base-content/5 mt-4">
                      <span>Total Amount</span>
                      <span className="text-accent text-2xl">
                        ${Number(totalAmount).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Place Order Button */}
                  <button
                    onClick={handleOrderSubmit}
                    disabled={isOrderLoading}
                    className="w-full bg-base-content text-base-100 py-4 mt-10 font-heading font-black uppercase tracking-[0.3em] text-sm hover:bg-accent transition-all group flex items-center justify-center gap-3 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isOrderLoading ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      <>
                        Place Order
                        <span className="group-hover:translate-x-2 transition-transform">
                          →
                        </span>
                      </>
                    )}
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
      )}
    </>
  );
};

export default Checkout;
