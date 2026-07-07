import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getModulesByCourse,
  createModule,
  updateModule,
  deleteModule,
  getSingleModule,
} from "../api/moduleApi";


// Get Modules By Course
export const useModules = (
  courseId
) => {
  return useQuery({
    queryKey: [
      "modules",
      courseId,
    ],

    queryFn: () =>
      getModulesByCourse(
        courseId
      ),

    enabled: !!courseId,
  });
};


// Create Module
export const useCreateModule =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        createModule,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "modules",
            ],
          }
        );
      },
    });
  };


// Update Module
export const useUpdateModule =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        updateModule,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "modules",
            ],
          }
        );
      },
    });
  };


// Delete Module
export const useDeleteModule =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        deleteModule,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "modules",
            ],
          }
        );
      },
    });
  };


export const useSingleModule = (
  id
) => {
  return useQuery({
    queryKey: [
      "singleModule",
      id,
    ],

    queryFn: () =>
      getSingleModule(
        id
      ),

    enabled: !!id,
  });
};