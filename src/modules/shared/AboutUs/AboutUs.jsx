import React from "react";
import PageHeader from "../../../components/PageHeader";

const pageInfo = [
  {
    parent_route_name: "Home",
    path: "/home",
  },
  {
    curren_route: "About",
  },
  {
    first_name: "About",
    last_name: "Penguin",
  },
];

const AboutUs = () => {
  return (
    <>
      <PageHeader pageInfo={pageInfo}></PageHeader>
      <div className="min-h-screen bg-white text-black font-body p-8 md:p-12 overflow-x-hidden">
        {/* 4. BEHIND THE SCENES */}
        <section className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-base-100 border border-black/10 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=400"
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <div className="aspect-square bg-base-100 border border-black/10 overflow-hidden mt-12">
                  <img
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=400"
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-8 order-1 lg:order-2">
              <h2 className="font-heading text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
                You can <br />
                <span className="text-accent">visit our store</span>
              </h2>
              <p className="text-sm font-medium leading-loose opacity-70">
                Welcome to our store. Our store is open every day from 10.00 AM
                to 10.00 PM. You can buy, exchange and trial product here.
              </p>
              {/* <div className="pt-6 border-t border-black/10 inline-block">
                <p className="font-heading text-xl font-bold uppercase italic tracking-tighter">
                  Verified Authentic Protocol
                </p>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mt-1">
                  Every SKU digitally signed
                </p>
              </div> */}
            </div>
          </div>
        </section>

        {/* 5. SHOPPING CALL TO ACTION */}
        <footer className="bg-black text-white p-20 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-heading text-6xl md:text-9xl font-black uppercase italic tracking-tighter mb-12 leading-none">
              Enter The <span className="text-accent text-outline">Store</span>
            </h2>
            <button className="bg-white text-black px-16 py-4 font-heading font-black uppercase tracking-[0.3em] text-[12px] hover:bg-accent hover:text-white transition-all rounded-md cursor-pointer">
              Browse New Arrivals
            </button>
          </div>
          {/* Background watermark */}
          <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-heading text-[15rem] font-black italic opacity-[0.05] whitespace-nowrap pointer-events-none">
            VORTEX LABS
          </span>
        </footer>
      </div>
    </>
  );
};

export default AboutUs;
