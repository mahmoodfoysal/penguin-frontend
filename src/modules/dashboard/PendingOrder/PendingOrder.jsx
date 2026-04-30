import React, { useState } from "react";

const PendingOrder = () => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Mock Data including Shipping Info
  const orders = [
    {
      id: "VL-9901",
      customer: "Zayn Malik",
      date: "Oct 24, 2025",
      total: "$240.00",
      status: "Warehouse",
      shipping: {
        phone: "+1 (555) 012-3456",
        email: "zayn.m@vortex.com",
        address: "1288 Fashion Ave, Suite 402, New York, NY 10018",
        method: "Standard Express",
      },
    },
    // ... add more if needed
  ];

  const statusSteps = [
    "Pending",
    "Warehouse",
    "Shipping",
    "Delivery",
    "Completed",
  ];

  const handleOpenDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };
  return (
    <div>
      <div className="p-4  min-h-screen bg-base-100 font-body relative overflow-hidden">
        {/* 1. HEADER */}

        <div className="mb-4">
          <h1 className="font-heading text-5xl font-black uppercase tracking-tighter text-base-content">
            Pending <span className="text-accent text-outline">Order</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mt-2">
            Manage orders that are already in pending list
          </p>
        </div>

        {/* 2. ORDER TABLE */}
        <div className="bg-base-100 border border-base-content/5 rounded-sm overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-base-content text-base-100 font-heading text-[9px] uppercase tracking-[0.3em] font-black">
                <th className="px-8 py-5">Order ID</th>
                <th className="px-8 py-5">Customer</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5">Amount</th>
                <th className="px-8 py-5 text-center">Details</th>
                <th className="px-8 py-5 text-right">Current Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="group hover:bg-base-200/40 transition-colors"
                >
                  <td className="px-8 py-6 font-mono text-xs font-bold text-accent">
                    {order.id}
                  </td>
                  <td className="px-8 py-6">
                    <p className="font-heading font-bold text-xs uppercase tracking-tight">
                      {order.customer}
                    </p>
                  </td>
                  <td className="px-8 py-6 text-[10px] font-black opacity-40 uppercase">
                    {order.date}
                  </td>
                  <td className="px-8 py-6 font-heading font-black text-sm">
                    {order.total}
                  </td>
                  <td className="px-8 py-6 text-center">
                    <button
                      onClick={() => handleOpenDetails(order)}
                      className="text-[9px] font-black uppercase tracking-widest bg-base-content text-base-100 px-6 py-2 hover:bg-accent transition-all"
                    >
                      Details
                    </button>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 border border-base-content/10 rounded-full">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 3. BACKDROP */}
        {isDetailsOpen && (
          <div
            className="fixed inset-0 bg-base-content/60 backdrop-blur-md z-[100]"
            onClick={() => setIsDetailsOpen(false)}
          />
        )}

        {/* 4. DETAILS & TRACKING DRAWER */}
        <aside
          className={`fixed top-0 right-0 h-full w-full max-w-lg bg-base-100 z-[101] shadow-2xl transition-transform duration-500 transform ${isDetailsOpen ? "translate-x-0" : "translate-x-full"} border-l-4 border-accent`}
        >
          {selectedOrder && (
            <div className="h-full flex flex-col p-12 overflow-y-auto no-scrollbar">
              {/* Header */}
              <div className="mb-10 flex justify-between items-start">
                <div>
                  <span className="text-accent font-black text-[10px] uppercase tracking-widest">
                    Manifest {selectedOrder.id}
                  </span>
                  <h2 className="font-heading text-4xl font-black uppercase italic tracking-tighter mt-2">
                    Order{" "}
                    <span className="text-outline text-base-content">Summary</span>
                  </h2>
                </div>
                <button
                  onClick={() => setIsDetailsOpen(false)}
                  className="text-3xl font-black hover:text-accent rotate-45"
                >
                  +
                </button>
              </div>

              {/* TRACKING STATUS VISUALIZER */}
              <div className="mb-10 bg-base-200/50 p-6 rounded-sm border border-base-content/5">
                <p className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-6 text-center">
                  Live Tracking Status
                </p>
                <div className="flex justify-between relative">
                  <div className="absolute top-1/2 left-0 w-full h-[2px] bg-base-content/10 -translate-y-1/2 z-0"></div>
                  {statusSteps.map((step, index) => {
                    const isCurrent = step === selectedOrder.status;
                    const isPast =
                      statusSteps.indexOf(selectedOrder.status) >= index;
                    return (
                      <div
                        key={step}
                        className="relative z-10 flex flex-col items-center gap-2"
                      >
                        <div
                          className={`w-3 h-3 rounded-full border-2 transition-colors ${isCurrent ? "bg-accent border-accent scale-125 shadow-lg shadow-accent/40" : isPast ? "bg-base-content border-base-content" : "bg-base-100 border-base-content/10"}`}
                        ></div>
                        <span
                          className={`text-[7px] font-black uppercase tracking-tighter ${isCurrent ? "text-accent" : "opacity-40"}`}
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
                    <label className="text-[8px] font-black uppercase opacity-30 block">
                      Recipient
                    </label>
                    <p className="text-xs font-bold uppercase tracking-tight">
                      {selectedOrder.customer}
                    </p>
                  </div>
                  <div>
                    <label className="text-[8px] font-black uppercase opacity-30 block">
                      Address
                    </label>
                    <p className="text-xs font-medium opacity-70 leading-relaxed">
                      {selectedOrder.shipping?.address}
                    </p>
                  </div>
                  <div className="flex gap-10">
                    <div>
                      <label className="text-[8px] font-black uppercase opacity-30 block">
                        Contact
                      </label>
                      <p className="text-[11px] font-mono font-bold">
                        {selectedOrder.shipping.phone}
                      </p>
                    </div>
                    <div>
                      <label className="text-[8px] font-black uppercase opacity-30 block">
                        Method
                      </label>
                      <p className="text-[11px] font-bold uppercase tracking-tighter">
                        {selectedOrder.shipping.method}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* PRODUCT DETAILS LIST */}
              <div className="space-y-6 mb-10">
                <p className="text-[10px] font-black uppercase tracking-widest border-b border-base-content/10 pb-2">
                  Items Ordered
                </p>
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="flex justify-between items-center py-2"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-base-200 p-1 border border-base-content/5">
                        <img
                          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=100"
                          className="w-full h-full object-contain "
                          alt="prod"
                        />
                      </div>
                      <div>
                        <p className="font-heading font-bold text-xs uppercase">
                          Phantom Racer v.0{item}
                        </p>
                        <p className="text-[9px] opacity-40">Qty: 01</p>
                      </div>
                    </div>
                    <p className="font-heading font-black text-xs">$120.00</p>
                  </div>
                ))}
              </div>

              {/* TOTALS */}
              <div className="mt-auto pt-8 border-t-2 border-base-content space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase opacity-40">
                  <span>Subtotal</span>
                  <span>$240.00</span>
                </div>
                <div className="flex justify-between font-heading font-black text-2xl uppercase mt-4">
                  <span>Total</span>
                  <span className="text-accent">{selectedOrder.total}</span>
                </div>
              </div>

              <button
                onClick={() => setIsDetailsOpen(false)}
                className="mt-8 w-full bg-base-content text-base-100 py-6 font-heading font-black uppercase tracking-[0.3em] text-[11px] hover:bg-accent transition-colors"
              >
                Update Order Status
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default PendingOrder;
