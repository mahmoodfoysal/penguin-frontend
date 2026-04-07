import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const TopBanner = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [time, setTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment()); // update every second
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const images = [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); // change every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);
  return (
    <>
      <div className="hero min-h-[65vh] bg-base-100 px-6 mt-6">
        <div className="hero-content flex-col lg:flex-row-reverse gap-16 max-w-7xl">
          <div className="relative group flex-1">
            {/* Abstract background shape for unique look */}
            <div className="absolute -inset-10 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700"></div>
            <img
              src={images[currentImage]}
              className="w-full max-w-xl rounded-3xl shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-500 ease-out z-10 relative cursor-pointer"
              alt="Featured Essential Product"
              title="Click here to explore more related product"
            />
          </div>
          <div className="text-left flex-1 lg:pr-16">
            <div className="badge badge-primary badge-outline mb-6 px-4 py-3 uppercase tracking-wider text-xs font-bold">
              {time.format("YYYY-MM-DD HH:mm:ss")}
            </div>
            <h1 className="text-6xl  font-black leading-none mb-6 tracking-tighter uppercase">
              Buying only what <br />{" "}
              <span className="text-primary">you need.</span>
            </h1>
            <p className="max-w-md text-xl text-base-content/70 mb-10 leading-relaxed font-light">
              Purchasing based on necessity, not desire, to save money, reduce
              clutter, and avoid waste
            </p>
            <div className="flex gap-4">
              <Link to="/products">
                {" "}
                <button className="btn btn-primary btn-lg rounded-full px-10 uppercase text-sm tracking-widest font-bold">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBanner;
