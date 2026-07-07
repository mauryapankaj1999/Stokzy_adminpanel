import axiosInstance from "./axiosInstance";

export const getLessonsByModule = async (
  moduleId
) => {
  const res = await axiosInstance.get(
    `/lessons/module/${moduleId}`
  );

  return res.data;
};

export const createLesson = async (
  data
) => {
  const res = await axiosInstance.post(
    "/lessons",
    data
  );

  return res.data;
};

export const updateLesson = async ({
  id,
  data,
}) => {
  const res = await axiosInstance.put(
    `/lessons/${id}`,
    data
  );

  return res.data;
};

export const deleteLesson = async (
  id
) => {
  const res = await axiosInstance.delete(
    `/lessons/${id}`
  );

  return res.data;
};
export const getAllLessons =
  async () => {
    const res =
      await axiosInstance.get(
        "/lessons"
      );

    return res.data;
  };
  export const getSingleLesson =
  async (id) => {
    const res =
      await axiosInstance.get(
        `/lessons/${id}`
      );

    return res.data;
  };