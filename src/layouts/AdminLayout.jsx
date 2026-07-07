import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useState } from "react";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 min-h-screen bg-gray-100 mainwapper">
        <Header setSidebarOpen={setSidebarOpen} />

        <div className="p-6" style={{ background: "#f0faf0" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
