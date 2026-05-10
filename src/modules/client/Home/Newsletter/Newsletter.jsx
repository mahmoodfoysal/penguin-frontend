import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  showProcessing,
  showError,
  showSuccess,
  showConfirmation,
  closeAlert,
} from "../../../../components/Alert";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const Newsletter = () => {
  const axiosSecure = useAxiosSecure();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [couponCode, setCouponCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      const userRes = await axiosSecure.get(
        `/api/penguin/get-user-list/${email}`,
      );

      let user = userRes.data?.list_data?.[0];

      if (!user) {
        await axiosSecure.post(`/api/penguin/insert-update-user-list`, {
          full_name: userInfo.name || userInfo.displayName || "Customer",
          email: email,
        });

        const recheckRes = await axiosSecure.get(
          `/api/penguin/get-user-list/${email}`,
        );
        user = recheckRes.data?.list_data?.[0];
      }

      if (user && user.flag === 1) {
        closeAlert();
        setStatus("already_received");
        return;
      }

      if (user && user.flag === 0) {
        const newCode = generateCouponCode();

        await axiosSecure.post(`/api/penguin/admin/insert-update-coupon-list`, {
          coupon_code: newCode,
          email: email,
          flag: 0,
          per_dis_amt: "0.10",
          operator: "*",
        });

        await axiosSecure.patch(
          `/api/penguin/update-user-list/${user?._id}/${user?.email}`,
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
        throw new Error("Unable to process user record. Please try again.");
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
            By joining, you agree to our coupon{" "}
            <button
              onClick={() => setIsModalOpen(true)}
              className="underline hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 inline"
            >
              Privacy Policy
            </button>
            .
          </p>
        </div>
      </div>

      {/* Coupon Policy Modal */}
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center p-6 transition-all duration-300 ${isModalOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        <div
          className="absolute inset-0 bg-neutral-focus/60 backdrop-blur-md"
          onClick={() => setIsModalOpen(false)}
        ></div>
        <div className="bg-base-100 text-base-content relative z-10 w-full max-w-2xl rounded-[2.5rem] shadow-2xl p-10 overflow-y-auto max-h-[80vh] custom-scrollbar animate-in zoom-in duration-300">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full hover:bg-base-200 transition-colors cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <h2 className="font-heading text-4xl font-black uppercase tracking-tighter mb-8">
            Coupon <span className="text-accent">Policy</span>
          </h2>

          <div className="space-y-6 text-sm leading-relaxed opacity-80">
            <section>
              <h3 className="font-bold text-base-content mb-2 uppercase tracking-widest text-xs">
                1. Eligibility
              </h3>
              <p>
                Joining coupons are available only to first-time subscribers who
                have not previously claimed a newsletter discount.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base-content mb-2 uppercase tracking-widest text-xs">
                2. Discount Value
              </h3>
              <p>
                The standard joining coupon provides a 10% discount on the total
                cart value of Regular priced items.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base-content mb-2 uppercase tracking-widest text-xs">
                3. Exclusions
              </h3>
              <p>
                Coupons cannot be combined with other offers, sale items, or
                pre-discounted products. Some premium brands may be excluded
                from discount eligibility.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base-content mb-2 uppercase tracking-widest text-xs">
                4. Validity
              </h3>
              <p>
                Each coupon code is valid for a single use and expires 30 days
                after the date of issue.
              </p>
            </section>
          </div>

          <button
            onClick={() => setIsModalOpen(false)}
            className="mt-10 w-full btn btn-primary rounded-2xl h-14 font-heading font-black uppercase tracking-widest cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
