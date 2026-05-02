import React from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";

const Footer = () => {
  const user = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);

  return (
    <>
      <footer className="bg-base-100 text-base-content pt-16 pb-8 px-6 mt-20 relative overflow-hidden border-t border-base-content/10">
        {/* 1. LARGE BACKGROUND WATERMARK */}
        <div className="absolute -bottom-10 -right-10 opacity-[0.03] select-none pointer-events-none">
          <h2 className="font-heading text-[20vw] font-black uppercase italic leading-none">
            Penguin
          </h2>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            {/* BRAND SECTION */}
            <div className="md:col-span-4 space-y-6">
              <h2 className="font-heading text-5xl font-black uppercase italic tracking-tighter leading-none">
                PENGUIN<span className="text-accent">.</span>
              </h2>
              <p className="max-w-xs text-xs font-bold uppercase tracking-widest leading-relaxed opacity-60">
                High-performance gear engineered for the modern operative.
                Precision quality. Tactical design.
              </p>
              <div className="flex gap-4">
                {/* SOCIALS with hover boxes */}

                <a
                  target="black"
                  href="https://github.com/mahmoodfoysal"
                  className="w-10 h-10 border-2 border-current flex items-center justify-center hover:opacity-70 transition-all active:scale-90"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/foysalmahmood/"
                  target="black"
                  className="w-10 h-10 border-2 border-current flex items-center justify-center hover:opacity-70 transition-all active:scale-90"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/foysal.mahmood.1/"
                  target="blank"
                  className="w-10 h-10 border-2 border-current flex items-center justify-center hover:opacity-70 transition-all active:scale-90"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                  </svg>
                </a>
              </div>
            </div>

            {/* QUICK LINKS */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="font-heading font-black uppercase text-sm tracking-widest border-b-2 border-base-content inline-block mb-2">
                Navigation
              </h4>
              <ul className="space-y-2 text-[11px] font-black uppercase tracking-tighter">
                <li>
                  <Link
                    to="/home"
                    className="hover:text-accent transition-colors block"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="hover:text-accent transition-colors block"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blogs"
                    className="hover:text-accent transition-colors block"
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-accent transition-colors block"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-accent transition-colors block"
                  >
                    Contact
                  </Link>
                </li>

                {role?.email && (
                  <li>
                    <Link
                      to="/dashboard"
                      className="hover:text-accent transition-colors block text-accent"
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            {/* ACCOUNT SECTION */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="font-heading font-black uppercase text-sm tracking-widest border-b-2 border-base-content inline-block mb-2">
                Account
              </h4>
              <ul className="space-y-2 text-[11px] font-black uppercase tracking-tighter">
                {user ? (
                  <>
                    <li>
                      <Link
                        to="/profile"
                        className="hover:text-accent transition-colors block"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/order-history"
                        className="hover:text-accent transition-colors block"
                      >
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/cart"
                        className="hover:text-accent transition-colors block"
                      >
                        Cart
                      </Link>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link
                      to="/login"
                      className="hover:text-accent transition-colors block"
                    >
                      Login / Join
                    </Link>
                  </li>
                )}
                <li>
                  <a
                    target="blank"
                    href="https://foysalmahmood-portfolio.web.app/"
                    className="hover:text-accent transition-colors block opacity-50"
                  >
                    Developer
                  </a>
                </li>
              </ul>
            </div>

            {/* NEWSLETTER SECTION */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="font-heading font-black uppercase text-sm tracking-widest">
                Join the Registry
              </h4>
              <div className="relative">
                <input
                  type="text"
                  placeholder="EMAIL_ADDRESS"
                  className="w-full border-2 border-current p-4 text-xs font-mono outline-none focus:border-accent transition-colors pr-12 bg-transparent"
                />
                <button className="btn btn-primary absolute right-0 top-0 h-full rounded-none border-none">
                  →
                </button>
              </div>
              <p className="text-[9px] font-bold opacity-40 uppercase tracking-widest">
                Receive tactical updates & drop alerts.
              </p>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="border-t-2 border-base-content/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
              <p className="text-[10px] font-black uppercase tracking-widest">
                © 2026 Penguin Gear Ltd.
              </p>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                Develop by Foysal Mahmood
              </p>
            </div>

            <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest">
              <a href="#" className="hover:text-accent">
                Privacy
              </a>
              <a href="#" className="hover:text-accent">
                Terms
              </a>
              <a href="#" className="hover:text-accent">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
