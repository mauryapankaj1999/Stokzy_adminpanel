import React, { useState, useEffect } from "react";
import { useProfile, useUpdateProfile } from "../hooks/useUsers";

export default function Profile() {
  const { data, isLoading } = useProfile();
  const { mutateAsync: updateProfileMutation } = useUpdateProfile();

  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({ name: "", mobile: "" });

  useEffect(() => {
    if (data?.data) {
      setFormData({
        name: data.data.name || "",
        mobile: data.data.mobile || "",
      });
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfileMutation(formData);
      alert("Profile Updated Successfully");
      setIsEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: "#f0faf0" }}>
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-10 h-10 rounded-full border-4 animate-spin"
            style={{ borderColor: "#57a846", borderTopColor: "transparent" }}
          />
          <p className="text-sm font-medium" style={{ color: "#57a846" }}>Loading...</p>
        </div>
      </div>
    );
  }

  const user = data?.data;

  // ─── VIEW MODE ───────────────────────────────────────
  if (!isEdit) {
    return (
      <div className="min-h-screen" style={{ background: "#f0faf0" }}>
        <div className="max-w-2xl ">
          <div  className="rounded-2xl p-6 shadow-sm mb-4"
          style={{ background: "#fff", border: "1.5px solid #c6e8c1" }}>

        

          {/* Avatar + Name Card */}
          <div
            className="rounded-2xl p-4 mb-5 shadow-sm "
            // style={{ background: "linear-gradient(135deg, #57a846 0%, #3d8a32 100%)" }}
          >
            <div className="flex  items-center gap-4">
              <img
                src={`https://ui-avatars.com/api/?name=${user?.name}&size=128&background=ffffff&color=57a846&bold=true`}
                alt="avatar"
                className="w-20 h-20 rounded-full shadow-lg bg-[#57a846]"
                // style={{ border: "4px solid rgba(255,255,255,0.5)" }}
              />
              <div>
                <h2 className="text-2xl font-bold text-[#57a846]">{user?.name}</h2>
                <p className="text-sm mt-1 text-[#57a846]">Email Id  :  {user?.email}</p>
                <span
                  className="inline-block text-black  text-xs font-semibold  py-1 rounded-full capitalize"
                 
                >
                Role :    {user?.role}
                </span>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            {[
              {
                label: "Mobile",
                value: user?.mobile || "Not provided",
              },
              {
                label: "Joined On",
                value: new Date(user?.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }),
              },
              {
                label: "Account Role",
                value: user?.role,
                capitalize: true,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl p-5 shadow-sm"
                style={{ background: "#fff", border: "1.5px solid #c6e8c1" }}
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="text-xs font-medium mb-1" style={{ color: "#6b8f66" }}>
                  {item.label}
                </p>
                <p
                  className={`font-semibold text-sm ${item.capitalize ? "capitalize" : ""}`}
                  style={{ color: "#1e4d18" }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Edit Button */}
          <button
            onClick={() => setIsEdit(true)}
            className="py-2 px-5 rounded-md font-semibold text-white shadow-sm transition"
            style={{ background: "#57a846" }}
           
          >
           Edit Profile
          </button>




  </div>



        </div>
      </div>
    );
  }

  // ─── EDIT MODE ───────────────────────────────────────
  return (
    <div className="min-h-screen" style={{ background: "#f0faf0" }}>
      <div className="max-w-2xl">
        <div
          className="rounded-2xl p-6 shadow-sm mb-4"
          style={{ background: "#fff", border: "1.5px solid #c6e8c1" }}
        >
              <h2 className="text-xl mb-5 font-bold text-[#57a846]">Edit Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: "#2d6b24" }}>
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                className="w-full p-3 rounded-xl text-sm outline-none transition"
                style={{
                  border: "1.5px solid #c6e8c1",
                  background: "#f9fef8",
                  color: "#1e4d18",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#57a846")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#c6e8c1")}
              />
            </div>

            {/* Email Field (readonly) */}
            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: "#2d6b24" }}>
                Email Id
              </label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full p-3 rounded-xl text-sm"
                style={{
                  border: "1.5px solid #e0e0e0",
                  background: "#f5f5f5",
                  color: "#999",
                  cursor: "not-allowed",
                }}
              />
              <p className="text-xs mt-1" style={{ color: "#aaa" }}>Email cannot be changed</p>
            </div>

            {/* Mobile Field */}
            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: "#2d6b24" }}>
                Mobile Number
              </label>
              <input
                type="text"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                placeholder="Enter your mobile number"
                className="w-full p-3 rounded-xl text-sm outline-none transition"
                style={{
                  border: "1.5px solid #c6e8c1",
                  background: "#f9fef8",
                  color: "#1e4d18",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#57a846")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#c6e8c1")}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl font-semibold text-white text-sm transition"
                style={{ background: "#57a846" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#3d8a32")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#57a846")}
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEdit(false)}
                className="flex-1 py-3 rounded-xl font-semibold text-sm transition"
                style={{ background: "#f0faf0", color: "#57a846", border: "1.5px solid #c6e8c1" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#e0f5dc")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#f0faf0")}
              >
                ✕ Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}