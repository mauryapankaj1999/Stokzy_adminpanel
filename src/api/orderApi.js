import axiosInstance from "./axiosInstance";
export const getMyOrders = async () => {
  const res = await axiosInstance.get("/orders/my-orders");

  return res.data;
};
export const downloadInvoice = async (
  orderId
) => {
  const response = await axiosInstance.get(
    `/orders/invoice/${orderId}`,
    {
      responseType: "blob",
    }
  );

  return response.data;
};