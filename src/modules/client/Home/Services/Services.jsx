import React from "react";

const MembershipServices = () => {
  const benefits = [
    {
      title: "Priority Fulfillment",
      description:
        "Skip the queue. Member orders are prioritized for same-day dispatch during peak shopping seasons.",
      tag: "Express",
    },
    {
      title: "Early Access Drops",
      description:
        "Get a 24-hour head start on limited edition collections and seasonal sales before the general public.",
      tag: "VIP",
    },
    {
      title: "Point Multipliers",
      description:
        "Earn 2x Penguin Points on every purchase, redeemable for instant checkout discounts.",
      tag: "Earn",
    },
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1 bg-base-300 p-8 rounded-3xl flex flex-col justify-between">
          <h2 className="text-3xl font-black uppercase leading-none">
            Join the <br />
            <span className="text-primary">Colony</span>
          </h2>
          <p className="mt-4 text-sm opacity-70">
            Unlock exclusive services and better pricing by creating an account.
          </p>
        </div>
        {benefits.map((b, i) => (
          <div
            key={i}
            className="lg:col-span-1 border border-base-300 p-8 rounded-3xl group hover:bg-base-content hover:text-base-100 transition-all cursor-default"
          >
            <span className="badge badge-primary badge-outline group-hover:badge-secondary mb-6">
              {b.tag}
            </span>
            <h3 className="text-xl font-bold mb-3">{b.title}</h3>
            <p className="text-sm opacity-60 group-hover:opacity-100 leading-relaxed">
              {b.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MembershipServices;
