import axiosInstance from "./axiosInstance";
// Get Modules By Course
export const getModulesByCourse =
  async (courseId) => {
    const res =
      await axiosInstance.get(
        `/modules/course/${courseId}`
      );

    return res.data;
  };

// Create Module
export const createModule =
  async (data) => {
    const res =
      await axiosInstance.post(
        "/modules",
        data
      );

    return res.data;
  };

// Update Module
export const updateModule =
  async ({
    id,
    data,
  }) => {
    const res =
      await axiosInstance.put(
        `/modules/${id}`,
        data
      );

    return res.data;
  };

// Delete Module
export const deleteModule =
  async (id) => {
    const res =
      await axiosInstance.delete(
        `/modules/${id}`
      );

    return res.data;
  };

export const getSingleModule = async (id) => {
  const res = await axiosInstance.get(`/modules/${id}`);
  return res.data;
};