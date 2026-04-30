import React from "react";
import { useLoaderData } from "react-router";

const Statistics = () => {
  // Try to use loader data if available
  const loaderData = useLoaderData();
  const productsCount = loaderData?.products?.list_data?.length || 240;

  const stats = [
    { label: "Active Products", value: `${productsCount}+` },
    { label: "Happy Customers", value: "15k+" },
    { label: "Years Experience", value: "10+" },
    { label: "Awards Won", value: "24" }
  ];

  return (
    <section className="py-16 bg-primary text-primary-content" id="statistics">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-primary-content/20">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center p-4">
              <h3 className="text-4xl md:text-5xl font-black mb-2 tracking-tighter">
                {stat.value}
              </h3>
              <p className="text-lg font-medium text-primary-content/80 uppercase tracking-widest text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
