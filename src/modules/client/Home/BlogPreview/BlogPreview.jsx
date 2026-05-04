import React, { useState, useEffect } from "react";
import BlogCard from "../../../../components/BlogCard";
import { Link } from "react-router-dom";
import SkeletonCard from "../../../../pages/SkeletonCard";

const BlogPreview = ({ blogsData, isLoading }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (!blogsData?.blogs) {
      setTimeout(() => {}, 0);
      return;
    }

    const data = blogsData.blogs.list_data || blogsData.blogs || [];
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 4).map((b) => ({
      _id: b._id,
      title: b.title || "Design Inspiration",
      excerpt:
        b.short_description ||
        b.long_description?.substring(0, 100) + "..." ||
        "Read more about this topic...",
      image: b.image,
      date:
        b.date || b.createdAt
          ? new Date(b.date || b.createdAt).toLocaleDateString()
          : "Recent",
      category: b.category || "Design",
    }));

    setTimeout(() => {
      setBlogs(selected);
    }, 0);
  }, [blogsData]);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto" id="blog">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="flex flex-col gap-2 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-base-content">
            Blogs
          </h2>
          <p className="text-lg text-base-content/60 font-light">
            Read all the latest blogs and articles from penguin
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
          <SkeletonCard></SkeletonCard>
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
