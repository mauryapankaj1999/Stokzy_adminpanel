import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getLessonsByModule,
  createLesson,
  updateLesson,
  deleteLesson,
  getAllLessons,
  getSingleLesson,
} from "../api/lessonApi";


// Get Lessons By Module
export const useLessons = (
  moduleId
) => {
  return useQuery({
    queryKey: [
      "lessons",
      moduleId,
    ],

    queryFn: () =>
      getLessonsByModule(
        moduleId
      ),

    enabled: !!moduleId,
  });
};


// Create Lesson
export const useCreateLesson =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        createLesson,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "lessons",
            ],
          }
        );
      },
    });
  };


// Update Lesson
export const useUpdateLesson =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        updateLesson,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "lessons",
            ],
          }
        );
      },
    });
  };


// Delete Lesson
export const useDeleteLesson =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        deleteLesson,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "lessons",
            ],
          }
        );
      },
    });
  };
  export const useAllLessons =
  () => {
    return useQuery({
      queryKey: [
        "lessons",
      ],
      queryFn:
        getAllLessons,
    });
  };

  export const useSingleLesson =
  (id) => {
    return useQuery({
      queryKey: [
        "lesson",
        id,
      ],
      queryFn: () =>
        getSingleLesson(
          id
        ),
      enabled: !!id,
    });
  };