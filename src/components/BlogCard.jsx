import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <Link
      to={`/blog-details/${blog._id}`}
      className="card bg-base-100 border border-base-200 overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/30 block"
    >
      <figure className="aspect-[16/10] overflow-hidden relative">
        <div className="absolute top-4 left-4 z-10">
          <span className="badge badge-primary font-bold shadow-lg py-3 px-4">
            {blog.category}
          </span>
        </div>
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </figure>

      <div className="card-body p-7">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-8 h-[1px] bg-primary/40"></span>
          <p className="text-xs text-primary font-bold uppercase tracking-widest">
            {blog.date}
          </p>
        </div>

        <h3 className="card-title text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
          {blog.title}
        </h3>

        <p className="text-base-content/60 text-sm line-clamp-3 leading-relaxed mb-4">
          {blog.excerpt}
        </p>

        <div className="mt-auto flex items-center gap-2 text-primary font-black text-xs uppercase tracking-tighter group-hover:gap-4 transition-all">
          Continue Reading
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
