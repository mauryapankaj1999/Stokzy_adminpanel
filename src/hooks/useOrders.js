import { useMutation, useQuery } from "@tanstack/react-query";
import { downloadInvoice, getMyOrders } from "../api/orderApi";

// import {
//   getMyOrders,
// } from "@/services/orderApi";

export const useMyOrders = () => {
  return useQuery({
    queryKey: ["myOrders"],
    queryFn: getMyOrders,
  });
};
export const useDownloadInvoice =
  () => {
    return useMutation({
      mutationFn:
        downloadInvoice,
    });
  };