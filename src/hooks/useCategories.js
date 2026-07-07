import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createCategory,
  getCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} from "../api/categoryService";

// Get All Categories
export const useCategories =
  () => {
    return useQuery({
      queryKey: [
        "categories",
      ],
      queryFn:
        getCategories,
    });
  };

// Get Single Category
export const useSingleCategory =
  (id) => {
    return useQuery({
      queryKey: [
        "singleCategory",
        id,
      ],
      queryFn: () =>
        getSingleCategory(
          id
        ),
      enabled: !!id,
    });
  };

// Create Category
export const useCreateCategory =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        createCategory,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "categories",
            ],
          }
        );
      },
    });
  };

// Update Category
export const useUpdateCategory =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        updateCategory,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "categories",
            ],
          }
        );
      },
    });
  };

// Delete Category
export const useDeleteCategory =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        deleteCategory,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "categories",
            ],
          }
        );
      },
    });
  };