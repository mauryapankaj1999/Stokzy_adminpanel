import DataTable from "react-data-table-component";

const customStyles = {
  headCells: {
    style: {
      fontWeight: "600",
      fontSize: "14px",
      backgroundColor: "#f8fafc",
      minHeight: "40px",
    },
  },
  rows: {
    style: {
      minHeight: "35px",
    },
  },
};

const CommonTable = ({ columns, data, loading = false }) => {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <DataTable
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
        highlightOnHover
        responsive
        customStyles={customStyles}
      />
    </div>
  );
};

export default CommonTable;
