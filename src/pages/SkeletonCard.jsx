import React from "react";

const SkeletonCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="animate-pulse">
          <div className="flex flex-col">
            {/* Main Image Container */}
            <div className="relative overflow-hidden rounded-3xl bg-base-300 aspect-[3/4]">
              {/* Badge Skeletons */}
              <div className="absolute top-5 left-5 z-20 flex flex-col gap-2">
                <div className="h-5 w-12 bg-base-200/60 rounded-full"></div>
                <div className="h-5 w-20 bg-base-200/60 rounded-full"></div>
              </div>

              {/* Floating Action Button Skeleton */}
              <div className="absolute bottom-5 right-5 h-12 w-12 bg-base-200/60 rounded-full"></div>
            </div>

            {/* Info Section */}
            <div className="mt-5 px-1">
              {/* Title Placeholder */}
              <div className="h-7 bg-base-300 rounded-lg w-4/5 mb-3"></div>

              {/* Brand & Price Row */}
              <div className="flex justify-between items-center mt-2">
                {/* Brand Name */}
                <div className="h-4 bg-base-300 rounded w-1/4"></div>
                {/* Price */}
                <div className="h-7 bg-base-300 rounded w-1/5"></div>
              </div>

              {/* Stock & View Details Row */}
              <div className="flex justify-between items-center mt-2">
                {/* Stock Level */}
                <div className="h-4 bg-base-300 rounded w-1/3"></div>
                {/* "View Details" Text */}
                <div className="h-4 bg-base-300 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonCard;
