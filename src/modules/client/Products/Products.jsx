import React, { useEffect, useState, useMemo } from "react";
import { Link, useLoaderData } from "react-router";
import ProductCard from "./../../../components/ProductCard";
import FeatureProducts from "../../../components/FeatureProducts";
import SearchBar from "../../../components/SearchBar";
import Category from "../../../components/Category";
import PriceRange from "../../../components/PriceRange";
import Brand from "../../../components/Brand";
import PageHeader from "../../../components/PageHeader";

const Products = () => {
  const data = useLoaderData();

  // ✅ Safe fallback for API data
  const productsList = data.products?.list_data || [];

  const categoryList = data.categories?.list_data || [];

  const [searchProductList, setSearchProductList] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [price, setPrice] = useState(0);

  const [openCategory, setOpenCategory] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [sortOption, setSortOption] = useState("newest");

  const itemsPerPage = 9;

  // ================= MAX PRICE =================
  const maxPrice =
    productsList.length > 0
      ? Math.max(...productsList.map((item) => item.price || 0))
      : 0;

  // ================= FILTER LOGIC =================
  const filteredProducts = useMemo(() => {
    let result = productsList;

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
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOption === "highToLow") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortOption === "newest") {
      result = [...result].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );
    }

    return result;
  }, [
    productsList,
    searchProductList,
    selectedCategory,
    selectedSubCategory,
    selectedBrands,
    price,
    sortOption,
  ]);

  console.log("filteredProducts", filteredProducts);

  // ================= PAGINATION =================
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  // reset page on filter change
  useEffect(() => {
    // Schedule the state update after the current render
    const timeout = setTimeout(() => {
      setCurrentPage(1);
    }, 0);

    return () => clearTimeout(timeout);
  }, [
    searchProductList,
    selectedCategory,
    selectedSubCategory,
    selectedBrands,
    price,
  ]);

  // ================= HANDLERS =================
  const toggleCategory = (category) => {
    setOpenCategory((prev) =>
      prev === category.par_cat_name ? null : category.par_cat_name,
    );
    console.log("prev", category);
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
    setSearchProductList("");
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setSelectedBrands([]);
    setSortOption("newest");
    setPrice(0);
  };

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

  return (
    <div>
      <div className="bg-white min-h-screen font-body selection:bg-accent selection:text-white">
        <PageHeader pageInfo={pageInfo}></PageHeader>

        {/* 2. MAIN CONTENT AREA */}
        <div className="container mx-auto px-6 py-8 flex flex-col lg:flex-row gap-12">
          {/* LEFT SIDEBAR FILTERS */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-28 space-y-10">
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
            {(searchProductList ||
              selectedCategory ||
              selectedSubCategory ||
              selectedBrands?.length > 0 ||
              price > 0) && (
              <h4
                onClick={handleClearFilter}
                className="text-sm cursor-pointer hover:text-accent flex items-center gap-2"
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
            )}

            <div className="flex justify-between items-center mb-8 pb-4 border-b border-black/5 font-heading text-[10px] font-bold uppercase tracking-[0.2em]">
              <span>
                Showing {(currentPage - 1) * itemsPerPage + 1}-
                {Math.min(currentPage * itemsPerPage, filteredProducts.length)}{" "}
                of {filteredProducts.length} Items
              </span>
              <select
                className="select select-ghost select-xs focus:bg-transparent font-bold cursor-pointer"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="newest">Sort: Newest</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
              {paginatedProducts.map((item, index) => (
                <ProductCard product={item} key={index}></ProductCard>
              ))}
            </div>

            {/* PAGINATION */}
            <div className="mt-20 flex justify-center">
              <div className="join gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className="join-item btn btn-outline btn-square rounded-none border-black/10"
                >
                  «
                </button>

                {getPagination().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => page !== "..." && setCurrentPage(page)}
                    className={`join-item btn btn-square rounded-none ${
                      currentPage === page
                        ? "bg-black text-white border-black"
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
                  className="join-item btn btn-outline btn-square rounded-none border-black/10"
                >
                  »
                </button>
              </div>
            </div>
          </main>
        </div>

        <FeatureProducts></FeatureProducts>
      </div>
    </div>
  );
};

export default Products;
