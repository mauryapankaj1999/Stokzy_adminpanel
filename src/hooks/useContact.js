import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteContact, getContactList } from "../api/userApi";

export const useContact = () => {
  return useQuery({
    queryKey: ["contact"],
    queryFn: getContactList,
  });
};

export const useDeleteContact = () => {
  return useMutation({
    mutationFn: deleteContact,
  });
}