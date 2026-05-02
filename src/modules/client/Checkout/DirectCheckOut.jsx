import React, { useMemo, useState } from "react";
import PageHeader from "../../../components/PageHeader";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setOrderProduct } from "../../../store/slice/buyProduct";
import axios from "axios";
import {
  showSuccess,
  showError,
  showConfirmation,
  showProcessing,
} from "../../../components/Alert";

import ComponentLoader from "../../../pages/ComponentLoader";
const DirectCheckOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderProduct = useSelector((state) => state.buy.orderProduct);
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

  const subTotal =
    (Number(orderProduct?.price) || 0) * (Number(orderProduct?.quantity) || 0);
  const totalVat = 0.6;
  const shippingCost = 2;

  const discount = useMemo(() => {
    if (!couponInfo || !subTotal) return 0;
    const disAmt = Number(couponInfo.per_dis_amt) || 0;
    if (couponInfo.operator === "-") return disAmt;
    if (couponInfo.operator === "*") return (subTotal * disAmt) / 100;
    return 0;
  }, [couponInfo, subTotal]);

  const totalAmount = subTotal + totalVat + shippingCost - discount;

  const handleCouponCode = async () => {
    setIsCouponLoading(true);
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/get-match-coupon-list/${userInfo?.email}/${couponCode}`,
      );

      if (result.data?.is_valid === true && !result.data?.appliedAt) {
        setCouponInfo(result.data);
        showSuccess("Success", "Coupon Applied Successfully");
      } else if (result.data?.is_valid === true && result.data?.appliedAt) {
        showError("Error", "Coupon already used");
      } else {
        showError("Error", "Coupon not valid");
      }
    } catch (error) {
      showError(
        "Coupon Error",
        error.response?.data?.message ||
          error.message ||
          "Failed to apply coupon",
      );
    } finally {
      setIsCouponLoading(false);
    }
  };

  const handleOrderSubmit = async () => {
    try {
      setIsInvalid(false);

      // 1. General Validation
      if (
        !userInfo?.name ||
        !userInfo?.email ||
        !formData.phoneNo ||
        !formData.countryInfo ||
        !formData.countryInfo.id ||
        !formData.countryInfo.country_name ||
        !formData.city ||
        !formData.zipCode ||
        !formData.address ||
        !orderProduct
      ) {
        setIsInvalid(true);
        showError("Invalid or missing required fields", "Check input field");
        return;
      }


      // 2. Payment Specific Validation
      if (paymentMethod === 2) {
        // Bkash payment validation
        if (!formData.bkashNo || !formData.transectionNo) {
          setIsInvalid(true);
          showError("Invalid or missing required fields", "Check input field");
          return;
        }
      } else if (paymentMethod === 3) {
        // Card payment validation
        if (!formData.cardNumber || !formData.cardExpDate || !formData.cvcNo) {
          setIsInvalid(true);
          showError("Invalid or missing required fields", "Check input field");
          return;
        }
      }

      // 3. Confirmation
      const confirmation = await showConfirmation(
        "Confirm Order",
        "Do you want to submit this order?",
      );

      if (!confirmation.isConfirmed) return;

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
        card_exp_date: paymentMethod === 3 ? formData.cardExpDate : null,
        card_cvc: paymentMethod === 3 ? Number(formData.cvcNo) : null,
        sub_total: subTotal,
        vat_total: totalVat,
        shipping: shippingCost,
        total_amount: totalAmount,
        order_status: "P",
        order_date: new Date().toISOString(),

        payment_method: paymentMethod,
        bkash_no: paymentMethod === 2 ? formData.bkashNo : null,
        bkash_trns_no: paymentMethod === 2 ? formData.transectionNo : null,
        cash_on_delivery: paymentMethod === 1 ? "Cash on delivery" : null,
        order_list: [
          {
            _id: orderProduct._id,
            prod_name: orderProduct.prod_name,
            price: orderProduct.price,
            prod_image: orderProduct.prod_image,
            prod_id: orderProduct.prod_id,
            stock: orderProduct.stock,
            currency_name: orderProduct.currency_name,
            currency_id: orderProduct.currency_id,
            discount_price: orderProduct.discount_price,
            quantity: orderProduct.quantity,
          },
        ],
        discount: discount || 0,
      };

      setIsOrderLoading(true);
      showProcessing();
      const result = await axios.post(
        `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/admin/insert-update-order-list`,
        data,
      );

      if (result.data.status) {
        if (couponInfo) {
          await axios.patch(
            `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/update-coupon-list/${couponInfo?._id}/${userInfo?.email}`,
          );
        }

        const newStock = orderProduct.stock - orderProduct.quantity;
        const stockUrl = `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/get-product-list/stock/${orderProduct?._id}`;
        await axios.patch(stockUrl, { stock: newStock });

        await showSuccess("Order Success", result.data.message);
        dispatch(setOrderProduct(null));
        navigate("/home");
      }
    } catch (err) {
      showError(
        "Submission Failed",
        err.response?.data?.message || err.message,
      );
    } finally {
      setIsOrderLoading(false);
    }
  };

  const handleItemIncrement = () => {
    dispatch(
      setOrderProduct({
        ...orderProduct,
        quantity: (orderProduct.quantity || 1) + 1,
      }),
    );
  };

  const handleItemDecrement = () => {
    if (orderProduct.quantity > 1) {
      dispatch(
        setOrderProduct({
          ...orderProduct,
          quantity: orderProduct.quantity - 1,
        }),
      );
    }
  };

  const handleRemoveItem = () => {
    dispatch(setOrderProduct({}));
    navigate(-1);
  };

  return (
    <>
      {!orderProduct ? (
        <ComponentLoader></ComponentLoader>
      ) : (
        <div className="bg-base-100 min-h-screen font-body selection:bg-accent selection:text-white">
          {/* 1. COMPACT HEADER */}
          <div className="border-b border-base-content/5 py-8">
            <div className="container mx-auto px-6 flex justify-between items-center">
              <h1 className="font-heading text-5xl font-black uppercase tracking-tighter ">
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
                        disabled
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
                        disabled
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
                  <h3 className="font-heading text-2xl font-black uppercase  mb-8">
                    Order <span className="text-accent">Summary</span>
                  </h3>

                  {/* Mini Product List */}
                  <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
                    <div className="flex gap-4 items-start border-b border-base-content/5 pb-4 last:border-0">
                      {/* 1. PRODUCT THUMBNAIL */}
                      <div className="w-16 h-20 bg-base-100 border border-base-content/10 flex-shrink-0 relative group">
                        <img
                          src={orderProduct.prod_image}
                          className="w-full h-full object-cover "
                          alt="thumb"
                        />
                        {/* Subtle accent corner */}
                        <div className="absolute top-0 left-0 w-1 h-1 bg-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>

                      {/* 2. PRODUCT DETAILS */}
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <h4 className="font-heading font-black text-[10px] md:text-xs uppercase leading-tight tracking-tight max-w-[120px]">
                            {orderProduct.prod_name}
                          </h4>
                          {/* Price - Bold/ to stand out */}
                          <p className="font-heading font-black text-xs  text-accent">
                            $
                            {(
                              orderProduct.price * orderProduct.quantity
                            ).toFixed(2)}
                          </p>
                        </div>

                        <p className="text-[9px] uppercase opacity-40 font-bold mt-1 tracking-widest">
                          Size: std
                        </p>

                        {/* 3. QUANTITY CONTROLLER (INTEGRATED) */}
                        <div className="flex items-center mt-3">
                          <div className="flex items-center border border-base-content h-7">
                            {/* Decrement Button */}
                            <button
                              onClick={handleItemDecrement}
                              className="w-7 h-full flex items-center justify-center hover:bg-base-content hover:text-base-100 transition-colors border-r border-base-content cursor-pointer"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={4}
                                stroke="currentColor"
                                className="w-2.5 h-2.5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 12h14"
                                />
                              </svg>
                            </button>

                            {/* Value Display */}
                            <div className="px-3 h-full flex items-center justify-center min-w-[30px]">
                              <span className="font-heading font-black text-[10px] ">
                                {orderProduct.quantity}
                              </span>
                            </div>

                            {/* Increment Button */}
                            <button
                              onClick={handleItemIncrement}
                              className="cursor-pointer w-7 h-full flex items-center justify-center hover:bg-base-content hover:text-base-100 transition-colors border-l border-base-content"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={4}
                                stroke="currentColor"
                                className="w-2.5 h-2.5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 4.5v15m7.5-7.5h-15"
                                />
                              </svg>
                            </button>
                          </div>

                          {/* Remove/Delete Icon (As requested previously) */}
                          <button
                            onClick={handleRemoveItem}
                            className="ml-auto text-base-content/20 hover:text-red-500 transition-colors"
                          >
                            <span className="material-icons cursor-pointer hover:text-red-600">
                              delete_outline
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Totals */}
                  <div className="border-t border-base-content/10 pt-6 space-y-3">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest opacity-60">
                      <span>Subtotal</span>
                      <span>${Number(subTotal).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest opacity-60">
                      <span>Shipping</span>
                      <span>${Number(shippingCost).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest opacity-60">
                      <span>VAT</span>
                      <span>${Number(totalVat).toFixed(2)}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-green-600">
                        <span>Discount</span>
                        <span>-${Number(discount).toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between font-heading font-black text-lg uppercase tracking-tighter pt-4 border-t border-base-content/5 gap-4">
                      <input
                        value={couponCode}
                        disabled={
                          couponInfo?.is_valid == true && !couponInfo?.appliedAt
                        }
                        onChange={(e) => setCouponCode(e.target.value)}
                        type="text"
                        placeholder="Enter coupon code"
                        className="w-full border-b-2 border-base-content/10 focus:border-accent outline-none text-sm font-bold transition-colors bg-transparent placeholder:bg-base-100 text-base-content"
                      />

                      <button
                        onClick={handleCouponCode}
                        disabled={
                          isCouponLoading ||
                          (couponInfo?.is_valid == true &&
                            !couponInfo?.appliedAt)
                        }
                        className="w-full bg-base-content text-base-100 py-2 font-heading font-black uppercase tracking-[0.3em] text-[10px] hover:bg-accent transition-all group flex items-center justify-center gap-1 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isCouponLoading ? (
                          <span className="loading loading-spinner loading-xs"></span>
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

export default DirectCheckOut;
