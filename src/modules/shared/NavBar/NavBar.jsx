import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { getAuth, signOut } from "firebase/auth";
import "./NavBar.css";

import { useSelector, useDispatch } from "react-redux";

import { logout, setUserInfo } from "../../../store/slice/user";
import initilizationAuthentication from "../../../firebase/firebase.init";

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

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // const [userInfo, setUserInfo] = useState(null);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        sessionStorage.removeItem("penguin-shopping");
        dispatch(logout());
        dispatch(setUserInfo({}));
        navigate("/home");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  return (
    <>
      <div className="sticky top-0 z-50 px-4 py-2">
        <div className="navbar bg-base-100 rounded-2xl border border-base-200 shadow-sm">
          <div className="navbar-start">
            {/* Hamburger for Mobile */}
            <div className="lg:hidden">
              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="btn btn-ghost btn-circle"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
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
            {/* 0. THEME TOGGLE */}
            <label className="swap swap-rotate btn btn-ghost btn-circle hover:text-accent transition-colors">
              <input 
                type="checkbox" 
                onChange={toggleTheme} 
                checked={theme === "dark"} 
              />
              {/* sun icon */}
              <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
              {/* moon icon */}
              <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
            </label>

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

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-4 w-52 bg-base-100 border border-base-content/10 shadow-2xl z-[100] rounded-sm py-2">
                    <div className="px-4 py-3 border-b border-base-content/5 mb-2">
                      <p className="font-heading font-black text-[10px] uppercase tracking-widest text-base-content">
                        {userInfo?.name}
                      </p>
                      <p className="text-[9px] font-bold opacity-40 uppercase tracking-tighter">
                        Premium Member
                      </p>
                    </div>

                    <ul className="space-y-1 ">
                      {["Profile", "Order History", "Wishlist", "Settings"].map(
                        (item) => (
                          <li key={item}>
                            <button className="w-full text-left px-4 py-2 font-heading font-bold text-[10px] uppercase tracking-widest hover:bg-accent hover:text-base-100 transition-colors">
                              {item}
                            </button>
                          </li>
                        ),
                      )}
                      <li className="pt-2 border-t border-base-content/5 mt-2 ">
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
            )}

            {/* 3. USER PROFILE DROPDOWN */}
          </div>
        </div>
      </div>
      {/* Mobile Drawer Overlay */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsDrawerOpen(false)}
          ></div>
          
          {/* Drawer Content */}
          <div className="absolute left-0 top-0 h-full w-4/5 max-w-sm bg-base-100 shadow-2xl p-6 transform transition-transform duration-300">
            <div className="flex justify-between items-center mb-10">
              <span className="font-heading font-black text-2xl uppercase tracking-tighter italic">
                Penguin<span className="text-accent">.</span>
              </span>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="btn btn-ghost btn-circle"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <ul className="space-y-4">
              {[
                { name: "Home", path: "/home" },
                { name: "Products", path: "/products" },
                { name: "About", path: "/about" },
                { name: "Contact", path: "/contact" },
                ...(role?.email ? [{ name: "Dashboard", path: "/dashboard" }] : [])
              ].map((link) => (
                <li key={link.name}>
                  <NavLink 
                    to={link.path}
                    onClick={() => setIsDrawerOpen(false)}
                    className="block font-heading font-black text-3xl uppercase italic tracking-tighter hover:text-accent transition-colors"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            
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
