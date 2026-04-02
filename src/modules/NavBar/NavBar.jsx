import React from "react";
import { NavLink } from "react-router";
import "./NavBar.css";

const NavBar = () => {
  return (
    <>
      <div className="sticky top-0 z-50 px-4 py-2">
        <div className="navbar bg-base-100/70 backdrop-blur-md rounded-2xl border border-base-200 shadow-sm">
          <div className="navbar-start">
            <a
              href="#"
              className="btn btn-ghost text-xl font-black tracking-tighter uppercase"
            >
              Penguin
            </a>
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
            </ul>
          </div>
          <div className="navbar-end gap-1">
            <button className="btn btn-ghost btn-circle">
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
            <div className="indicator">
              <span className="indicator-item badge badge-primary badge-sm">
                3
              </span>
              <button className="btn btn-ghost btn-circle">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
