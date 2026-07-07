import axiosInstance from "./axiosInstance";


export const getMyCourses =
  async () => {
    const res =
      await axiosInstance.get(
        "/enrollments/my-courses",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );

    return res.data;
  };
  export const getEnrollments =
  async () => {
    const res =
      await axiosInstance.get(
        "/enrollments/my-courses"
      );

    return res.data;
  };
  export const getAllEnrollments =
  async () => {
    const res =
      await axiosInstance.get(
        "/enrollments/all"
      );

    return res.data;
  };
  // export const getMyCourses =
  // async () => {
  //   const res =
  //     await axiosInstance.get(
  //       "/enrollments/my-courses"
  //     );

  //   return res.data;
  // };