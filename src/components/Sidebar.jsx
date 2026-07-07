import { Link } from "react-router-dom";
import { IoBookOutline, IoClose, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { FaBookOpen, FaRegFolderOpen } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { RiBloggerLine } from "react-icons/ri";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const role = localStorage.getItem("role");

  const adminSidebar = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <MdOutlineDashboard />,
    },
    {
      name: "Blogs",
      path: "/blogs",
      icon: <RiBloggerLine size={20} />,
    },
    {
      name: "Courses",
      path: "/courses",
      icon: <IoBookOutline />,
    },
    {
      name: "Modules",
      path: "/modules",
      icon: <IoBookOutline />,
    },
    {
      name: "Lessons",
      path: "/lessons",
      icon: <IoBookOutline />,
    },
    {
      name: "Users",
      path: "/users",
      icon: <FiUsers />,
    },
    {
      name: "Course Category",
      path: "/coursecategory",
      icon: <IoBookOutline />,
    },
    {
      name: "User Enrollments",
      path: "/uer-enrollments",
      icon: <IoBookOutline />,
    },
  ];

  const userSidebar = [
    {
      name: "Dashboard",
      path: "/user-dashboard",
      icon: <MdOutlineDashboard />,
    },
    {
      name: "My Courses",
      path: "/my-courses",
      icon: <AiOutlineProduct />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <IoSettingsOutline />,
    },
    {
      name: "Orders",
      path: "/my-orders",
      icon: <IoSettingsOutline />,
    },
    {
      name: "Enrollments",
      path: "/enrollments",
      icon: <IoSettingsOutline />,
    },
  ];

  const sidebarItems = role === "admin" ? adminSidebar : userSidebar;

  return (
    <>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      <div
        className={`
          
          top-0 left-0
          z-50
          h-screen
          w-48
          bg-white
          text-black
          transform
          transition-transform
          duration-300
          ease-in-out
          border-r border
          sidebarfixed
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="flex items-center justify-between mb-2 p-2">
          <img
            src="/stokzy_logo.png"
            alt="logo"
            className="w-28 mx-auto mb-1"
          />

          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <IoClose size={28} />
          </button>
        </div>

        <div className="py-2">
          <ul>
            {sidebarItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className="text-sm border-b border-gray-200 flex items-center p-2 hover:bg-gray-100"
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
