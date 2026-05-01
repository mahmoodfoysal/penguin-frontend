import axios from "axios";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const ParentCategory = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { parentCategoryData } = useLoaderData();
  const [categoryList, setCategoryList] = useState(
    parentCategoryData?.list_data,
  );
  console.log(parentCategoryData);
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

  const filteredCategoryList = useMemo(() => {
    if (!searchQuery) return categoryList;
    return categoryList.filter((item) =>
      item.par_cat_name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, categoryList]);

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
    console.log("data", data);
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
      console.log(err);
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
    console.log("data", data);
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
      console.log(err);
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
      console.log(err);
    }
  };

  return (
    <div>
      <div className="p-4 min-h-screen bg-base-100 relative overflow-x-hidden">
        {/* 1. TOP BAR WITH ADD BUTTON */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="font-heading text-5xl font-black uppercase  tracking-tighter text-base-content">
              Parent{" "}
              <span className="text-accent text-outline">Categories</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mt-2">
              Manage Store Parent Categories
            </p>
          </div>

          <button
            onClick={handleCreate}
            className="bg-base-content text-base-100 px-8 py-3 font-heading font-black uppercase tracking-[0.2em] text-xs hover:bg-accent transition-all flex items-center gap-3 group rounded-sm cursor-pointer"
          >
            Add New Category
            <span className="text-lg group-hover:rotate-90 transition-transform">
              +
            </span>
          </button>
        </div>

        {/* --- SEARCH BAR SECTION --- */}
        <div className="mb-8 relative max-w-md">
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
              className="w-full bg-transparent border-b-2 border-base-content/10 focus:border-accent outline-none py-3 pl-7 text-xs font-bold uppercase tracking-widest transition-all placeholder:opacity-20"
            />
          </div>
        </div>
        {/* -------------------------- */}

        {/* 2. CATEGORY LIST VIEW */}
        <div className="bg-base-100 border border-base-content/5 rounded-sm shadow-sm">
          <div className="grid grid-cols-1 divide-y divide-black/5">
            {/* Header Row */}
            <div className="hidden md:grid grid-cols-4 px-8 py-4 bg-base-200/50 font-heading text-[10px] uppercase tracking-widest font-black opacity-40">
              <span className="text-left">Category Name</span>
              <span className="text-center">Category ID</span>
              <span className="text-left">Status</span>
              <span className="text-right">Actions</span>
            </div>

            {/* List Items */}
            {filteredCategoryList?.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-4 px-8 py-6 items-center hover:bg-base-200/30 transition-colors group"
              >
                <span className="font-heading font-bold text-sm uppercase tracking-tight group-hover:text-accent transition-colors">
                  {item.par_cat_name}
                </span>

                <span className="text-[11px] font-black opacity-60 text-center">
                  {item.par_cat_id}
                </span>
                <span className="text-[11px] font-black opacity-60 text-left">
                  {item.status === 1 ? "Active" : "Inactive"}
                </span>
                <div className="flex justify-end gap-4">
                  {item.status == 1 ? (
                    <span
                      onClick={() => handleStatusUpdate(item)}
                      className="material-icons cursor-pointer hover:text-blue-600 me-2"
                    >
                      visibility
                    </span>
                  ) : (
                    <span
                      onClick={() => handleStatusUpdate(item)}
                      className="material-icons cursor-pointer hover:text-blue-600 me-2"
                    >
                      visibility_off
                    </span>
                  )}

                  <span
                    onClick={() => handleEdit(item)}
                    className="material-icons cursor-pointer hover:text-blue-600 me-2"
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
              </div>
            ))}
          </div>
        </div>

        {/* 3. SIDE DRAWER (OVERLAY) */}
        {/* Backdrop */}
        {isDrawerOpen && (
          <div
            className="fixed inset-0 bg-base-content/60 backdrop-blur-sm z-[100] transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />
        )}

        {/* Drawer Content */}
        <aside
          className={`fixed top-0 right-0 h-full w-full max-w-md bg-base-100 z-[101] shadow-[-20px_0px_50px_rgba(0,0,0,0.1)] transition-transform duration-500 ease-in-out transform ${
            isDrawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="h-full flex flex-col p-8">
            {/* Drawer Header */}
            <div className="flex justify-between items-center mb-12">
              <h2 className="font-heading text-3xl font-black uppercase italic tracking-tighter">
                New <span className="text-accent">Category</span>
              </h2>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="text-2xl font-black hover:text-accent rotate-45 transition-transform"
              >
                +
              </button>
            </div>

            {/* Form */}
            <div className="flex-grow space-y-10">
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
                  placeholder="Cloths"
                  className={`w-full border-b-2 ${
                    isInvalid && !formData.par_cat_name
                      ? "border-red-600"
                      : "border-base-content/10"
                  } border-base-content/10 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent placeholder:text-black/10`}
                />
              </div>

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
                  placeholder="123"
                  className={`w-full border-b-2 ${
                    isInvalid && !formData.par_cat_id
                      ? "border-red-600"
                      : "border-base-content/10"
                  } border-base-content/10 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent placeholder:text-black/10`}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                  Status <span className="text-red-600">*</span>
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value,
                    })
                  }
                  className={`w-full border-b-2 ${
                    isInvalid && !formData.status
                      ? "border-red-600"
                      : "border-base-content/10"
                  } focus:border-accent outline-none py-3 text-sm font-bold bg-transparent text-base-content uppercase tracking-wider cursor-pointer`}
                >
                  {/* Mapping your country list */}
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
            <div className="pt-5 border-t border-base-content/5 flex justify-center gap-4">
              <button
                onClick={handleCancel}
                className="px-8 border border-base-content/10 py-3 font-heading font-black uppercase tracking-widest text-[10px] hover:bg-base-content hover:text-base-100 transition-all cursor-pointer rounded-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoadingButton}
                className="px-8 bg-base-content text-base-100 py-3 font-heading font-black uppercase tracking-widest text-[10px] hover:bg-accent transition-colors cursor-pointer rounded-sm"
              >
                {isLoadingButton ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ParentCategory;
