import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const MakeAdmin = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { adminData } = useLoaderData();
  const [adminList, setAdminList] = useState(adminData?.list_data);
  const [formData, setFormData] = useState({
    _id: null,
    email: null,
    roleInfo: {},
    isEdit: false,
  });
  const [isEdit, setIsEdit] = useState(false);

  const accessList = [
    {
      role_id: 200,
      role: "Super Admin",
    },
    {
      role_id: 201,
      role: "Admin",
    },
    {
      role_id: 202,
      role: "Modarator",
    },
  ];

  const handleResetForm = () => {
    setFormData({
      _id: null,
      email: "",
      full_name: "",
      roleInfo: null,
    });
  };

  const handleSubmitAdmin = async () => {
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
      email: formData.email,
      role: formData.roleInfo?.role,
      role_id: formData.roleInfo?.role_id,
      user_info: userInfo?.email,
    };
    console.log("data", data);
    try {
      if (confirmation.isConfirmed) {
        const result = await axios.post(
          `https://api-penguin.onrender.com/api/admin/insert-update-admin`,
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
            email: formData.email,
            role: formData.roleInfo?.role,
            role_id: formData.roleInfo?.role_id,
          };

          const index = adminList?.findIndex(
            (item) => item.id == result.data.id,
          );

          if (index > -1) {
            // 1. Create a copy of the list
            const updatedList = [...adminList];
            // 2. Update the specific item in the copy
            updatedList[index] = obj;
            // 3. Set the state with the new array
            setAdminList(updatedList);
          } else {
            // 1. Create a new array with the new object at the start, followed by the old items
            setAdminList([obj, ...adminList]);
          }
          handleResetForm();
        }
        setIsEdit(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (item) => {
    setIsEdit(true);
    setFormData({
      _id: item._id,
      roleInfo: { role_id: item.role_id, role: item.role },
      email: item.email,
    });
  };

  const handleCancel = () => {
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
          `https://api-penguin.onrender.com/api/admin/delete-admin-list/${item._id}`,
        );
        if (result.data?.status) {
          const index = adminList.findIndex((list) => list._id === item._id);

          if (index !== -1) {
            const newAdminList = [...adminList];

            newAdminList.splice(index, 1);

            setAdminList(newAdminList);
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
    <div className="p-4">
      {/* 1. HEADER */}
      <header className="mb-8">
        <h1 className="font-heading text-5xl font-black uppercase tracking-tighter">
          Admin <span className="text-accent text-outline">Control</span>
        </h1>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mt-2">
          Assign and Manage Administrative Access
        </p>
      </header>

      {/* 2. INPUT FORM SECTION */}
      <div className="bg-white border border-black/5 p-10 mb-6 shadow-sm">
        <h3 className="font-heading font-black uppercase tracking-widest text-xl mb-8 border-b border-black/5 pb-4">
          Add New Admin
        </h3>

        <form
          className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-end w-full"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Email Input */}
          <div className="space-y-2 w-full">
            <label className="text-sm font-black uppercase tracking-widest opacity-50">
              User Email
            </label>
            <input
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              type="email"
              placeholder="user@vortexlabs.com"
              className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-3 text-xs font-bold transition-colors bg-transparent"
            />
          </div>

          {/* Role Dropdown */}
          <div className="space-y-2 w-full">
            <label className="text-sm font-black uppercase tracking-widest opacity-50">
              Access Level
            </label>
            <select
              value={JSON.stringify(formData.roleInfo)}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  roleInfo: JSON.parse(e.target.value),
                })
              }
              className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-3 text-xs font-bold bg-transparent uppercase tracking-wider cursor-pointer"
            >
              <option>Select Role</option>
              {accessList?.map((item, index) => (
                <option value={JSON.stringify(item)} key={index}>
                  {item?.role}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmitAdmin}
            className="w-full bg-black text-white px-6 py-3 font-heading font-black uppercase tracking-[0.2em] text-xs hover:bg-accent transition-all shadow-lg shadow-black/5 cursor-pointer"
          >
            {isEdit ? "Update" : "Submit"}
          </button>

          <button
            onClick={handleCancel}
            className="w-full bg-black text-white px-6 py-3 font-heading font-black uppercase tracking-[0.2em] text-xs hover:bg-accent transition-all shadow-lg shadow-black/5 cursor-pointer"
          >
            {isEdit ? "Cancel" : "Clear"}
          </button>
        </form>
      </div>

      {/* 3. ADMIN LIST VIEW */}
      <div className="bg-white border border-black/5 overflow-hidden">
        <div className="p-8 border-b border-black/5 flex justify-between items-center">
          <h2 className="font-heading text-xl font-black uppercase">
            Administrators <span className="text-accent">List</span>
          </h2>
          <span className="text-[10px] font-black opacity-30 uppercase tracking-widest">
            Total: {adminList?.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-base-200/50 font-heading text-[10px] uppercase tracking-widest font-black text-black/40">
                <th className="px-3 py-3">Super Admin</th>
                <th className="px-3 py-3">Email</th>
                <th className="px-3 py-3">Role</th>
                <th className="px-3 py-3">Created Date</th>
                <th className="px-3 py-3">Modified Date</th>
                <th className="px-3 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {adminList.map((item, index) => (
                <tr
                  key={index}
                  className="group hover:bg-base-200/30 transition-colors"
                >
                  <td className="px-3 py-3">{item.user_info}</td>
                  <td className="px-3 py-3">{item.email}</td>
                  <td className="px-3 py-3">
                    <span className="inline-block border border-black/10 px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full group-hover:border-accent group-hover:text-accent transition-colors">
                      {item.role}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-[11px] font-bold opacity-40 uppercase">
                    {item.createdAt}
                  </td>
                  <td className="px-3 py-3 text-[11px] font-bold opacity-40 uppercase">
                    {item.modifiedAt}
                  </td>
                  <td className="px-3 py-3 text-right">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MakeAdmin;
