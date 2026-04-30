import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate API call to your Node.js backend
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto" id="newsletter">
      <div className="bg-primary text-primary-content rounded-3xl overflow-hidden relative shadow-2xl">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 px-8 py-16 md:py-24 text-center max-w-3xl mx-auto">
          {status === "success" ? (
            <div className="animate-in fade-in zoom-in duration-500">
              <div className="text-5xl mb-4">🐧</div>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
                You're in the Colony!
              </h2>
              <p className="text-lg opacity-90">
                Check your email. Your 10% discount code is flying your way!
              </p>
            </div>
          ) : (
            <>
              <span className="bg-primary-content/20 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                Limited Time Offer
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-4">
                Get 10% Off Your First Order
              </h2>
              <p className="text-lg text-primary-content/80 font-medium mb-10 max-w-xl mx-auto">
                Join 5,000+ shoppers and get exclusive access to new drops,
                sales, and secret discount codes.
              </p>

              <form
                className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
                onSubmit={handleSubmit}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="input w-full rounded-full focus:outline-none bg-base-100 text-base-content h-14 px-6 border-none"
                  required
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn btn-neutral rounded-full px-8 h-14 shadow-lg hover:-translate-y-1 transition-all disabled:bg-neutral/50"
                >
                  {status === "loading" ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Claim Discount"
                  )}
                </button>
              </form>
            </>
          )}

          <p className="text-sm text-primary-content/60 mt-6">
            By subscribing, you agree to our{" "}
            <a
              href="#"
              className="underline hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
