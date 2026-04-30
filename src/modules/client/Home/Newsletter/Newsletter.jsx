import React from "react";

const Newsletter = () => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto" id="newsletter">
      <div className="bg-primary text-primary-content rounded-3xl overflow-hidden relative">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary-content/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-primary-content/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 px-8 py-16 md:py-24 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-lg text-primary-content/80 font-medium mb-10 max-w-xl mx-auto">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals delivered right to your inbox.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="input input-bordered w-full rounded-full focus:outline-none focus:ring-2 focus:ring-primary-content bg-base-100 text-base-content border-none h-14 px-6"
              required 
            />
            <button type="submit" className="btn btn-neutral rounded-full px-8 h-14 shadow-lg hover:-translate-y-1 transition-transform">
              Subscribe
            </button>
          </form>
          <p className="text-sm text-primary-content/60 mt-4">
            We care about your data. Read our <a href="#" className="underline font-bold">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
