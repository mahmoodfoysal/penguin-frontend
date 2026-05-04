import React, { useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router";
import ProductCard from "./../../../components/ProductCard";
// import FeatureProducts from "../../../components/FeatureProducts";
import SearchBar from "../../../components/SearchBar";
import Category from "../../../components/Category";
import PriceRange from "../../../components/PriceRange";
import Brand from "../../../components/Brand";
import PageHeader from "../../../components/PageHeader";
import ComponentLoader from "../../../pages/ComponentLoader";
import DataNotFound from "../../../pages/DataNotFound";
import axios from "axios";
import { showError } from "../../../components/Alert";

const Products = () => {
  const pageInfo = [
    {
      parent_route_name: "Home",
      path: "/home",
    },
    {
      curren_route: "Products",
    },
    {
      first_name: "All",
      last_name: "Products",
    },
  ];
  const [data, setData] = useState({ products: null, categories: null });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get(
            `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/get-product-list`,
          ),
          axios.get(
            `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/client/get-all-categories`,
          ),
        ]);
        setData({
          products: productsRes.data,
          categories: categoriesRes.data,
        });
      } catch (error) {
        console.error("Failed to fetch products data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductsData();
  }, []);

  const location = useLocation();

  // Safe fallback for API data
  const productsList =
    data.products?.list_data?.filter((item) => item.status === 1) || [];

  const categoryList =
    data.categories?.list_data?.filter((item) => item.status === 1) || [];

  const [searchProductList, setSearchProductList] = useState("");
  const [showNewestOnly, setShowNewestOnly] = useState(
    location.state?.filter === "newest",
  );
  const [showBestSellerOnly, setShowBestSellerOnly] = useState(
    location.state?.filter === "bestSeller",
  );
  const [reviewsList, setReviewsList] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(
    location.state?.categoryId || null,
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [price, setPrice] = useState(0);

  const [openCategory, setOpenCategory] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [sortOption, setSortOption] = useState(
    location.state?.filter === "bestSeller" ? "bestSeller" : "newest",
  );

  const itemsPerPage = 9;

  // ================= MAX PRICE =================
  const maxPrice =
    productsList.length > 0
      ? Math.max(...productsList.map((item) => item.price || 0))
      : 0;

  // Capture stable reference time on mount to maintain component purity
  const [referenceTime] = useState(() => Date.now());
  const thirtyDaysAgo = referenceTime - 30 * 24 * 60 * 60 * 1000;

  // Fetch reviews for best seller filtering
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/get-review-list`,
        );
        setReviewsList(response.data?.list_data || response.data || []);
      } catch (error) {
        showError(
          "Failed to load reviews",
          error.response?.data?.message || error.message,
        );
      }
    };
    fetchReviews();
  }, []);

  // Pre-calculate average ratings
  const ratingsMap = useMemo(() => {
    const map = {};
    reviewsList.forEach((review) => {
      const prodId = review.prod_id;
      if (!map[prodId]) {
        map[prodId] = { total: 0, count: 0 };
      }
      map[prodId].total += review.rating || 0;
      map[prodId].count += 1;
    });
    return map;
  }, [reviewsList]);

  // ================= FILTER LOGIC =================
  const filteredProducts = useMemo(() => {
    let result = productsList;

    // NEW ARRIVALS FILTER (Last 30 days)
    if (showNewestOnly) {
      result = result.filter(
        (item) => new Date(item.createdAt).getTime() >= thirtyDaysAgo,
      );
    }

    // BEST SELLER FILTER
    if (showBestSellerOnly) {
      result = result.filter((item) => {
        const stats = ratingsMap[item.prod_id];
        if (!stats) return false;
        const avg = stats.total / stats.count;
        return avg >= 4;
      });
    }

    // SEARCH
    if (searchProductList) {
      result = result.filter((item) => {
        const values = Object.values(item)
          .filter((val) => typeof val !== "object")
          .join(" ")
          .toLowerCase();

        return values.includes(searchProductList.toLowerCase());
      });
    }

    // CATEGORY
    if (selectedCategory) {
      result = result.filter((item) => item.par_cat_id === selectedCategory);
    }

    // SUB CATEGORY
    if (selectedSubCategory) {
      result = result.filter((item) => item.sub_cat_id === selectedSubCategory);
    }

    // BRAND
    if (selectedBrands.length > 0) {
      result = result.filter((item) => {
        // 1. Extract the brand name safely
        let productBrand = "";

        if (typeof item.prod_brand === "string") {
          productBrand = item.prod_brand;
        } else if (item.prod_brand && typeof item.prod_brand === "object") {
          // In case your API returns an object for brand
          productBrand = item.prod_brand.name || "";
        }

        const normalizedProductBrand = productBrand.trim().toLowerCase();

        // 2. Check if any selected brand matches
        return selectedBrands.some(
          (selected) =>
            selected.trim().toLowerCase() === normalizedProductBrand,
        );
      });
    }

    // PRICE
    if (price > 0) {
      result = result.filter((item) => item.price <= price);
    }

    // --- SORTING ---
    if (sortOption === "lowToHigh") {
      result = [...result].sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortOption === "highToLow") {
      result = [...result].sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortOption === "newest") {
      result = [...result].sort((a, b) => {
        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

        // Handle invalid dates (NaN) by treating them as 0
        const validTimeA = isNaN(timeA) ? 0 : timeA;
        const validTimeB = isNaN(timeB) ? 0 : timeB;

        return validTimeB - validTimeA;
      });
    } else if (sortOption === "bestSeller") {
      result = [...result].sort((a, b) => {
        const statsA = ratingsMap[a.prod_id];
        const statsB = ratingsMap[b.prod_id];
        const avgA = statsA ? statsA.total / statsA.count : 0;
        const avgB = statsB ? statsB.total / statsB.count : 0;
        return avgB - avgA;
      });
    }

    return result;
  }, [
    productsList,
    showNewestOnly,
    showBestSellerOnly,
    searchProductList,
    selectedCategory,
    selectedSubCategory,
    selectedBrands,
    price,
    sortOption,
    thirtyDaysAgo,
    ratingsMap,
  ]);

  // ================= PAGINATION =================
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  // ================= HANDLERS =================
  const toggleCategory = (category) => {
    setOpenCategory((prev) =>
      prev === category.par_cat_name ? null : category.par_cat_name,
    );
    setSelectedCategory(category.par_cat_id);
    setSelectedSubCategory(null);
  };

  const handleSubCategory = (subItem) => {
    setSelectedSubCategory(subItem.sub_cat_id);
  };

  const handleBrandChange = (brand) => {
    const normalized = brand.trim().toLowerCase();
    setSelectedBrands((prev) => {
      // Check if normalized brand is already selected
      if (prev.some((b) => b.toLowerCase() === normalized)) {
        // Remove it
        return prev.filter((b) => b.toLowerCase() !== normalized);
      } else {
        // Add it in normalized form
        return [...prev, normalized];
      }
    });
  };

  const getPagination = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }

    return pages;
  };

  // get brand list
  const getBrandList = productsList.reduce((acc, product) => {
    if (!acc.includes(product.prod_brand)) {
      acc.push(product.prod_brand);
    }
    return acc;
  }, []);

  const handleClearFilter = () => {
    setShowNewestOnly(false);
    setShowBestSellerOnly(false);
    setSearchProductList("");
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setSelectedBrands([]);
    setSortOption("newest");
    setPrice(0);
  };

  // Handle route state updates
  useEffect(() => {
    if (location.state?.categoryId) {
      setTimeout(() => {
        setSelectedCategory(location.state.categoryId);
      }, 0);
    }
    if (location.state?.filter === "newest") {
      setTimeout(() => {
        setShowNewestOnly(true);
      }, 0);
    }
    if (location.state?.filter === "bestSeller") {
      setTimeout(() => {
        setShowBestSellerOnly(true);
      }, 0);
    }
  }, [location.state]);

  // reset page on filter change
  useEffect(() => {
    setTimeout(() => {
      setCurrentPage(1);
    }, 0);
  }, [
    showNewestOnly,
    showBestSellerOnly,
    searchProductList,
    selectedCategory,
    selectedSubCategory,
    selectedBrands,
    price,
  ]);

  return (
    <>
      <PageHeader pageInfo={pageInfo}></PageHeader>
      {isLoading ? (
        <ComponentLoader></ComponentLoader>
      ) : (
        <div className="bg-base-100 min-h-screen font-body selection:bg-accent selection:text-white">
          {/* 2. MAIN CONTENT AREA */}
          <div className="container mx-auto px-6 py-8 flex flex-col lg:flex-row gap-12">
            {/* MOBILE FILTER TOGGLE */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() =>
                  setOpenCategory(openCategory === "filters" ? null : "filters")
                }
                className="btn btn-outline w-full flex justify-between items-center"
              >
                <span>Filter & Sort</span>
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
              className={`w-full lg:w-64 flex-shrink-0 ${openCategory === "filters" ? "block" : "hidden lg:block"}`}
            >
              <div className="lg:sticky lg:top-28 space-y-10">
                {/* SEARCH */}
                <SearchBar
                  searchProductList={searchProductList}
                  setSearchProductList={setSearchProductList}
                ></SearchBar>

                {/* CATEGORY */}
                <Category
                  categoryList={categoryList}
                  openCategory={openCategory}
                  toggleCategory={toggleCategory}
                  handleSubCategory={handleSubCategory}
                ></Category>

                {/* PRICE RANGE */}
                <PriceRange
                  price={price}
                  maxPrice={maxPrice}
                  setPrice={setPrice}
                ></PriceRange>

                {/* BRAND */}
                <Brand
                  handleBrandChange={handleBrandChange}
                  getBrandList={getBrandList}
                  selectedBrands={selectedBrands}
                ></Brand>
              </div>
            </aside>

            {/* PRODUCT GRID & PAGINATION */}
            <main className="flex-grow">
              {(showNewestOnly ||
                showBestSellerOnly ||
                searchProductList ||
                selectedCategory ||
                selectedSubCategory ||
                selectedBrands?.length > 0 ||
                price > 0) && (
                <div className="flex items-center justify-between mb-6">
                  <h4
                    onClick={handleClearFilter}
                    className="text-sm cursor-pointer hover:text-accent flex items-center gap-2 font-bold uppercase tracking-widest text-accent"
                  >
                    Clear All Filter
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

                  <div className="flex gap-2 flex-wrap">
                    {showNewestOnly && (
                      <span className="badge badge-accent badge-outline font-black uppercase  text-[10px] py-3 px-4 rounded-none tracking-widest">
                        New Arrivals Only
                      </span>
                    )}
                    {showBestSellerOnly && (
                      <span className="badge badge-warning badge-outline font-black uppercase  text-[10px] py-3 px-4 rounded-none tracking-widest">
                        Best Sellers Only
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center mb-8 pb-4 border-b border-base-content/5 font-heading text-[10px] font-bold uppercase tracking-[0.2em]">
                <span>
                  Showing {(currentPage - 1) * itemsPerPage + 1}-
                  {Math.min(
                    currentPage * itemsPerPage,
                    filteredProducts.length,
                  )}{" "}
                  of {filteredProducts.length} Items
                </span>
                <select
                  className="select select-ghost select-xs focus:bg-transparent font-bold cursor-pointer"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="newest">Sort: Newest</option>
                  <option value="bestSeller">Sort: Best Seller</option>
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                </select>
              </div>

              {!paginatedProducts?.length ? (
                <DataNotFound
                  backMsg="Lost"
                  mainMsg1="Data"
                  mainMsg2="Void"
                  handleBtn={handleClearFilter}
                  btnTxt="Clear Filter"
                ></DataNotFound>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
                  {paginatedProducts.map((item, index) => {
                    const stats = ratingsMap[item.prod_id];
                    const isBestSeller =
                      stats && stats.total / stats.count >= 4;
                    return (
                      <ProductCard
                        product={item}
                        key={index}
                        isBestSeller={isBestSeller}
                      ></ProductCard>
                    );
                  })}
                </div>
              )}

              {/* PAGINATION */}
              <div className="mt-20 flex justify-center">
                <div className="join gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className="join-item btn btn-outline btn-square rounded-none border-base-content/10"
                  >
                    «
                  </button>

                  {getPagination().map((page, index) => (
                    <button
                      key={index}
                      onClick={() => page !== "..." && setCurrentPage(page)}
                      className={`join-item btn btn-square rounded-none ${
                        currentPage === page
                          ? "bg-base-content text-base-100 border-base-content"
                          : "btn-outline"
                      } ${page === "..." ? "btn-disabled" : ""}`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className="join-item btn btn-outline btn-square rounded-none border-base-content/10"
                  >
                    »
                  </button>
                </div>
              </div>
            </main>
          </div>

          {/* <FeatureProducts></FeatureProducts> */}
        </div>
      )}
    </>
  );
};

export default Products;
