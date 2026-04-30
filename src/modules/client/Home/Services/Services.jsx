import React from "react";

const Services = () => {
  const services = [
    {
      title: "Interior Design Consultation",
      description: "Work with our expert designers to create the perfect space tailored to your lifestyle and taste.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "White Glove Delivery",
      description: "Enjoy stress-free delivery, unboxing, and assembly. We'll even remove the packaging when we leave.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      )
    },
    {
      title: "Custom Furniture",
      description: "Can't find exactly what you're looking for? We build custom pieces tailored to your exact specifications.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto" id="services">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-base-content mb-4">
          Premium Services
        </h2>
        <p className="text-lg text-base-content/60 font-light">
          We go beyond just selling furniture. Discover our premium services designed to make your home beautiful and your life easier.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="card bg-base-100 shadow-xl border border-base-200 hover:-translate-y-2 transition-transform duration-300">
            <div className="card-body items-center text-center">
              <div className="bg-primary/10 p-5 rounded-full mb-4">
                {service.icon}
              </div>
              <h3 className="card-title text-2xl font-bold mb-2">{service.title}</h3>
              <p className="text-base-content/70 leading-relaxed">{service.description}</p>
              <div className="card-actions mt-4">
                <button className="btn btn-outline btn-primary rounded-full px-8">Learn More</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
