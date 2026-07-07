import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBlog, deleteBlog, getAllBlogs, updateBlog } from "../api/blogApi";

export const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
  });
};

export const useCreateBlog = () => {
  return useMutation({
    mutationFn: createBlog,
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBlog,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
    },
  });
};
export const useSingleBlog = (id) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => getSingleBlog(id),
    enabled: !!id,
  });
};
export const useUpdateBlog = () => {
  return useMutation({
    mutationFn: updateBlog,
  });
};