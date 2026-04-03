import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import "./NavBar.css";

const NavBar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  return (
    <>
      <div className="sticky top-0 z-50 px-4 py-2">
        <div className="navbar bg-base-100/70 backdrop-blur-md rounded-2xl border border-base-200 shadow-sm">
          <div className="navbar-start">
            <Link
              to="/home"
              className="btn btn-ghost text-xl font-black tracking-tighter uppercase"
            >
              Penguin
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex nav-link-style">
            <ul className="menu menu-horizontal px-1 gap-1 font-medium text-sm">
              <li>
                <NavLink to="/home" className="hover:text-primary">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/products" className="hover:text-primary">
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink to="/cart" className="hover:text-primary">
                  Cart
                </NavLink>
              </li>
              <li>
                <NavLink to="/checkout" className="hover:text-primary">
                  Checkout
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="navbar-end gap-3 flex items-center relative">
            {/* 1. SEARCH BUTTON */}
            <button className="btn btn-ghost btn-circle hover:text-accent transition-colors">
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* 2. CART INDICATOR */}
            <div className="indicator">
              <span className="indicator-item badge bg-accent text-white border-none font-black text-[8px] h-4 min-h-0 px-1">
                3
              </span>
              <button className="btn btn-ghost btn-circle hover:text-accent transition-colors">
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </button>
            </div>

            <Link to="/login">
              <button className="btn btn-ghost btn-circle hover:text-accent transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6" // Slightly larger for better material feel
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5" // Thinner stroke looks more premium
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </button>
            </Link>

            {/* 3. USER PROFILE DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="btn btn-ghost btn-circle avatar border-2 border-transparent hover:border-accent transition-all p-0.5"
              >
                <div className="w-8 rounded-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100"
                    alt="User"
                  />
                </div>
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-4 w-52 bg-white border border-black/10 shadow-2xl z-[100] rounded-sm py-2">
                  <div className="px-4 py-3 border-b border-black/5 mb-2">
                    <p className="font-heading font-black text-[10px] uppercase tracking-widest text-black">
                      Alex Vortex
                    </p>
                    <p className="text-[9px] font-bold opacity-40 uppercase tracking-tighter">
                      Premium Member
                    </p>
                  </div>

                  <ul className="space-y-1">
                    {["Profile", "Order History", "Wishlist", "Settings"].map(
                      (item) => (
                        <li key={item}>
                          <button className="w-full text-left px-4 py-2 font-heading font-bold text-[10px] uppercase tracking-widest hover:bg-accent hover:text-white transition-colors">
                            {item}
                          </button>
                        </li>
                      ),
                    )}
                    <li className="pt-2 border-t border-black/5 mt-2">
                      <button className="w-full text-left px-4 py-2 font-heading font-black text-[10px] uppercase tracking-widest text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
