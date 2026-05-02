import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import Pagination from "../../../components/Pagination";

const ParentCategory = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { parentCategoryData } = useLoaderData();
  const [categoryList, setCategoryList] = useState(
    parentCategoryData?.list_data,
  );

  const [formData, setFormData] = useState({
    _id: null,
    par_cat_id: "",
    par_cat_name: "",
    status: "",
    isEdit: false,
  });
  const statusList = [
    {
      value: 1,
      label: "Active",
    },
    {
      value: 0,
      label: "InActive",
    },
  ];
  const [isEdit, setIsEdit] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredCategoryList = useMemo(() => {
    if (!searchQuery) return categoryList;
    const lowSearch = searchQuery.toLowerCase();
    return categoryList.filter((item) => {
      return Object.values(item).some((value) =>
        String(value).toLowerCase().includes(lowSearch),
      );
    });
  }, [searchQuery, categoryList]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredCategoryList.length / itemsPerPage);

  const paginatedCategoryList = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCategoryList.slice(start, start + itemsPerPage);
  }, [filteredCategoryList, currentPage]);

  const handleCreate = () => {
    setIsEdit(false);
    setIsDrawerOpen(true);
    handleResetForm();
  };

  const handleResetForm = () => {
    setFormData({
      _id: null,
      par_cat_id: "",
      par_cat_name: "",
      status: 1,
      isEdit: false,
    });
  };

  const handleSubmit = async () => {
    setIsInvalid(false);
    if (
      !formData.par_cat_name ||
      !formData.par_cat_id ||
      !userInfo?.email ||
      !formData.status
    ) {
      setIsInvalid(true);
      Swal.fire({
        icon: "error",
        title: "Invalid or missing required fields",
        text: "Check input field",
        confirmButtonText: "OK",
      });
      return;
    }
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to submit?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Ok",
    });
    const data = {
      _id: isEdit ? formData._id : null,
      par_cat_id: Number(formData.par_cat_id),
      par_cat_name: formData.par_cat_name,
      status: Number(formData.status),
      user_info: userInfo?.email,
    };

    try {
      if (confirmation.isConfirmed) {
        setIsLoadingButton(true);
        const result = await axios.post(
          `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/admin/insert-update-parent-category`,
          data,
        );
        if (result.data.status) {
          Swal.fire({
            icon: "success",
            title: `${result.data.message}`,
            text: `${result.data.message}`,
            confirmButtonText: "OK",
          });
          const obj = {
            _id: result.data.id,
            par_cat_id: Number(formData.par_cat_id),
            par_cat_name: formData.par_cat_name,
            status: formData.status,
            user_info: userInfo?.email,
          };
          handleResetForm();

          const index = categoryList?.findIndex(
            (item) => item._id == result.data.id,
          );

          if (index > -1) {
            const updatedList = [...categoryList];

            updatedList[index] = obj;

            setCategoryList(updatedList);
          } else {
            setCategoryList([obj, ...categoryList]);
          }
        }
        setIsEdit(false);
        setIsDrawerOpen(false);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Submission Error",
        text: err.response?.data?.message || err.message || "Failed to submit category",
      });
    } finally {
      setIsLoadingButton(false);
    }
  };

  const handleStatusUpdate = async (item) => {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to submit?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Ok",
    });
    const data = {
      _id: item._id,
      status: Number(item.status == 1 ? 0 : 1),
      user_info: userInfo?.email,
    };

    try {
      if (confirmation.isConfirmed) {
        Swal.fire({
          title: "Processing...",
          text: "Please wait...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        const result = await axios.patch(
          `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/admin/update-parent-category-status/${item._id}`,
          data,
        );
        if (result.data.status) {
          Swal.close();
          Swal.fire({
            icon: "success",
            title: `${result.data.message}`,
            text: `${result.data.message}`,
            confirmButtonText: "OK",
          });
          const obj = {
            _id: result.data?.id,
            par_cat_id: Number(item.par_cat_id),
            par_cat_name: item.par_cat_name,
            status: Number(result.data?.status_code),
            user_info: userInfo?.email,
          };

          const index = categoryList?.findIndex(
            (item) => item._id == result.data.id,
          );

          if (index > -1) {
            const updatedList = [...categoryList];

            updatedList[index] = obj;

            setCategoryList(updatedList);
          } else {
            setCategoryList([obj, ...categoryList]);
          }
        }
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Status Update Failed",
        text: err.response?.data?.message || err.message || "Failed to update status",
      });
      Swal.close();
    }
  };

  const handleEdit = (item) => {
    setIsEdit(true);
    setIsDrawerOpen(true);
    setFormData({
      _id: item._id,
      par_cat_id: item.par_cat_id,
      par_cat_name: item.par_cat_name,
      status: item.status,
      isEdit: true,
    });
  };

  const handleCancel = () => {
    setIsDrawerOpen(false);
    setIsEdit(false);
    handleResetForm();
  };

  const handleRemove = async (item) => {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to submit?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Ok",
    });
    try {
      if (confirmation.isConfirmed) {
        const result = await axios.delete(
          `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/admin/delete-parent-category-list/${item._id}`,
        );
        if (result.data?.status) {
          const index = categoryList.findIndex((list) => list._id === item._id);

          if (index !== -1) {
            const newcategoryList = [...categoryList];

            newcategoryList.splice(index, 1);

            setCategoryList(newcategoryList);
          }
          Swal.fire({
            icon: "success",
            title: `${result.data.message}`,
            text: `${result.data.message}`,
            confirmButtonText: "OK",
          });
        }
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Deletion Failed",
        text: err.response?.data?.message || err.message || "Failed to delete category",
      });
    }
  };

  return (
    <div>
      <div className="p-4 min-h-screen bg-base-100 relative overflow-x-hidden">
        {/* 1. TOP BAR WITH ADD BUTTON */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6">
          <div>
            <h1 className="font-heading text-3xl md:text-5xl font-black uppercase tracking-tighter text-base-content">
              Parent{" "}
              <span className="text-accent text-outline">Categories</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mt-2">
              Manage Store Parent Categories
            </p>
          </div>

          <button
            onClick={handleCreate}
            className="w-full md:w-auto bg-base-content text-base-100 px-8 py-3 font-heading font-black uppercase tracking-[0.2em] text-xs hover:bg-accent transition-all flex items-center justify-center gap-3 group rounded-sm cursor-pointer"
          >
            Add New
            <span className="text-lg group-hover:rotate-90 transition-transform">
              +
            </span>
          </button>
        </div>

        {/* --- SEARCH BAR SECTION --- */}
        <div className="mb-8 relative max-w-full md:max-w-md">
          <label className="text-[10px] font-black uppercase tracking-widest opacity-50 block mb-2">
            Search Categories
          </label>
          <div className="relative flex items-center">
            <span className="material-icons absolute left-0 text-sm opacity-30">
              search
            </span>
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              type="text"
              placeholder="search"
              className="w-full bg-transparent border-b-2 border-base-content/10 focus:border-accent outline-none py-3 pl-7 text-xs font-bold tracking-widest transition-all placeholder:opacity-20"
            />
          </div>
        </div>
        {/* -------------------------- */}

        {/* 2. CATEGORY LIST VIEW */}
        <div className="bg-base-100 border border-base-content/5 rounded-sm shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* <thead> equivalent */}
            <thead className="hidden md:table-header-group bg-base-200/50 font-heading text-[10px] uppercase tracking-widest font-black opacity-40">
              <tr>
                <th className="px-8 py-4">SL</th>
                <th className="px-8 py-4">Category Name</th>
                <th className="px-8 py-4 text-center">Category ID</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>

            {/* <tbody> equivalent */}
            <tbody className="divide-y divide-black/5">
              {paginatedCategoryList?.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-base-200/30 transition-colors group"
                >
                  {/* <td> cells */}
                  <td className="px-8 py-6">
                    <span className="font-heading font-bold text-sm  tracking-tight group-hover:text-accent transition-colors">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="font-heading font-bold text-sm  tracking-tight group-hover:text-accent transition-colors">
                      {item.par_cat_name}
                    </span>
                  </td>

                  <td className="px-8 py-6 text-center text-[11px] font-black opacity-60">
                    {item.par_cat_id}
                  </td>

                  <td className="px-8 py-6">
                    <span
                      className={`text-[9px] font-black  tracking-tighter px-2 py-1 border inline-block ${
                        item.status === 1
                          ? "border-green-500 text-green-500"
                          : "border-base-content/20 opacity-40"
                      }`}
                    >
                      {item.status === 1 ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-8 py-6">
                    <div className="flex justify-end gap-4">
                      {/* Your Icon Logic */}
                      <span
                        onClick={() => handleStatusUpdate(item)}
                        className="material-icons cursor-pointer hover:text-blue-600"
                      >
                        {item.status === 1 ? "visibility" : "visibility_off"}
                      </span>
                      <span
                        onClick={() => handleEdit(item)}
                        className="material-icons cursor-pointer hover:text-blue-600"
                      >
                        edit
                      </span>
                      <span
                        onClick={() => handleRemove(item)}
                        className="material-icons cursor-pointer hover:text-red-600"
                      >
                        delete
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination component */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        {/* 3. SIDE DRAWER (OVERLAY) */}
        {/* Backdrop */}
        {/* 3. SIDE DRAWER (OVERLAY) */}
        <div className="relative">
          {/* Backdrop */}
          {isDrawerOpen && (
            <div
              className="fixed inset-0 bg-base-content/60 backdrop-blur-sm z-[100] transition-opacity duration-300"
              onClick={() => setIsDrawerOpen(false)}
            />
          )}

          {/* Drawer Content */}
          <aside
            className={`fixed top-0 right-0 h-full w-full max-w-md bg-base-100 z-[101] shadow-[-20px_0px_50px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-out transform ${
              isDrawerOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="h-full flex flex-col p-8 relative">
              {/* --- FLOATING CLOSE BUTTON (TOP LEFT) --- */}
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

              {/* Drawer Header */}
              <div className="flex justify-between items-center mb-12">
                <h2 className="font-heading text-3xl font-black uppercase tracking-tighter">
                  {formData?._id ? "Edit" : "Add"}{" "}
                  <span className="text-accent">Category</span>
                </h2>
              </div>

              {/* Form Content */}
              <div className="flex-grow space-y-10 overflow-y-auto pr-2 custom-scrollbar">
                {/* Category Name Input */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                    Category Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    value={formData.par_cat_name}
                    onChange={(e) =>
                      setFormData({ ...formData, par_cat_name: e.target.value })
                    }
                    type="text"
                    placeholder="e.g. Footwear"
                    className={`w-full border-b-2 ${
                      isInvalid && !formData.par_cat_name
                        ? "border-red-600"
                        : "border-base-content/10"
                    } focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent `}
                  />
                </div>

                {/* Category ID Input */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                    Category ID <span className="text-red-600">*</span>
                  </label>
                  <input
                    value={formData.par_cat_id}
                    onChange={(e) =>
                      setFormData({ ...formData, par_cat_id: e.target.value })
                    }
                    type="number"
                    placeholder="101"
                    className={`w-full border-b-2 ${
                      isInvalid && !formData.par_cat_id
                        ? "border-red-600"
                        : "border-base-content/10"
                    } focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent`}
                  />
                </div>

                {/* Status Dropdown */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                    Status <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: Number(e.target.value),
                      })
                    }
                    className={`w-full border-b-2 ${
                      isInvalid && !formData.status
                        ? "border-red-600"
                        : "border-base-content/10"
                    } focus:border-accent outline-none py-3 text-sm font-bold bg-transparent text-base-content  tracking-wider cursor-pointer`}
                  >
                    {statusList.map((status) => (
                      <option
                        key={status.value}
                        value={status.value}
                        className="bg-base-100 text-base-content"
                      >
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Drawer Footer Actions */}
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
        </div>
      </div>
    </div>
  );
};

export default ParentCategory;
