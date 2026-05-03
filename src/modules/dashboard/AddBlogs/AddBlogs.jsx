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

const AddBlogs = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [blogList, setBlogList] = useState([]);

  const [formData, setFormData] = useState({
    _id: null,
    title: "",
    date: "",
    image: "",
    short_description: "",
    long_description: "",
    category: "",
    par_cat_id: "",
    sub_cat_id: "",
    prod_id: "",
  });

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/get-blog-list`,
      );
      setBlogList(response.data?.list_data || response.data || []);
    } catch (error) {
      console.error("Failed to fetch blogs", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const [isEdit, setIsEdit] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredblogList = useMemo(() => {
    if (!searchQuery) return blogList;
    const lowSearch = searchQuery.toLowerCase();
    return blogList.filter((item) => {
      return Object.values(item).some((value) =>
        String(value).toLowerCase().includes(lowSearch),
      );
    });
  }, [searchQuery, blogList]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredblogList?.length / itemsPerPage);

  const paginatedblogList = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredblogList?.slice(start, start + itemsPerPage);
  }, [filteredblogList, currentPage]);

  const handleCreate = () => {
    setIsEdit(false);
    setIsDrawerOpen(true);
    handleResetForm();
  };

  const handleResetForm = () => {
    setFormData({
      _id: null,
      title: "",
      date: "",
      image: "",
      short_description: "",
      long_description: "",
      category: "",
      par_cat_id: "",
      sub_cat_id: "",
      prod_id: "",
    });
  };

  const handleSubmit = async () => {
    setIsInvalid(false);
    if (
      !formData.title ||
      !formData.date ||
      !formData.image ||
      !formData.short_description ||
      !formData.long_description ||
      !formData.category
    ) {
      setIsInvalid(true);
      showError("Validation Failed", "Please fill in all mandatory fields.");
      return;
    }

    const confirmation = await showConfirmation();

    const data = {
      _id: isEdit ? formData._id : null,
      title: formData.title,
      date: formData.date,
      image: formData.image,
      short_description: formData.short_description,
      long_description: formData.long_description,
      category: formData.category,
      par_cat_id: formData.par_cat_id,
      sub_cat_id: formData.sub_cat_id,
      prod_id: formData.prod_id,
      user_info: userInfo?.email,
    };

    try {
      if (confirmation.isConfirmed) {
        setIsLoadingButton(true);
        showProcessing();
        const result = await axios.post(
          `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/insert-update-blog-list`,
          data,
        );
        if (result.data.status) {
          await showSuccess("Successful.", result.data.message);
          const obj = {
            ...data,
            _id: result.data.id,
            createdAt: isEdit
              ? blogList.find((b) => b._id === result.data.id)?.createdAt
              : new Date().toISOString(),
          };
          handleResetForm();

          const index = blogList?.findIndex(
            (item) => item._id == result.data.id,
          );

          if (index > -1) {
            const updatedList = [...blogList];
            updatedList[index] = obj;
            setBlogList(updatedList);
          } else {
            setBlogList([obj, ...blogList]);
          }
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
      title: item.title || "",
      date: item.date || "",
      image: item.image || "",
      short_description: item.short_description || "",
      long_description: item.long_description || "",
      category: item.category || "",
      par_cat_id: item.par_cat_id || "",
      sub_cat_id: item.sub_cat_id || "",
      prod_id: item.prod_id || "",
    });
  };

  const handleCancel = () => {
    setIsDrawerOpen(false);
    setIsEdit(false);
    handleResetForm();
  };

  const handleRemove = async (item) => {
    const confirmation = await showConfirmation(
      "Delete Blog?",
      "Are you sure you want to remove this blog permanently?",
    );

    try {
      if (confirmation.isConfirmed) {
        showProcessing();
        const result = await axios.delete(
          `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/delete-blog-list/${item._id}`,
        );
        if (result.data?.status) {
          setBlogList(blogList.filter((b) => b._id !== item._id));
          showSuccess(result.data.message);
        }
      }
    } catch (err) {
      showError("Deletion Failed", err.response?.data?.message || err.message);
    }
  };

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleDetails = (data) => {
    setSelectedBlog(data);
    setIsDetailsOpen(true);
  };

  return (
    <div>
      <div className="p-4 min-h-screen bg-base-100 relative overflow-x-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6">
          <div>
            <h1 className="font-heading text-3xl md:text-5xl font-black uppercase tracking-tighter text-base-content">
              Blog <span className="text-accent text-outline">Vault</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mt-2">
              Manage Stories & Articles
            </p>
          </div>

          <button
            onClick={handleCreate}
            className="w-full md:w-auto bg-base-content text-base-100 px-8 py-3 font-heading font-black uppercase tracking-[0.2em] text-xs hover:bg-accent transition-all flex items-center justify-center gap-3 group rounded-sm cursor-pointer"
          >
            Add New Blog
            <span className="text-lg group-hover:rotate-90 transition-transform">
              +
            </span>
          </button>
        </div>

        <div className="mb-8 relative max-w-full md:max-w-md">
          <label className="text-[10px] font-black uppercase tracking-widest opacity-50 block mb-2">
            Search Blogs
          </label>
          <div className="relative flex items-center">
            <span className="material-icons absolute left-0 text-sm opacity-30">
              search
            </span>
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              type="text"
              placeholder="Search by title or category..."
              className="w-full bg-transparent border-b-2 border-base-content/10 focus:border-accent outline-none py-3 pl-7 text-xs font-bold tracking-widest transition-all placeholder:opacity-20"
            />
          </div>
        </div>

        <div className="bg-base-100 border border-base-content/5 rounded-sm shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="hidden md:table-header-group bg-base-200/50 font-heading text-[10px] uppercase tracking-widest font-black opacity-40">
              <tr>
                <th className="px-6 py-4">SL</th>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {paginatedblogList?.length > 0 ? (
                paginatedblogList.map((item, index) => (
                  <tr
                    key={item._id}
                    className="hover:bg-base-200/30 transition-colors group"
                  >
                    <td className="px-6 py-4 text-xs font-bold">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>

                    <td className="px-6 py-4">
                      <div className="w-12 h-12 bg-base-200 rounded-sm overflow-hidden border border-base-content/10">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-tighter line-clamp-1">
                          {item.title}
                        </span>
                        <span className="text-[9px] opacity-40 line-clamp-1">
                          {item.short_description}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold opacity-70 bg-base-200 px-2 py-1 rounded-sm uppercase">
                        {item.category}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-xs font-bold opacity-60">
                      {item.date}
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
                    colSpan="7"
                    className="px-8 py-12 text-center opacity-30 text-[10px] font-black uppercase tracking-widest"
                  >
                    No blogs available
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
                  <span className="text-accent">Blog</span>
                </h2>
              </div>

              <div className="flex-grow space-y-10 overflow-y-auto pr-2 custom-scrollbar">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                    Blog Title <span className="text-red-600">*</span>
                  </label>
                  <input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    type="text"
                    placeholder="Enter blog title"
                    className={`w-full border-b-2 ${
                      isInvalid && !formData.title
                        ? "border-red-600"
                        : "border-base-content/10"
                    } focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent `}
                  />
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      Category <span className="text-red-600">*</span>
                    </label>
                    <input
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      type="text"
                      placeholder="e.g. Technology"
                      className={`w-full border-b-2 ${
                        isInvalid && !formData.category
                          ? "border-red-600"
                          : "border-base-content/10"
                      } focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      Date <span className="text-red-600">*</span>
                    </label>
                    <input
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      type="date"
                      placeholder="e.g. 05 May 2024"
                      className={`w-full border-b-2 ${
                        isInvalid && !formData.date
                          ? "border-red-600"
                          : "border-base-content/10"
                      } focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                    Image URL <span className="text-red-600">*</span>
                  </label>
                  <input
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    type="url"
                    placeholder="Enter image URL"
                    className={`w-full border-b-2 ${
                      isInvalid && !formData.image
                        ? "border-red-600"
                        : "border-base-content/10"
                    } focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent`}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                    Short Description <span className="text-red-600">*</span>
                  </label>
                  <input
                    value={formData.short_description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        short_description: e.target.value,
                      })
                    }
                    className={`w-full border-b-2 ${
                      isInvalid && !formData.short_description
                        ? "border-red-600"
                        : "border-base-content/10"
                    } focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent`}
                    placeholder="Brief summary of the blog"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                    Long Description <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    value={formData.long_description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        long_description: e.target.value,
                      })
                    }
                    className={`w-full border-2 p-3 min-h-[200px] ${
                      isInvalid && !formData.long_description
                        ? "border-red-600"
                        : "border-base-content/10"
                    } focus:border-accent outline-none text-sm font-bold transition-colors bg-transparent rounded-sm`}
                    placeholder="Write your full story here..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-8 pt-6 border-t border-base-content/5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      Link Product ID
                    </label>
                    <input
                      value={formData.prod_id}
                      onChange={(e) =>
                        setFormData({ ...formData, prod_id: e.target.value })
                      }
                      type="number"
                      placeholder="Optional"
                      className="w-full border-b-2 border-base-content/10 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      Parent Category ID
                    </label>
                    <input
                      value={formData.par_cat_id}
                      onChange={(e) =>
                        setFormData({ ...formData, par_cat_id: e.target.value })
                      }
                      type="number"
                      className="w-full border-b-2 border-base-content/10 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      Sub Category ID
                    </label>
                    <input
                      value={formData.sub_cat_id}
                      onChange={(e) =>
                        setFormData({ ...formData, sub_cat_id: e.target.value })
                      }
                      type="number"
                      className="w-full border-b-2 border-base-content/10 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent"
                    />
                  </div>
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

          {/* BLOG DETAILS DRAWER */}
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
            {selectedBlog && (
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
                    Blog <span className="text-accent">Details</span>
                  </h2>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mt-2">
                    Category: {selectedBlog.category}
                  </p>
                </div>

                <div className="flex-grow space-y-8 overflow-y-auto pr-2 custom-scrollbar">
                  <div className="space-y-10">
                    <div className="aspect-video bg-white/[0.03] border border-base-content/5 rounded-sm overflow-hidden relative group">
                      <img
                        src={selectedBlog.image}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        alt={selectedBlog.title}
                      />
                    </div>

                    <div className="space-y-6 border-t border-base-content/5 pt-8">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                          Title
                        </p>
                        <p className="font-heading font-bold text-2xl uppercase mt-1 leading-tight tracking-tighter">
                          {selectedBlog.title}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-6">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                            Post Date
                          </p>
                          <p className="font-heading font-bold text-sm uppercase mt-1">
                            {selectedBlog.date}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                            Category
                          </p>
                          <p className="font-heading font-bold text-sm uppercase mt-1">
                            {selectedBlog.category}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                          Short Description
                        </p>
                        <p className="text-xs font-bold mt-2 opacity-80 leading-relaxed">
                          {selectedBlog.short_description}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                          Long Description
                        </p>
                        <p className="text-xs font-medium leading-relaxed mt-4 opacity-70 border-l-2 border-accent/20 pl-4 py-1 whitespace-pre-wrap">
                          {selectedBlog.long_description}
                        </p>
                      </div>

                      <div className="border-t border-base-content/5 pt-8">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-4">
                          Technical Mappings
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 border border-base-content/10 rounded-full text-[10px] font-bold">
                            Prod ID: {selectedBlog.prod_id || "N/A"}
                          </span>
                          <span className="px-3 py-1 border border-base-content/10 rounded-full text-[10px] font-bold">
                            Par ID: {selectedBlog.par_cat_id || "N/A"}
                          </span>
                          <span className="px-3 py-1 border border-base-content/10 rounded-full text-[10px] font-bold">
                            Sub ID: {selectedBlog.sub_cat_id || "N/A"}
                          </span>
                        </div>
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

export default AddBlogs;
