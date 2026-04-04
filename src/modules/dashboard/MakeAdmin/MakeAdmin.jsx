import React from "react";

const MakeAdmin = () => {
  return (
    <div className="p-4">
      {/* 1. HEADER */}
      <header className="mb-12">
        <h1 className="font-heading text-5xl font-black uppercase tracking-tighter">
          Admin <span className="text-accent text-outline">Control</span>
        </h1>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mt-2">
          Assign and Manage Administrative Access
        </p>
      </header>

      {/* 2. INPUT FORM SECTION */}
      <div className="bg-white border border-black/5 p-10 mb-16 shadow-sm">
        <h3 className="font-heading font-black uppercase tracking-widest text-xs mb-8 border-b border-black/5 pb-4">
          Add New Admin
        </h3>

        <form
          className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-end w-full"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Full Name */}
          <div className="space-y-2 w-full">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent"
            />
          </div>

          {/* Email Input */}
          <div className="space-y-2 w-full">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
              User Email Address
            </label>
            <input
              type="email"
              placeholder="user@vortexlabs.com"
              className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-3 text-sm font-bold transition-colors bg-transparent"
            />
          </div>

          {/* Role Dropdown */}
          <div className="space-y-2 w-full">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
              Access Level
            </label>
            <select className="w-full border-b-2 border-black/10 focus:border-accent outline-none py-3 text-sm font-bold bg-transparent uppercase tracking-wider cursor-pointer">
              <option>Super Admin</option>
              <option>Manager</option>
              <option>Editor</option>
              <option>Support</option>
            </select>
          </div>

          {/* Submit Button */}
          <button className="w-full bg-black text-white px-6 py-3 font-heading font-black uppercase tracking-[0.2em] text-xs hover:bg-accent transition-all shadow-lg shadow-black/5 cursor-pointer">
            Make Admin
          </button>
        </form>
      </div>

      {/* 3. ADMIN LIST VIEW */}
      <div className="bg-white border border-black/5 overflow-hidden">
        <div className="p-8 border-b border-black/5 flex justify-between items-center">
          <h2 className="font-heading text-xl font-black uppercase italic">
            Administrators <span className="text-accent">List</span>
          </h2>
          <span className="text-[10px] font-black opacity-30 uppercase tracking-widest">
            Total: 04 Members
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-base-200/50 font-heading text-[10px] uppercase tracking-widest font-black text-black/40">
                <th className="px-8 py-5">Admin Profile</th>
                <th className="px-8 py-5">Role</th>
                <th className="px-8 py-5">Date Added</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {[
                {
                  name: "Marcus Holloway",
                  email: "marcus@vortex.com",
                  role: "Super Admin",
                  date: "Oct 12, 2025",
                },
                {
                  name: "Sarah Chen",
                  email: "s.chen@vortex.com",
                  role: "Manager",
                  date: "Nov 02, 2025",
                },
                {
                  name: "Riley Vance",
                  email: "riley@vortex.com",
                  role: "Editor",
                  date: "Dec 15, 2025",
                },
              ].map((admin, index) => (
                <tr
                  key={index}
                  className="group hover:bg-base-200/30 transition-colors"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-heading font-black italic rounded-sm group-hover:bg-accent transition-colors">
                        {admin.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-heading font-bold text-sm uppercase tracking-tight">
                          {admin.name}
                        </p>
                        <p className="text-[10px] opacity-40 font-medium">
                          {admin.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="inline-block border border-black/10 px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full group-hover:border-accent group-hover:text-accent transition-colors">
                      {admin.role}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-[11px] font-bold opacity-40 uppercase">
                    {admin.date}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:underline underline-offset-4">
                      Revoke
                    </button>
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
