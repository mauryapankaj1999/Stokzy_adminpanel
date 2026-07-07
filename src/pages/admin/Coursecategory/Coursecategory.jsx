import React, { useState } from "react";
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "../../../hooks/useCategories";
import CommonTable from "../../../components/CommonTable";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import Commenmodal from "../../../components/common/Commenmodal";
import { showError, showSuccess } from "../../../utils/toast";
import { IoClose } from "react-icons/io5";

export default function Coursecategory() {
  const [openmodal, setOpenmodal] = useState(false);
  const [name, setName] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const { data, isLoading } = useCategories();

  const { mutateAsync: createCategoryMutation } =
    useCreateCategory();

  const { mutateAsync: updateCategoryMutation } = useUpdateCategory();

const { mutateAsync: deleteCategoryMutation } =  useDeleteCategory();
  const handleDelete = async (id) => {
     const confirmDelete = window.confirm(
    "Are you sure you want to delete this category?"
  );

  if (!confirmDelete) return;
    try {
      await deleteCategoryMutation(id);
    showSuccess("Category Deleted Successfully");
    } catch (error) {
         showError("Failed to delete category");

    }
  };






  const handleAddCategory = () => {
    setIsEdit(false);
    setEditId(null);
    setName("");
    setOpenmodal(true);
  };

  const handleEdit = (row) => {
    setIsEdit(true);
    setEditId(row._id);
    setName(row.name);
    setOpenmodal(true);
  };

  const columns = [
    {
      name: "Category Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) =>
        new Date(row.createdAt).toLocaleDateString(),
    },
    {
      name: "Action",
      width: "120px",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <button onClick={() => handleEdit(row)}>
            <MdEdit
              size={20}
              className="text-primary-600"
            />
          </button>

          <button
            onClick={() => handleDelete(row._id)}
          >
            <MdDeleteOutline
              size={20}
              className="text-red-600"
            />
          </button>
        </div>
      ),
    },
  ];

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      showError("Add category");
      return;
    }

    try {
      if (isEdit) {
        await updateCategoryMutation({
          id: editId,
          name,
        });

        showSuccess(
          "Category Updated Successfully"
        );
      } else {
        await createCategoryMutation({
          name,
        });

        showSuccess(
          "Category Created Successfully"
        );
      }

      setName("");
      setEditId(null);
      setIsEdit(false);
      setOpenmodal(false);
    } catch (error) {
      console.log(error);
      showError(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl">
      <div className="flex justify-between mb-3">
        <h2>Categories</h2>

        <button
          onClick={handleAddCategory}
          className="bg-primary text-[13px] text-white px-4 py-1 rounded"
        >
          Add Category
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <CommonTable
          columns={columns}
          data={data?.data || []}
          loading={isLoading}
        />
      </div>

      {openmodal && (
        <Commenmodal>
          <div className="flex items-center justify-between">
            <h2 className="mb-2 text-[25px] text-black font-medium">
              {isEdit
                ? "Edit Category"
                : "Add Category"}
            </h2>

            <div
              className="p-3 cursor-pointer"
              onClick={() =>
                setOpenmodal(false)
              }
            >
              <IoClose />
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Category Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full border px-3 py-2 text-[14px] rounded"
            />

            <button
              type="submit"
              className="bg-primary text-[14px] text-white px-4 py-2 rounded"
            >
              {isEdit
                ? "Update Category"
                : "Save Category"}
            </button>
          </form>
        </Commenmodal>
      )}
    </div>
  );
}