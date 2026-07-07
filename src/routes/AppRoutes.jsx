import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import BlogList from "../pages/blogs/Blogs";
// import BlogAdd from "../pages/blogs/BlogAdd";

import ProtectedRoute from "../pages/ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import AddBlog from "../pages/blogs/AddBlog";
import AddCourses from "../pages/course/Add";
import Courses from "../pages/course/Courses";
import { Navigate } from "react-router-dom";
import Userdashboard from "../user/Userdashboard";
import Mycourses from "../user/Mycourses";
import Orders from "../user/Orders";
import Profile from "../user/Profile";
import Users from "../pages/admin/Users/Users";
import Coursecategory from "../pages/admin/Coursecategory/Coursecategory";
import Enrollments from "../user/Enrollments";
import UserEnrollments from "../pages/admin/UserEnrollments";
import CourseDetails from "../user/CourseDetails";
import Lessons from "../pages/admin/Lessons/Lessons";
import Modules from "../pages/admin/Modules/Modules";
import AddModal from "../pages/admin/Modules/Add";
import AddLesson from "../pages/admin/Lessons/Add";
import Contact from "../pages/admin/Contact/Contact";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/add" element={<AddBlog />} />
        <Route path="/blogs/edit/:id" element={<AddBlog />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/add" element={<AddCourses />} />
        <Route path="/courses/edit/:id" element={<AddCourses />} />
        <Route path="/user-dashboard" element={<Userdashboard />} />
        <Route path="/my-courses" element={<Mycourses />} />
        <Route path="/my-orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<Users />} />
        <Route path="/coursecategory" element={<Coursecategory />} />
        <Route path="/enrollments" element={<Enrollments />} />
        <Route path="/uer-enrollments" element={<UserEnrollments />} />
        <Route path="/course/:id"   element={<CourseDetails />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/modules" element={<Modules />} />
        <Route path="/modules/add" element={<AddModal />} />
        <Route path="/modules/edit/:id" element={<AddModal />} />
        <Route path="/lessons/add" element={<AddLesson />} />
        <Route path="/lessons/edit/:id"  element={<AddLesson />}/>
        <Route path="/contact"  element={<Contact />}/>
        


        

      </Route>
    </Routes>
  );
};

export default AppRoutes;
