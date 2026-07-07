import React from "react";
import { useEnrollments } from "../hooks/useEnrollments";
import CommonTable from "../components/CommonTable";

export default function Enrollments() {
  const {
    data,
    isLoading,
  } = useEnrollments();

  const columns = [
   
    {
      name: "Course",
      selector: (row) =>
        row.course?.title,
    },
    {
      name: "Amount",
      selector: (row) =>
        `₹${row.amount}`,
      sortable: true,
    },
    {
      name: "Payment ID",
      selector: (row) =>
        row.paymentId,
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            row.status === "paid"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-5">
        Purchased Courses
      </h2>

      <CommonTable
        columns={columns}
        data={data?.data || []}
        loading={isLoading}
      />
    </div>
  );
}