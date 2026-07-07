// // import Table from "../../components/common/Table";
// import { MdDeleteOutline, MdEdit } from "react-icons/md";
// import CommonTable from "../../../components/CommonTable";
// import {
//   useDeleteUser,
//   useUpdateUser,
//   useUserPurchaseDetails,
//   useUsers,
// } from "../../../hooks/useUsers";
// import { useState } from "react";
// import { BsEye } from "react-icons/bs";
// // import { useUsers } from "../../hooks/useUsers";

// export default function Users() {
//   const [selectedUser1, setSelectedUser1] = useState(null);
//   const { data, isLoading } = useUsers();
//   const [open, setOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const { mutate: deleteUserMutation } = useDeleteUser();
//   const { mutate: updateUserMutation } = useUpdateUser();
//   const { data: purchaseData, isLoading: purchaseLoading } =
//     useUserPurchaseDetails(selectedUser1);

//   console.log(purchaseData, "purchaseData");

//   const handleDelete = (id) => {
//     if (window.confirm("Deactivate User?")) {
//       deleteUserMutation(id);
//     }
//   };
//   const columns = [
//     {
//       name: "Name",
//       selector: (row) => row.name,
//     },
//     {
//       name: "Email",
//       selector: (row) => row.email,
//     },
//     {
//       name: "Role",
//       selector: (row) => row.role,
//     },
//     {
//       name: "Status",
//       selector: (row) => row.status,
//     },
//     {
//       name: "Action",
//       selector: (row) => row.action,
//       cell: (row) => (
//         <div className="flex items-center gap-3">
//           {/* <button
//             onClick={() => {
//               setSelectedUser(row);
//               setOpen(true);
//             }}
//           >
//             <MdEdit size={20} className="text-primary-600" />
//           </button> */}

//           <button
//             onClick={() => {
//               // console.log(row._id);

//               // setSelectedUser1(row._id);
//               setOpen(true);
//             }}
//           >
//             <BsEye size={20} className="text-primary-600" />
//           </button>

//           <button onClick={() => handleDelete(row._id)}>
//             <MdDeleteOutline size={23} className="text-red-600" />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <>
//       <CommonTable columns={columns} data={data?.data || []} />

//       {open && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99999999]">
//            <div className="bg-white p-5 rounded-lg w-">
//             asdfasd 
//            </div>
//         </div>
//       )}
//     </>
//   );
// }


// import Table from "../../components/common/Table";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import CommonTable from "../../../components/CommonTable";
import {
  useDeleteUser,
  useUpdateUser,
  useUserPurchaseDetails,
  useUsers,
} from "../../../hooks/useUsers";
import { useState } from "react";
import { BsEye } from "react-icons/bs";
// import { useUsers } from "../../hooks/useUsers";

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

function StatBlock({ label, value }) {
  return (
    <div className="relative flex-1 overflow-hidden rounded-lg border border-zinc-200 bg-white px-4 py-3">
      <div className="absolute left-0 top-0 h-full w-[3px] bg-[#57a846]" />
      <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </p>
      <p className="mt-1 font-mono text-xl leading-none text-zinc-900">
        {value}
      </p>
    </div>
  );
}

export default function Users() {
  const [selectedUser1, setSelectedUser1] = useState(null);
  const { data, isLoading } = useUsers();
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { mutate: deleteUserMutation } = useDeleteUser();
  const { mutate: updateUserMutation } = useUpdateUser();
  const { data: purchaseData, isLoading: purchaseLoading } =
    useUserPurchaseDetails(selectedUser1);

  const handleDelete = (id) => {
    if (window.confirm("Deactivate User?")) {
      deleteUserMutation(id);
    }
  };

  const handleViewPurchases = (row) => {
    setSelectedUser1(row._id);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedUser1(null);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Role",
      selector: (row) => row.role,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Action",
      selector: (row) => row.action,
      cell: (row) => (
        <div className="flex items-center gap-3">
          {/* <button
            onClick={() => {
              setSelectedUser(row);
              setOpen(true);
            }}
          >
            <MdEdit size={20} className="text-primary-600" />
          </button> */}

          <button onClick={() => handleViewPurchases(row)}>
            <BsEye size={17} className="text-primary-600" />
          </button>

          <button onClick={() => handleDelete(row._id)}>
            <MdDeleteOutline size={20} className="text-red-600" />
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const details = purchaseData?.data;

  return (
    <>
      <CommonTable columns={columns} data={data?.data || []} />

      {open && (
        <div
          className="fixed inset-0 z-[99999999] flex items-center justify-center bg-black/50 px-4"
          onClick={closeModal}
        >
          <div
            className="max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-zinc-200 px-6 py-5">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-widest text-[#57a846]">
                  Purchase History
                </p>
                {details?.user && (
                  <>
                    <h2 className="mt-1 text-lg font-bold text-zinc-900">
                      {details.user.name}
                    </h2>
                    <p className="text-sm text-zinc-500">
                      {details.user.email}
                    </p>
                  </>
                )}
              </div>
              <button
                onClick={closeModal}
                className="rounded-full p-1.5 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="max-h-[calc(85vh-88px)] overflow-y-auto px-6 py-5">
              {purchaseLoading ? (
                <p className="py-10 text-center text-sm text-zinc-400">
                  Loading purchase details...
                </p>
              ) : !details ? (
                <p className="py-10 text-center text-sm text-zinc-400">
                  No purchase data found.
                </p>
              ) : (
                <>
                  {/* Summary strip */}
                  <div className="mb-6 flex gap-3">
                    <StatBlock
                      label="Total Orders"
                      value={details.summary?.totalOrders ?? 0}
                    />
                    <StatBlock
                      label="Total Courses"
                      value={details.summary?.totalCourses ?? 0}
                    />
                    <StatBlock
                      label="Total Spent"
                      value={`Rs. ${details.summary?.totalSpent ?? 0}`}
                    />
                  </div>

                  {/* Purchases list */}
                  <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-900">
                    Courses Purchased
                  </p>

                  <div className="space-y-3">
                    {(details.purchases || []).length === 0 ? (
                      <p className="py-8 text-center text-sm text-zinc-400">
                        No purchases yet.
                      </p>
                    ) : (
                      details.purchases.map((item) => (
                        <div
                          key={item.orderId}
                          className="flex items-center gap-4 rounded-lg border border-zinc-200 p-3"
                        >
                          <img
                            src={`${API_BASE}${item.thumbnail}`}
                            alt={item.courseTitle}
                            className="h-14 w-20 flex-shrink-0 rounded-md bg-zinc-100 object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-zinc-900">
                              {item.courseTitle}
                            </p>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                              <span className="font-mono">
                                {item.orderId}
                              </span>
                              <span>
                                {new Date(
                                  item.purchaseDate
                                ).toLocaleDateString("en-IN", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-shrink-0 flex-col items-end gap-1.5">
                            <span className="font-mono text-sm font-semibold text-zinc-900">
                              Rs. {item.amount}
                            </span>
                            <StatusPill status={item.status} />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}