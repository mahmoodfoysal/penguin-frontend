import React from "react";

const Contact = () => {
  return (
    <div>
      <div className="min-h-screen bg-white text-black font-body p-8 md:p-12 overflow-x-hidden">
        {/* 1. HEADER SECTION */}
        <div className="mb-20">
          <h1 className="font-heading text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-black leading-none">
            Contact <span className="text-accent text-outline">The Lab</span>
          </h1>
          <div className="h-1 w-24 bg-accent mt-6"></div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 mt-6">
            Direct communication protocol // 24/7 Response
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* 2. LEFT COLUMN: INFO & MAP */}
          <div className="space-y-16">
            {/* MAP IFRAME */}
            <div className="relative group border-2 border-black p-1 shadow-[10px_10px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_#FF4D00] transition-all">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093747!2d-122.4194155!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter%20HQ!5e0!3m2!1sen!2sus!4v1634567890123!5m2!1sen!2sus"
                className="w-full h-[350px] grayscale contrast-125 invert"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Vortex HQ"
              ></iframe>
            </div>

            {/* CONTACT INFO GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t-2 border-black pt-12">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-accent">
                  Headquarters
                </label>
                <p className="text-sm font-bold uppercase leading-tight">
                  1200 Industrial Sector
                  <br />
                  Warehouse District X<br />
                  San Francisco, CA 94103
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-accent">
                  Digital Reach
                </label>
                <p className="text-sm font-bold uppercase leading-tight">
                  lab@vortex.com
                  <br />
                  support@vortex.com
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-accent">
                  Voice Comms
                </label>
                <p className="text-sm font-bold uppercase leading-tight">
                  +1 (888) VRTX-LAB
                  <br />
                  +1 (555) 012-3456
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-accent">
                  Operating Hours
                </label>
                <p className="text-sm font-bold uppercase leading-tight opacity-40">
                  Mon - Fri: 08:00 - 20:00
                  <br />
                  Sat: 10:00 - 16:00
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
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40">
                    Full Identity
                  </label>
                  <input
                    type="text"
                    placeholder="NAME / SURNAME"
                    className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-4 text-sm font-bold transition-colors bg-transparent uppercase tracking-tight"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40">
                    Return Email
                  </label>
                  <input
                    type="email"
                    placeholder="USER@DOMAIN.COM"
                    className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-4 text-sm font-bold transition-colors bg-transparent uppercase tracking-tight"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    placeholder="INQUIRY TYPE"
                    className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-4 text-sm font-bold transition-colors bg-transparent uppercase tracking-tight"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40">
                    Order Ref (If applicable)
                  </label>
                  <input
                    type="text"
                    placeholder="SKU-XXXXXX"
                    className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-4 text-sm font-bold transition-colors bg-transparent uppercase tracking-tight font-mono"
                  />
                </div>
              </div>

              {/* Textarea */}
              <div className="space-y-3 pt-4">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-40">
                  Transmission Content
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
                className="w-full bg-black text-white py-8 font-heading font-black uppercase tracking-[0.4em] text-[12px] hover:bg-accent transition-all group relative overflow-hidden"
              >
                <span className="relative z-10">Send Message</span>
                {/* Subtle hover effect */}
                <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>

              <p className="text-[8px] font-black uppercase tracking-widest opacity-20 text-center">
                By clicking send, you agree to our data transmission protocol.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
