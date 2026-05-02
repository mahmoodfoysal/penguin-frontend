import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import Pagination from "../../../components/Pagination";

const CouponDiscount = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { couponData } = useLoaderData();
  // Safe initialization: handles both { list_data: [] } and direct array responses
  const [couponList, setCouponList] = useState([]);

  useEffect(() => {
    if (couponData) {
      const list =
        couponData.list_data || (Array.isArray(couponData) ? couponData : []);
      setCouponList(list);
    }
  }, [couponData]);

  const [formData, setFormData] = useState({
    _id: null,
    coupon_code: "",
    email: "",
    per_dis_amt: "",
    operator: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredCouponList = useMemo(() => {
    if (!searchQuery) return couponList || [];
    const lowSearch = searchQuery.toLowerCase();
    return (couponList || []).filter((item) => {
      if (!item) return false;
      return Object.values(item).some((value) =>
        String(value || "")
          .toLowerCase()
          .includes(lowSearch),
      );
    });
  }, [searchQuery, couponList]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const totalPages = Math.ceil(
    (filteredCouponList?.length || 0) / itemsPerPage,
  );

  const paginatedCouponList = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCouponList.slice(start, start + itemsPerPage);
  }, [filteredCouponList, currentPage]);

  const handleCreate = () => {
    setIsEdit(false);
    setIsDrawerOpen(true);
    handleResetForm();
  };

  const handleResetForm = () => {
    setFormData({
      _id: null,
      coupon_code: "",
      email: "",
      per_dis_amt: "",
      operator: "",
    });

    setIsInvalid(false);
  };

  const handleSubmit = async () => {
    setIsInvalid(false);
    if (
      !formData.coupon_code ||
      !formData.email ||
      formData.per_dis_amt === "" ||
      !formData.operator
    ) {
      setIsInvalid(true);
      Swal.fire({
        icon: "error",
        title: "Required Fields Missing",
        text: "Please fill in all mandatory fields",
      });
      return;
    }

    const confirmation = await Swal.fire({
      title: "Confirm Submission",
      text: "Are you sure you want to save this coupon?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Save",
    });

    if (confirmation.isConfirmed) {
      const data = {
        _id: isEdit ? formData._id : null,
        coupon_code: formData.coupon_code,
        email: formData.email,
        per_dis_amt: formData.per_dis_amt,
        operator: formData.operator,
        user_info: userInfo?.email,
      };

      try {
        setIsLoadingButton(true);
        const result = await axios.post(
          `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/admin/insert-update-coupon-list`,
          data,
        );

        if (result.data.status) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: result.data.message,
          });

          const newObj = { ...data, _id: result.data.id || formData._id };
          const index = couponList.findIndex((item) => item._id === newObj._id);

          if (index > -1) {
            const updatedList = [...couponList];
            updatedList[index] = newObj;
            setCouponList(updatedList);
          } else {
            setCouponList([newObj, ...couponList]);
          }
          setIsDrawerOpen(false);
          handleResetForm();
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text:
            err.response?.data?.message ||
            err.message ||
            "An unexpected error occurred",
        });
        console.error("Coupon Submission Error:", err);
      } finally {
        setIsLoadingButton(false);
      }
    }
  };

  const handleEdit = (item) => {
    setIsEdit(true);
    setIsDrawerOpen(true);
    setFormData({
      _id: item._id,
      coupon_code: item.coupon_code,
      email: item.email,
      per_dis_amt: item.per_dis_amt,
      operator: item.operator,
    });
  };

  const handleRemove = async (item) => {
    const confirmation = await Swal.fire({
      title: "Delete Coupon?",
      text: "This action cannot be undone.",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#ef4444",
    });

    if (confirmation.isConfirmed) {
      try {
        // Guessing the delete path based on convention
        const result = await axios.delete(
          `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/delete-coupon-list/${item._id}`,
        );
        if (result.data.status) {
          setCouponList(couponList.filter((c) => c._id !== item._id));
          Swal.fire("Deleted!", "Coupon has been removed.", "success");
        }
      } catch (err) {
        Swal.fire("Error", "Failed to delete coupon", `${err}`);
      }
    }
  };

  return (
    <div className="p-4 min-h-screen bg-base-100 relative overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="font-heading text-3xl md:text-5xl font-black uppercase tracking-tighter">
            Coupon <span className="text-accent text-outline">Discounts</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mt-2">
            Manage Promotional Offers & Coupons
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="w-full md:w-auto bg-base-content text-base-100 px-8 py-3 font-heading font-black uppercase tracking-[0.2em] text-xs hover:bg-accent transition-all rounded-sm flex items-center justify-center gap-3 group cursor-pointer"
        >
          Create Coupon
          <span className="text-lg group-hover:rotate-90 transition-transform">
            +
          </span>
        </button>
      </div>

      {/* Search */}
      <div className="mb-8 relative max-w-md">
        <label className="text-[10px] font-black uppercase tracking-widest opacity-50 block mb-2">
          Search Coupons
        </label>
        <div className="relative flex items-center">
          <span className="material-icons absolute left-0 text-sm opacity-30">
            search
          </span>
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            type="text"
            placeholder="COUPON CODE OR EMAIL"
            className="w-full bg-transparent border-b-2 border-base-content/10 focus:border-accent outline-none py-3 pl-7 text-xs font-bold tracking-widest transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-base-100 border border-base-content/5 rounded-sm shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-base-200/50 font-heading text-[10px] uppercase tracking-widest font-black opacity-40">
            <tr>
              <th className="px-8 py-4">SL</th>
              <th className="px-8 py-4">Coupon Code</th>
              <th className="px-8 py-4">Target Email</th>
              <th className="px-8 py-4 text-center">Discount</th>
              <th className="px-8 py-4 text-center">Usage</th>
              <th className="px-8 py-4 text-right">Actions</th>

            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {!paginatedCouponList.length ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-8 py-12 text-center opacity-30 text-[10px] font-black uppercase tracking-widest"
                >
                  No Coupons Found
                </td>
              </tr>
            ) : (
              paginatedCouponList.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-base-200/30 transition-colors group"
                >
                  <td className="px-8 py-6">
                    <span className="font-bold text-sm tracking-tight group-hover:text-accent transition-colors">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="font-black text-sm tracking-tighter text-accent group-hover:scale-105 inline-block transition-transform">
                      {item.coupon_code}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-medium opacity-60">
                      {item.email}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="font-black text-sm">
                      {item.per_dis_amt} {item.operator}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`text-[9px] font-black tracking-tighter px-2 py-1 border inline-block ${item.flag === 1 ? "border-red-500 text-red-500" : "border-green-500 text-green-500"}`}>
                      {item.flag === 1 ? "USED" : "UNUSED"}
                    </span>
                  </td>

                  <td className="px-8 py-6">
                    <div className="flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span
                        onClick={() => handleEdit(item)}
                        className="material-icons cursor-pointer text-sm hover:text-blue-600 transition-colors"
                      >
                        edit
                      </span>
                      <span
                        onClick={() => handleRemove(item)}
                        className="material-icons cursor-pointer text-sm hover:text-red-600 transition-colors"
                      >
                        delete
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Drawer */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-base-content/60 backdrop-blur-sm z-[100] transition-opacity duration-300"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-base-100 z-[101] shadow-2xl transition-transform duration-300 ease-out transform ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
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

          <h2 className="font-heading text-3xl font-black uppercase tracking-tighter mb-12">
            {isEdit ? "Edit" : "Create"}{" "}
            <span className="text-accent">Coupon</span>
          </h2>

          <div className="flex-grow space-y-8 overflow-y-auto pr-2 custom-scrollbar">
            {/* Coupon Code */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                Coupon Code *
              </label>
              <input
                value={formData.coupon_code}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    coupon_code: e.target.value.toUpperCase(),
                  })
                }
                type="text"
                placeholder="SAVE50"
                className={`w-full border-b-2 bg-transparent outline-none py-3 text-sm font-bold transition-all ${isInvalid && !formData.coupon_code ? "border-red-600" : "border-base-content/10 focus:border-accent"}`}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                Target Email *
              </label>
              <input
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                type="email"
                placeholder="customer@example.com"
                className={`w-full border-b-2 bg-transparent outline-none py-3 text-sm font-bold transition-all ${isInvalid && !formData.email ? "border-red-600" : "border-base-content/10 focus:border-accent"}`}
              />
            </div>

            {/* Discount & Operator Row */}
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                  Discount (%) *
                </label>
                <input
                  value={formData.per_dis_amt}
                  onChange={(e) =>
                    setFormData({ ...formData, per_dis_amt: e.target.value })
                  }
                  type="text"
                  placeholder="20"
                  className={`w-full border-b-2 bg-transparent outline-none py-3 text-sm font-bold transition-all ${isInvalid && formData.per_dis_amt === "" ? "border-red-600" : "border-base-content/10 focus:border-accent"}`}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                  Operator *
                </label>
                <input
                  value={formData.operator}
                  onChange={(e) =>
                    setFormData({ ...formData, operator: e.target.value })
                  }
                  type="text"
                  placeholder="e.g. ADMIN"
                  className={`w-full border-b-2 bg-transparent outline-none py-3 text-sm font-bold transition-all ${isInvalid && !formData.operator ? "border-red-600" : "border-base-content/10 focus:border-accent"}`}
                />
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-8 border-t border-base-content/5 flex justify-center gap-4 mt-auto">
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="px-8 border border-base-content/10 py-3 font-heading font-black uppercase tracking-widest text-[10px] hover:bg-base-content hover:text-base-100 transition-all rounded-sm cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoadingButton}
              className="px-8 bg-base-content text-base-100 py-3 font-heading font-black uppercase tracking-widest text-[10px] hover:bg-accent transition-colors rounded-sm disabled:opacity-50 min-w-[120px] cursor-pointer"
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
  );
};

export default CouponDiscount;
