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

const AddProduct = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [productList, setProductList] = useState([]);
  const [parentCategoryList, setParentCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [parentRes, subRes, prodRes] = await Promise.all([
          axios.get(
            `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/admin/get-parent-category`,
          ),
          axios.get(
            `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/admin/get-sub-category`,
          ),
          axios.get(
            `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/get-product-list`,
          ),
        ]);
        setParentCategoryList(parentRes.data?.list_data || []);
        setSubCategoryList(subRes.data?.list_data || []);
        setProductList(prodRes.data?.list_data || []);
      } catch (error) {
        console.error("Failed to fetch product data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllData();
  }, []);

  const [formData, setFormData] = useState({
    _id: null,
    par_cat_id: "",
    sub_cat_id: "",
    sub_sub_cat_id: "",
    prod_id: "",
    prod_image: "",
    prod_name: "",
    price: "",
    prodTypeInfo: {},
    stock: "",
    prod_brand: "",
    description: "",
    currencyTypeInfo: {},
    status: "",
    discount: "",
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

  const currencyList = [
    {
      currency_id: 301,
      currency_name: "BDT",
    },
    {
      currency_id: 302,
      currency_name: "USD",
    },
    {
      currency_id: 303,
      currency_name: "CAD",
    },
    {
      currency_id: 304,
      currency_name: "Yuan",
    },
    {
      currency_id: 305,
      currency_name: "Euro",
    },
  ];

  const productTypeList = [
    {
      prod_type: "R",
      prod_type_name: "Regular",
    },
    {
      prod_type: "D",
      prod_type_name: "Discount",
    },
  ];

  const [isEdit, setIsEdit] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredproductList = useMemo(() => {
    if (!searchQuery) return productList;
    const lowSearch = searchQuery.toLowerCase();
    return productList.filter((item) => {
      return Object.values(item).some((value) =>
        String(value).toLowerCase().includes(lowSearch),
      );
    });
  }, [searchQuery, productList]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredproductList?.length / itemsPerPage);

  const paginatedproductList = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredproductList?.slice(start, start + itemsPerPage);
  }, [filteredproductList, currentPage]);

  const handleCreate = () => {
    setIsEdit(false);
    setIsDrawerOpen(true);
    handleResetForm();
  };

  const handleResetForm = () => {
    setFormData({
      _id: null,
      par_cat_id: "",
      sub_cat_id: "",
      sub_sub_cat_id: "",
      prod_id: "",
      prod_image: "",
      prod_name: "",
      price: "",
      prodTypeInfo: {},
      stock: "",
      prod_brand: "",
      description: "",
      currencyTypeInfo: {},
      status: 1,
      discount: "",
    });
  };

  const handleSubmit = async () => {
    setIsInvalid(false);
    if (
      !formData.prod_name ||
      !formData.prod_image ||
      !formData.prod_id ||
      !formData.status ||
      !formData.par_cat_id ||
      !formData.sub_cat_id ||
      !formData.price ||
      !formData.prodTypeInfo?.prod_type ||
      !formData.currencyTypeInfo?.currency_id ||
      !formData.prod_brand ||
      !formData.stock ||
      !formData.description ||
      (formData.prodTypeInfo?.prod_type === "D" && !formData.discount) ||
      !userInfo?.email
    ) {
      setIsInvalid(true);
      showError(
        "Validation Failed",
        "Please fill in all mandatory fields and ensure categories are selected.",
      );
      return;
    }

    const confirmation = await showConfirmation();

    const data = {
      _id: isEdit ? formData._id : null,
      prod_id: Number(formData.prod_id),
      prod_name: formData.prod_name,
      prod_image: formData.prod_image,
      price: Number(formData.price),
      stock: Number(formData.stock),
      prod_brand: formData.prod_brand,
      description: formData.description,
      status: Number(formData.status),
      par_cat_id: Number(formData?.par_cat_id),
      sub_cat_id: Number(formData?.sub_cat_id),
      prod_type: formData.prodTypeInfo?.prod_type,
      prod_type_name: formData.prodTypeInfo?.prod_type_name,
      currency_id: Number(formData.currencyTypeInfo?.currency_id),
      currency_name: formData.currencyTypeInfo?.currency_name,
      discount:
        formData.prodTypeInfo?.prod_type === "D"
          ? Number(formData.discount)
          : 0,
      user_info: userInfo?.email,
    };

    try {
      if (confirmation.isConfirmed) {
        showProcessing();
        const result = await axios.post(
          `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/admin/insert-update-product-list`,
          data,
        );
        if (result.data.status) {
          await showSuccess("Successful.", result.data.message);
          const obj = {
            ...data,
            _id: result.data.id,
            createdAt: isEdit
              ? productList.find((p) => p._id === result.data.id)?.createdAt
              : new Date().toISOString(),
          };
          handleResetForm();

          const index = productList?.findIndex(
            (item) => item._id == result.data.id,
          );

          if (index > -1) {
            const updatedList = [...productList];

            updatedList[index] = obj;

            setProductList(updatedList);
          } else {
            setProductList([obj, ...productList]);
          }
        }
        setIsEdit(false);
        setIsDrawerOpen(false);
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

  const handleStatusUpdate = async (item) => {
    const confirmation = await showConfirmation(
      "Update Status?",
      "Do you want to change this product's visibility?",
    );

    const data = {
      _id: item._id,
      status: Number(item.status == 1 ? 0 : 1),
      user_info: userInfo?.email,
    };

    try {
      if (confirmation.isConfirmed) {
        showProcessing();
        const result = await axios.patch(
          `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/admin/update-product-status/${item._id}`,
          data,
        );
        if (result.data.status) {
          showSuccess(result.data.message);
          const obj = {
            ...item,
            status: Number(result.data?.status_code),
            user_info: userInfo?.email,
          };

          const index = productList?.findIndex(
            (item) => item._id == result.data.id,
          );

          if (index > -1) {
            const updatedList = [...productList];

            updatedList[index] = obj;

            setProductList(updatedList);
          } else {
            setProductList([obj, ...productList]);
          }
        }
      }
    } catch (err) {
      showError(
        "Status Update Failed",
        err.response?.data?.message || err.message,
      );
    }
  };

  const handleEdit = (item) => {
    setIsEdit(true);
    setIsDrawerOpen(true);
    setFormData({
      _id: item._id,
      prod_id: item.prod_id,
      prod_name: item.prod_name,
      prod_image: item.prod_image,
      price: item.price,
      stock: item.stock,
      prod_brand: item.prod_brand,
      description: item.description,
      status: item.status,

      par_cat_id: item.par_cat_id,

      sub_cat_id: item.sub_cat_id,

      prodTypeInfo: {
        prod_type: item.prod_type,
        prod_type_name: item.prod_type_name,
      },
      currencyTypeInfo: {
        currency_id: item.currency_id,
        currency_name: item.currency_name,
      },
      discount: item.discount || "",
    });
  };

  const handleCancel = () => {
    setIsDrawerOpen(false);
    setIsEdit(false);
    handleResetForm();
  };

  const handleRemove = async (item) => {
    const confirmation = await showConfirmation(
      "Delete Product?",
      "Are you sure you want to remove this product permanently?",
    );

    try {
      if (confirmation.isConfirmed) {
        showProcessing();
        const result = await axios.delete(
          `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/admin/delete-product-list/${item._id}`,
        );
        if (result.data?.status) {
          const index = productList.findIndex((list) => list._id === item._id);

          if (index !== -1) {
            const newproductList = [...productList];

            newproductList.splice(index, 1);

            setProductList(newproductList);
          }
          showSuccess(result.data.message);
        }
      }
    } catch (err) {
      showError("Deletion Failed", err.response?.data?.message || err.message);
    }
  };
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleDetails = (data) => {
    setSelectedProduct(data);
    setIsDetailsOpen(true);
  };

  return (
    <div>
      <div className="p-4 min-h-screen bg-base-100 relative overflow-x-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6">
          <div>
            <h1 className="font-heading text-3xl md:text-5xl font-black uppercase tracking-tighter text-base-content">
              Product <span className="text-accent text-outline">Vault</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mt-2">
              Manage Product Vault
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

        <div className="mb-8 relative max-w-full md:max-w-md">
          <label className="text-[10px] font-black uppercase tracking-widest opacity-50 block mb-2">
            Search Products
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

        <div className="bg-base-100 border border-base-content/5 rounded-sm shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="hidden md:table-header-group bg-base-200/50 font-heading text-[10px] uppercase tracking-widest font-black opacity-40">
              <tr>
                <th className="px-6 py-4">SL</th>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Price</th>

                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {isLoading ? (
                <tr>
                  <td
                    colSpan="9"
                    className="px-8 py-12 text-center opacity-30 text-[10px] font-black uppercase tracking-widest"
                  >
                    Loading...
                  </td>
                </tr>
              ) : paginatedproductList?.length > 0 ? (
                paginatedproductList.map((item, index) => (
                  <tr
                    key={item._id}
                    className="hover:bg-base-200/30 transition-colors group"
                  >
                    {/* 1. SL */}
                    <td className="px-6 py-4 text-xs font-bold">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>

                    {/* 2. Image */}
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 bg-base-200 rounded-sm overflow-hidden border border-base-content/10">
                        <img
                          src={item.prod_image}
                          alt={item.prod_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>

                    {/* 3. Product ID & Name */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-[11px] font-black opacity-60">
                          #{item.prod_id}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-tighter">
                          {item.prod_name}
                        </span>
                      </div>
                    </td>

                    {/* 4. Product Type */}
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold opacity-70 bg-base-200 px-2 py-1 rounded-sm uppercase">
                        {item.prod_type_name}
                      </span>
                    </td>

                    {/* 5. Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`text-[9px] font-black tracking-tighter px-2 py-1 border inline-block ${
                          item.status === 1
                            ? "border-green-500 text-green-500"
                            : "border-red-500 text-red-500 opacity-40"
                        }`}
                      >
                        {item.status === 1 ? "ACTIVE" : "INACTIVE"}
                      </span>
                    </td>

                    {/* 6. Stock */}
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-bold ${item.stock < 10 ? "text-red-500" : ""}`}
                      >
                        {item.stock}{" "}
                        <span className="text-[9px] opacity-40">PCS</span>
                      </span>
                    </td>

                    {/* 7. Price */}
                    <td className="px-6 py-4 text-xs font-black">
                      {item.price}{" "}
                      <span className="text-[9px] opacity-50">
                        {item.currency_name}
                      </span>
                    </td>

                    {/* 9. Action */}
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
                          onClick={() => handleStatusUpdate(item)}
                          className="material-icons text-lg cursor-pointer hover:text-accent transition-colors"
                        >
                          {item.status === 1 ? "visibility" : "visibility_off"}
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
                    colSpan="9"
                    className="px-8 py-12 text-center opacity-30 text-[10px] font-black uppercase tracking-widest"
                  >
                    No products available
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
                  <span className="text-accent">Product</span>
                </h2>
              </div>

              <div className="flex-grow space-y-10 overflow-y-auto pr-2 custom-scrollbar">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                    Product Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    value={formData.prod_name}
                    onChange={(e) =>
                      setFormData({ ...formData, prod_name: e.target.value })
                    }
                    type="text"
                    placeholder="e.g. Footwear"
                    className={`w-full border-b-2 ${
                      isInvalid && !formData.prod_name
                        ? "border-red-600"
                        : "border-base-content/10"
                    } focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent `}
                  />
                </div>

                <div className="space-y-2 ">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                    Product Image <span className="text-red-600">*</span>
                  </label>
                  <input
                    value={formData.prod_image}
                    onChange={(e) =>
                      setFormData({ ...formData, prod_image: e.target.value })
                    }
                    type="url"
                    placeholder="Enter url"
                    className={`w-full border-b-2 ${
                      isInvalid && !formData.prod_image
                        ? "border-red-600"
                        : "border-base-content/10"
                    } focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent`}
                  />
                </div>

                {/* Change 1: Added 'flex-wrap' and 'gap-y-8' to allow items to move to the next line */}
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-8 w-full">
                  {/* Product ID */}
                  <div className="space-y-2 w-[calc(50%-8px)]">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      Product ID <span className="text-red-600">*</span>
                    </label>
                    <input
                      value={formData.prod_id}
                      onChange={(e) =>
                        setFormData({ ...formData, prod_id: e.target.value })
                      }
                      type="number"
                      placeholder="101"
                      className={`w-full border-b-2 ${
                        isInvalid && !formData.prod_id
                          ? "border-red-600"
                          : "border-base-content/10"
                      } focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent`}
                    />
                  </div>

                  {/* Status */}
                  <div className="space-y-2 w-[calc(50%-8px)]">
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
                      } focus:border-accent outline-none py-3 text-sm font-bold bg-transparent text-base-content tracking-wider cursor-pointer`}
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

                  {/* Parent Category */}

                  <div className="space-y-2 w-[calc(50%-8px)]">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      Parent Category <span className="text-red-600">*</span>
                    </label>
                    <select
                      value={formData.par_cat_id}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          par_cat_id: Number(e.target.value),
                        })
                      }
                      className={`w-full border-b-2 ${
                        isInvalid && !formData.par_cat_id
                          ? "border-red-600"
                          : "border-base-content/10"
                      } focus:border-accent outline-none py-3 text-sm font-bold bg-transparent text-base-content tracking-wider cursor-pointer`}
                    >
                      <option
                        value=""
                        className="bg-base-100 text-base-content"
                      >
                        Select Category
                      </option>
                      {parentCategoryList.map((category, index) => (
                        <option
                          key={index}
                          value={category.par_cat_id}
                          className="bg-base-100 text-base-content"
                        >
                          {category.par_cat_id} - {category.par_cat_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sub Category */}

                  <div className="space-y-2 w-[calc(50%-8px)]">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      Sub Category <span className="text-red-600">*</span>
                    </label>
                    <select
                      value={formData.sub_cat_id}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sub_cat_id: Number(e.target.value),
                        })
                      }
                      className={`w-full border-b-2 ${
                        isInvalid && !formData.sub_cat_id
                          ? "border-red-600"
                          : "border-base-content/10"
                      } focus:border-accent outline-none py-3 text-sm font-bold bg-transparent text-base-content tracking-wider cursor-pointer`}
                    >
                      <option
                        value=""
                        className="bg-base-100 text-base-content"
                      >
                        Select Category
                      </option>
                      {subCategoryList
                        ?.filter(
                          (category) =>
                            Number(category.par_cat_id) ===
                            Number(formData.par_cat_id),
                        )
                        ?.map((category, index) => (
                          <option
                            key={index}
                            value={category.sub_cat_id}
                            className="bg-base-100 text-base-content"
                          >
                            {category.sub_cat_id} - {category.sub_cat_name}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* image  */}

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      Price <span className="text-red-600">*</span>
                    </label>
                    <input
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      type="number"
                      placeholder="Enter price"
                      className={`w-full border-b-2 ${
                        isInvalid && !formData.price
                          ? "border-red-600"
                          : "border-base-content/10"
                      } focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent `}
                    />
                  </div>

                  {/* prod type  */}
                  <div className="space-y-2 w-[calc(50%-8px)]">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      Product Type <span className="text-red-600">*</span>
                    </label>
                    <select
                      value={JSON.stringify(formData.prodTypeInfo) || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          prodTypeInfo: e.target.value
                            ? JSON.parse(e.target.value)
                            : null,
                        })
                      }
                      className={`w-full border-b-2 ${
                        isInvalid &&
                        (!formData.prodTypeInfo ||
                          !formData.prodTypeInfo.prod_type)
                          ? "border-red-600"
                          : "border-base-content/10"
                      } focus:border-accent outline-none py-3 text-sm font-bold bg-transparent text-base-content  tracking-wider cursor-pointer`}
                    >
                      <option
                        value=""
                        className="bg-base-100 text-base-content"
                      >
                        Select Product Type
                      </option>
                      {productTypeList?.map((prod, index) => (
                        <option
                          key={index}
                          value={JSON.stringify(prod)}
                          className="bg-base-100 text-base-content"
                        >
                          {prod.prod_type} - {prod.prod_type_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {formData.prodTypeInfo?.prod_type === "D" && (
                    <div className="space-y-2 w-[calc(50%-8px)]">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                        Discount Amount <span className="text-red-600">*</span>
                      </label>
                      <input
                        value={formData.discount}
                        onChange={(e) =>
                          setFormData({ ...formData, discount: e.target.value })
                        }
                        type="number"
                        placeholder="e.g. 50"
                        className={`w-full border-b-2 ${
                          isInvalid && !formData.discount
                            ? "border-red-600"
                            : "border-base-content/10"
                        } focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent`}
                      />
                    </div>
                  )}

                  {/* currency  */}

                  <div className="space-y-2 w-[calc(50%-8px)]">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      Currency Type <span className="text-red-600">*</span>
                    </label>
                    <select
                      value={JSON.stringify(formData.currencyTypeInfo) || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          currencyTypeInfo: e.target.value
                            ? JSON.parse(e.target.value)
                            : null,
                        })
                      }
                      className={`w-full border-b-2 ${
                        isInvalid &&
                        (!formData.currencyTypeInfo ||
                          !formData.currencyTypeInfo.currency_id)
                          ? "border-red-600"
                          : "border-base-content/10"
                      } focus:border-accent outline-none py-3 text-sm font-bold bg-transparent text-base-content  tracking-wider cursor-pointer`}
                    >
                      <option
                        value=""
                        className="bg-base-100 text-base-content"
                      >
                        Select Currency Type
                      </option>
                      {currencyList?.map((currency, index) => (
                        <option
                          key={index}
                          value={JSON.stringify(currency)}
                          className="bg-base-100 text-base-content"
                        >
                          {currency.currency_id} - {currency.currency_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2 w-[calc(50%-8px)] ">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      Brand Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      value={formData.prod_brand}
                      onChange={(e) =>
                        setFormData({ ...formData, prod_brand: e.target.value })
                      }
                      type="text"
                      placeholder="Enter Brand"
                      className={`w-full border-b-2 ${
                        isInvalid && !formData.prod_brand
                          ? "border-red-600"
                          : "border-base-content/10"
                      } focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent `}
                    />
                  </div>
                  <div className="space-y-2 w-[calc(50%-8px)]">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      Stock <span className="text-red-600">*</span>
                    </label>
                    <input
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                      }
                      type="number"
                      placeholder="Enter stock"
                      className={`w-full border-b-2 ${
                        isInvalid && !formData.stock
                          ? "border-red-600"
                          : "border-base-content/10"
                      } focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent `}
                    />
                  </div>
                </div>
                <div className="space-y-2  ">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                    Description <span className="text-red-600">*</span>
                  </label>
                  <input
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    type="text-area"
                    placeholder="Enter description"
                    className={`w-full border-b-2 ${
                      isInvalid && !formData.description
                        ? "border-red-600"
                        : "border-base-content/10"
                    } focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent `}
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

          {/* 5. "DETAILS" VIEW DRAWER */}

          {/* --- BACKDROP FOR CLICK-OUTSIDE --- */}
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
            {selectedProduct && (
              <div className="h-full flex flex-col p-8 relative">
                {/* Floating Close Button */}
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

                {/* Header */}
                <div className="mb-8">
                  <h2 className="font-heading text-3xl font-black uppercase tracking-tighter text-base-content">
                    Product <span className="text-accent">Details</span>
                  </h2>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mt-2">
                    SKU: {selectedProduct.prod_id}
                  </p>
                </div>

                {/* Content Area */}
                <div className="flex-grow space-y-8 overflow-y-auto pr-2 custom-scrollbar">
                  {/* Product Image */}

                  {/* Info Grid */}
                  <div className="space-y-10">
                    {/* 1. Image Section - Optimized for Dark Mode with a slight tint */}
                    <div className="aspect-square bg-white/[0.03] border border-base-content/5  rounded-sm overflow-hidden relative group">
                      <img
                        src={selectedProduct.prod_image}
                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                        alt={selectedProduct.prod_name}
                      />
                    </div>

                    {/* 2. Primary Info Grid */}
                    <div className="grid grid-cols-2 gap-y-10 gap-x-6 border-t border-base-content/5 pt-8">
                      {/* Product Name */}
                      <div className="col-span-2">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                          Product Name
                        </p>
                        <p className="font-heading font-bold text-2xl uppercase mt-1 leading-none tracking-tighter">
                          {selectedProduct.prod_name}
                        </p>
                      </div>

                      {/* Brand */}
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                          Brand
                        </p>
                        <p className="font-heading font-bold text-sm uppercase mt-1 tracking-tight">
                          {selectedProduct.prod_brand}
                        </p>
                      </div>
                      {selectedProduct.prod_type === "D" && (
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                            Discount
                          </p>
                          <p className="font-heading font-bold text-sm uppercase mt-1 tracking-tight">
                            {selectedProduct.discount}{" "}
                            <span className="text-[10px] text-base-content/40 ml-1">
                              {selectedProduct.currency_name}
                            </span>
                          </p>
                        </div>
                      )}

                      {/* Price */}
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                          Current Price
                        </p>
                        <p className="font-heading font-black text-xl mt-1 leading-none">
                          {selectedProduct.price}{" "}
                          <span className="text-[10px] text-base-content/40 ml-1">
                            {selectedProduct.currency_name}
                          </span>
                        </p>
                      </div>

                      {/* Stock */}
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                          Availability
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <div
                            className={`w-2 h-2 rounded-full ${selectedProduct.stock > 0 ? "bg-green-500 animate-pulse" : "bg-red-500"}`}
                          />
                          <p className="font-heading font-bold text-sm uppercase ">
                            {selectedProduct.stock}{" "}
                            <span className="opacity-50 text-[10px]">
                              in stock
                            </span>
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                          Product Type
                        </p>
                        <p className="font-heading font-bold text-sm uppercase">
                          {selectedProduct.prod_type_name}{" "}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                          Date Added
                        </p>
                        <p className="font-heading font-bold text-sm uppercase">
                          {new Date(
                            selectedProduct.createdAt,
                          ).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    {/* 3. Category Hierarchy (Technical IDs) */}
                    <div className="border-t border-base-content/5 pt-8">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-4">
                        Category Mapping
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <div className="px-3 py-1 border border-base-content/10 rounded-full flex items-center gap-2">
                          <span className="text-[8px] font-black opacity-30 uppercase">
                            Parent
                          </span>
                          <span className="text-[10px] font-bold">
                            ID: {selectedProduct.par_cat_id}
                          </span>
                        </div>
                        <div className="px-3 py-1 border border-base-content/10 rounded-full flex items-center gap-2">
                          <span className="text-[8px] font-black opacity-30 uppercase">
                            Sub
                          </span>
                          <span className="text-[10px] font-bold">
                            ID: {selectedProduct.sub_cat_id}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 4. Description */}
                    <div className="border-t border-base-content/5 pt-4 pb-4">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                        Description
                      </p>
                      <p className="text-xs font-medium leading-relaxed mt-4 opacity-70 border-l-2 border-accent/20 pl-4 py-1 ">
                        {selectedProduct.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
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

export default AddProduct;
