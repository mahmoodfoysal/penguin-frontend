import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      num: "01",
      title: "Browse & Select",
      description:
        "Explore our extensive collection and find the perfect pieces that match your style.",
    },
    {
      num: "02",
      title: "Secure Checkout",
      description:
        "Add items to your cart and proceed through our fast, 100% secure payment gateway.",
    },
    {
      num: "03",
      title: "Fast Delivery",
      description:
        "We carefully package your items and deliver them right to your doorstep swiftly.",
    },
    {
      num: "04",
      title: "Enjoy Your Home",
      description:
        "Unbox, setup, and enjoy your beautifully upgraded living space with your new items.",
    },
  ];

  return (
    <section className="py-20 bg-base-200" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 text-base-content">
            How It Works
          </h2>
          <p className="text-lg text-base-content/60 font-light">
            Your journey to a beautiful home is simple and straightforward. Here
            are the four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center group">
              <div className="w-24 h-24 mx-auto bg-base-100 rounded-full flex items-center justify-center text-3xl font-black text-primary shadow-lg mb-6 relative z-10 group-hover:bg-primary group-hover:text-primary-content transition-colors duration-300">
                {step.num}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-base-content/70">{step.description}</p>

              {/* Connector Line for Desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-[2px] bg-base-300 z-0">
                  <div className="h-full bg-primary w-0 group-hover:w-full transition-all duration-500 delay-100"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
