import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import Pagination from "../../../components/Pagination";


const OrderHistory = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [orderList, setOrderList] = useState([]);
  const [activeTab, setActiveTab] = useState("orders");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;


  const statusSteps = [
    "Pending",
    "Warehouse",
    "Shipping",
    "Delivery",
    "Completed",
  ];
  const statusMap = {
    P: "Pending",
    W: "Warehouse",
    S: "Shipping",
    D: "Delivery",
    C: "Completed",
    R: "Rejected",
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userInfo?.email) return;
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/get-order-list/${userInfo.email}`,
        );
        if (res.data?.list_data) {
          setOrderList(res.data.list_data);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [userInfo?.email]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const filteredOrders = useMemo(() => {

    if (activeTab === "orders") {
      return orderList.filter((o) => o.order_status !== "C" && o.order_status !== "R");
    } else if (activeTab === "history") {
      return orderList.filter((o) => o.order_status === "C");
    } else if (activeTab === "cancel") {
      return orderList.filter((o) => o.order_status === "R");
    }
    return [];
  }, [orderList, activeTab]);

  const totalPages = Math.ceil(filteredOrders?.length / itemsPerPage);

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrders?.slice(start, start + itemsPerPage);
  }, [filteredOrders, currentPage]);

  const handleViewDetails = (order) => {

    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter text-base-content italic">
            My <span className="text-accent text-outline">Orders</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mt-4">
            Track and manage your purchase history
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-10">
          <div className="bg-base-100 p-1.5 rounded-2xl shadow-xl flex gap-2 border border-base-content/5">
            {["orders", "history", "cancel"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-xl font-heading font-bold uppercase text-[10px] tracking-widest transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-base-content text-base-100 shadow-lg"
                    : "opacity-40 hover:opacity-100 hover:bg-base-200"
                }`}
              >
                {tab === "orders"
                  ? "Active Orders"
                  : tab === "history"
                    ? "Order History"
                    : "Cancelled"}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-bars loading-lg text-accent"></span>
          </div>
        ) : paginatedOrders.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {paginatedOrders.map((order) => (
                <div
                  key={order._id}
                  className="group bg-base-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-base-content/5 hover:-translate-y-2 relative"
                >
                  {/* Status Badge Overlay */}
                  <div className="absolute top-4 right-4 z-10">
                    <span
                      className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border ${
                        order.order_status === "C"
                          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                          : order.order_status === "R"
                            ? "bg-rose-500/10 text-rose-500 border-rose-500/20"
                            : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                      }`}
                    >
                      {statusMap[order.order_status]}
                    </span>
                  </div>

                  <div className="p-8">
                    {/* Order Meta */}
                    <div className="mb-6">
                      <p className="text-[9px] font-black uppercase opacity-30 tracking-widest mb-1">
                        Order ID: {order._id.slice(-8).toUpperCase()}
                      </p>
                      <p className="text-[10px] font-bold opacity-60">
                        Placed on{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Product Preview */}
                    <div className="flex gap-4 mb-8">
                      <div className="flex -space-x-4">
                        {order.order_list.slice(0, 3).map((item, i) => (
                          <div
                            key={i}
                            className="w-12 h-12 rounded-xl border-4 border-base-100 bg-white overflow-hidden shadow-sm"
                          >
                            <img
                              src={item.prod_image}
                              alt="product"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        ))}
                        {order.order_list.length > 3 && (
                          <div className="w-12 h-12 rounded-xl border-4 border-base-100 bg-base-200 flex items-center justify-center text-[10px] font-black">
                            +{order.order_list.length - 3}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="flex justify-between items-end border-t border-base-content/5 pt-6">
                      <div>
                        <p className="text-[10px] font-black uppercase opacity-30 tracking-widest mb-1">
                          Total Amount
                        </p>
                        <p className="text-2xl font-heading font-black text-accent tracking-tighter">
                          {order.currency_name} {order.total_amount}
                        </p>
                      </div>
                      <button
                        onClick={() => handleViewDetails(order)}
                        className="bg-base-content text-base-100 p-3 rounded-2xl hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-accent/40"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Component */}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        ) : (

          <div className="text-center py-24 bg-base-100 rounded-3xl border-2 border-dashed border-base-content/10">
            <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 opacity-20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="font-heading font-black text-2xl uppercase tracking-tighter mb-2 opacity-60">
              No orders found
            </h3>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-30">
              You haven't placed any orders in this category yet
            </p>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-base-content/60 backdrop-blur-md transition-opacity duration-500"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-base-100 w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all duration-500 scale-100 opacity-100">
            {/* Modal Header */}
            <div className="p-8 border-b border-base-content/5 flex justify-between items-center bg-base-100/50 backdrop-blur-sm sticky top-0 z-10">
              <div>
                <h2 className="text-2xl font-heading font-black uppercase tracking-tighter">
                  Order <span className="text-accent italic">Details</span>
                </h2>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40 mt-1">
                  ID: {selectedOrder._id}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-12 h-12 rounded-2xl bg-base-200 hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 group-hover:rotate-90 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-grow overflow-y-auto custom-scrollbar p-8">
              {/* Tracking Status */}
              {selectedOrder.order_status !== "R" && (
                <div className="mb-12 bg-base-200/50 p-8 rounded-[2rem] border border-base-content/5">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-accent">
                      Live Tracking
                    </h3>
                    <span className="text-[10px] font-bold opacity-40">
                      Status: {statusMap[selectedOrder.order_status]}
                    </span>
                  </div>

                  <div className="relative flex justify-between px-2">
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-base-content/10 -translate-y-1/2" />
                    {statusSteps.map((step, idx) => {
                      const currentIdx = statusSteps.indexOf(
                        statusMap[selectedOrder.order_status],
                      );
                      const isPast = currentIdx >= idx;
                      const isCurrent = currentIdx === idx;

                      return (
                        <div key={step} className="relative z-10 flex flex-col items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                              isCurrent
                                ? "bg-accent border-accent scale-150 shadow-lg shadow-accent/40"
                                : isPast
                                  ? "bg-base-content border-base-content"
                                  : "bg-base-100 border-base-content/20"
                            }`}
                          />
                          <span
                            className={`text-[9px] font-black uppercase tracking-tighter ${
                              isCurrent ? "text-accent" : "opacity-40"
                            }`}
                          >
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Order Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left: Product List */}
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40">
                    Items Ordered
                  </h4>
                  <div className="space-y-4">
                    {selectedOrder.order_list.map((item, i) => (
                      <div
                        key={i}
                        className="flex gap-4 p-4 bg-base-200/30 rounded-2xl border border-base-content/5"
                      >
                        <div className="w-16 h-16 bg-white rounded-xl border border-base-content/5 flex-shrink-0">
                          <img
                            src={item.prod_image}
                            className="w-full h-full object-contain p-1"
                            alt="thumb"
                          />
                        </div>
                        <div className="flex-grow">
                          <h5 className="text-[11px] font-black uppercase leading-tight mb-1">
                            {item.prod_name}
                          </h5>
                          <p className="text-[10px] font-bold opacity-40">
                            Qty: {item.quantity} × {item.currency_name} {item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Summary & Info */}
                <div className="space-y-10">
                  {/* Totals */}
                  <div className="bg-base-content text-base-100 p-8 rounded-[2rem] shadow-2xl">
                    <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-6">
                      Payment Summary
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-[10px] font-bold opacity-60">
                        <span>Subtotal</span>
                        <span>
                          {selectedOrder.currency_name} {selectedOrder.sub_total}
                        </span>
                      </div>
                      <div className="flex justify-between text-[10px] font-bold opacity-60">
                        <span>Shipping</span>
                        <span>
                          {selectedOrder.currency_name} {selectedOrder.shipping}
                        </span>
                      </div>
                      <div className="flex justify-between text-[10px] font-bold opacity-60">
                        <span>VAT</span>
                        <span>
                          {selectedOrder.currency_name} {selectedOrder.vat_total}
                        </span>
                      </div>
                      <div className="flex justify-between items-end pt-6 border-t border-white/10 mt-6">
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          Total Amount
                        </span>
                        <span className="text-3xl font-heading font-black text-accent tracking-tighter">
                          {selectedOrder.currency_name} {selectedOrder.total_amount}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div className="p-8 border-2 border-dashed border-base-content/10 rounded-[2rem]">
                    <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-6">
                      Shipping Details
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-black uppercase">{selectedOrder.full_name}</p>
                        <p className="text-[10px] font-bold opacity-60 mt-1">
                          {selectedOrder.address}, {selectedOrder.city}, {selectedOrder.zip}
                        </p>
                        <p className="text-[10px] font-bold opacity-60 mt-1">
                          {selectedOrder.phone_no}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-base-content/5">
                        <p className="text-[10px] font-black uppercase opacity-40">
                          Payment Method
                        </p>
                        <p className="text-[11px] font-bold uppercase mt-1">
                          {selectedOrder.payment_method === 1
                            ? "Cash on Delivery"
                            : selectedOrder.payment_method === 2
                              ? "bKash"
                              : "Credit Card"}
                        </p>
                      </div>
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

export default OrderHistory;
