import { useForm } from "react-hook-form";
import Input from "../../components/common/Input";
import HeadingSection from "../../components/HeadingSection";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import { useCreateBlog, useUpdateBlog } from "../../hooks/useBlogs";
// import { convertToBase64 } from "../../utils/fileUtils";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleBlog } from "../../api/blogApi";
import { showError, showSuccess } from "../../utils/toast";

export default function AddBlog() {
  const [preview, setPreview] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  // const { mutateAsync: createBlogMutation, isPending } = useCreateBlog();

  // const { mutateAsync: updateBlogMutation } = useUpdateBlog();
  const { mutateAsync: createBlogMutation, isPending: createPending } =
    useCreateBlog();

  const { mutateAsync: updateBlogMutation, isPending: updatePending } =
    useUpdateBlog();

  const isPending = createPending || updatePending;

  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm();


  const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm();

  // Edit Mode Data Fetch
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getSingleBlog(id);

        const blog = res.data;

        reset({
          title: blog.title,
          slug: blog.slug,
        });

        setDescription(blog.description);
        setPreview(blog.image);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id, reset]);

  //   const onSubmit = async (data) => {
  //     try {

  //       // let image = preview || "";

  //       // if (data.image?.[0]) {
  //       //   image = await convertToBase64(data.image[0]);
  //       // }

  //       // const payload = {
  //       //   title: data.title,
  //       //   slug: data.slug,
  //       //   description,
  //       //   image,
  //       //   status: "active",
  //       // };
  //       const formData = new FormData();

  // formData.append(
  //   "title",
  //   data.title
  // );

  // formData.append(
  //   "slug",
  //   data.slug
  // );

  // formData.append(
  //   "description",
  //   description
  // );

  // formData.append(
  //   "status",
  //   "active"
  // );

  // if (data.image?.[0]) {
  //   formData.append(
  //     "image",
  //     data.image[0]
  //   );
  // }

  //  for (let pair of formData.entries()) {
  //   console.log(
  //     pair[0],
  //     pair[1]
  //   );
  // }

  //       if (id) {
  //         await updateBlogMutation({
  //           id,
  //           data: formData,
  //         });

  //         alert("Blog Updated Successfully");

  //         reset();
  //         setDescription("");
  //         setPreview("");
  //         navigate("/blogs");
  //       } else {
  //         await createBlogMutation(formData);

  //         alert("Blog Created Successfully");
  //         // reset form
  //         reset();
  //         setDescription("");
  //         setPreview("");

  //         // redirect
  //         navigate("/blogs");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const onSubmit = async (data) => {
    try {
      // if (!data.title) {
      //   showError("Title is required");
      //   return;
      // }

      // if (!data.slug) {
      //   showError("Slug is required");
      //   return;
      // }

      if (!description || description === "<p><br></p>") {
        showError("Description is required");
        return;
      }

      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("slug", data.slug);
      formData.append("description", description);
      formData.append("status", "active");

      if (data.image?.[0]) {
        formData.append("image", data.image[0]);
      }

      if (id) {
        await updateBlogMutation({
          id,
          data: formData,
        });

        showSuccess("Blog Updated Successfully");

        reset();
        setDescription("");
        setPreview("");
        navigate("/blogs");
      } else {
        await createBlogMutation(formData);

        showSuccess("Blog Created Successfully");

        reset();
        setDescription("");
        setPreview("");
        navigate("/blogs");
      }
    } catch (error) {
      console.log(error);

      showError(
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong"
      );
    }
  };
  return (
    <>
      <HeadingSection
        title={id ? "Edit Blog" : "Add Blog"}
        link="/blogs"
        btnText="View Blogs"
      />

      <div className="bg-white p-6 rounded-xl shadow">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Title"
            name="title"
            placeholder="Enter title"
            register={register}
  validation={{
    required: "Title is required",
    minLength: {
      value: 3,
      message: "Title must be at least 3 characters",
    },
  }}
  error={errors.title}
          />

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Slug"
              name="slug"
              placeholder="blog-slug"
              register={register}
  validation={{
    required: "Slug is required",
    pattern: {
      value: /^[a-z0-9-]+$/,
      message:
        "Slug can contain only lowercase letters, numbers and hyphens",
    },
  }}
  error={errors.slug}
            />

            <Input
  type="file"
  label="Upload Image"
  name="image"
  register={register}
  validation={{
    required: !id ? "Image is required" : false,
  }}
  error={errors.image}
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files?.[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }}
/>
          </div>

          {preview && (
            <div>
              <img
                src={preview}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-lg border"
              />
            </div>
          )}

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Description
            </label>

            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              className="mb-12"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="px-5 py-2 bg-primary text-white rounded-md"
          >
            {isPending ? "Saving..." : id ? "Update Blog" : "Save Blog"}
          </button>
        </form>
      </div>
    </>
  );
}
