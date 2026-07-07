import React, { useState } from "react";

import CommonTable from "../../../components/CommonTable";

import { useModules, useDeleteModule } from "../../../hooks/useModules";

import { useCourses } from "../../../hooks/useCourses";
import { Link, useNavigate } from "react-router-dom";
import { MdDeleteOutline, MdEdit } from "react-icons/md";

export default function Modules() {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState("");

  const { data: courses } = useCourses();

  const { data, isLoading } = useModules(selectedCourse);

  const { mutateAsync: deleteModuleMutation } = useDeleteModule();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete Module?");

    if (!confirmDelete) return;

    try {
      await deleteModuleMutation(id);

      alert("Module Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "Module Name",

      selector: (row) => row.title,

      sortable: true,
    },

    {
      name: "Order",

      selector: (row) => row.order,

      sortable: true,
    },

    {
      name: "Status",

      cell: (row) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            row.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.status}
        </span>
      ),
    },

    {
      name: "Actions",

      cell: (row) => (
        <div className="flex gap-2">
          <button onClick={() => navigate(`/modules/edit/${row._id}`)}>
             <MdEdit className="text-black-600 text-[20px]" />
          </button>

          <button  onClick={() => handleDelete(row._id)}>
            <MdDeleteOutline size={20} className="text-red-600" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">Modules</h2>

        <button
          onClick={() => navigate("/modules/add")}
          className="bg-primary text-[13px] text-white px-4 py-1 rounded"
        >
          Add Module
        </button>
      </div>

      <div className="mb-5">
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="rounded-md border px-3  text-[14px] py-2 outline-none transition-all w-80"
        >
          <option value="">Select Course</option>

          {courses?.data?.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      <CommonTable
        columns={columns}
        data={data?.data || []}
        loading={isLoading}
      />
    </div>
  );
}
