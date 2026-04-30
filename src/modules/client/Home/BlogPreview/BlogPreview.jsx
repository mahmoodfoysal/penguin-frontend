import React, { useState, useEffect } from "react";
import axios from "axios";

const BlogPreview = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/get-blog-list`,
        );
        const data = response.data?.list_data || response.data || [];
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3).map((b) => ({
          title: b.title || "Design Inspiration",
          excerpt:
            b.short_description ||
            b.long_description?.substring(0, 100) + "..." ||
            "Read more about this topic...",
          image:
            b.image_url ||
            b.image ||
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          date:
            b.date || b.createdAt
              ? new Date(b.date || b.createdAt).toLocaleDateString()
              : "Recent",
          category: b.category || "Design",
        }));

        setBlogs(selected);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto" id="blog">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="flex flex-col gap-2 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-base-content">
            Design Inspiration
          </h2>
          <p className="text-lg text-base-content/60 font-light">
            Tips, trends, and inspiration from our interior design experts.
          </p>
        </div>
        <button className="hidden md:flex btn btn-outline border-base-300 hover:bg-primary hover:text-primary-content hover:border-primary px-8 rounded-full transition-all">
          Read All Articles
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {isLoading ? (
          <div className="col-span-1 md:col-span-3 text-center py-10 opacity-50">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          blogs.map((blog, index) => (
            <div
              key={index}
              className="card bg-base-100 border border-base-200 overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/30"
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
            </div>
          ))
        )}
      </div>

      <div className="mt-12 text-center md:hidden">
        <button className="btn btn-outline border-base-300 w-full rounded-full">
          Read All Articles
        </button>
      </div>
    </section>
  );
};

export default BlogPreview;
