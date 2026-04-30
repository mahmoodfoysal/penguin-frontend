import React, { useState } from "react";
import { NavLink } from "react-router";
import "./SideBar.css";

const SideBar = () => {
  const [openMenus, setOpenMenus] = useState({ orders: false, home: false });

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };
  return (
    <div className="nav-link-style-admin">
      <aside className="w-72 bg-base-content text-base-100 flex flex-col sticky top-0 h-screen shrink-0">
        <div className="p-8">
          <h2 className="font-heading text-2xl font-black uppercase italic tracking-tighter">
            Penguin <span className="text-accent">Admin</span>
          </h2>
        </div>

        <nav className="flex-grow px-4 space-y-2 overflow-y-auto no-scrollbar">
          {/* Simple Menus */}
          <NavLink to="/dashboard">
            <button className="w-full flex items-center gap-4 px-4 py-4 hover:bg-accent transition-colors font-heading font-bold uppercase text-[10px] tracking-[0.2em]">
              <span>Home</span>
            </button>
          </NavLink>
          <NavLink to="/dashboard/make-admin">
            <button className="w-full flex items-center gap-4 px-4 py-4 hover:bg-accent transition-colors font-heading font-bold uppercase text-[10px] tracking-[0.2em]">
              <span>Make Admin</span>
            </button>
          </NavLink>
          <NavLink to="/dashboard/parent-category">
            <button className="w-full flex items-center gap-4 px-4 py-4 hover:bg-accent transition-colors font-heading font-bold uppercase text-[10px] tracking-[0.2em]">
              <span>Parent Category</span>
            </button>
          </NavLink>

          <NavLink to="/dashboard/sub-category">
            <button className="w-full flex items-center gap-4 px-4 py-4 hover:bg-accent transition-colors font-heading font-bold uppercase text-[10px] tracking-[0.2em]">
              <span>Sub Category</span>
            </button>
          </NavLink>
          <NavLink to="/dashboard/add-product">
            <button className="w-full flex items-center gap-4 px-4 py-4 hover:bg-accent transition-colors font-heading font-bold uppercase text-[10px] tracking-[0.2em]">
              <span>Products</span>
            </button>
          </NavLink>

          {/* DROPDOWN 1: ORDERS */}
          <div className="space-y-1">
            <button
              onClick={() => toggleMenu("orders")}
              className={`w-full flex items-center justify-between px-4 py-4 hover:bg-white/10 transition-colors font-heading font-bold uppercase text-[10px] tracking-[0.2em] ${openMenus.orders ? "text-accent" : ""}`}
            >
              <span>Orders</span>
              <span
                className={`transition-transform ${openMenus.orders ? "rotate-180" : ""}`}
              >
                ▼
              </span>
            </button>

            {openMenus.orders && (
              <div className="bg-base-100/5 ml-4 border-l border-accent/30 py-2">
                <NavLink to="pending-order">
                  <button className="w-full text-left px-6 py-2 text-[9px] uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-accent transition-all">
                    Pending
                  </button>
                </NavLink>

                <button className="w-full text-left px-6 py-2 text-[9px] uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-accent transition-all">
                  Warehouse
                </button>

                <button className="w-full text-left px-6 py-2 text-[9px] uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-accent transition-all">
                  Shipping
                </button>

                <button className="w-full text-left px-6 py-2 text-[9px] uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-accent transition-all">
                  Delivery
                </button>

                <button className="w-full text-left px-6 py-2 text-[9px] uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-accent transition-all">
                  Order Track
                </button>
              </div>
            )}
          </div>

          {/* DROPDOWN 2: HOME CONTROLLER */}
          <div className="space-y-1">
            <button
              onClick={() => toggleMenu("home")}
              className={`w-full flex items-center justify-between px-4 py-4 hover:bg-white/10 transition-colors font-heading font-bold uppercase text-[10px] tracking-[0.2em] ${openMenus.home ? "text-accent" : ""}`}
            >
              <span>Home Controller</span>
              <span
                className={`transition-transform ${openMenus.home ? "rotate-180" : ""}`}
              >
                ▼
              </span>
            </button>

            {openMenus.home && (
              <div className="bg-base-100/5 ml-4 border-l border-accent/30 py-2">
                {[
                  "Slider",
                  "Discount Poster",
                  "Offer",
                  "Brand",
                  "Upcoming Event",
                ].map((sub) => (
                  <button
                    key={sub}
                    className="w-full text-left px-6 py-2 text-[9px] uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-accent transition-all"
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* User Status at Bottom */}
        <div className="p-6 border-t border-base-100/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center font-heading font-black italic">
              A
            </div>
            <div>
              <p className="text-[10px] font-black uppercase">Admin User</p>
              <p className="text-[8px] opacity-40 uppercase">V-Labs Level 5</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
