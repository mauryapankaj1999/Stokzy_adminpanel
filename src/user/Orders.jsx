// import react from "react";

import CommonTable from "../components/CommonTable";
import { useDownloadInvoice, useMyOrders } from "../hooks/useOrders";

export default function MyOrders() {
  const { data, isLoading } = useMyOrders();
  const { mutateAsync: downloadInvoiceMutation } = useDownloadInvoice();

  const handleDownload =
  async (id) => {
    try {
      const blob =
        await downloadInvoiceMutation(
          id
        );

      const url =
        window.URL.createObjectURL(
          blob
        );

      const a =
        document.createElement(
          "a"
        );

      a.href = url;

      a.download =
        "Invoice.pdf";

      a.click();

      window.URL.revokeObjectURL(
        url
      );
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      name: "Course",
      selector: (row) => row.course?.title,
    },
    {
      name: "Amount",
      selector: (row) => `₹${row.amount}`,
    },
    {
      name: "Payment ID",
      selector: (row) => row.paymentId,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded text-[10px] font-medium ${
            row.status === "paid"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Date",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      name: "Action",
      cell: (row) => (
        <button 
        
         onClick={() =>
        handleDownload(row._id)
      }
        className="text-white bg-green-700 px-3 p-1 text-[12px] rounded-md btn-sm">
          Download Invoice
        </button>
      ),
    },
  ];

  return (
    <CommonTable
      columns={columns}
      data={data?.data || []}
      loading={isLoading}
    />
  );
}
