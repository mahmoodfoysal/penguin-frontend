import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  showSuccess,
  showError,
  showConfirmation,
  showProcessing,
} from "../../../components/Alert";


const CustomerProfile = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [orderData, setOrderData] = useState([]);

  const [profileData, setProfileData] = useState({
    full_name: "",
    email: userInfo?.email || "",
    address: "",
    phone_no: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!userInfo?.email) return;
      try {
        setIsLoading(true);

        // Fetch profile info
        const userRes = await axios.get(
          `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/get-user-list/${userInfo.email}`,
        );
        if (userRes.data?.list_data?.length > 0) {
          const user = userRes.data.list_data[0];
          setProfileData((prev) => ({
            ...prev,
            full_name: user.full_name || prev.full_name,
            address: user.address || prev.address,
            phone_no: Number(user.phone_no) || Number(prev.phone_no),
            _id: user._id,
            createdAt: user.createdAt,
          }));
        }

        // Fetch order stats separately
        const orderRes = await axios.get(
          `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/get-order-list/${userInfo.email}`,
        );
        if (orderRes.data?.list_data) {
          setOrderData(orderRes.data.list_data);
        }
      } catch (err) {
        showError(
          "Data Loading Failed",
          err.response?.data?.message || err.message || "Failed to load profile data",
        );
      } finally {

        setIsLoading(false);
      }
    };
    fetchData();
  }, [userInfo?.email]);

  const handleUpdateProfile = async () => {
    if (!profileData?._id) {
      showError(
        "Update Prevented",
        "User Identity (_id) not found. Please refresh the page.",
      );
      return;
    }


    const confirmation = await showConfirmation(
      "Are you sure?",
      "Do you want to update your profile?",
    );

    if (!confirmation.isConfirmed) return;

    try {
      showProcessing("Updating...", "Please wait while we save your changes");


      const response = await axios.post(
        `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/insert-update-user-list`,
        {
          ...profileData,
          user_info: userInfo?.email,
        },
      );

      if (
        response.data.status ||
        response.status === 200 ||
        response.status === 201
      ) {
        await showSuccess("Success", response.data.message || "Profile updated successfully!");
        setIsEditModalOpen(false);
      } else {
        showError("Error", response.data.message || "Update failed");
      }

    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Something went wrong";
      showError("Error", errorMessage);
    }

  };

  const stats = [
    { label: "Total Orders", value: orderData.length || "0", icon: "📦" },
    {
      label: "Active Tracking",
      value:
        orderData.filter((o) => !["C", "R"].includes(o.order_status)).length ||
        "0",
      icon: "🚚",
    },
    { label: "Reward Points", value: "work in progress ", icon: "✨" },
  ];

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8 pt-24">
      {isLoading ? (
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center py-40 bg-base-100 rounded-[3rem] shadow-xl border border-base-content/5">
          <span className="loading loading-bars loading-lg text-accent"></span>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mt-8 animate-pulse">
            Loading Profile Data...
          </p>
        </div>
      ) : (
        <>
          <div className="max-w-5xl mx-auto">
            {/* Profile Hero Card */}
            <div className="relative bg-base-100 rounded-[3rem] shadow-2xl overflow-hidden border border-base-content/5 mb-10">
              {/* Decorative Background */}
              <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-r from-accent to-purple-600 opacity-10" />

              <div className="relative p-10 flex flex-col md:flex-row items-center gap-10">
                {/* Avatar Section */}
                <div className="relative group">
                  <div className="w-40 h-40 rounded-full p-2 bg-gradient-to-tr from-accent to-purple-500 shadow-2xl group-hover:rotate-6 transition-transform duration-500">
                    <img
                      src={userInfo?.photo || "https://via.placeholder.com/150"}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full border-4 border-base-100"
                    />
                  </div>
                  <button className="absolute bottom-2 right-2 w-10 h-10 bg-base-content text-base-100 rounded-full flex items-center justify-center border-4 border-base-100 hover:bg-accent transition-colors shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                </div>

                {/* Name & Info */}
                <div className="text-center md:text-left flex-grow">
                  <h1 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tighter  mb-2">
                    {userInfo?.name || "Guest User"}
                  </h1>

                  <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-6">
                    Member <span className="text-accent">•</span> Since{" "}
                    {profileData?.createdAt
                      ? new Date(profileData.createdAt).getFullYear()
                      : "2026"}
                  </p>

                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <div className="bg-base-200/50 px-4 py-2 rounded-xl flex items-center gap-2 border border-base-content/5">
                      <span className="text-xs">📧</span>
                      <span className="text-[11px] font-bold opacity-60 uppercase tracking-tight">
                        {userInfo?.email}
                      </span>
                    </div>
                    <div className="bg-emerald-500/10 text-emerald-600 px-4 py-2 rounded-xl flex items-center gap-2 border border-emerald-500/20">
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        Verified Account
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats Banner */}
              <div className="grid grid-cols-3 border-t border-base-content/5 bg-base-200/30">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-6 text-center border-x border-base-content/5"
                  >
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-1">
                      {stat.label}
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-lg">{stat.icon}</span>
                      <span className="text-2xl font-heading font-black tracking-tighter">
                        {stat.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Navigation Sidebar */}
              <div className="lg:col-span-1 space-y-4">
                {[
                  { id: "overview", label: "Overview", icon: "🎯" },
                  //   { id: "shipping", label: "Shipping Address", icon: "🏠" },
                  //   { id: "security", label: "Security & Login", icon: "🔒" },
                  //   { id: "preferences", label: "Preferences", icon: "⚙️" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-4 px-8 py-5 rounded-[2rem] transition-all duration-300 font-heading font-black uppercase text-[11px] tracking-widest ${
                      activeTab === tab.id
                        ? "bg-base-content text-base-100 shadow-xl -translate-x-2"
                        : "bg-base-100 opacity-40 hover:opacity-100 border border-base-content/5"
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Active Tab Content */}
              <div className="lg:col-span-2">
                <div className="bg-base-100 rounded-[3rem] p-10 shadow-xl border border-base-content/5 min-h-[400px]">
                  {activeTab === "overview" && (
                    <div className="space-y-10 animate-in fade-in duration-500">
                      <div className="flex justify-between items-end border-b border-base-content/5 pb-4">
                        <div>
                          <h2 className="text-2xl font-heading font-black uppercase tracking-tighter">
                            Account{" "}
                            <span className="text-accent ">Overview</span>
                          </h2>
                          <p className="text-[9px] font-bold uppercase tracking-widest opacity-30 mt-1">
                            Your personal account information and status
                          </p>
                        </div>
                        <button
                          onClick={() => setIsEditModalOpen(true)}
                          className="bg-base-content text-base-100 px-6 py-2 rounded-xl font-heading font-black uppercase text-[9px] tracking-widest hover:bg-accent transition-all flex items-center gap-2 group"
                        >
                          Edit Profile
                          <span className="group-hover:translate-x-1 transition-transform">
                            →
                          </span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Info Cards */}
                        {[
                          {
                            label: "Full Name",
                            value: profileData.full_name || "Not set",
                            icon: "👤",
                          },
                          {
                            label: "Email Address",
                            value: profileData.email,
                            icon: "📧",
                          },
                          {
                            label: "Phone Number",
                            value: profileData.phone_no || "Not provided",
                            icon: "📱",
                          },
                          {
                            label: "Address",
                            value:
                              profileData.address || "No address added yet",
                            icon: "📍",
                            fullWidth: true,
                          },
                        ].map((field) => (
                          <div
                            key={field.label}
                            className={`p-6 bg-base-200/50 rounded-3xl border border-base-content/5 hover:border-accent/30 transition-all group ${field.fullWidth ? "md:col-span-2" : ""}`}
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-base-100 rounded-2xl flex items-center justify-center text-xl shadow-sm border border-base-content/5 group-hover:scale-110 transition-transform">
                                {field.icon}
                              </div>
                              <div>
                                <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-30 mb-1">
                                  {field.label}
                                </p>
                                <p className="font-heading font-bold text-sm tracking-tight">
                                  {field.value}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "shipping" && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                      <h2 className="text-2xl font-heading font-black uppercase tracking-tighter border-b border-base-content/5 pb-4">
                        Shipping <span className="text-accent ">Book</span>
                      </h2>
                      <div className="p-8 border-2 border-dashed border-base-content/10 rounded-[2rem] flex flex-col items-center justify-center text-center py-20">
                        <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mb-6">
                          <span className="text-2xl">📍</span>
                        </div>
                        <p className="font-heading font-bold uppercase text-sm tracking-widest opacity-40 mb-2">
                          No Address Found
                        </p>
                        <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest max-w-[200px]">
                          Add your default shipping address to checkout faster
                        </p>
                        <button className="mt-8 text-accent font-black uppercase text-[10px] tracking-widest border-b-2 border-accent pb-1 hover:opacity-70 transition-opacity">
                          + Add New Address
                        </button>
                      </div>
                    </div>
                  )}

                  {activeTab === "security" && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                      <h2 className="text-2xl font-heading font-black uppercase tracking-tighter border-b border-base-content/5 pb-4">
                        Security <span className="text-accent ">Settings</span>
                      </h2>
                      <div className="space-y-4">
                        {[
                          {
                            title: "Two-Factor Authentication",
                            status: "Disabled",
                            color: "text-rose-500",
                          },
                          {
                            title: "Password Status",
                            status: "Strong",
                            color: "text-emerald-500",
                          },
                          {
                            title: "Last Login",
                            status: "2 hours ago from Dhaka",
                            color: "text-base-content/40",
                          },
                        ].map((item) => (
                          <div
                            key={item.title}
                            className="flex justify-between items-center p-6 bg-base-200/30 rounded-[2rem] border border-base-content/5"
                          >
                            <div>
                              <p className="text-[11px] font-black uppercase tracking-widest">
                                {item.title}
                              </p>
                              <p
                                className={`text-[10px] font-bold uppercase mt-1 ${item.color}`}
                              >
                                {item.status}
                              </p>
                            </div>
                            <button className="text-accent font-black uppercase text-[9px] tracking-widest">
                              Update
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Edit Profile Modal */}
          {isEditModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <div
                className="absolute inset-0 bg-base-content/60 backdrop-blur-md"
                onClick={() => setIsEditModalOpen(false)}
              />
              <div className="relative bg-base-100 w-full max-w-2xl rounded-[2.5rem] shadow-2xl p-10 overflow-y-auto max-h-[90vh] custom-scrollbar">
                <h2 className="text-3xl font-heading font-black uppercase tracking-tighter mb-8 ">
                  Edit <span className="text-accent">Profile</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileData.full_name}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          full_name: e.target.value,
                        })
                      }
                      className="w-full bg-base-200/50 border border-base-content/5 rounded-2xl p-4 font-bold text-sm focus:border-accent outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40">
                      Email
                    </label>

                    <input
                      type="email"
                      value={profileData.email}
                      disabled
                      className="w-full bg-base-200/50 border border-base-content/5 rounded-2xl p-4 font-bold text-sm opacity-50 cursor-not-allowed"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      value={profileData.phone_no}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          phone_no: Number(e.target.value),
                        })
                      }
                      className="w-full bg-base-200/50 border border-base-content/5 rounded-2xl p-4 font-bold text-sm focus:border-accent outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40">
                      Address
                    </label>
                    <textarea
                      value={profileData.address}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          address: e.target.value,
                        })
                      }
                      className="w-full bg-base-200/50 border border-base-content/5 rounded-2xl p-4 font-bold text-sm focus:border-accent outline-none transition-colors min-h-[100px]"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleUpdateProfile}
                    className="flex-grow bg-accent text-white py-4 rounded-2xl font-heading font-black uppercase text-[11px] tracking-widest hover:shadow-xl hover:shadow-accent/40 transition-all"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-8 bg-base-200 text-base-content py-4 rounded-2xl font-heading font-black uppercase text-[11px] tracking-widest hover:bg-rose-500 hover:text-white transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CustomerProfile;
