import react from "react";
import CommonTable from "../../components/CommonTable";
import { useAllEnrollments } from "../../hooks/useEnrollments";

export default function UserEnrollments() {


    const {
        data,
        isLoading,
      } = useAllEnrollments();

    const columns = [
  {
    name: "User Name",
    selector: (row) =>
      row.user?.name,
    sortable: true,
  },

  {
    name: "Email",
    selector: (row) =>
      row.user?.email,
  },

  {
    name: "Course",
    selector: (row) =>
      row.course?.title,
    sortable: true,
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
    name: "Purchase Date",
    selector: (row) =>
      new Date(
        row.createdAt
      ).toLocaleDateString(),
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
        <>
        <CommonTable
               columns={columns}
               data={data?.data || []}
               loading={isLoading}
             />
        </>
    )
}