import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  showSuccess,
  showError,
  showConfirmation,
  showProcessing,
} from "../../../components/Alert";

import Pagination from "../../../components/Pagination";

const Review = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [reviewList, setReviewList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    _id: null,
    full_name: "",
    email: "",
    image_url: "",
    rating: 5,
    comment: "",
    prod_id: "",
    par_cat_id: "",
    sub_cat_id: "",
  });

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/get-review-list`,
      );
      setReviewList(response.data?.list_data || response.data || []);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const [isEdit, setIsEdit] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredReviewList = useMemo(() => {
    if (!searchQuery) return reviewList;
    const lowSearch = searchQuery.toLowerCase();
    return reviewList.filter((item) => {
      return Object.values(item).some((value) =>
        String(value).toLowerCase().includes(lowSearch),
      );
    });
  }, [searchQuery, reviewList]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredReviewList?.length / itemsPerPage);

  const paginatedReviewList = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredReviewList?.slice(start, start + itemsPerPage);
  }, [filteredReviewList, currentPage]);

  const handleCreate = () => {
    setIsEdit(false);
    setIsDrawerOpen(true);
    handleResetForm();
  };

  const handleResetForm = () => {
    setFormData({
      _id: null,
      full_name: "",
      email: "",
      image_url: "",
      rating: 5,
      comment: "",
      prod_id: "",
      par_cat_id: "",
      sub_cat_id: "",
    });
  };

  const handleSubmit = async () => {
    setIsInvalid(false);
    if (
      !formData.full_name ||
      !formData.email ||
      !formData.image_url ||
      !formData.rating ||
      !formData.comment ||
      !formData.prod_id ||
      !formData.par_cat_id ||
      !formData.sub_cat_id
    ) {
      setIsInvalid(true);
      showError("Validation Failed", "Please fill in all mandatory fields.");
      return;
    }

    const confirmation = await showConfirmation();

    const data = {
      _id: isEdit ? formData._id : null,
      full_name: formData.full_name,
      email: formData.email,
      image_url: formData.image_url,
      rating: Number(formData.rating),
      comment: formData.comment,
      prod_id: Number(formData.prod_id),
      par_cat_id: Number(formData.par_cat_id),
      sub_cat_id: Number(formData.sub_cat_id),
      user_info: userInfo?.email,
    };

    try {
      if (confirmation.isConfirmed) {
        setIsLoadingButton(true);
        showProcessing();
        const result = await axios.post(
          `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/insert-update-review-list`,
          data,
        );
        if (result.data.status) {
          await showSuccess("Successful.", result.data.message);

          fetchReviews(); // Refresh list to get proper structure and IDs

          handleResetForm();
          setIsEdit(false);
          setIsDrawerOpen(false);
        } else {
          showError(
            "Submission Failed",
            result.data.message || "Unknown error",
          );
        }
      }
    } catch (err) {
      showError(
        "Submission Failed",
        err.response?.data?.message || err.message,
      );
    } finally {
      setIsLoadingButton(false);
    }
  };

  const handleEdit = (item) => {
    setIsEdit(true);
    setIsDrawerOpen(true);
    setFormData({
      _id: item._id,
      full_name: item.full_name || "",
      email: item.email || "",
      image_url: item.image_url || "",
      rating: item.rating || 5,
      comment: item.comment || "",
      prod_id: item.prod_id || "",
      par_cat_id: item.par_cat_id || "",
      sub_cat_id: item.sub_cat_id || "",
    });
  };

  const handleCancel = () => {
    setIsDrawerOpen(false);
    setIsEdit(false);
    handleResetForm();
  };

  const handleRemove = async (item) => {
    const confirmation = await showConfirmation(
      "Delete Review?",
      "Are you sure you want to remove this review permanently?",
    );

    try {
      if (confirmation.isConfirmed) {
        showProcessing();
        const result = await axios.delete(
          `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/delete-review-list/${item._id}`,
        );
        if (result.data?.status) {
          setReviewList(reviewList.filter((r) => r._id !== item._id));
          showSuccess(result.data.message);
        }
      }
    } catch (err) {
      showError("Deletion Failed", err.response?.data?.message || err.message);
    }
  };

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const handleDetails = (data) => {
    setSelectedReview(data);
    setIsDetailsOpen(true);
  };

  return (
    <div>
      <div className="p-4 min-h-screen bg-base-100 relative overflow-x-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6">
          <div>
            <h1 className="font-heading text-3xl md:text-5xl font-black uppercase tracking-tighter text-base-content">
              Review <span className="text-accent text-outline">Vault</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mt-2">
              Manage Product Reviews & Feedback
            </p>
          </div>

          <button
            onClick={handleCreate}
            className="w-full md:w-auto bg-base-content text-base-100 px-8 py-3 font-heading font-black uppercase tracking-[0.2em] text-xs hover:bg-accent transition-all flex items-center justify-center gap-3 group rounded-sm cursor-pointer"
          >
            Add New Review
            <span className="text-lg group-hover:rotate-90 transition-transform">
              +
            </span>
          </button>
        </div>

        <div className="mb-8 relative max-w-full md:max-w-md">
          <label className="text-[10px] font-black uppercase tracking-widest opacity-50 block mb-2">
            Search Reviews
          </label>
          <div className="relative flex items-center">
            <span className="material-icons absolute left-0 text-sm opacity-30">
              search
            </span>
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              type="text"
              placeholder="Search by name, product ID or comment..."
              className="w-full bg-transparent border-b-2 border-base-content/10 focus:border-accent outline-none py-3 pl-7 text-xs font-bold tracking-widest transition-all placeholder:opacity-20"
            />
          </div>
        </div>

        <div className="bg-base-100 border border-base-content/5 rounded-sm shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="hidden md:table-header-group bg-base-200/50 font-heading text-[10px] uppercase tracking-widest font-black opacity-40">
              <tr>
                <th className="px-6 py-4">SL</th>
                <th className="px-6 py-4">Reviewer</th>
                <th className="px-6 py-4">Product ID</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Comment</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {isLoading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-8 py-12 text-center opacity-30 text-[10px] font-black uppercase tracking-widest"
                  >
                    Loading...
                  </td>
                </tr>
              ) : paginatedReviewList?.length > 0 ? (
                paginatedReviewList.map((item, index) => (
                  <tr
                    key={item._id}
                    className="hover:bg-base-200/30 transition-colors group"
                  >
                    <td className="px-6 py-4 text-xs font-bold">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-base-200 rounded-full overflow-hidden border border-base-content/10">
                          <img
                            src={
                              item.image_url ||
                              "https://i.ibb.co/5GzXkwq/user.png"
                            }
                            alt={item.full_name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-tighter">
                          {item.full_name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-xs font-bold opacity-70">
                      #{item.prod_id}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-accent">
                        <span className="text-xs font-black">
                          {item.rating}
                        </span>
                        <span className="material-icons text-sm">star</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-[10px] opacity-60 line-clamp-1 max-w-xs">
                        {item.comment}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-3">
                        <span
                          title="Details"
                          onClick={() => handleDetails(item)}
                          className="material-icons text-lg cursor-pointer hover:text-blue-600 transition-colors"
                        >
                          info
                        </span>
                        <span
                          onClick={() => handleEdit(item)}
                          className="material-icons text-lg cursor-pointer hover:text-blue-600 transition-colors"
                        >
                          edit
                        </span>
                        <span
                          onClick={() => handleRemove(item)}
                          className="material-icons text-lg cursor-pointer hover:text-red-600 transition-colors"
                        >
                          delete
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-8 py-12 text-center opacity-30 text-[10px] font-black uppercase tracking-widest"
                  >
                    No reviews available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        <div className="relative">
          {isDrawerOpen && (
            <div
              className="fixed inset-0 bg-base-content/60 backdrop-blur-sm z-[100] transition-opacity duration-300"
              onClick={() => setIsDrawerOpen(false)}
            />
          )}

          <aside
            className={`fixed top-0 right-0 h-full w-full max-w-xl bg-base-100 z-[101] shadow-[-20px_0px_50px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-out transform ${
              isDrawerOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="h-full flex flex-col p-8 relative">
              <button
                onClick={() => setIsDrawerOpen(false)}
                className={`absolute top-8 left-[-50px] md:left-[-60px] w-10 h-10 bg-base-100 border border-base-content/10 flex items-center justify-center rounded-full hover:bg-accent hover:text-white transition-all shadow-xl group z-[102] ${
                  isDrawerOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                <span className="material-icons text-sm group-hover:rotate-90 transition-transform">
                  close
                </span>
              </button>

              <div className="flex justify-between items-center mb-12">
                <h2 className="font-heading text-3xl font-black uppercase tracking-tighter">
                  {formData?._id ? "Edit" : "Add"}{" "}
                  <span className="text-accent">Review</span>
                </h2>
              </div>

              <div className="flex-grow space-y-10 overflow-y-auto pr-2 custom-scrollbar">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      value={formData.full_name}
                      onChange={(e) =>
                        setFormData({ ...formData, full_name: e.target.value })
                      }
                      type="text"
                      placeholder="Enter reviewer name"
                      className={`w-full border-b-2 ${
                        isInvalid && !formData.full_name
                          ? "border-red-600"
                          : "border-base-content/10"
                      } focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent `}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      type="email"
                      placeholder="e.g. user@example.com"
                      className={`w-full border-b-2 ${
                        isInvalid && !formData.email
                          ? "border-red-600"
                          : "border-base-content/10"
                      } focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      Product ID <span className="text-red-600">*</span>
                    </label>
                    <input
                      value={formData.prod_id}
                      onChange={(e) =>
                        setFormData({ ...formData, prod_id: e.target.value })
                      }
                      type="number"
                      placeholder="e.g. 101"
                      className={`w-full border-b-2 ${
                        isInvalid && !formData.prod_id
                          ? "border-red-600"
                          : "border-base-content/10"
                      } focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      Rating (1-5) <span className="text-red-600">*</span>
                    </label>
                    <select
                      value={formData.rating}
                      onChange={(e) =>
                        setFormData({ ...formData, rating: e.target.value })
                      }
                      className={`w-full border-b-2 ${
                        isInvalid && !formData.rating
                          ? "border-red-600"
                          : "border-base-content/10"
                      } focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent cursor-pointer`}
                    >
                      {[5, 4, 3, 2, 1].map((num) => (
                        <option key={num} value={num} className="bg-base-100">
                          {num} Stars
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      Parent Category ID <span className="text-red-600">*</span>
                    </label>
                    <input
                      value={formData.par_cat_id}
                      onChange={(e) =>
                        setFormData({ ...formData, par_cat_id: e.target.value })
                      }
                      type="number"
                      placeholder="e.g. 1"
                      className={`w-full border-b-2 ${
                        isInvalid && !formData.par_cat_id
                          ? "border-red-600"
                          : "border-base-content/10"
                      } focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      Sub Category ID <span className="text-red-600">*</span>
                    </label>
                    <input
                      value={formData.sub_cat_id}
                      onChange={(e) =>
                        setFormData({ ...formData, sub_cat_id: e.target.value })
                      }
                      type="number"
                      placeholder="e.g. 1"
                      className={`w-full border-b-2 ${
                        isInvalid && !formData.sub_cat_id
                          ? "border-red-600"
                          : "border-base-content/10"
                      } focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                    Reviewer Photo URL <span className="text-red-600">*</span>
                  </label>
                  <input
                    value={formData.image_url}
                    onChange={(e) =>
                      setFormData({ ...formData, image_url: e.target.value })
                    }
                    type="url"
                    placeholder="Enter photo URL"
                    className={`w-full border-b-2 ${
                      isInvalid && !formData.image_url
                        ? "border-red-600"
                        : "border-base-content/10"
                    } focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent`}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                    Comment <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    value={formData.comment}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        comment: e.target.value,
                      })
                    }
                    className={`w-full border-2 p-3 min-h-[150px] ${
                      isInvalid && !formData.comment
                        ? "border-red-600"
                        : "border-base-content/10"
                    } focus:border-accent outline-none text-sm font-bold transition-colors bg-transparent rounded-sm`}
                    placeholder="Write the customer's feedback here..."
                  />
                </div>
              </div>

              <div className="pt-8 border-t border-base-content/5 flex justify-center gap-4 mt-auto">
                <button
                  onClick={handleCancel}
                  className="px-8 border border-base-content/10 py-3 font-heading font-black uppercase tracking-widest text-[10px] hover:bg-base-content hover:text-base-100 transition-all cursor-pointer rounded-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isLoadingButton}
                  className="px-8 bg-base-content text-base-100 py-3 font-heading font-black uppercase tracking-widest text-[10px] hover:bg-accent transition-colors cursor-pointer rounded-sm disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
                >
                  {isLoadingButton ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </div>
          </aside>

          {/* REVIEW DETAILS DRAWER */}
          <div
            className={`fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[100] transition-opacity duration-300 ${
              isDetailsOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onClick={() => setIsDetailsOpen(false)}
          />

          <aside
            className={`fixed top-0 right-0 h-full w-full max-w-xl bg-base-100 z-[101] shadow-[-20px_0px_50px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-out transform ${
              isDetailsOpen ? "translate-x-0" : "translate-x-full"
            } border-l border-base-content/5`}
          >
            {selectedReview && (
              <div className="h-full flex flex-col p-8 relative">
                <button
                  onClick={() => setIsDetailsOpen(false)}
                  className={`absolute top-8 left-[-50px] md:left-[-60px] w-10 h-10 bg-base-100 border border-base-content/10 flex items-center justify-center rounded-full hover:bg-accent hover:text-white transition-all shadow-xl group z-[102] ${
                    isDetailsOpen
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                >
                  <span className="material-icons text-sm group-hover:rotate-90 transition-transform">
                    close
                  </span>
                </button>

                <div className="mb-8">
                  <h2 className="font-heading text-3xl font-black uppercase tracking-tighter text-base-content">
                    Review <span className="text-accent">Details</span>
                  </h2>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mt-2">
                    Review for Product ID: #{selectedReview.prod_id}
                  </p>
                </div>

                <div className="flex-grow space-y-8 overflow-y-auto pr-2 custom-scrollbar">
                  <div className="space-y-10">
                    <div className="flex items-center gap-6 border-b border-base-content/5 pb-8">
                      <div className="w-24 h-24 bg-base-200 rounded-full overflow-hidden border-2 border-base-content">
                        <img
                          src={
                            selectedReview.image_url ||
                            "https://i.ibb.co/5GzXkwq/user.png"
                          }
                          className="w-full h-full object-cover"
                          alt={selectedReview.full_name}
                        />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                          Reviewer
                        </p>
                        <p className="font-heading font-bold text-2xl uppercase mt-1 leading-tight tracking-tighter">
                          {selectedReview.full_name}
                        </p>
                        <p className="text-[11px] font-bold opacity-60 mt-1 lowercase tracking-tight">
                           {selectedReview.email}
                        </p>
                        <div className="flex items-center gap-1 text-accent mt-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={`material-icons text-sm ${i < selectedReview.rating ? "text-accent" : "text-base-content/10"}`}
                            >
                              star
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                            Product ID
                          </p>
                          <p className="font-heading font-bold text-sm uppercase mt-1">
                            #{selectedReview.prod_id}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                            Review Date
                          </p>
                          <p className="font-heading font-bold text-sm uppercase mt-1">
                            {new Date(
                              selectedReview.createdAt,
                            ).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                            Parent Cat ID
                          </p>
                          <p className="font-heading font-bold text-sm uppercase mt-1">
                            #{selectedReview.par_cat_id}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                            Sub Cat ID
                          </p>
                          <p className="font-heading font-bold text-sm uppercase mt-1">
                            #{selectedReview.sub_cat_id}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                          Customer Comment
                        </p>
                        <p className="text-sm font-medium leading-relaxed mt-4 opacity-70 border-l-2 border-accent/20 pl-4 py-1 whitespace-pre-wrap">
                          {selectedReview.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-base-content/5 mt-auto bg-base-100">
                  <button
                    onClick={() => setIsDetailsOpen(false)}
                    className="w-full bg-base-content text-base-100 py-5 font-heading font-black uppercase tracking-[0.3em] text-[11px] hover:bg-accent transition-colors rounded-sm"
                  >
                    Close Panel
                  </button>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Review;
