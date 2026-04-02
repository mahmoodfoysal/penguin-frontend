import React, { useState } from "react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div>
      <div className="bg-white min-h-screen font-body selection:bg-accent selection:text-white flex flex-col lg:flex-row">
        {/* LEFT SIDE: BRAND IMPACT (Hidden on Mobile) */}
        <div className="hidden lg:flex lg:w-1/2 bg-black relative overflow-hidden items-center justify-center p-20">
          {/* Background Decorative Text */}
          <div className="absolute inset-0 opacity-10 flex flex-col justify-center items-center select-none pointer-events-none">
            <span className="font-heading font-black text-[20vw] leading-none uppercase italic text-white text-outline">
              VORTEX
            </span>
            <span className="font-heading font-black text-[20vw] leading-none uppercase italic text-accent">
              LABS
            </span>
          </div>

          {/* Featured Image / Message */}
          <div className="relative z-10 text-white">
            <h2 className="font-heading text-7xl font-black uppercase italic tracking-tighter leading-none mb-6">
              Join the <br />{" "}
              <span className="text-accent text-outline">Revolution</span>
            </h2>
            <p className="font-heading font-bold uppercase tracking-[0.4em] text-xs opacity-60">
              Exclusive Drops • Early Access • Member Rewards
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: AUTH FORM */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-white">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="mb-12">
              <h1 className="font-heading text-5xl font-black uppercase italic tracking-tighter mb-2">
                {isLogin ? "Welcome " : "Create "}
                <span className="text-accent">
                  {isLogin ? "Back" : "Account"}
                </span>
              </h1>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                {isLogin
                  ? "Enter your details to access your gear"
                  : "Join our elite performance community"}
              </p>
            </div>

            {/* Form */}
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent placeholder:text-black/20"
                    placeholder="Enter your name"
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent placeholder:text-black/20"
                  placeholder="name@email.com"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                    Password
                  </label>
                  {isLogin && (
                    <button className="text-[9px] font-black uppercase tracking-tighter hover:text-accent transition-colors">
                      Forgot?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent placeholder:text-black/20"
                  placeholder="••••••••"
                />
              </div>

              {/* CTA Buttons */}
              <div className="pt-6 space-y-4">
                <button className="w-full bg-black text-white py-6 font-heading font-black uppercase tracking-[0.3em] text-sm hover:bg-accent transition-all shadow-xl shadow-black/10">
                  {isLogin ? "Login Now" : "Register Account"}
                </button>

                <button className="w-full border border-black/10 py-6 font-heading font-black uppercase tracking-[0.3em] text-sm hover:border-black transition-all flex items-center justify-center gap-3">
                  <div className="w-4 h-4 bg-black rounded-full"></div>{" "}
                  {/* Mock Google Icon */}
                  Continue with Google
                </button>
              </div>
            </form>

            {/* Footer Toggle */}
            <div className="mt-12 text-center">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                {isLogin ? "Don't have an account?" : "Already a member?"}
              </p>
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="mt-2 font-heading font-black text-sm uppercase tracking-widest text-accent border-b-2 border-accent pb-1 hover:text-black hover:border-black transition-all"
              >
                {isLogin ? "Create One Now" : "Login to Account"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
