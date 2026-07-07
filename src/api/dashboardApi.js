import axiosInstance from "./axiosInstance";

export const getDashboardStats =
  async () => {
    const res =
      await axiosInstance.get(
        "/dashboard/stats"
      );

    return res.data;
  };