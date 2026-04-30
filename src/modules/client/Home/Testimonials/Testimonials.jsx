import React, { useRef, useState, useEffect } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import axios from "axios";

const Testimonials = () => {
  const scrollRef = useRef(null);
  const [reviews, setReviews] = useState([]);

  // Fetch Reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/get-review-list`
        );
        const data = response.data?.list_data || response.data || [];
        
        // Filter good reviews with comments and take top 10
        const goodReviews = data
          .filter((r) => r.rating >= 4 && r.comment)
          .slice(0, 10);

        const formattedReviews = goodReviews.map((r, i) => ({
          name: r.full_name || "Verified Customer",
          role: "Design Lover",
          comment: r.comment,
          rating: r.rating || 5,
          avatar: r.image_url || `https://i.pravatar.cc/150?img=${(i % 50) + 1}`,
        }));

        setReviews(formattedReviews);
      } catch (error) {
        console.error("Failed to fetch testimonials", error);
      }
    };

    fetchReviews();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      
      // Calculate scroll amount: one card width + gap (gap-8 is 32px)
      const firstChild = scrollRef.current.firstElementChild;
      const scrollAmount = firstChild ? firstChild.offsetWidth + 32 : clientWidth;
      
      let scrollTo =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;

      // Wrap around logic
      if (direction === "right" && scrollLeft + clientWidth >= scrollWidth - 10) {
        scrollTo = 0; // Go back to start
      } else if (direction === "left" && scrollLeft <= 0) {
        scrollTo = scrollWidth; // Go to end
      }

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  // Auto-scroll Carousel
  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      scroll("right");
    }, 4000); // Scroll every 4 seconds

    return () => clearInterval(interval);
  }, [reviews]);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto" id="testimonials">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-base-content mb-4">
            Loved by Thousands
          </h2>
          <p className="text-lg text-base-content/60 font-light">
            Don't just take our word for it. Here is what our community of
            design lovers has to say.
          </p>
        </div>

        {/* NAVIGATION BUTTONS */}
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="btn btn-circle btn-outline border-base-300 hover:bg-primary hover:border-primary group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              ←
            </span>
          </button>
          <button
            onClick={() => scroll("right")}
            className="btn btn-circle btn-outline border-base-300 hover:bg-primary hover:border-primary group"
          >
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
        </div>
      </div>

      {/* SCROLLABLE CONTAINER */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-8 pb-8 no-scrollbar snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full md:w-[calc(33.333%-1.5rem)] snap-start card bg-base-100 shadow-xl border border-base-200"
            >
              <div className="card-body flex flex-col">
                <Rating
                  style={{ maxWidth: 120 }}
                  value={review.rating}
                  readOnly
                />
                <p className="py-6 text-base-content/80 text-lg italic leading-relaxed flex-grow line-clamp-4">
                  "{review.comment}"
                </p>
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-base-200">
                  <div className="avatar">
                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
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
          ))
        ) : (
          <div className="w-full text-center py-10 opacity-50">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
