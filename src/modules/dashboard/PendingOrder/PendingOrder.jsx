import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

import { useSelector } from "react-redux";
import { useLoaderData, useLocation } from "react-router";

import Swal from "sweetalert2";
import Pagination from "../../../components/Pagination";

// Static configuration moved outside to preserve memoization
const ROUTE_CONFIGS = {
  "pending-order": { current: "P", next: "W", label: "Pending" },
  warehouse: { current: "W", next: "S", label: "Warehouse" },
  shipping: { current: "S", next: "D", label: "Shipping" },
  delivery: { current: "D", next: "C", label: "Delivery" },
  completed: { current: "C", next: null, label: "Completed" },
  rejected: { current: "R", next: null, label: "Rejected" },
};

const STATUS_MAP = {
  P: "Pending",
  W: "Warehouse",
  S: "Shipping",
  D: "Delivery",
  C: "Completed",
  R: "Rejected",
};

const STATUS_STEPS = [
  "Pending",
  "Warehouse",
  "Shipping",
  "Delivery",
  "Completed",
];

const PendingOrder = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { orders } = useLoaderData();

  const [orderList, setOrderList] = useState(orders?.list_data);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const location = useLocation();

  // Memoize config to prevent "Existing memoization could not be preserved" error
  const config = useMemo(() => {
    const currentPath = location.pathname.split("/").pop();
    return ROUTE_CONFIGS[currentPath] || ROUTE_CONFIGS["pending-order"];
  }, [location.pathname]);

  // Handle page reset in a stable way
  useEffect(() => {
    setTimeout(() => {
      setCurrentPage(1);
    }, 0);
  }, [config.current, searchQuery]);

  const filterOrderList = useMemo(() => {
    const currentStatus = config.current;

    let list =
      orderList?.filter((order) => order.order_status === currentStatus) || [];

    if (!searchQuery) return list;

    const lowSearch = searchQuery.toLowerCase();
    return list.filter((item) => {
      return Object.values(item).some((value) =>
        String(value).toLowerCase().includes(lowSearch),
      );
    });
  }, [searchQuery, orderList, config.current]);

  const totalPages = Math.ceil(filterOrderList?.length / itemsPerPage);

  const paginatedproductList = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filterOrderList?.slice(start, start + itemsPerPage);
  }, [filterOrderList, currentPage]);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleDetails = (data) => {
    setSelectedOrder(data);
    setIsDetailsOpen(true);
  };

  const currentStatus = STATUS_MAP[selectedOrder?.order_status] || "Pending";

  const handleStatusUpdate = async (item, targetStatus = null) => {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text:
        targetStatus === "R"
          ? "Do you want to reject this order?"
          : "Do you want to submit?",
      icon: targetStatus === "R" ? "error" : "warning",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Ok",
    });

    const newStatus = targetStatus || config.next;
    if (!newStatus) return;

    const data = {
      _id: item._id,
      order_status: newStatus,
      user_info: userInfo?.email,
    };

    console.log("data", data);
    try {
      if (confirmation.isConfirmed) {
        Swal.fire({
          title: "Processing...",
          text: "Please wait...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        const result = await axios.patch(
          `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/admin/update-order-status/${item._id}`,
          data,
        );
        if (result.data.status) {
          Swal.close();
          Swal.fire({
            icon: "success",
            title: `${result.data.message}`,
            text: `${result.data.message}`,
            confirmButtonText: "OK",
          });
          const updatedOrder = {
            ...item,
            order_status: result.data?.status_code || newStatus,
          };

          const index = orderList?.findIndex((order) => order._id === item._id);

          if (index > -1) {
            const updatedList = [...orderList];
            updatedList[index] = updatedOrder;
            setOrderList(updatedList);
          } else {
            setOrderList([updatedOrder, ...orderList]);
          }
        }
      }
    } catch (err) {
      console.log(err);
      Swal.close();
    }
  };

  return (
    <div>
      <div className="p-4 min-h-screen bg-base-100 relative overflow-x-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6">
          <div>
            <h1 className="font-heading text-3xl md:text-5xl font-black uppercase tracking-tighter text-base-content">
              {config.label}{" "}
              <span className="text-accent text-outline">Orders</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mt-2">
              Manage {config.label} Orders
            </p>
          </div>
        </div>

        <div className="mb-8 relative max-w-full md:max-w-md">
          <label className="text-[10px] font-black uppercase tracking-widest opacity-50 block mb-2">
            Search {config.label} Orders
          </label>

          <div className="relative flex items-center">
            <span className="material-icons absolute left-0 text-sm opacity-30">
              search
            </span>
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              type="text"
              placeholder="search"
              className="w-full bg-transparent border-b-2 border-base-content/10 focus:border-accent outline-none py-3 pl-7 text-xs font-bold tracking-widest transition-all placeholder:opacity-20"
            />
          </div>
        </div>

        <div className="bg-base-100 border border-base-content/5 rounded-sm shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="hidden md:table-header-group bg-base-200/50 font-heading text-[10px] uppercase tracking-widest font-black opacity-40">
              <tr className="text-left border-b border-base-content/10">
                <th className="px-6 py-4">SL</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Total Bill</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {paginatedproductList?.length > 0 ? (
                paginatedproductList.map((item, index) => (
                  <tr
                    key={item._id}
                    className="hover:bg-base-200/30 transition-colors group"
                  >
                    {/* 1. SL */}
                    <td className="px-6 py-4 text-xs font-bold">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>

                    {/* 2. Name */}
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold uppercase tracking-tighter">
                        {item.full_name}
                      </span>
                    </td>

                    {/* 3. Email */}
                    <td className="px-6 py-4">
                      <span className="text-[11px] font-medium opacity-70">
                        {item.email}
                      </span>
                    </td>

                    {/* 4. Contact */}
                    <td className="px-6 py-4">
                      <span className="text-[11px] font-mono">
                        {item.phone_no}
                      </span>
                    </td>

                    {/* 5. Date */}
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-black opacity-40 uppercase">
                        {item.order_date}
                      </span>
                    </td>

                    {/* 6. Items Count */}
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold">
                        {item.order_list?.length || 0}{" "}
                        <span className="text-[9px] opacity-40">ITEMS</span>
                      </span>
                    </td>

                    {/* 7. Total Bill */}
                    <td className="px-6 py-4">
                      <span className="text-xs font-black text-accent">
                        ${item.total_amount}
                      </span>
                    </td>

                    {/* 9. Action */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-3">
                        {/* Details Button */}
                        <button
                          onClick={() => handleDetails(item)}
                          className="group relative px-3 py-1.5 font-bold text-white transition-all duration-300 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl hover:from-indigo-600 hover:to-blue-700 hover:shadow-[0_10px_20px_rgba(79,_70,_229,_0.4)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                        >
                          <span className="flex items-center gap-2 text-[11px] uppercase tracking-wider">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            Details
                          </span>
                        </button>

                        {/* Reject Button */}
                        {config.next && (
                          <button
                            onClick={() => handleStatusUpdate(item, "R")}
                            className="group relative px-3 py-1.5 font-bold text-white transition-all duration-300 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl hover:from-red-600 hover:to-rose-700 hover:shadow-[0_10px_20px_rgba(225,_29,_72,_0.4)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                          >
                            <span className="flex items-center gap-2 text-[11px] uppercase tracking-wider">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                              Reject
                            </span>
                          </button>
                        )}

                        {/* Approve Button (Hidden on Completed) */}
                        {config.next && (
                          <button
                            onClick={() => handleStatusUpdate(item)}
                            className="group relative px-3 py-1.5 font-bold text-white transition-all duration-300 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl hover:from-emerald-600 hover:to-teal-700 hover:shadow-[0_10px_20px_rgba(16,_185,_129,_0.4)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                          >
                            <span className="flex items-center gap-2 text-[11px] uppercase tracking-wider">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              {config.next === "W"
                                ? "To Warehouse"
                                : config.next === "S"
                                  ? "To Shipping"
                                  : config.next === "D"
                                    ? "To Delivery"
                                    : "Complete"}
                            </span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-8 py-12 text-center opacity-30 text-[10px] font-black uppercase tracking-widest"
                  >
                    No pending orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        <aside
          className={`fixed top-0 right-0 h-full w-full max-w-xl bg-base-100 z-[101] shadow-[-20px_0px_50px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-out transform ${
            isDetailsOpen ? "translate-x-0" : "translate-x-full"
          } border-l border-base-content/5`}
        >
          {selectedOrder && (
            <div className="h-full flex flex-col p-8 relative">
              {/* Floating Close Button */}
              <button
                onClick={() => setIsDetailsOpen(false)}
                className={`absolute top-8 left-[-50px] md:left-[-60px] w-10 h-10 bg-base-100 border border-base-content/10 flex items-center justify-center rounded-full hover:bg-accent hover:text-white transition-all shadow-xl group z-[102] ${
                  isDetailsOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                <span className="material-icons text-sm group-hover:rotate-90 transition-transform">
                  close
                </span>
              </button>
              {/* Header */}
              <div className="mb-8 flex-shrink-0">
                <h2 className="font-heading text-3xl font-black uppercase tracking-tighter text-base-content">
                  Order <span className="text-accent">Details</span>
                </h2>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mt-2">
                  ORDER ID: {selectedOrder._id}
                </p>
              </div>
              {/* Scrollable Body */}
              <div className="flex-grow overflow-y-auto pr-4 custom-scrollbar space-y-10">
                {/* TRACKING STATUS VISUALIZER */}
                <div className="mb-10 bg-base-200/50 p-6 rounded-sm border border-base-content/5">
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-sm font-black uppercase tracking-widest opacity-40">
                      Live Tracking Status
                    </p>
                    <p className="text-xs font-bold text-accent">
                      Date: {selectedOrder.order_date}
                    </p>
                  </div>
                  <div className="flex justify-between relative w-full px-2">
                    {/* Progress Line */}
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-base-content/10 -translate-y-1/2 z-0"></div>

                    {STATUS_STEPS.map((step, index) => {
                      const isCurrent = step === currentStatus;
                      const isPast =
                        STATUS_STEPS.indexOf(currentStatus) >= index;

                      return (
                        <div
                          key={step}
                          className="relative z-10 flex flex-col items-center gap-1.5 sm:gap-2"
                        >
                          {/* Status Dot */}
                          <div
                            className={`transition-all duration-300 rounded-full border-2 
            ${
              isCurrent
                ? "bg-accent border-accent scale-125 shadow-lg shadow-accent/40"
                : isPast
                  ? "bg-base-content border-base-content"
                  : "bg-base-100 border-base-content/10"
            }
            w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4`}
                          ></div>

                          {/* Status Label */}
                          <span
                            className={`font-black uppercase tracking-tighter transition-colors duration-300
            ${isCurrent ? "text-accent" : "opacity-40"} 
            text-[10px] sm:text-xs`}
                          >
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CUSTOMER SHIPPING INFORMATION - NEW SECTION */}
                <div className="mb-10 space-y-4 border-l-2 border-base-content/10 pl-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-accent">
                    Shipping Information
                  </p>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="text-xs font-black uppercase opacity-30 block mb-1">
                        Recipient
                      </label>
                      <p className="text-sm font-bold uppercase tracking-tight">
                        {selectedOrder.full_name}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-black uppercase opacity-30 block mb-1">
                        Email
                      </label>
                      <p className="text-sm font-bold">{selectedOrder.email}</p>
                    </div>
                    <div>
                      <label className="text-xs font-black uppercase opacity-30 block mb-1">
                        Address
                      </label>
                      <p className="text-sm font-medium opacity-70 leading-relaxed">
                        {selectedOrder.address}, {selectedOrder.city},{" "}
                        {selectedOrder.zip}, {selectedOrder.country_name} (
                        {selectedOrder.country_id})
                      </p>
                    </div>
                    <div className="flex gap-10">
                      <div>
                        <label className="text-xs font-black uppercase opacity-30 block mb-1">
                          Contact
                        </label>
                        <p className="text-sm font-mono font-bold">
                          {selectedOrder.phone_no}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-black uppercase opacity-30 block mb-1">
                          Payment Mode
                        </label>
                        <p className="text-sm font-bold uppercase tracking-tighter">
                          {selectedOrder.payment_method === 1
                            ? "Cash"
                            : selectedOrder.payment_method === 2
                              ? "bKash"
                              : "Card"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PAYMENT INFORMATION */}
                <div className="mb-10 space-y-4 border-l-2 border-base-content/10 pl-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-accent">
                    Payment Details
                  </p>
                  <div className="grid grid-cols-1 gap-4">
                    {selectedOrder.payment_method === 2 && (
                      <div className="flex gap-10">
                        <div>
                          <label className="text-[8px] font-black uppercase opacity-30 block">
                            bKash No
                          </label>
                          <p className="text-[10px] font-bold uppercase">
                            {selectedOrder.bkash_no}
                          </p>
                        </div>
                        <div>
                          <label className="text-[8px] font-black uppercase opacity-30 block">
                            Trns ID
                          </label>
                          <p className="text-[10px] font-bold uppercase">
                            {selectedOrder.bkash_trns_no}
                          </p>
                        </div>
                      </div>
                    )}
                    {selectedOrder.payment_method === 3 && (
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="text-[8px] font-black uppercase opacity-30 block">
                            Card No
                          </label>
                          <p className="text-[10px] font-bold uppercase">
                            {selectedOrder.card_no}
                          </p>
                        </div>
                        <div>
                          <label className="text-[8px] font-black uppercase opacity-30 block">
                            Exp Date
                          </label>
                          <p className="text-[10px] font-bold uppercase">
                            {selectedOrder.card_exp_date}
                          </p>
                        </div>
                        <div>
                          <label className="text-[8px] font-black uppercase opacity-30 block">
                            CVC
                          </label>
                          <p className="text-[10px] font-bold uppercase">
                            {selectedOrder.card_cvc}
                          </p>
                        </div>
                      </div>
                    )}
                    {selectedOrder.payment_method === 1 && (
                      <div>
                        <label className="text-[8px] font-black uppercase opacity-30 block">
                          COD Note
                        </label>
                        <p className="text-[10px] font-bold uppercase">
                          {selectedOrder.cash_on_delivery}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* PRODUCT DETAILS LIST */}
                <div className="mb-10">
                  <p className="text-sm font-black uppercase tracking-widest border-b border-base-content/10 pb-3 mb-6">
                    Items Ordered
                  </p>
                  <div
                    className={`${selectedOrder.order_list?.length > 2 ? "max-h-[400px] overflow-y-auto pr-2 custom-scrollbar" : ""}`}
                  >
                    <div className="space-y-4">
                      {selectedOrder.order_list?.map((item, index) => (
                        <div
                          key={index}
                          className="p-4 bg-base-200/30 border border-base-content/5 rounded-sm flex flex-col sm:flex-row gap-6"
                        >
                          {/* Item Image */}
                          <div className="w-20 h-20 bg-white p-1 border border-base-content/10 flex-shrink-0 mx-auto sm:mx-0">
                            <img
                              src={item.prod_image}
                              className="w-full h-full object-contain"
                              alt={item.prod_name}
                            />
                          </div>

                          {/* Specific Fields */}
                          <div className="flex-grow">
                            <h4 className="font-heading font-black text-sm uppercase tracking-tight text-accent mb-3 text-center sm:text-left">
                              {item.prod_name}
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-[10px] font-black uppercase opacity-30 block">
                                  Product ID
                                </label>
                                <p className="text-xs font-bold">
                                  {item.prod_id}
                                </p>
                              </div>
                              <div>
                                <label className="text-[10px] font-black uppercase opacity-30 block">
                                  Price
                                </label>
                                <p className="text-xs font-bold">
                                  {item.price} {item.currency_name}
                                </p>
                              </div>
                              <div>
                                <label className="text-[10px] font-black uppercase opacity-30 block">
                                  Discount
                                </label>
                                <p className="text-xs font-bold text-green-600">
                                  {item.discount_price || 0}{" "}
                                  {item.currency_name}
                                </p>
                              </div>
                              <div>
                                <label className="text-[10px] font-black uppercase opacity-30 block">
                                  Quantity
                                </label>
                                <p className="text-xs font-bold">
                                  {item.quantity} PCS
                                </p>
                              </div>
                              <div>
                                <label className="text-[10px] font-black uppercase opacity-30 block">
                                  In Stock
                                </label>
                                <p className="text-xs font-bold">
                                  {item.stock} PCS
                                </p>
                              </div>
                              <div>
                                <label className="text-[10px] font-black uppercase opacity-30 block text-accent">
                                  Subtotal
                                </label>
                                <p className="text-xs font-black text-accent">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>{" "}
              {/* Close Scrollable Body */}
              {/* TOTALS */}
              <div className="mt-auto pt-8 border-t-2 border-base-content space-y-2">
                <div className="flex justify-between text-xs font-black uppercase opacity-40">
                  <span>Subtotal</span>
                  <span>
                    ${selectedOrder.sub_total} {selectedOrder.currency_name}
                  </span>
                </div>
                <div className="flex justify-between text-xs font-black uppercase opacity-40">
                  <span>VAT Total</span>
                  <span>${selectedOrder.vat_total}</span>
                </div>
                <div className="flex justify-between text-xs font-black uppercase opacity-40">
                  <span>Shipping Cost</span>
                  <span>${selectedOrder.shipping}</span>
                </div>
                <div className="flex justify-between text-xs font-black uppercase opacity-40 pt-3 border-t border-base-content/5 mt-3">
                  <span>Created At</span>
                  <span>{selectedOrder.createdAt}</span>
                </div>
                <div className="flex justify-between text-xs font-black uppercase opacity-40">
                  <span>Order Date</span>
                  <span>{selectedOrder.order_date}</span>
                </div>

                <div className="flex justify-between font-heading font-black text-2xl uppercase mt-4">
                  <span>Total Amount</span>
                  <span className="text-accent">
                    ${selectedOrder.total_amount}
                  </span>
                </div>
              </div>
              {/* Footer Actions */}
              <div className="flex item-center gap-2 justify-center pt-8 border-t border-base-content/5 mt-auto bg-base-100">
                <button
                  onClick={() => setIsDetailsOpen(false)}
                  className="group relative px-3 py-1.5 font-bold text-base-100 transition-all duration-300 bg-base-content from-red-500 to-rose-600 rounded-xl hover:from-red-600 hover:to-rose-700 hover:shadow-[0_10px_20px_rgba(225,_29,_72,_0.4)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  Close Panel
                </button>

                {config.next && (
                  <button
                    onClick={() => handleStatusUpdate(selectedOrder, "R")}
                    className="group relative px-3 py-1.5 font-bold text-white transition-all duration-300 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl hover:from-red-600 hover:to-rose-700 hover:shadow-[0_10px_20px_rgba(225,_29,_72,_0.4)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <span className="flex items-center gap-2 text-[11px] uppercase tracking-wider">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Reject
                    </span>
                  </button>
                )}

                {config.next && (
                  <button
                    onClick={() => handleStatusUpdate(selectedOrder)}
                    className="group relative px-3 py-1.5 font-bold text-white transition-all duration-300 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl hover:from-emerald-600 hover:to-teal-700 hover:shadow-[0_10px_20px_rgba(16,_185,_129,_0.4)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <span className="flex items-center gap-2 text-[11px] uppercase tracking-wider">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {config.next === "W"
                        ? "To Warehouse"
                        : config.next === "S"
                          ? "To Shipping"
                          : config.next === "D"
                            ? "To Delivery"
                            : "Complete"}
                    </span>
                  </button>
                )}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default PendingOrder;
