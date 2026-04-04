import React from "react";

const AboutUs = () => {
  return (
    <div>
      <div className="min-h-screen bg-white text-black font-body p-8 md:p-12 overflow-x-hidden">
        {/* 1. HERO: BOLD & EDITORIAL */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="max-w-3xl">
              <h1 className="font-heading text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-[0.8] mb-10">
                Style <br />
                <span className="text-accent text-outline">Synchronized</span>
              </h1>
              <p className="text-xl md:text-3xl font-bold uppercase tracking-tighter leading-tight opacity-90 max-w-xl">
                We don't just sell products. We curate the technical gear that
                powers your daily orbit.
              </p>
            </div>
            <div className="md:text-right flex flex-col items-end">
              <div className="w-32 h-32 bg-black flex items-center justify-center rotate-12 hover:rotate-0 transition-transform duration-500 mb-6">
                <span className="text-white font-heading text-5xl font-black tracking-tighter italic">
                  V
                </span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
                EST. 2026 // RAJSHAHI
              </p>
            </div>
          </div>
        </section>

        {/* 2. THE COLLECTIONS GRID (E-commerce Focus) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-32">
          <div className="bg-black text-white p-12 flex flex-col justify-between aspect-video md:aspect-auto">
            <h2 className="font-heading text-4xl font-black uppercase italic tracking-tighter">
              The <span className="text-accent">Sourcing</span> <br />
              Standard
            </h2>
            <p className="text-xs opacity-60 leading-loose mt-12 max-w-sm uppercase font-bold tracking-widest">
              Every thread, sole, and buckle in our store undergoes a 12-point
              quality check before it enters the Vault.
            </p>
          </div>
          <div className="relative overflow-hidden group border border-black/10">
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800"
              className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110"
              alt="Product Focus"
            />
            <div className="absolute inset-0 bg-accent/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </section>

        {/* 3. CORE MANIFESTO (3-Column Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-40 border-y-2 border-black py-20">
          <div className="space-y-6">
            <span className="bg-accent text-white px-3 py-1 font-black text-[10px] uppercase tracking-[0.2em]">
              Curation
            </span>
            <h3 className="font-heading text-3xl font-black uppercase italic tracking-tighter">
              Anti-Generic
            </h3>
            <p className="text-xs font-medium leading-relaxed opacity-60 uppercase tracking-tight">
              We skip the mass-market clutter. Our store features limited drops
              and exclusive collabs designed for those who value rarity and
              function.
            </p>
          </div>
          <div className="space-y-6">
            <span className="bg-black text-white px-3 py-1 font-black text-[10px] uppercase tracking-[0.2em]">
              Efficiency
            </span>
            <h3 className="font-heading text-3xl font-black uppercase italic tracking-tighter">
              Zero Friction
            </h3>
            <p className="text-xs font-medium leading-relaxed opacity-60 uppercase tracking-tight">
              From our "Vault" backend to your doorstep, we have optimized the
              checkout experience to be as fast as a heartbeat. No lag, no
              fluff.
            </p>
          </div>
          <div className="space-y-6">
            <span className="bg-black text-white px-3 py-1 font-black text-[10px] uppercase tracking-[0.2em]">
              Community
            </span>
            <h3 className="font-heading text-3xl font-black uppercase italic tracking-tighter">
              Inner Circle
            </h3>
            <p className="text-xs font-medium leading-relaxed opacity-60 uppercase tracking-tight">
              Vortex isn't a brand; it's a membership. Our customers are global
              citizens who demand excellence in every single purchase.
            </p>
          </div>
        </div>

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
                Direct From <br />
                <span className="text-accent">The Source</span>
              </h2>
              <p className="text-sm font-medium leading-loose opacity-70">
                By cutting out the middleman and utilizing our own logistics
                network, we ensure that the value remains with you. We control
                the design, the storage, and the delivery—meaning you get
                premium gear without the traditional luxury markup.
              </p>
              <div className="pt-6 border-t border-black/10 inline-block">
                <p className="font-heading text-xl font-bold uppercase italic tracking-tighter">
                  Verified Authentic Protocol
                </p>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mt-1">
                  Every SKU digitally signed
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. SHOPPING CALL TO ACTION */}
        <footer className="bg-black text-white p-20 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-heading text-6xl md:text-9xl font-black uppercase italic tracking-tighter mb-12 leading-none">
              Enter The <span className="text-accent text-outline">Store</span>
            </h2>
            <button className="bg-white text-black px-16 py-6 font-heading font-black uppercase tracking-[0.3em] text-[12px] hover:bg-accent hover:text-white transition-all">
              Browse New Arrivals
            </button>
          </div>
          {/* Background watermark */}
          <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-heading text-[15rem] font-black italic opacity-[0.05] whitespace-nowrap pointer-events-none">
            VORTEX LABS
          </span>
        </footer>
      </div>
    </div>
  );
};

export default AboutUs;
