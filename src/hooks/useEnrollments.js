import { useQuery } from "@tanstack/react-query";
import { getAllEnrollments, getEnrollments } from "../api/enrollmentApi";

export const useEnrollments = () => {
  return useQuery({
    queryKey: ["enrollments"],
    queryFn: getEnrollments,
  });
};
export const useAllEnrollments = () => {
  return useQuery({
    queryKey: ["Allenrollments"],
    queryFn: getAllEnrollments,
  });
};
