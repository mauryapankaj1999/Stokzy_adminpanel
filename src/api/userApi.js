import axiosInstance from "./axiosInstance";

export const getUsers = async () => {
  const response = await axiosInstance.get("/users");

  return response.data;
};

export const updateUser = async (id, data) => {
  const response = await axiosInstance.put(`/users/${id}`, data);

  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axiosInstance.delete(`/users/${id}`);

  return response.data;
};

export const changePassword = async (data) => {
  const response = await axiosInstance.put("/users/change-password", data);

  return response.data;
};
export const getProfile = async () => {
  const response = await axiosInstance.get("/users/profile");

  return response.data;
};
export const updateProfile = async (data) => {
  const response = await axiosInstance.put("/users/profile", data);

  return response.data;
};

export const getUserDashboard = async () => {
  const response = await axiosInstance.get("/users/Userdashboard");

  return response.data;
};

export const getUserPurchaseDetails = async (userId) => {
  const response = await axiosInstance.get(`/users/${userId}/details`);
  return response.data;
};

export const getContactList = async () => {
  const response = await axiosInstance.get(`/contact`);
  return response.data;
};

export const deleteContact = async (id) => {
  const response = await axiosInstance.delete(`/contact/${id}`);
  return response.data;
};