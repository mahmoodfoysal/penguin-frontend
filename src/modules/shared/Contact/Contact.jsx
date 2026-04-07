import React from "react";
import PageHeader from "../../../components/PageHeader";

const Contact = () => {
  const pageInfo = [
    {
      parent_route_name: "Home",
      path: "/home",
    },
    {
      curren_route: "Contact",
    },
    {
      first_name: "Contact",
      last_name: "US",
    },
  ];
  return (
    <>
      <div className="min-h-screen bg-white text-black font-body p-8 md:p-12 overflow-x-hidden">
        <PageHeader pageInfo={pageInfo}></PageHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mt-5">
          {/* 2. LEFT COLUMN: INFO & MAP */}
          <div className="space-y-16">
            {/* MAP IFRAME */}

            <div className="relative group border-2 border-black p-1 shadow-[10px_10px_0px_rgba(0,0,0,1)] hover:shadow-[gray] transition-all">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6111.360186199436!2d88.59752070307306!3d24.38699025681104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbee50b5340bdf%3A0x8318fe0ba1480160!2sCantonment%20Rd%2C%20Rajshahi!5e0!3m2!1sen!2sbd!4v1775564540664!5m2!1sen!2sbd"
                className="w-full h-[350px]" // REMOVED: grayscale contrast-125 invert
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* CONTACT INFO GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t-2 border-black pt-12">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-accent">
                  Headquarters
                </label>
                <p className="text-sm font-bold uppercase leading-tight">
                  Cantonment road
                  <br />
                  Rajshahi-6000
                  <br />
                  Bangladesh
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-accent">
                  Contact
                </label>
                <p className="text-sm font-bold uppercase leading-tight">
                  +880 (19) 11-756854
                  <br />
                </p>
              </div>
            </div>
          </div>

          {/* 3. RIGHT COLUMN: CONTACT FORM */}
          <div className="bg-white">
            <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
              {/* Input Grid (4 Inputs) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-sm font-black uppercase tracking-widest opacity-40">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="NAME / SURNAME"
                    className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-2 text-xs font-bold transition-colors bg-transparent uppercase tracking-tight"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-black uppercase tracking-widest opacity-40">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="USER@DOMAIN.COM"
                    className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-2 text-xs font-bold transition-colors bg-transparent uppercase tracking-tight"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-black uppercase tracking-widest opacity-40">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="INQUIRY TYPE"
                    className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-2 text-xs font-bold transition-colors bg-transparent uppercase tracking-tight"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase tracking-widest opacity-40">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    placeholder="019XXXXXX"
                    className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-2 text-xs font-bold transition-colors bg-transparent uppercase tracking-tight font-mono"
                  />
                </div>
              </div>

              {/* Textarea */}
              <div className="space-y-3 pt-2">
                <label className="text-sm font-black uppercase tracking-widest opacity-40">
                  Comment
                </label>
                <textarea
                  rows="5"
                  placeholder="PLEASE DETAIL YOUR REQUEST..."
                  className="w-full border-2 border-black/5 p-6 focus:border-accent outline-none text-xs font-medium transition-colors bg-base-200/30 rounded-sm uppercase tracking-tight leading-relaxed"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-black text-white py-4 font-heading font-black uppercase tracking-[0.4em] text-[12px] hover:bg-accent transition-all group relative overflow-hidden rounded-md cursor-pointer"
              >
                <span className="relative z-10">Send Message</span>
                {/* Subtle hover effect */}
                <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
