import React from "react";
import CommonTable from "../../../components/CommonTable";

import {
  useLessons,
  useDeleteLesson,
  useAllLessons,
} from "../../../hooks/useLessons";
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";

export default function Lessons() {
  const navigate = useNavigate();
  const { data, isLoading } = useAllLessons();

  console.log(data, "lession count");

  const { mutateAsync: deleteLessonMutation } = useDeleteLesson();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete Lesson?");

    if (!confirmDelete) return;

    try {
      await deleteLessonMutation(id);

      alert("Lesson Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "Module",
      selector: (row) => row.module?.title,
    },
    {
      name: "Title",

      selector: (row) => row.title,
    },

    {
      name: "Description",

      selector: (row) => row.description,
      width: "400px",
    },

    {
      name: "Duration",

      selector: (row) => row.duration,
    },

    {
      name: "Preview",

      cell: (row) => <span>{row.isPreview ? "Yes" : "No"}</span>,
    },

    {
      name: "Status",

      cell: (row) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
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
          <button
            onClick={() => navigate(`/lessons/edit/${row._id}`)}
            // className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            <MdModeEditOutline className="text-black-600 text-[20px]" />
          </button>

          <button
            onClick={() => handleDelete(row._id)}
            // className="bg-red-500 text-white px-3 py-1 rounded"
          >
            <MdDeleteOutline className="text-red-600 text-[25px]" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl">
      <div className="flex justify-between mb-5">
        <h2 className="text-xl font-bold">Lessons</h2>

        <button
          onClick={() => navigate("/lessons/add")}
          className="bg-primary text-[13px] text-white px-4 py-1 rounded"
        >
          Add Lesson
        </button>
      </div>

      <CommonTable
        columns={columns}
        data={data?.data || []}
        loading={isLoading}
      />
    </div>
  );
}
