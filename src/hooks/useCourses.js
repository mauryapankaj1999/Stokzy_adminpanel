import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  getMyCourseDetails,
} from "../api/courseApi";
import { getMyCourses } from "../api/enrollmentApi";

export const useCourses = (
  page = 1,
  limit = 10
) => {
  return useQuery({
    queryKey: [
      "courses",
      page,
      limit,
    ],
    queryFn: () =>
      getCourses(page, limit),
  });
};

export const useSingleCourse = (
  id
) => {
  return useQuery({
    queryKey: [
      "course",
      id,
    ],
    queryFn: () =>
      getSingleCourse(id),
    enabled: !!id,
  });
};

export const useCreateCourse =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        createCourse,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "courses",
            ],
          }
        );
      },
    });
  };

export const useUpdateCourse =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        updateCourse,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "courses",
            ],
          }
        );
      },
    });
  };

export const useDeleteCourse =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        deleteCourse,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "courses",
            ],
          }
        );
      },
    });
  };
  export const useMyCourses =
  () => {
    return useQuery({
      queryKey: [
        "myCourses",
      ],
      queryFn:
        getMyCourses,
    });
  }

export const useMyCourseDetails =
  (id) => {
    return useQuery({
      queryKey: [
        "course",
        id,
      ],
      queryFn: () =>
        getMyCourseDetails(
          id
        ),
      enabled: !!id,
    });
  };