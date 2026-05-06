import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  showProcessing,
  showError,
  showSuccess,
  showConfirmation,
  closeAlert,
} from "../../../../components/Alert";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [couponCode, setCouponCode] = useState("");
  const userInfo = useSelector((state) => state.auth.userInfo);

  const generateCouponCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInfo) {
      showError("Login Required", "Please log in to claim your discount!");
      return;
    }

    if (email !== userInfo.email) {
      showError("Email Mismatch", "Please use your registered account email.");
      return;
    }

    const confirmation = await showConfirmation(
      "Claim Discount?",
      "Do you want to claim your exclusive 10% discount coupon?",
    );

    if (!confirmation.isConfirmed) return;

    setStatus("loading");
    showProcessing("Processing...", "Generating your discount code...");

    try {
      // 1. Check user status/flag
      const userRes = await axios.get(
        `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/get-user-list/${email}`,
      );

      // Backend usually returns an array for list endpoints
      const user = userRes.data?.list_data?.[0];

      if (user && user.flag === 1) {
        closeAlert();
        setStatus("already_received");
        return;
      }

      if (user && user.flag === 0) {
        const newCode = generateCouponCode();

        // 2. Generate and store coupon
        await axios.post(
          `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/admin/insert-update-coupon-list`,
          {
            coupon_code: newCode,
            email: email,
            flag: 0,
            per_dis_amt: "0.10",
            operator: "*",
          },
        );

        // 3. Update user flag to 1
        await axios.patch(
          `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/update-user-list/${user?._id}/${user?.email}`,
        );

        setCouponCode(newCode);
        setStatus("success");
        setEmail("");
        closeAlert();
        showSuccess(
          "Congratulations!",
          "Your exclusive discount code is ready to use.",
        );
      } else {
        throw new Error("User record not found or invalid.");
      }
    } catch (error) {
      console.error("Newsletter process failed:", error);
      setStatus("error");
      showError(
        "Oops...",
        error.response?.data?.message ||
          "Something went wrong! Please try again.",
      );
    }
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
              <p className="text-lg opacity-90 mb-6">
                Your 10% discount code is ready:
              </p>
              <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 inline-block mb-4">
                <span className="text-4xl md:text-6xl font-black tracking-widest text-white">
                  {couponCode}
                </span>
              </div>
              <p className="text-sm opacity-70">
                Copy this code and use it at checkout!
              </p>
            </div>
          ) : status === "already_received" ? (
            <div className="animate-in fade-in zoom-in duration-500">
              <div className="text-5xl mb-4">👋</div>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
                Already Claimed
              </h2>
              <p className="text-lg opacity-90">
                You've already received your newsletter discount code. Check
                your previous orders or emails!
              </p>
            </div>
          ) : (
            <>
              <span className="bg-primary-content/20 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                Limited Time Offer
              </span>
              <h2 className="text-3xl md:text-5xl uppercase font-extrabold tracking-tighter mb-4">
                Get 10% Off your joining coupon
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
                    "Claim Coupon"
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
