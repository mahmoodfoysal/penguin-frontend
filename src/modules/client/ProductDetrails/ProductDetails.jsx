import React from "react";
import { useLoaderData } from "react-router";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const ProductDetails = () => {
  const loadDetailsData = useLoaderData();

  const { prod_image, stock, rating, prod_name, price, description } =
    loadDetailsData.details_data;
  return (
    <div>
      <div className="bg-white min-h-screen font-body selection:bg-accent selection:text-white">
        {/* 1. MAIN PRODUCT SECTION */}
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* LEFT: IMAGE GALLERY */}
            <div className="w-full lg:w-1/2 space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-base-200 overflow-hidden border border-black/5 rounded-sm relative group">
                <img
                  src={prod_image}
                  className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                  alt="Main Product"
                />
                <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-black uppercase px-3 py-1 tracking-widest">
                  In Stock:{stock} Left
                </div>
              </div>

              {/* Thumbnails (Multiple Image Selection) */}
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-base-100 border-2 border-black/5 hover:border-accent cursor-pointer transition-colors overflow-hidden"
                  >
                    <img
                      src={`https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=200&v=${i}`}
                      className="w-full h-full object-cover mix-blend-multiply"
                      alt="thumb"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: PRODUCT INFO */}
            <div className="w-full lg:w-1/2">
              <div className="flex items-center gap-2 mb-4">
                {/* Rating Display */}

                <Rating style={{ maxWidth: 80 }} value={rating} readOnly />
                <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">
                  (128 Reviews***)
                </span>
              </div>

              <h1 className="font-heading text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none mb-4">
                {prod_name}
              </h1>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="font-heading font-bold text-4xl text-black">
                  ${price}
                </span>
                <span className="font-heading font-bold text-xl line-through opacity-30">
                  $310.00**
                </span>
              </div>

              <div className="mb-8 border-l-4 border-accent pl-6">
                <h3 className="font-heading font-black uppercase tracking-widest text-xs mb-2">
                  Description
                </h3>
                <p className="text-sm leading-relaxed opacity-70">
                  {description}
                </p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="bg-black text-white py-5 font-heading font-black uppercase tracking-[0.2em] text-sm hover:bg-accent transition-colors">
                  Add to Cart
                </button>
                <button className="bg-accent text-white py-5 font-heading font-black uppercase tracking-[0.2em] text-sm hover:bg-black transition-colors">
                  Buy It Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. RATINGS & REVIEWS SECTION */}
        <div className="bg-base-200/30 border-y border-black/5 py-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16">
              {/* Review Form */}
              <div className="w-full lg:w-1/3">
                <h2 className="font-heading text-3xl font-black uppercase italic mb-6">
                  Write a <span className="text-accent">Review</span>
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest mb-2">
                      Rating
                    </label>
                    <select className="select select-bordered w-full rounded-none border-black/10 focus:outline-accent">
                      <option>5 Stars - Excellent</option>
                      <option>4 Stars - Very Good</option>
                      <option>3 Stars - Average</option>
                      <option>2 Stars - Poor</option>
                      <option>1 Star - Terrible</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest mb-2">
                      Your Message
                    </label>
                    <textarea
                      className="textarea textarea-bordered w-full h-32 rounded-none border-black/10 focus:outline-accent"
                      placeholder="Tell us about the fit and feel..."
                    ></textarea>
                  </div>
                  <button className="btn btn-block bg-black text-white rounded-none border-none hover:bg-accent font-heading font-black uppercase tracking-widest">
                    Submit Review
                  </button>
                </div>
              </div>

              {/* Customer Feedback List */}
              <div className="w-full lg:w-2/3">
                <h2 className="font-heading text-3xl font-black uppercase italic mb-6">
                  Customer <span className="text-accent">Voices</span>
                </h2>
                <div className="space-y-8">
                  {[1, 2].map((review) => (
                    <div key={review} className="border-b border-black/5 pb-8">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-heading font-black uppercase text-sm">
                          Marcus K.
                        </h4>
                        <span className="text-accent text-xs">★★★★★</span>
                      </div>
                      <p className="text-sm opacity-70 leading-relaxed italic">
                        "Absolutely incredible quality. The cushioning feels
                        like walking on clouds, but with the support needed for
                        long-distance runs. Best purchase this year."
                      </p>
                      <div className="mt-4 text-[10px] font-bold opacity-30 uppercase tracking-widest">
                        Verified Buyer — 2 Days Ago
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. RELATED PRODUCTS */}
        <div className="py-20">
          <div className="container mx-auto px-6">
            <div className="flex items-end justify-between mb-12">
              <h2 className="font-heading text-4xl font-black uppercase italic tracking-tighter">
                Related <span className="text-accent text-outline">Gear</span>
              </h2>
              <button className="text-[10px] font-black uppercase tracking-[0.2em] border-b-2 border-accent pb-1">
                View Collection
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((id) => (
                <div key={id} className="group cursor-pointer">
                  <div className="aspect-[4/5] bg-base-200 mb-4 overflow-hidden rounded-sm relative">
                    <img
                      src={`https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=400&v=${id}`}
                      className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                      alt="Related"
                    />
                  </div>
                  <h4 className="font-heading font-black text-sm uppercase leading-none mb-1">
                    Stealth Runner v.{id}
                  </h4>
                  <p className="font-heading font-bold text-accent text-lg">
                    $190.00
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
