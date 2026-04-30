import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../../../../components/BlogCard";
import { Link } from "react-router-dom";

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
        const selected = shuffled.slice(0, 4).map((b) => ({
          _id: b._id,
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
        <Link
          to="/blogs"
          className="hidden md:flex btn btn-outline border-base-300 hover:bg-primary hover:text-primary-content hover:border-primary px-8 rounded-full transition-all"
        >
          Read All Articles
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {isLoading ? (
          <div className="col-span-1 md:col-span-4 text-center py-10 opacity-50">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          blogs.map((blog, index) => (
            <BlogCard blog={blog} key={index}></BlogCard>
          ))
        )}
      </div>

      <div className="mt-12 text-center md:hidden">
        <Link
          to="/blogs"
          className="btn btn-outline border-base-300 w-full rounded-full"
        >
          Read All Articles
        </Link>
      </div>
    </section>
  );
};

export default BlogPreview;
