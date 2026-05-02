import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import BlogCard from "../../../components/BlogCard";
import SearchBar from "../../../components/SearchBar";
import Category from "../../../components/Category";
import PageHeader from "../../../components/PageHeader";
import Pagination from "../../../components/Pagination";
import ComponentLoader from "../../../pages/ComponentLoader";
import DataNotFound from "../../../pages/DataNotFound";
import Swal from "sweetalert2";
import SkeletonCard from "../../../pages/SkeletonCard";

const Blogs = () => {
  const pageInfo = [
    { parent_route_name: "Home", path: "/" },
    { curren_route: "Blogs" },
    { first_name: "All", last_name: "Blogs" },
  ];

  const [blogsList, setBlogsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchBlogList, setSearchBlogList] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openCategory, setOpenCategory] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // 2 rows of 4 cards

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/get-blog-list`,
        );
        const data = response.data?.list_data || response.data || [];
        const formatted = data.map((b) => ({
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

        // Sort newest first
        const sorted = formatted.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        setBlogsList(sorted);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Data Loading Failed",
          text:
            error.response?.data?.message ||
            error.message ||
            "Failed to load blog data",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const categoryList = useMemo(() => {
    const unique = [
      ...new Set(blogsList.map((b) => b.category).filter(Boolean)),
    ];
    return unique.map((cat) => ({
      par_cat_name: cat,
      par_cat_id: cat,
      sub_categories: [],
    }));
  }, [blogsList]);

  const filteredBlogs = useMemo(() => {
    let result = blogsList;

    if (searchBlogList) {
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(searchBlogList.toLowerCase()) ||
          item.excerpt.toLowerCase().includes(searchBlogList.toLowerCase()),
      );
    }

    if (selectedCategory) {
      result = result.filter((item) => item.category === selectedCategory);
    }

    return result;
  }, [blogsList, searchBlogList, selectedCategory]);

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBlogs.slice(start, start + itemsPerPage);
  }, [filteredBlogs, currentPage, itemsPerPage]);

  const toggleCategory = (category) => {
    const name = category.par_cat_name;
    setOpenCategory((prev) => (prev === name ? null : name));
    setSelectedCategory((prev) => (prev === name ? null : name));
  };

  const handleClearFilter = () => {
    setSearchBlogList("");
    setSelectedCategory(null);
    setOpenCategory(null);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchBlogList, selectedCategory]);

  return (
    <>
      <PageHeader pageInfo={pageInfo}></PageHeader>
      {isLoading ? (
        <ComponentLoader></ComponentLoader>
      ) : (
        <div className="bg-base-100 min-h-screen font-body selection:bg-accent selection:text-white">
          <div className="container mx-auto px-6 py-8 flex flex-col lg:flex-row gap-12">
            {/* MOBILE FILTER TOGGLE */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() =>
                  setOpenCategory(openCategory === "filters" ? null : "filters")
                }
                className="btn btn-outline w-full flex justify-between items-center"
              >
                <span>Filter & Search</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </button>
            </div>

            {/* LEFT SIDEBAR FILTERS */}
            <aside
              className={`w-full lg:w-64 flex-shrink-0 ${
                openCategory === "filters" ? "block" : "hidden lg:block"
              }`}
            >
              <div className="lg:sticky lg:top-28 space-y-10">
                {/* SEARCH */}
                <SearchBar
                  searchProductList={searchBlogList}
                  setSearchProductList={setSearchBlogList}
                ></SearchBar>

                {/* CATEGORY */}
                <Category
                  categoryList={categoryList}
                  openCategory={openCategory}
                  toggleCategory={toggleCategory}
                  handleSubCategory={() => {}}
                ></Category>
              </div>
            </aside>

            {/* BLOG GRID & PAGINATION */}
            <main className="flex-grow">
              {(searchBlogList || selectedCategory) && (
                <div className="flex items-center justify-between mb-6">
                  <h4
                    onClick={handleClearFilter}
                    className="text-sm cursor-pointer hover:text-accent flex items-center gap-2 font-bold uppercase tracking-widest text-accent"
                  >
                    Clear All Filters
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                      className="w-3.5 h-3.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </h4>
                </div>
              )}

              <div className="flex justify-between items-center mb-8 pb-4 border-b border-base-content/5 font-heading text-[10px] font-bold uppercase tracking-[0.2em]">
                <span>
                  Showing{" "}
                  {filteredBlogs.length > 0
                    ? (currentPage - 1) * itemsPerPage + 1
                    : 0}
                  -{Math.min(currentPage * itemsPerPage, filteredBlogs.length)}{" "}
                  of {filteredBlogs.length} Articles
                </span>
              </div>

              {!paginatedBlogs?.length ? (
                // <DataNotFound
                //   backMsg="Lost"
                //   mainMsg1="Articles"
                //   mainMsg2="Void"
                // ></DataNotFound>
                <SkeletonCard></SkeletonCard>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                  {paginatedBlogs.map((blog, index) => (
                    <BlogCard blog={blog} key={index}></BlogCard>
                  ))}
                </div>
              )}

              {/* PAGINATION */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default Blogs;
