import axiosInstance from "./axiosInstance";

export const getCourses = async (
  page = 1,
  limit = 10
) => {
  const response =
    await axiosInstance.get(
      `/courses?page=${page}&limit=${limit}`
    );

  return response.data;
};

export const getSingleCourse =
  async (id) => {
    const response =
      await axiosInstance.get(
        `/courses/${id}`
      );

    return response.data;
  };

export const createCourse = async (data) => {
    const response =
      await axiosInstance.post(
        "/courses",
        data
      );

    return response.data;
  };

export const updateCourse =
  async ({
    id,
    data,
  }) => {
    const response =
      await axiosInstance.put(
        `/courses/${id}`,
        data
      );

    return response.data;
  };

export const deleteCourse =
  async (id) => {
    const response =
      await axiosInstance.delete(
        `/courses/${id}`
      );

    return response.data;
  };
export const getMyCourseDetails =
  async (id) => {
    const res =
      await axiosInstance.get(
        `/enrollments/course/${id}`
      );

    return res.data;
  };