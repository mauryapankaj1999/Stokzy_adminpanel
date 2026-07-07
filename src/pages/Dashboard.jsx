import { useDashboard } from "../hooks/useDashboard";
export default function Dashboard() {
  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ background: "#f0faf0" }}
      >
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-10 h-10 rounded-full border-4 animate-spin"
            style={{ borderColor: "#57a846", borderTopColor: "transparent" }}
          />
          <p className="text-sm font-medium" style={{ color: "#57a846" }}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  const stats = data?.data;
  const revenue = stats?.totalRevenue ?? 0;

  const summaryItems = [
    {
      label: "Total  Blogs ",
      value: stats?.totalBlogs ?? 0,
      icon: "📚",
      color: "#ec4899",
      bg: "#fdf2f8",
      border: "#fbcfe8",
      desc: "Total our website showing blog",
    },
    {
      label: "Users Registered",
      value: stats?.totalUsers ?? 0,
      icon: "👥",
      color: "#57a846",
      bg: "#e6f5e3",
      border: "#c6e8c1",
      desc: "Total registered users",
    },
    {
      label: "Courses Available",
      value: stats?.totalCourses ?? 0,
      icon: "🎓",
      color: "#3b82f6",
      bg: "#eff6ff",
      border: "#bfdbfe",
      desc: "Published courses",
    },
    {
      label: "Modules Created",
      value: stats?.totalModules ?? 0,
      icon: "📦",
      color: "#8b5cf6",
      bg: "#f5f3ff",
      border: "#ddd6fe",
      desc: "Across all courses",
    },
    {
      label: "Lessons Published",
      value: stats?.totalLessons ?? 0,
      icon: "📚",
      color: "#f59e0b",
      bg: "#fffbeb",
      border: "#fde68a",
      desc: "Total lessons available",
    },
    {
      label: "Active Enrollments",
      value: stats?.totalEnrollments ?? 0,
      icon: "🎟️",
      color: "#ec4899",
      bg: "#fdf2f8",
      border: "#fbcfe8",
      desc: "Students enrolled",
    },
    {
      label: "Total Revenue",
      value: `₹${revenue.toLocaleString("en-IN")}`,
      icon: "💰",
      color: "#57a846",
      bg: "#e6f5e3",
      border: "#c6e8c1",
      desc: "Lifetime earnings",
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#f0faf0" }}>
      <div className="">

        {/* ─── Page Header ─── */}
        {/* <div className="mb-8">
          <h1 className="text-2xl font-bold" style={{ color: "#1e4d18" }}>
            Dashboard
          </h1>
          <p className="text-sm mt-1" style={{ color: "#6b8f66" }}>
            Welcome back! Here's your platform overview.
          </p>
        </div> */}
       


        {/* ─── Platform Summary Cards ─── */}
        <div
          className="rounded-2xl shadow-sm overflow-hidden"
          style={{ border: "1.5px solid #c6e8c1", background: "#fff" }}
        >
          {/* Header */}
          <div
            className="px-6 py-4"
            style={{ borderBottom: "1.5px solid #c6e8c1" }}
          >
            <h3 className="font-semibold text-base" style={{ color: "#1e4d18" }}>
              Platform Summary
            </h3>
            <p className="text-xs mt-0.5" style={{ color: "#6b8f66" }}>
              Complete overview of your platform
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
            {summaryItems.map((item) => (
              <div
                key={item.label}
                className="rounded-xl p-4 flex flex-col gap-3"
                style={{
                  background: item.bg,
                  border: `1.5px solid ${item.border}`,
                }}
              >
                {/* Icon + Live Badge */}
                <div className="flex items-center justify-between">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: "#fff" }}
                  >
                    {item.icon}
                  </div>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: "#fff", color: item.color }}
                  >
                    Live
                  </span>
                </div>

                {/* Value + Label + Desc */}
                <div>
                  <p
                    className="text-2xl font-bold"
                    style={{ color: item.color }}
                  >
                    {item.value}
                  </p>
                  <p
                    className="text-xs font-semibold mt-0.5"
                    style={{ color: item.color }}
                  >
                    {item.label}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#888" }}>
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Bar */}
                <div
                  className="h-1 rounded-full w-full"
                  style={{ background: `${item.color}30` }}
                >
                  <div
                    className="h-1 rounded-full"
                    style={{ background: item.color, width: "60%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>










 {/* <div
          className="rounded-2xl p-6 mb-6 shadow-sm flex items-center justify-between flex-wrap gap-4"
          style={{
            background: "linear-gradient(135deg, #57a846 0%, #3d8a32 100%)",
          }}
        >
          <div>
            <p className="text-sm font-medium" style={{ color: "#d4f0cf" }}>
              Total Revenue
            </p>
            <p className="text-4xl font-bold text-white mt-1">
              ₹{revenue.toLocaleString("en-IN")}
            </p>
            <p className="text-xs mt-2" style={{ color: "#b8e8b0" }}>
              Lifetime earnings from all enrollments
            </p>
          </div>
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            💰
          </div>
        </div> */}

      </div>
    </div>
  );
}