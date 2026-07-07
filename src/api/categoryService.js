import axiosInstance from "./axiosInstance";

// Get All Categories
export const getCategories =
  async () => {
    const res =
      await axiosInstance.get(
        "/categories"
      );

    return res.data;
  };

// Get Single Category
export const getSingleCategory =
  async (id) => {
    const res =
      await axiosInstance.get(
        `/categories/${id}`
      );

    return res.data;
  };

// Create Category
export const createCategory =
  async (data) => {
    const res =
      await axiosInstance.post(
        "/categories",
        data
      );

    return res.data;
  };

// Update Category
export const updateCategory = async ({
  id,
  name,
}) => {
  const res = await axiosInstance.put(
    `/categories/${id}`,
    { name }
  );

  return res.data;
};
  

// Delete Category
export const deleteCategory =
  async (id) => {
    const res =
      await axiosInstance.delete(
        `/categories/${id}`
      );

    return res.data;
  };