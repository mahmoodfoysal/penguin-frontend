import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { getAuth, signOut } from "firebase/auth";
import "./NavBar.css";

import { useSelector, useDispatch } from "react-redux";

import { logout, setUserInfo } from "../../../store/slice/user";
import initilizationAuthentication from "../../../firebase/firebase.init";
import { showError } from "../../../components/Alert";
import TopLoadingBar from "../../../components/TopLoadingBar";


initilizationAuthentication();

const auth = getAuth();

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const cartList = useSelector((state) => state.cart.cart);
  const role = useSelector((state) => state.auth.role);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // NEW STATE: track if mobile drawer is showing 'main' links or 'dashboard' links
  const [drawerView, setDrawerView] = useState("main");
  // NEW STATE: track dashboard dropdowns inside drawer
  const [openMenus, setOpenMenus] = useState({ orders: false, home: false });

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Reset drawer view when drawer is closed
  useEffect(() => {
    if (!isDrawerOpen) {
      setTimeout(() => {
        setDrawerView("main");
      }, 300);
    }
  }, [isDrawerOpen]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        sessionStorage.removeItem("penguin-shopping");
        dispatch(logout());
        dispatch(setUserInfo({}));
        navigate("/home");
      })
      .catch((error) => {
        showError(
          "Sign In Failed",
          error.response?.data?.message || error.message,
        );
      });
  };

  return (
    <>
      <div className="sticky top-0 z-50 px-4 py-2">
        <div className="navbar bg-base-100 rounded-2xl border border-base-200 shadow-sm relative overflow-hidden">
          <TopLoadingBar />

          <div className="navbar-start">
            <div className="lg:hidden">
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="btn btn-ghost btn-circle"
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
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </button>
            </div>
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
                <NavLink to="/blogs" className="hover:text-primary">
                  Blogs
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="hover:text-primary">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="hover:text-primary">
                  Contact
                </NavLink>
              </li>
              {role?.email && (
                <li>
                  <NavLink to="/dashboard" className="hover:text-primary">
                    Dashboard
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          <div className="navbar-end gap-3 flex items-center relative">
            <label className="swap swap-rotate btn btn-ghost btn-circle hover:text-accent transition-colors">
              <input
                type="checkbox"
                onChange={toggleTheme}
                checked={theme === "dark"}
              />
              <svg
                className="swap-on fill-current w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
              <svg
                className="swap-off fill-current w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,12.14,19.73Z" />
              </svg>
            </label>

            <Link to="/cart">
              <div className="indicator">
                <span className="indicator-item badge bg-accent text-base-100 border-none font-black text-[8px] h-4 min-h-0 px-1">
                  {cartList?.length}
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
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="btn btn-ghost btn-circle avatar border-2 border-transparent hover:border-accent transition-all p-0.5"
                >
                  <div className="w-8 rounded-full overflow-hidden">
                    <img src={userInfo?.photo} alt="User" />
                  </div>
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-4 w-52 bg-base-100 border border-base-content/10 shadow-2xl z-[100] rounded-sm py-2">
                    <div className="px-4 py-3 border-b border-base-content/5 mb-2">
                      <p className="font-heading font-black text-[10px] uppercase tracking-widest text-base-content">
                        {userInfo?.name}
                      </p>
                      <p className="text-[9px] font-bold opacity-40 uppercase tracking-tighter">
                        Welcome to Penguin Gear
                      </p>
                    </div>
                    <ul className="space-y-1">
                      <li>
                        <Link
                          to="/order-history"
                          onClick={() => setIsProfileOpen(false)}
                          className="block w-full text-left px-4 py-2 font-heading font-bold text-[10px] uppercase tracking-widest hover:bg-accent hover:text-base-100 transition-colors"
                        >
                          Order History
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/profile"
                          onClick={() => setIsProfileOpen(false)}
                          className="block w-full text-left px-4 py-2 font-heading font-bold text-[10px] uppercase tracking-widest hover:bg-accent hover:text-base-100 transition-colors"
                        >
                          Profile
                        </Link>
                      </li>

                      <li className="pt-2 border-t border-base-content/5 mt-2">
                        <button
                          onClick={handleLogOut}
                          className="w-full text-left px-4 py-2 font-heading font-black text-[10px] uppercase tracking-widest text-red-500 hover:bg-red-500 hover:text-base-100 transition-colors cursor-pointer"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="btn btn-ghost btn-circle hover:text-accent transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsDrawerOpen(false)}
          ></div>
          <div className="absolute left-0 top-0 h-full w-4/5 max-w-sm bg-base-100 shadow-2xl p-6 transform transition-transform duration-300">
            <div className="flex justify-between items-center mb-10">
              <span className="font-heading font-black text-2xl uppercase tracking-tighter">
                Penguin<span className="text-accent">.</span>
              </span>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="btn btn-ghost btn-circle"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
              </button>
            </div>

            {/* --- DRAWER CONTENT LOGIC --- */}
            <div className="overflow-y-auto max-h-[70vh] no-scrollbar">
              {drawerView === "main" ? (
                /* MAIN CLIENT ROUTES */
                <ul className="space-y-4 nav-link-style-mobile">
                  {[
                    { name: "Home", path: "/home" },
                    { name: "Products", path: "/products" },
                    { name: "Blogs", path: "/blogs" },
                    { name: "About", path: "/about" },
                    { name: "Contact", path: "/contact" },
                    { name: "My Orders", path: "/order-history" },
                  ].map((link) => (
                    <li key={link.name}>
                      <NavLink
                        to={link.path}
                        onClick={() => setIsDrawerOpen(false)}
                        className="block font-heading font-black text-md uppercase tracking-tighter hover:text-accent transition-colors"
                      >
                        {link.name}
                      </NavLink>
                    </li>
                  ))}
                  {role?.email && (
                    <li>
                      <button
                        onClick={() => setDrawerView("dashboard")}
                        className="w-full text-left font-heading font-black text-md uppercase tracking-tighter text-accent flex justify-between items-center"
                      >
                        Dashboard <span>→</span>
                      </button>
                    </li>
                  )}
                </ul>
              ) : (
                /* DASHBOARD ROUTES */
                <div className="space-y-2">
                  <button
                    onClick={() => setDrawerView("main")}
                    className="flex items-center gap-2 mb-6 font-heading font-bold uppercase text-[10px] tracking-widest opacity-60 hover:opacity-100 hover:text-accent transition-all"
                  >
                    ← Back to Client
                  </button>

                  <nav className="space-y-1 nav-link-style-mobile">
                    <NavLink
                      to="/dashboard"
                      onClick={() => setIsDrawerOpen(false)}
                      className="block px-4 py-3 hover:bg-accent hover:text-white transition-colors font-heading font-bold uppercase text-[10px] tracking-[0.2em]"
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to="/dashboard/make-admin"
                      onClick={() => setIsDrawerOpen(false)}
                      className="block px-4 py-3 hover:bg-accent hover:text-white transition-colors font-heading font-bold uppercase text-[10px] tracking-[0.2em]"
                    >
                      Make Admin
                    </NavLink>
                    <NavLink
                      to="/dashboard/parent-category"
                      onClick={() => setIsDrawerOpen(false)}
                      className="block px-4 py-3 hover:bg-accent hover:text-white transition-colors font-heading font-bold uppercase text-[10px] tracking-[0.2em]"
                    >
                      Parent Category
                    </NavLink>
                    <NavLink
                      to="/dashboard/sub-category"
                      onClick={() => setIsDrawerOpen(false)}
                      className="block px-4 py-3 hover:bg-accent hover:text-white transition-colors font-heading font-bold uppercase text-[10px] tracking-[0.2em]"
                    >
                      Sub Category
                    </NavLink>

                    {/* Orders Dropdown */}
                    <div className="space-y-1">
                      <button
                        onClick={() => toggleMenu("orders")}
                        className={`w-full flex items-center justify-between px-4 py-3 hover:bg-base-content/10 transition-colors font-heading font-bold uppercase text-[10px] tracking-[0.2em] ${openMenus.orders ? "text-accent" : ""}`}
                      >
                        <span>Orders</span>
                        <span
                          className={`transition-transform text-[8px] ${openMenus.orders ? "rotate-180" : ""}`}
                        >
                          ▼
                        </span>
                      </button>
                      {openMenus.orders && (
                        <div className="bg-base-content/5 ml-4 border-l border-accent/30 py-2">
                          {["Pending", "Warehouse", "Shipping", "Delivery"].map(
                            (sub) => (
                              <button
                                key={sub}
                                onClick={() => setIsDrawerOpen(false)}
                                className="w-full text-left px-6 py-2 text-[9px] uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-accent transition-all"
                              >
                                {sub}
                              </button>
                            ),
                          )}
                        </div>
                      )}
                    </div>
                  </nav>
                </div>
              )}
            </div>

            <div className="absolute bottom-10 left-6 right-6">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 mb-4">
                Premium Operative Gear
              </p>
              <div className="h-[2px] bg-base-content/10 w-full"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
