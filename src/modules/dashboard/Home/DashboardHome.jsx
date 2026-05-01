import React from "react";

const DashboardHome = () => {
  return (
    <div className="p-4">
      <header className="flex justify-between items-end mb-12">
        <div>
          <h1 className="font-heading text-5xl font-black uppercase tracking-tighter">
            Control <span className="text-accent text-outline">Center</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mt-2">
            Live Statistics
          </p>
        </div>
        <div className="flex gap-4">
          <button className="bg-base-content text-base-100 px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-accent transition-colors">
            Export Report
          </button>
        </div>
      </header>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {[
          { label: "Total Revenue", value: "$42,900", trend: "+12%" },
          { label: "Pending Orders", value: "18", trend: "-2" },
          { label: "Total Products", value: "1,204", trend: "+48" },
          { label: "Site Traffic", value: "8.4k", trend: "+5%" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-base-100 border border-base-content/5 p-8 rounded-sm"
          >
            <p className="text-[9px] font-black uppercase tracking-widest opacity-40">
              {stat.label}
            </p>
            <h3 className="font-heading text-3xl font-black mt-2">
              {stat.value}
            </h3>
            <p
              className={`text-[9px] font-bold mt-1 ${stat.trend.includes("+") ? "text-green-500" : "text-red-500"}`}
            >
              {stat.trend}{" "}
              <span className="opacity-40 text-base-content ml-1">
                vs last month
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* EXAMPLE CONTENT AREA: RECENT ORDERS */}
      <div className="bg-base-100 border border-base-content/5 p-8">
        <h2 className="font-heading text-xl font-black uppercase  mb-8">
          Recent <span className="text-accent">Activity</span>
        </h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((row) => (
            <div
              key={row}
              className="flex items-center justify-between py-4 border-b border-base-content/5 hover:bg-base-200/50 transition-colors px-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-accent"></div>
                <span className="font-heading font-bold text-xs uppercase">
                  Order #1209{row}
                </span>
              </div>
              <span className="text-[10px] opacity-40 font-bold uppercase tracking-widest">
                2 Minutes Ago
              </span>
              <span className="font-heading font-black text-xs">$240.00</span>
              <button className="text-[10px] font-black uppercase tracking-widest text-accent border-b border-accent">
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
