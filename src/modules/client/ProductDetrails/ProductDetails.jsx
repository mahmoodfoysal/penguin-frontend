import React, { useEffect, useMemo, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import PageHeader from "../../../components/PageHeader";
import ProductCard from "../../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  incrementQty,
  decrementQty,
} from "../../../store/slice/cartSlice";
import { setOrderProduct } from "../../../store/slice/buyProduct";
import ComponentLoader from "../../../pages/ComponentLoader";
import Swal from "sweetalert2";
import axios from "axios";
import { timeCount } from "../../../utils/timeCount";
import DataNotFound from "../../../pages/DataNotFound";

const ProductDetails = () => {
  const data = useLoaderData();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  const [clientRating, setClientRating] = useState(0);

  const [clientComment, setClientComment] = useState(null);

  const [isInvalid, setIsInvalid] = useState(false);
  const [isReviewLoading, setIsReviewLoading] = useState(false);

  const productList = data.products?.list_data;

  const [commentList, setCommentList] = useState(data.comments?.list_data);

  const {
    _id,
    prod_image,
    stock,

    prod_name,
    price,
    description,
    par_cat_id,
    sub_cat_id,
    prod_id,
  } = data.product_details.details_data;

  const cartList = useSelector((state) => state.cart.cart);
  const userInfo = useSelector((state) => state.auth.userInfo);

  const cartQuantity = cartList.find((item) => item._id == _id)?.quantity || 0;

  const pageInfo = [
    {
      parent_route_name: "Products",
      path: "/products",
    },
    {
      curren_route: "Product Details",
    },
    {
      first_name: "Product",
      last_name: "Details",
    },
  ];

  const filterRelatedProduct = productList.filter(
    (item) => item.par_cat_id == par_cat_id,
  );

  // ================= PAGINATION =================
  const itemsPerPage = 8;

  const totalPages = Math.ceil(filterRelatedProduct.length / itemsPerPage);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filterRelatedProduct.slice(start, start + itemsPerPage);
  }, [filterRelatedProduct, currentPage]);

  // reset page on filter change
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentPage(1);
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

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

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleItemIncrement = (product) => {
    if (cartQuantity == 0) {
      handleAddToCart(product);
    } else {
      dispatch(incrementQty(product._id));
    }
  };

  const handleItemdecrement = (product) => {
    dispatch(decrementQty(product._id));
  };

  const handleBuyNow = (product) => {
    console.log(product);
    dispatch(setOrderProduct({ ...product, quantity: 1 }));
    navigate("/buy-product");
  };

  const handleReviewSubmit = async () => {
    setIsInvalid(false);
    if (!userInfo?.name || !userInfo?.email) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please Login First",
        confirmButtonText: "OK",
      });
      setIsInvalid(true);
      return;
    }
    if (!clientRating || !clientComment) {
      Swal.fire({
        icon: "warning",
        title: "warning",
        text: "Fill all the required field",
        confirmButtonText: "OK",
      });
      setIsInvalid(true);
      return;
    }

    const data = {
      full_name: userInfo?.name,
      email: userInfo?.email,
      comment: clientComment,
      image_url: userInfo?.photo,
      rating: clientRating,
      prod_id: prod_id,
      par_cat_id: par_cat_id,
      sub_cat_id: sub_cat_id,
    };

    console.log(data);

    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to submit this order?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Ok",
    });

    if (confirmation.isConfirmed) {
      setIsReviewLoading(true);
      try {
        const result = await axios.post(
          `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/insert-update-review-list`,
          data,
        );
        if (result.status) {
          Swal.fire({
            icon: "success",
            title: "Successful",
            text: "Successful",
            confirmButtonText: "OK",
          });
          setIsInvalid(false);

          const obj = {
            _id: result.data.id,

            full_name: userInfo?.name,
            image_url: userInfo?.photo,
            createdAt: new Date().toISOString(),
            comment: clientComment,
            rating: clientRating,
            sub_cat_id: sub_cat_id,
            par_cat_id: par_cat_id,
            prod_id: prod_id,
          };

          const index = commentList?.findIndex(
            (item) => item.id == result.data.id,
          );

          if (index > -1) {
            const updatedList = [...commentList];

            updatedList[index] = obj;

            setClientComment(updatedList);
          } else {
            setCommentList([obj, ...commentList]);
          }

          setClientComment("");
          setClientRating(0);
        }
      } catch (error) {
        console.error("Failed to submit review", error);
      } finally {
        setIsReviewLoading(false);
      }
    }

    console.log(clientComment, clientRating);
  };

  const totalRating = commentList.reduce(
    (sum, item) => sum + (item.rating || 0),
    0,
  );

  const averageRating = totalRating / commentList.length || 0;

  return (
    <>
      {!data ? (
        <ComponentLoader></ComponentLoader>
      ) : (
        <>
          <PageHeader pageInfo={pageInfo}></PageHeader>
          <div className="bg-base-100 min-h-screen font-body selection:bg-accent selection:text-white">
            {/* 1. MAIN PRODUCT SECTION */}
            <div className="container mx-auto px-6 py-12">
              <div className="flex flex-col lg:flex-row gap-16">
                {/* LEFT: IMAGE GALLERY */}
                <div className="w-full lg:w-1/2 space-y-4">
                  {/* Main Image */}
                  <div className="aspect-square bg-base-200 overflow-hidden border border-base-content/5 rounded-sm relative group">
                    <img
                      src={prod_image}
                      className="w-full h-full object-cover  group-hover:scale-110 transition-transform duration-700"
                      alt="Main Product"
                    />
                    <div className="absolute top-4 left-4 bg-base-content text-base-100 text-[10px] font-black uppercase px-3 py-1 tracking-widest">
                      In Stock:{stock} Left
                    </div>
                  </div>

                  {/* Thumbnails (Multiple Image Selection) */}
                  {/* <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-base-100 border-2 border-base-content/5 hover:border-accent cursor-pointer transition-colors overflow-hidden"
                  >
                    <img
                      src={`https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=200&v=${i}`}
                      className="w-full h-full object-cover "
                      alt="thumb"
                    />
                  </div>
                ))}
              </div> */}
                </div>

                {/* RIGHT: PRODUCT INFO */}
                <div className="w-full lg:w-1/2">
                  <div className="flex items-center gap-2 mb-4">
                    {/* Rating Display */}

                    <Rating
                      style={{ maxWidth: 80 }}
                      value={averageRating}
                      readOnly
                    />
                    <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">
                      ({commentList?.length || 0} Reviews)
                    </span>
                  </div>

                  <h1 className="font-heading text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none mb-4">
                    {prod_name}
                  </h1>

                  <div className="flex items-baseline gap-4 mb-8">
                    <span className="font-heading font-bold text-4xl text-base-content">
                      ${price}
                    </span>
                    <span className="font-heading font-bold text-xl line-through opacity-30">
                      $310.00**
                    </span>
                  </div>

                  <div className="mb-8 border-l-4 border-accent pl-6">
                    <h3 className="font-heading font-black uppercase tracking-widest text-xs mb-2">
                      Description
                    </h3>
                    <p className="text-sm leading-relaxed opacity-70">
                      {description}
                    </p>
                  </div>

                  {/* QUANTITY SELECTOR (NEW) */}
                  <div className="mb-6 space-y-3 flex flex-col items-center ">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                      Select Quantity
                    </label>
                    <div className="flex items-center border-2 border-base-content w-full md:w-48 h-12 overflow-hidden group">
                      {/* Decrement */}
                      <button
                        onClick={() =>
                          handleItemdecrement(data.product_details.details_data)
                        }
                        className="flex-1 h-full flex items-center justify-center hover:bg-base-content hover:text-base-100 transition-colors border-r-2 border-base-content cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={4}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 12h14"
                          />
                        </svg>
                      </button>

                      {/* Number Display */}
                      <div className="flex-1 h-full flex items-center justify-center bg-base-100">
                        <span className="font-heading font-black text-lg italic tracking-tighter">
                          {cartQuantity}
                        </span>
                      </div>

                      {/* Increment */}
                      <button
                        onClick={() =>
                          handleItemIncrement(data.product_details.details_data)
                        }
                        className="flex-1 h-full flex items-center justify-center hover:bg-base-content hover:text-base-100 transition-colors border-l-2 border-base-content cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={4}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() =>
                        handleAddToCart(data.product_details.details_data)
                      }
                      className="bg-base-content text-base-100 py-4 font-heading font-black uppercase tracking-[0.2em] text-sm hover:bg-accent transition-colors rounded-md cursor-pointer"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() =>
                        handleBuyNow(data.product_details.details_data)
                      }
                      className="bg-accent text-base-100 py-4 font-heading font-black uppercase tracking-[0.2em] text-sm hover:bg-base-content transition-colors rounded-md cursor-pointer"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. RATINGS & REVIEWS SECTION */}
            <div className="bg-base-200/30 border-y border-base-content/5 py-10">
              <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16">
                  {/* Review Form */}
                  <div className="w-full lg:w-1/3">
                    <h2 className="font-heading text-3xl font-black uppercase italic mb-6">
                      Write a <span className="text-accent">Review</span>
                    </h2>
                    <div className="space-y-4">
                      <div className="flex-grow space-y-2">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                            Full Name<span className="text-red-600">*</span>
                          </label>
                          <input
                            value={userInfo?.name}
                            type="text"
                            placeholder="Name comes from login user"
                            disabled
                            className="w-full border-b-2 border-base-content/10 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent placeholder:text-black/10"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                            Email <span className="text-red-600">*</span>
                          </label>
                          <input
                            value={userInfo?.email}
                            type="email"
                            placeholder="Email comes from login user"
                            disabled
                            className="w-full border-b-2 border-base-content/10 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent placeholder:text-black/10"
                          />
                        </div>
                      </div>
                      <label
                        className={`${
                          isInvalid && !clientRating
                            ? "text-red-600"
                            : "text-base-content"
                        }`}
                      >
                        Rating *
                      </label>
                      <Rating
                        style={{ maxWidth: 90 }}
                        value={clientRating}
                        onChange={(value) => setClientRating(value)}
                      />

                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest mb-2">
                          Your Message
                        </label>
                        <textarea
                          value={clientComment}
                          onChange={(e) => setClientComment(e.target.value)}
                          className={`textarea textarea-bordered w-full h-32 rounded-none border-base-content/10 focus:outline-accent ${
                            isInvalid && !clientComment
                              ? "border-red-600"
                              : "border-base-content/10"
                          }`}
                          placeholder="Comment"
                        ></textarea>
                      </div>
                      <button
                        onClick={handleReviewSubmit}
                        disabled={isReviewLoading}
                        className="btn btn-block bg-base-content text-base-100 rounded-none border-none hover:bg-accent font-heading font-black uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isReviewLoading ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          "Submit Review"
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Customer Feedback List */}

                  <div className="w-full lg:w-2/3">
                    <h2 className="font-heading text-3xl font-black uppercase italic mb-6">
                      Customer <span className="text-accent">Comments</span>
                    </h2>

                    {!commentList?.length ? (
                      <DataNotFound
                        backMsg="No Comment"
                        mainMsg1="No"
                        mainMsg2="Comment"
                      />
                    ) : (
                      /* FIXED: Added max-height and overflow scroll logic here */
                      <div
                        className={`space-y-8 ${commentList?.length > 4 ? "max-h-[600px] overflow-y-auto pr-4 custom-scrollbar" : ""}`}
                      >
                        {commentList?.map((item, index) => (
                          <div
                            key={index}
                            className="border-b border-base-content/5 pb-8 flex gap-4"
                          >
                            {/* 1. PICTURE */}
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-base-content">
                                <img
                                  src={item?.image_url}
                                  className="w-full h-full object-cover"
                                  alt="user"
                                />
                              </div>
                            </div>

                            {/* 2. CONTENT AREA */}
                            <div className="flex-grow min-w-0">
                              <div className="flex justify-between items-center mb-1 gap-2">
                                <h4 className="font-heading font-black uppercase text-sm truncate">
                                  {item?.full_name}
                                </h4>
                                <Rating
                                  style={{ maxWidth: 80 }}
                                  value={item.rating}
                                  readOnly
                                />
                              </div>
                              <p className="text-sm opacity-70 leading-relaxed italic break-words whitespace-pre-wrap">
                                {item.comment}
                              </p>
                              <div className="mt-4 text-[10px] font-bold opacity-30 uppercase tracking-widest">
                                {timeCount(item.createdAt)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. RELATED PRODUCTS */}
            <div className="py-10">
              <div className="container mx-auto px-6">
                <div className="flex items-end justify-between mb-12">
                  <h2 className="font-heading text-4xl font-black uppercase  tracking-tighter">
                    Related{" "}
                    <span className="text-accent text-outline">Products</span>
                  </h2>
                  {/* <button className="text-[10px] font-black uppercase tracking-[0.2em] border-b-2 border-accent pb-1 cursor-pointer">
                View Collection
              </button> */}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {paginatedProducts.map((product, index) => (
                    <ProductCard product={product} key={index}></ProductCard>
                  ))}
                </div>

                {/* PAGINATION */}
                <div className="mt-8 flex justify-center">
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
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
