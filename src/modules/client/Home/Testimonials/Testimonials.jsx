import React from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const Testimonials = () => {
  const reviews = [
    {
      name: "Sarah Jenkins",
      role: "Interior Designer",
      comment: "The quality of the furniture is absolutely outstanding. I've recommended Kaufnest to all my clients. Their customer service is top-notch too!",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      name: "Michael Chen",
      role: "Homeowner",
      comment: "Fast shipping and the assembly was much easier than I expected. The modern look fits perfectly in my new apartment.",
      rating: 4.5,
      avatar: "https://i.pravatar.cc/150?img=11"
    },
    {
      name: "Emily Rodriguez",
      role: "Architect",
      comment: "I am amazed by the attention to detail on every piece. The materials feel premium and the design is truly timeless.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=5"
    }
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto" id="testimonials">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-base-content mb-4">
            Loved by Thousands
          </h2>
          <p className="text-lg text-base-content/60 font-light">
            Don't just take our word for it. Here is what our community of design lovers has to say about their experience.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((review, index) => (
          <div key={index} className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body">
              <Rating style={{ maxWidth: 120 }} value={review.rating} readOnly />
              <p className="py-6 text-base-content/80 text-lg italic leading-relaxed">
                "{review.comment}"
              </p>
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-base-200">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src={review.avatar} alt={review.name} />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-base-content">{review.name}</h4>
                  <p className="text-sm text-base-content/60">{review.role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
