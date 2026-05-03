import React, { useMemo, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import PageHeader from "../../../components/PageHeader";
import BlogCard from "../../../components/BlogCard";
import Pagination from "../../../components/Pagination";
import ComponentLoader from "../../../pages/ComponentLoader";
import DataNotFound from "../../../pages/DataNotFound";

const ITEMS_PER_PAGE = 4;

const BlogDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState({ blogs: null, blogDetails: null });
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchBlogData = async () => {
      setIsLoading(true);
      try {
        const [blogsRes, detailsRes] = await Promise.all([
          axios.get(
            `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/get-blog-list`,
          ),
          axios.get(
            `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/get-blog-list/${id}`,
          ),
        ]);
        setData({
          blogs: blogsRes.data,
          blogDetails: detailsRes.data,
        });
      } catch (error) {
        console.error("Failed to fetch blog details", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogData();
  }, [id]);

  // Safely extract blog data
  const blog =
    data?.blogDetails?.list_data?.[0] ||
    data?.blogDetails?.details_data ||
    data?.blogDetails;

  const _id = blog?._id;
  const category = blog?.category;
  const displayCategory = category || "Design";

  useEffect(() => {
    setTimeout(() => {
      setCurrentPage(1);
    }, 0);
  }, [_id]);

  // RELATED BLOGS (paginated)
  const allRelatedBlogs = useMemo(() => {
    const allBlogsList = data?.blogs?.list_data || data?.blogs || [];
    const formatted = allBlogsList.map((b) => ({
      _id: b._id,
      title: b.title || "Design Inspiration",
      excerpt:
        b.short_description ||
        b.long_description?.substring(0, 100) + "..." ||
        "Read more about this topic...",
      image:
        b.image_url ||
        b.image ||
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop&q=60",
      date:
        b.date || b.createdAt
          ? new Date(b.date || b.createdAt).toLocaleDateString()
          : "Recent",
      category: b.category || "Design",
    }));
    return formatted.filter(
      (b) => b._id !== _id && b.category === displayCategory,
    );
  }, [data?.blogs, _id, displayCategory]);

  const totalPages = Math.ceil(allRelatedBlogs.length / ITEMS_PER_PAGE);

  const paginatedRelatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return allRelatedBlogs.slice(start, start + ITEMS_PER_PAGE);
  }, [allRelatedBlogs, currentPage]);

  if (isLoading) {
    return <ComponentLoader />;
  }

  if (!blog || Object.keys(blog).length === 0) {
    return <DataNotFound backMsg="Back" mainMsg1="Blog" mainMsg2="Not Found" />;
  }

  const {
    image,
    image_url,
    title,
    date,
    createdAt,
    short_description,
    long_description,
  } = blog;

  const displayImage =
    image_url ||
    image ||
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=60";
  const displayDate =
    date || createdAt
      ? new Date(date || createdAt).toLocaleDateString()
      : "Recent";

  const pageInfo = [
    { parent_route_name: "Blogs", path: "/blogs" },
    { curren_route: "Blog Details" },
    { first_name: "Blog", last_name: "Details" },
  ];

  return (
    <>
      <PageHeader pageInfo={pageInfo} />
      <div className="bg-base-100 min-h-screen font-body selection:bg-accent selection:text-white pb-20">
        {/* MAIN BLOG DETAILS SECTION */}
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header / Meta */}
            <div className="text-center space-y-4">
              <span className="badge badge-primary font-bold shadow-sm py-3 px-6 uppercase tracking-widest text-xs">
                {displayCategory}
              </span>
              <h1 className="font-heading text-4xl md:text-6xl font-black uppercase tracking-tighter  leading-none">
                {title}
              </h1>
              <div className="flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-widest opacity-50">
                <span>By Penguin Experts</span>
                <span className="w-1 h-1 bg-base-content rounded-full"></span>
                <span>{displayDate}</span>
              </div>
            </div>

            {/* Main Image */}
            <div className="aspect-[21/9] bg-base-200 overflow-hidden border border-base-content/5 rounded-sm relative group">
              <img
                src={displayImage}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                alt={title}
              />
            </div>

            {/* Content Body */}
            <div className="prose prose-lg max-w-none text-base-content/80">
              {short_description && (
                <p className="text-xl font-medium leading-relaxed  border-l-4 border-accent pl-6 mb-8 text-base-content">
                  {short_description}
                </p>
              )}
              <div className="whitespace-pre-line leading-loose text-justify">
                {long_description ||
                  "Detailed content for this blog is currently unavailable."}
              </div>
            </div>

            {/* <div className="border-t border-base-content/10 pt-8 mt-12 flex items-center justify-center">
              <Link
                to="/buy-product"
                className="btn btn-primary px-10 py-4 rounded-full font-heading font-black uppercase tracking-widest text-xs hover:shadow-2xl hover:shadow-primary/40 transition-all hover:-translate-y-1"
              >
                Buy Now
              </Link>
            </div> */}
          </div>
        </div>

        {/* RELATED BLOGS */}
        {allRelatedBlogs.length > 0 && (
          <div className="bg-base-200/30 border-y border-base-content/5 py-16 mt-10">
            <div className="container mx-auto px-6">
              <div className="flex items-end justify-between mb-12">
                <h2 className="font-heading text-4xl font-black uppercase tracking-tighter">
                  Related{" "}
                  <span className="text-accent text-outline">Articles</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {paginatedRelatedBlogs.map((relatedBlog, index) => (
                  <BlogCard blog={relatedBlog} key={index} />
                ))}
              </div>

              {/* PAGINATION */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogDetails;
