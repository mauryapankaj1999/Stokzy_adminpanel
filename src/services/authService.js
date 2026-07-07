import axiosInstance from "../api/axiosInstance";

export const loginUser = async (
  data
) => {
  const response =
    await axiosInstance.post(
      "/users/login",
      data
    );

  return response.data;
};