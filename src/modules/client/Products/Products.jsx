import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import ProductCard from "./../../../components/ProductCard";
import Category from "../../../components/Category";
import PriceRange from "../../../components/PriceRange";
import Brand from "../../../components/Brand";
import Pagination from "../../../components/Pagination";
import FeatureProducts from "../../../components/FeatureProducts";

const Products = () => {
  const data = useLoaderData();

  const productsList = data.products?.list_data;

  const categoryList = data.categories?.list_data;

  const [filterProduct, setFilterProduct] = useState(productsList || []);

  const [priceValue, setPriceValue] = useState(productsList || []);

  const maxPrice = Math.max(...priceValue.map((item) => item.price));

  const [price, setPrice] = useState(0);

  const handleFilterProducts = (catItem) => {
    setPrice(0);
    if (catItem == null) {
      setFilterProduct(productsList);
      setPriceValue(productsList);
    } else if (catItem) {
      const filterProd = productsList.filter(
        (item) => item.par_cat_id === catItem.par_cat_id,
      );
      setFilterProduct(filterProd);
      setPriceValue(filterProd);
    }
  };

  // useEffect(() => {
  //   if (price === 0) {
  //     setFilterProduct(productsList); // reset
  //     return;
  //   }
  //   const updated = productsList.filter(item => item.price <= price);
  //   setFilterProduct(updated);
  // }, [price, productsList]);

  useEffect(() => {
    if (price === 0) return;

    const timer = setTimeout(() => {
      setFilterProduct((prev) => prev.filter((item) => item.price <= price));
    }, 0);

    return () => clearTimeout(timer);
  }, [price]);

  console.log("filterProduct", filterProduct);

  return (
    <div>
      <div className="bg-white min-h-screen font-body selection:bg-accent selection:text-white">
        {/* 1. PAGE HEADER */}
        <div className="border-b border-black/5 bg-base-200/30">
          <div className="container mx-auto px-6 py-12">
            <h1 className="font-heading text-5xl md:text-7xl font-black uppercase tracking-tighter italic">
              All <span className="text-accent text-outline">Products</span>
            </h1>
            <div className="flex gap-2 text-[10px] uppercase tracking-[0.2em] font-bold opacity-50 mt-4">
              <a href="/">Home</a> <span>/</span>{" "}
              <span className="text-black">Products</span>
            </div>
          </div>
        </div>

        {/* 2. MAIN CONTENT AREA */}
        <div className="container mx-auto px-6 py-8 flex flex-col lg:flex-row gap-12">
          {/* LEFT SIDEBAR FILTERS */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-28 space-y-10">
              {/* 1. CATEGORIES WITH SUB-CATEGORIES (NEW) */}
              <Category
                categoryList={categoryList}
                handleFilterProducts={handleFilterProducts}
              ></Category>

              {/* Price Range Filter */}
              <PriceRange
                setPrice={setPrice}
                price={price}
                maxPrice={maxPrice}
              ></PriceRange>

              {/* Brand Filter */}
              <Brand></Brand>
            </div>
          </aside>

          {/* 3. PRODUCT GRID & PAGINATION */}
          <main className="flex-grow">
            {/* Top Bar (Sort) */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-black/5 font-heading text-[10px] font-bold uppercase tracking-[0.2em]">
              <span>
                Showing 1-{filterProduct?.length || 0} of{" "}
                {productsList?.length || 0} Items
              </span>
              <select className="select select-ghost select-xs focus:bg-transparent font-bold">
                <option>Sort: Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
              {productsList.map((item, index) => (
                <ProductCard product={item} key={index}></ProductCard>
              ))}
            </div>

            {/* Pagination */}
            <Pagination></Pagination>
          </main>
        </div>

        <FeatureProducts></FeatureProducts>
      </div>
    </div>
  );
};

export default Products;
