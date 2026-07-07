// import React, { useEffect, useState } from "react";

// import { getMyCourses } from "../api/enrollmentApi";
// import { useUserDashboard } from "../hooks/useUsers";

// export default function Userdashboard() {
//   const [loading, setLoading] = useState(true);

//   const [hasCourse, setHasCourse] = useState(false);

//   useEffect(() => { checkCourse(); }, []);
//   const {data,isLoading,} = useUserDashboard();
//   const dashboard = data?.data;

// console.log(dashboard, "user dashboard data");



//   const checkCourse = async () => {
//     try {
//       const res = await getMyCourses();

//       console.log(res);

//       if (res.data && res.data.length > 0) {
//         setHasCourse(true);
//       }

//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>

//       {!hasCourse ? (
//         <div className="bg-yellow-50 border border-yellow-300 p-6 rounded-lg">
//           <h2 className="text-xl font-semibold mb-3">No Course Purchased</h2>

//           <p className="mb-4">
//             Please purchase a course to access learning content.
//           </p>

//           <a
//             href="http://localhost:3000/courses"
//             target="_blank"
//             className="bg-green-600 text-white px-5 py-3 rounded"
//           >
//             Purchase Course
//           </a>
//         </div>
//       ) : (
//         <div>
//           <h2 className="text-xl font-semibold">Welcome Back 👋</h2>

//           <p className="mt-2">Course Purchased ✅</p>

         
//         </div>
//       )}
//     </div>
//   );
// }

import React from "react";
import { useUserDashboard } from "../hooks/useUsers";

// ============================================================
// STOKZY — User Dashboard
// Stats styled like a market ticker (monospace figures, thin
// green rule) since this is a trading-education platform.
// ============================================================

// const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://stokzy-backend.onrender.com";

const statusStyles = {
  paid: "bg-[#57a846]/10 text-[#3d7a31] border-[#57a846]/30",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  failed: "bg-red-50 text-red-700 border-red-200",
};

function StatusPill({ status }) {
  const cls = statusStyles[status] || statusStyles.pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide ${cls}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function TickerCard({ label, value, hint }) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-zinc-200 bg-white px-5 py-4">
      <div className="absolute left-0 top-0 h-full w-[3px] bg-[#57a846]" />
      <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </p>
      <p className="mt-1.5 font-mono text-[28px] leading-none text-zinc-900">
        {String(value ?? 0).padStart(2, "0")}
      </p>
      {hint && <p className="mt-1.5 text-xs text-zinc-400">{hint}</p>}
    </div>
  );
}

function CourseRow({ item }) {
  const { course, amount, status, createdAt } = item;
  return (
    <div className="flex items-center gap-4 border-b border-zinc-100 py-4 last:border-0">
      <img
        src={`${API_BASE}${course.thumbnail}`}
        alt={course.title}
        className="h-14 w-20 flex-shrink-0 rounded-md bg-zinc-100 object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-zinc-900">
          {course.title}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
          {course.level && (
            <span className="rounded border border-zinc-200 px-1.5 py-0.5">
              {course.level}
            </span>
          )}
          {course.duration && <span>{course.duration}</span>}
          <span>
            {new Date(createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
      <div className="flex flex-shrink-0 flex-col items-end gap-1.5">
        <span className="font-mono text-sm font-semibold text-zinc-900">
          Rs. {amount}
        </span>
        <StatusPill status={status} />
      </div>
    </div>
  );
}

export default function Userdashboard() {
  const { data, isLoading, isError, error } = useUserDashboard();
  const dashboard = data?.data;

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-zinc-500">
        Loading dashboard...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto mt-10 max-w-md rounded-lg border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700">
        {error?.response?.data?.message || "Failed to load dashboard"}
      </div>
    );
  }

  const { user, cards, myCourses = [], recentOrders = [] } = dashboard || {};
  const hasCourse = (cards?.purchasedCourses || 0) > 0;

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between border-b border-zinc-200 pb-6">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-widest text-[#57a846]">
              Dashboard
            </p>
            <h1 className="mt-1 text-2xl font-bold text-zinc-900">
              Welcome back, {user?.name}
            </h1>
            <p className="mt-0.5 text-sm text-zinc-500">{user?.email}</p>
          </div>
          <div className="hidden h-10 w-10 items-center justify-center rounded-full bg-zinc-900 font-mono text-sm font-semibold text-white sm:flex">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        </div>

        {!hasCourse ? (
          // ================= NO COURSE STATE =================
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-8 text-center">
            <h2 className="text-lg font-semibold text-zinc-900">
              No Course Purchased
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Please purchase a course to access learning content.
            </p>
            <a
              href="http://localhost:3000/courses"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block rounded-md bg-[#57a846] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4a9139]"
            >
              Purchase Course
            </a>
          </div>
        ) : (
          <>
            {/* Ticker stats */}
            <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <TickerCard
                label="Purchased Courses"
                value={cards.purchasedCourses}
                hint="Total enrolled"
              />
              <TickerCard
                label="Completed"
                value={cards.completedCourses}
                hint="Finished so far"
              />
              <TickerCard
                label="Pending"
                value={cards.pendingCourses}
                hint="In progress"
              />
            </div>

            {/* My Courses */}
            <div className="mb-10">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-900">
                  My Courses
                </h2>
                <span className="text-xs text-zinc-400">
                  {myCourses.length} total
                </span>
              </div>
              <div className="rounded-lg border border-zinc-200 bg-white px-5">
                {myCourses.length === 0 ? (
                  <p className="py-8 text-center text-sm text-zinc-400">
                    No courses purchased yet.
                  </p>
                ) : (
                  myCourses.map((item) => (
                    <CourseRow key={item._id} item={item} />
                  ))
                )}
              </div>
            </div>

            {/* Recent Orders */}
            <div>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-900">
                Recent Orders
              </h2>
              <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-zinc-200 bg-zinc-50 text-[11px] uppercase tracking-wide text-zinc-500">
                      <th className="px-4 py-3 font-medium">Order ID</th>
                      <th className="px-4 py-3 font-medium">Course</th>
                      <th className="px-4 py-3 font-medium">Amount</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr
                        key={order._id}
                        className="border-b border-zinc-100 last:border-0"
                      >
                        <td className="px-4 py-3 font-mono text-xs text-zinc-500">
                          {order.razorpayOrderId}
                        </td>
                        <td className="max-w-[220px] truncate px-4 py-3 text-zinc-900">
                          {order.course.title}
                        </td>
                        <td className="px-4 py-3 font-mono font-semibold text-zinc-900">
                          Rs. {order.amount}
                        </td>
                        <td className="px-4 py-3">
                          <StatusPill status={order.status} />
                        </td>
                        <td className="px-4 py-3 text-zinc-500">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-IN",
                            { day: "2-digit", month: "short", year: "numeric" }
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}