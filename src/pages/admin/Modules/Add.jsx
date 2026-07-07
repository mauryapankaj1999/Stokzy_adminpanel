import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useCourses } from "../../../hooks/useCourses";

import { useCreateModule, useUpdateModule } from "../../../hooks/useModules";

import { getSingleModule } from "../../../api/moduleApi";
import { showSuccess } from "../../../utils/toast";

export default function AddModule() {
  const navigate = useNavigate();

  const { id } = useParams();

  const isEdit = !!id;

  const [formData, setFormData] = useState({
    course: "",
    title: "",
    order: 1,
    status: "active",
  });

  const { data: courses } = useCourses();

  const { mutateAsync: createModuleMutation } = useCreateModule();

  const { mutateAsync: updateModuleMutation } = useUpdateModule();

  useEffect(() => {
    const fetchModule = async () => {
      try {
        if (!id) return;

        const res = await getSingleModule(id);

        setFormData({
          course: res.data.course,
          title: res.data.title,
          order: res.data.order,
          status: res.data.status,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchModule();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await updateModuleMutation({
          id,
          data: formData,
        });

        showSuccess("Module Updated Successfully");
      } else {
        await createModuleMutation(formData);

        showSuccess("Module Created Successfully");
      }

      navigate("/modules");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-5 text-black">
        {isEdit ? "Edit Module" : "Add Module"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-[12px] font-medium text-gray-700">Course</label>

          <select
            value={formData.course}
            onChange={(e) =>
              setFormData({
                ...formData,
                course: e.target.value,
              })
            }
            className="w-full rounded-md border px-3  text-[14px] py-2 outline-none transition-all"
          >
            <option value="">Select Course</option>

            {courses?.data?.map((item) => (
              <option key={item._id} value={item._id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-[12px] font-medium text-gray-700">Module Title</label>

          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
            className="w-full rounded-md border px-3  text-[14px] py-2 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block mb-1 text-[12px] font-medium text-gray-700">Order</label>

          <input
            type="number"
            value={formData.order}
            onChange={(e) =>
              setFormData({
                ...formData,
                order: Number(e.target.value),
              })
            }
            className="w-full rounded-md border px-3  text-[14px] py-2 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block mb-1 text-[12px] font-medium text-gray-700">Status</label>

          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value,
              })
            }
            className="w-full rounded-md border px-3  text-[14px] py-2 outline-none transition-all"
          >
            <option value="active">Active</option>

            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-primary text-[13px] text-white px-4 py-1 rounded"
        >
          {isEdit ? "Update Module" : "Save Module"}
        </button>
      </form>
    </div>
  );
}
