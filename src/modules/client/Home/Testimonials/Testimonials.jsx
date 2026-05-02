import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "@smastrom/react-rating/style.css";

import axios from "axios";
import SkeletonCard from "../../../../pages/SkeletonCard";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  // Fetch Reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/get-review-list`,
        );
        const data = response.data?.list_data || response.data || [];

        const goodReviews = data
          .filter((r) => r.rating >= 4 && r.comment)
          .slice(0, 10);

        const formattedReviews = goodReviews.map((r) => ({
          name: r.full_name,

          comment: r.comment,
          rating: r.rating,
          avatar: r.image_url,
        }));

        setReviews(formattedReviews);
      } catch (error) {
        console.error("Failed to fetch testimonials", error);
      }
    };

    fetchReviews();
  }, []);

  if (reviews.length === 0) return null;

  return (
    <section
      className="py-12 md:py-24 max-w-full overflow-x-hidden bg-base-100"
      id="testimonials"
    >
      <div className="container mx-auto px-4 md:px-10 overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
              Loved by Thousands
            </h2>
            <p className="text-lg text-base-content/60 font-light max-w-2xl">
              Our clients love our products, and we love them back.
            </p>
          </div>

          {/* CUSTOM NAVIGATION BUTTONS */}
          <div className="flex gap-4 self-start sm:self-end lg:self-center">
            <button
              className="testimonial-prev btn btn-circle btn-outline border-base-content/10 hover:bg-primary hover:border-primary transition-all active:scale-90"
              aria-label="Previous testimonial"
            >
              ←
            </button>
            <button
              className="testimonial-next btn btn-circle btn-outline border-base-content/10 hover:bg-primary hover:border-primary transition-all active:scale-90"
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>
        </div>

        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          loop={true}
          grabCursor={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            nextEl: ".testimonial-next",
            prevEl: ".testimonial-prev",
          }}
          breakpoints={{
            // Tablet (>= 768px)
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            // Desktop (>= 1024px)
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
          className="w-full pb-16"
        >
          {!reviews ? (
            <SkeletonCard></SkeletonCard>
          ) : (
            reviews.map((review, index) => (
              <SwiperSlide key={index} className="h-auto">
                <div className="group h-full p-2">
                  <div className="bg-base-100 h-full rounded-2xl p-6 md:p-8 border border-base-content/5 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500 flex flex-col relative overflow-hidden">
                    {/* Decorative Accent */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>

                    {/* Header: Profile */}
                    <div className="flex items-center gap-4 mb-8">
                      <div className="relative">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden ring-2 ring-primary/20 ring-offset-2 ring-offset-base-100 group-hover:ring-primary transition-all duration-500">
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1 rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform duration-500">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                          </svg>
                        </div>
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-heading font-black uppercase text-base md:text-lg tracking-tighter truncate leading-none">
                          {review.name}
                        </h4>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mt-1 truncate">
                          {review.role}
                        </p>
                      </div>
                    </div>

                    {/* Body: Quote */}
                    <div className="relative flex-grow">
                      <span className="absolute -top-4 -left-2 text-primary/10 text-6xl font-serif select-none group-hover:text-primary/20 transition-colors">
                        “
                      </span>
                      <p className="relative z-10 text-base-content/80 text-sm md:text-base  leading-relaxed line-clamp-6 pt-2">
                        {review.comment}
                      </p>
                    </div>

                    {/* Footer: Rating */}
                    <div className="mt-8 pt-6 border-t border-base-content/5 flex items-center justify-between">
                      <Rating
                        style={{ maxWidth: 100 }}
                        value={review.rating}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
