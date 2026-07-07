import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import HeadingSection from "../../components/HeadingSection";
import Input from "../../components/common/Input";

// import { convertToBase64 } from "../../utils/fileUtils";
import {
  useCreateCourse,
  useSingleCourse,
  useUpdateCourse,
} from "../../hooks/useCourses";
import { useNavigate, useParams } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";
import { showError, showSuccess } from "../../utils/toast";
// import { usegetCategories } from "../../hooks/useCategories";
// import { useCategories } from "../../hooks/useCategories";

export default function AddCourses() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const { data: categories } = useCategories();
  const [description, setDescription] = useState("");
  const [videoType, setVideoType] = useState("url");
  const { mutateAsync: createCourseMutation, isPending } = useCreateCourse();
  const { data: courseData } = useSingleCourse(id);
  const { mutateAsync: updateCourseMutation } = useUpdateCourse();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      if (!data.title) {
        showError("Title is required");
        return;
      }
      formData.append("title", data.title);

      if (!data.slug) {
        showError("Slug is required");
        return;
      }
      formData.append("slug", data.slug);
      if (!data.category) {
        showError("Category is required");
        return;
      }
      formData.append("category", data.category);
      formData.append("shortDescription", data.shortDescription);
      formData.append("description", description);
      formData.append("price", data.price);
      formData.append("discountPrice", data.discountPrice);
      formData.append("duration", data.duration);
      formData.append("level", data.level);
      formData.append("status", data.status);
      formData.append("videoType", videoType);

      if (videoType === "url") {
        formData.append("videoUrl", data.videoUrl || "");
      }

      if (data.thumbnail?.[0]) {
        formData.append("thumbnail", data.thumbnail[0]);
      }

      // Debug
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      if (id) {
        await updateCourseMutation({
          id,
          data: formData,
        });
        showSuccess("Course Updated Successfully");
      } else {
        await createCourseMutation(formData);
        showSuccess("Course Created Successfully");
      }

      reset();
      setDescription("");
      setThumbnailPreview("");

      navigate("/courses");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id && courseData?.data) {
      reset({
        title: courseData.data.title,
        slug: courseData.data.slug,
        shortDescription: courseData.data.shortDescription,
        category: courseData.data.category?._id || courseData.data.category,
        price: courseData.data.price,
        discountPrice: courseData.data.discountPrice,
        duration: courseData.data.duration,
        level: courseData.data.level,
        status: courseData.data.status,
        videoUrl: courseData.data.videoUrl,
      });

      setDescription(courseData.data.description);

      //   const file = e.target.files[0];

      // if (file) {
      //   setThumbnailPreview(
      //     URL.createObjectURL(file)
      //   );
      // }

      setVideoType(courseData.data.videoType || "url");
    }
  }, [id, courseData, reset]);
  return (
    <>
      <HeadingSection
        title={id ? "Edit Course" : "Add Course"}
        link="/courses"
        btnText="View Courses"
      />

      <div className="bg-white p-6 rounded-xl shadow">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="mb-3">
            <label className="block mb-1 text-[12px] font-medium text-gray-700">
              Category
            </label>

            <select
              {...register("category")}
              className="w-full border p-2 rounded text-[14px]"
            >
              <option value="">Select Category</option>

              {categories?.data?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          {/* Title */}
          <Input
            label="Title"
            name="title"
            placeholder="Course Title"
            register={register}
            error={errors.title}
          />

          {/* Slug */}
          <Input
            label="Slug"
            name="slug"
            placeholder="course-slug"
            register={register}
            error={errors.slug}
          />

          {/* Thumbnail */}
          <Input
            type="file"
            label="Thumbnail"
            name="thumbnail"
            register={register}
            error={errors.thumbnail}
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];

              if (file) {
                setThumbnailPreview(
                  `http://localhost:5000${courseData.data.thumbnail}`,
                );
              }
            }}
          />

          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt=""
              className="w-40 h-40 rounded-lg border object-cover"
            />
          )}

          {/* Price Row */}
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              type="number"
              label="Price"
              name="price"
              register={register}
              error={errors.price}
            />

            <Input
              type="number"
              label="Discount Price"
              name="discountPrice"
              register={register}
              error={errors.discountPrice}
            />
          </div>

          {/* Duration + Level */}
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Duration"
              name="duration"
              placeholder="8 Weeks"
              register={register}
            />

            <div>
              <label className="block mb-1 text-[12px] font-medium text-gray-700">
                Level
              </label>

              <select
                {...register("level")}
                className="w-full border h-10 rounded-md px-3 text-[14px]"
              >
                <option value="Beginner">Beginner</option>

                <option value="Intermediate">Intermediate</option>

                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Status + Video Type */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-[12px] font-medium text-gray-700">
                Status
              </label>

              <select
                {...register("status")}
                className="w-full border h-10 rounded-md px-3 text-[14px]"
              >
                <option value="active">Active</option>

                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-[12px] font-medium text-gray-700">
                Video Type
              </label>

              <select
                value={videoType}
                onChange={(e) => setVideoType(e.target.value)}
                className="w-full border h-10 rounded-md px-3 text-[14px]"
              >
                <option value="url">Video URL</option>

                <option value="upload">Upload Video</option>
              </select>
            </div>
          </div>

          {videoType === "url" ? (
            <Input
              label="Video URL"
              name="videoUrl"
              placeholder="https://youtube.com/..."
              register={register}
            />
          ) : (
            <Input
              type="file"
              label="Upload Video"
              name="videoFile"
              register={register}
              accept="video/*"
            />
          )}
          {/* Short Description */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Short Description
            </label>

            <textarea
              rows="3"
              {...register("shortDescription")}
              className="w-full border rounded-md p-3"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Description
            </label>

            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              className="mb-12"
            />
          </div>

          {/* Dynamic Video Field */}

          <button
            type="submit"
            disabled={isPending}
            className="bg-primary text-white px-5 py-2 rounded-md"
          >
            {isPending ? "Saving..." : id ? "Update Course" : "Save Course"}
          </button>
        </form>
      </div>
    </>
  );
}
