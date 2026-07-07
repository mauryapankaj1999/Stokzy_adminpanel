import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useChangePassword, useProfile } from "../hooks/useUsers";

const Header = ({ setSidebarOpen }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openmodal, setOpenmodal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { mutateAsync: changePasswordMutation, isPending } =
    useChangePassword();
  const role = localStorage.getItem("role");

  const { data, isLoading } = useProfile();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const user = data?.data;
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    navigate("/login", {
      replace: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await changePasswordMutation({
        currentPassword,
        newPassword,
      });

      alert(res.message);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setOpenmodal(false);
    } catch (error) {
      alert(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="py-4 bg-white shadow px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <HiOutlineMenuAlt2 size={28} />
          </button>

          <h1 className="lg">{role === "admin" ? "Admin" : "User"}</h1>
        </div>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2"
          >
            <FaUserCircle size={28} className="text-gray-700" />
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-48 rounded-xl bg-white shadow-lg border border-gray-100 py-2 z-50">
              <div className="px-4 py-1 border-b">
                <p className="font-medium text-[14px]">hello {user?.name}</p>
                {/* <p className="text-[12px] text-gray-500">admin@gmail.com</p> */}
              </div>

              <div
                className="px-4 py-2 border-b cursor-pointer hover:bg-gray-50 transition"
                onClick={() => setOpenmodal(true)}
              >
                <p className="text-[14px] font-medium  text-gray-500">
                  Change Password
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full text-left border-b px-4 py-1 text-red-500 hover:bg-red-50 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {openmodal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-[55]"></div>
          <div className="fixed inset-0 flex items-center justify-center z-[60]">
            <div className="mx-auto w-[35%] bg-white rounded-lg p-4  relative">
              <div className="">
                <form action="" onSubmit={handleSubmit}>
                  <h3 className="text-[25px] font-bold mb-4 text-black">
                    Change Password
                  </h3>
                  {/* <hr /> */}
                  <div className="mb-2 ">
                    <label htmlFor="" className="text-[15px] mb-2 text-black ">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="text-[15px] w-full border border-gray-300 px-3 py-2 rounded-md"
                      placeholder="Current Password"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="" className="text-[15px] mb-2 text-black">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="text-[15px] w-full border border-gray-300 px-3 py-2 rounded-md"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="text-[15px] mb-2 text-black">
                    <label htmlFor="">Confirm Password</label>
                    <input
                      type="password"
                      className="text-[15px] w-full border border-gray-300 px-3 py-2 rounded-md"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  <div className="text-end mt-4">
                    <div className="flex gap-3 justify-end">
                      <button
                        type="submit"
                        disabled={isPending}
                        className="btn bg-[#57a846] px-4 py-[7px] text-white rounded-md text-[15px]"
                      >
                        {isPending ? "Updating..." : "Submit"}
                      </button>

                      <button
                        type="button"
                        onClick={() => setOpenmodal(false)}
                        className="btn border border-[#57a846] px-4 py-[7px] text-[#57a846] rounded-md text-[15px]"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
