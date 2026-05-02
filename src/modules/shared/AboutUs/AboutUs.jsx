import React from "react";
import PageHeader from "../../../components/PageHeader";
import { Link } from "react-router";

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

      <div className="min-h-screen bg-base-100 text-base-content font-body selection:bg-teal-500 selection:text-white">
        {/* SECTION 1: MISSION & VISION */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Mission Card */}
            <div className="bg-base-200 border border-base-content/5 rounded-[2.5rem] p-10 lg:p-14 shadow-xl hover:shadow-teal-500/10 transition-all duration-500 group">
              <div className="w-16 h-16 bg-teal-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-teal-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-none">
                Our <span className="text-teal-500 ">Mission</span>
              </h2>
              <p className="text-base md:text-lg text-base-content/60 leading-relaxed font-medium">
                To redefine the digital shopping experience by providing a
                curated selection of premium products that blend style with
                functionality. We bridge the gap between high-end quality and
                accessible pricing, ensuring every customer finds their perfect
                match with ease.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-base-200 border border-base-content/5 rounded-[2.5rem] p-10 lg:p-14 shadow-xl hover:shadow-teal-500/10 transition-all duration-500 group">
              <div className="w-16 h-16 bg-teal-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-teal-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-none">
                Our <span className="text-teal-500 ">Vision</span>
              </h2>
              <p className="text-base md:text-lg text-base-content/60 leading-relaxed font-medium">
                To become the ultimate global destination for trendsetters,
                fostering a world where quality lifestyle products are
                accessible through a seamless and inspiring ecommerce journey.
                We aim to lead the industry with sustainable practices and
                innovative technology.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: STATS BAR */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32">
          <div className="bg-base-200 rounded-[3rem] p-8 md:p-12 border border-base-content/5 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:divide-x divide-base-content/10">
              <div className="text-center md:px-8 space-y-2 group">
                <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-teal-500 transition-transform group-hover:scale-110">
                  24/7
                </h3>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
                  Active Support
                </p>
                <p className="text-sm font-medium opacity-60">
                  Dedicated team to assist with your orders and inquiries around
                  the clock.
                </p>
              </div>
              <div className="text-center md:px-8 space-y-2 group">
                <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-teal-500 transition-transform group-hover:scale-110">
                  99%
                </h3>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
                  Satisfaction
                </p>
                <p className="text-sm font-medium opacity-60">
                  Proven track record of delivering happiness to our global
                  community.
                </p>
              </div>
              <div className="text-center md:px-8 space-y-2 group">
                <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-teal-500 transition-transform group-hover:scale-110">
                  15k+
                </h3>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
                  Products
                </p>
                <p className="text-sm font-medium opacity-60">
                  A curated collection of the finest essentials across multiple
                  categories.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: CORE VALUES & FOUNDER */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            {/* Left Side: Core Values */}
            <div className="space-y-16">
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none ">
                Core <span className="text-teal-500">Values</span>
              </h2>

              <div className="space-y-12">
                {[
                  {
                    num: "01.",
                    title: "Quality Obsessed",
                    desc: "We only stock products that meet our rigorous standards. Every item is verified for authenticity and durability.",
                  },
                  {
                    num: "02.",
                    title: "Customer First",
                    desc: "Your satisfaction is our primary metric. We strive to provide a shopping journey that is as rewarding as the product itself.",
                  },
                  {
                    num: "03.",
                    title: "Sustainable Style",
                    desc: "We are committed to curating products that look good and do good, prioritizing ethical sourcing and eco-friendly brands.",
                  },
                ].map((val) => (
                  <div key={val.num} className="flex gap-8 group">
                    <span className="text-teal-500 font-black text-2xl">
                      {val.num}
                    </span>
                    <div className="space-y-3">
                      <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tight group-hover:text-teal-500 transition-colors">
                        {val.title}
                      </h4>
                      <p className="text-base-content/50 font-medium leading-relaxed max-w-lg">
                        {val.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Founder Card */}
            <div className="relative group">
              {/* Decorative Background Accent */}
              <div className="absolute -top-6 -left-6 w-full h-full bg-teal-500 rounded-[3.5rem] opacity-5 group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform duration-700"></div>
              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-teal-500/20 rounded-[3.5rem] opacity-20 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-700"></div>

              <div className="relative bg-base-100 rounded-[3rem] p-10 md:p-16 shadow-2xl border border-base-content/5 text-center space-y-10 overflow-hidden">
                <div className="w-32 h-32 mx-auto relative">
                  <div className="absolute inset-0 bg-teal-500 rounded-full scale-125 opacity-10 animate-pulse"></div>
                  <img
                    src="https://lh3.googleusercontent.com/a/ACg8ocJK5iLAouRSJ6_58PTtpwHoJ3BywTeFcbXfG6RMLpDr3YvxMogd=s288-c-no"
                    className="w-full h-full object-cover rounded-full border-4 border-teal-500/20 relative z-10 transition-all duration-700 shadow-2xl"
                    alt="Foysal Mahmood"
                  />
                </div>

                <div className="space-y-3">
                  <h3 className="text-3xl font-black uppercase tracking-tighter">
                    Foysal Mahmood
                  </h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-teal-500">
                    Founder & Creative Lead
                  </p>
                </div>

                <p className="text-base-content/60 font-medium leading-relaxed max-w-sm mx-auto  text-lg">
                  "At Penguin, we don't just curate collections; we build
                  confidence. Our goal is to make premium shopping an effortless
                  and rewarding journey for everyone."
                </p>

                <div className="flex justify-center gap-6 pt-6">
                  <a
                    href="https://www.linkedin.com/in/foysalmahmood/"
                    target="_blank"
                    className="w-14 h-14 rounded-2xl bg-base-200 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-all transform hover:-translate-y-2 border border-base-content/5 hover:border-teal-500"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href="https://foysalmahmood.vercel.app/"
                    target="_blank"
                    className="w-14 h-14 rounded-2xl bg-base-200 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-all transform hover:-translate-y-2 border border-base-content/5 hover:border-teal-500"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FOOTER */}
        <section className="py-40 px-6">
          <div className="relative text-white rounded-[4rem] p-24 text-center overflow-hidden group shadow-[0_35px_60px_-15px_rgba(20,184,166,0.3)]">
            {/* Background Image */}
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
              alt="Store Background"
            />

            {/* Overlay - Using a deeper blend for rich color */}
            <div className="absolute inset-0 bg-teal-950/80 group-hover:bg-teal-900/60 transition-all duration-700"></div>

            <div className="relative z-10 max-w-4xl mx-auto space-y-14">
              <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none">
                Start Your <br />
                <span className="text-white text-outline">Journey</span>
              </h2>
              <Link to="/products">
                <button className="bg-white text-teal-600 px-16 py-6 font-black uppercase tracking-[0.4em] text-xs hover:bg-base-100 hover:text-teal-500 transition-all rounded-full cursor-pointer shadow-2xl transform active:scale-95">
                  Explore The Shop
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutUs;
