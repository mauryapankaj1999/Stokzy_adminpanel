import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCourses } from "../../../hooks/useCourses";
import { useModules } from "../../../hooks/useModules";
import {
  useCreateLesson,
  useSingleLesson,
  useUpdateLesson,
} from "../../../hooks/useLessons";
import { showSuccess } from "../../../utils/toast";

export default function AddLesson() {
  const [existingVideos, setExistingVideos] = useState([]); // server se aaye hue
  const [existingPdfs, setExistingPdfs] = useState([]);
  const [videoFiles, setVideoFiles] = useState([null]); // naye upload
  const [pdfFiles, setPdfFiles] = useState([null]);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [selectedCourse, setSelectedCourse] = useState("");
  const [formData, setFormData] = useState({
    module: "",
    title: "",
    description: "",
    duration: "",
    order: 1,
    isPreview: false,
    status: "active",
  });

  const { data: courses } = useCourses();
  const { data: modules } = useModules(selectedCourse);
  const { mutateAsync: createLessonMutation } = useCreateLesson();
  const { data: lessonData } = useSingleLesson(id);
  const { mutateAsync: updateLessonMutation } = useUpdateLesson();

  // ─── Submit ──────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      payload.append("module", formData.module);
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("duration", formData.duration);
      payload.append("order", formData.order);
      payload.append("isPreview", formData.isPreview);
      payload.append("status", formData.status);

      // ✅ existing files jo rakhni hain unke IDs bhejo
      payload.append(
        "existingVideos",
        JSON.stringify(existingVideos.map((v) => v._id)),
      );
      payload.append(
        "existingPdfs",
        JSON.stringify(existingPdfs.map((p) => p._id)),
      );

      // naye files
      videoFiles
        .filter((f) => f !== null)
        .forEach((file) => payload.append("videos", file));
      pdfFiles
        .filter((f) => f !== null)
        .forEach((file) => payload.append("pdfs", file));

      if (isEdit) {
        await updateLessonMutation({ id, data: payload });
        showSuccess("Lesson Updated Successfully");
      } else {
        await createLessonMutation(payload);
        showSuccess("Lesson Created Successfully");
      }
      navigate("/lessons");
    } catch (error) {
      console.log(error);
    }
  };
  // ─── Edit mode prefill ───────────────────────────────
  useEffect(() => {
    if (!lessonData?.data) return;
    const lesson = lessonData.data;
    setSelectedCourse(lesson.module?.course);
    setFormData({
      module: lesson.module?._id || "",
      title: lesson.title || "",
      description: lesson.description || "",
      duration: lesson.duration || "",
      order: lesson.order || 1,
      isPreview: lesson.isPreview || false,
      status: lesson.status || "active",
    });
    setExistingVideos(lesson.videos?.filter((v) => v.type === "file") || []);
    setExistingPdfs(lesson.pdfs?.filter((p) => p.type === "file") || []);
  }, [lessonData]);

  return (
    <div className="bg-white p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {isEdit ? "Edit Lesson" : "Add Lesson"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-between gap-4">
        
          <div className="flex-1">
            <label className="block mb-1 text-[12px] font-medium text-gray-700">
              Course
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full rounded-md border px-3  text-[14px] py-2 outline-none transition-all"
            >
              <option value="">Select Course</option>
              {courses?.data?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block mb-1 text-[12px] font-medium text-gray-700">
              Module
            </label>
            <select
              value={formData.module}
              onChange={(e) =>
                setFormData({ ...formData, module: e.target.value })
              }
              className="w-full rounded-md border px-3  text-[14px] py-2 outline-none transition-all"
            >
              <option value="">Select Module</option>
              {modules?.data?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-1 text-[12px] font-medium text-gray-700">
            Lesson Title
          </label>
          <input
            type="text"
            placeholder="Enter lesson title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full rounded-md border px-3  text-[14px] py-2 outline-none transition-all"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 text-[12px] font-medium text-gray-700">
            Description
          </label>
          <textarea
            placeholder="Enter lesson description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={3}
            className="w-full border text-[13px] border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block mb-1 text-[12px] font-medium text-gray-700">
            Duration
          </label>
          <input
            type="text"
            placeholder="e.g. 10:30"
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
            className="w-full rounded-md border px-3  text-[14px] py-2 outline-none transition-all"
          />
        </div>

       
        <div className="border border-green-200 bg-green-50 p-4 rounded-xl">
          <label className="block text-sm font-semibold text-green-800 mb-3">
            🎬 Upload Videos
          </label>

          {/* Existing videos from server */}
          {existingVideos.map((video, index) => (
            <div
              key={video._id}
              className="flex items-center gap-2 mb-2 bg-white border border-green-200 p-2 rounded-lg"
            >
              <span className="text-green-600 text-sm">✅</span>
              <span className="flex-1 text-sm text-gray-700 truncate">
                {video.originalName || video.url || `Video ${index + 1}`}
              </span>
              <button
                type="button"
                onClick={() =>
                  setExistingVideos(
                    existingVideos.filter((_, i) => i !== index),
                  )
                }
                className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition text-sm font-medium"
              >
                ✕ Remove
              </button>
            </div>
          ))}

          {/* New file inputs */}
          {videoFiles.map((file, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="file"
                accept="video/*"
                onChange={(e) => {
                  const updated = [...videoFiles];
                  updated[index] = e.target.files[0] || null;
                  setVideoFiles(updated);
                }}
                className="flex-1 border border-gray-300 p-2 rounded-lg bg-white text-sm"
              />
              <button
                type="button"
                onClick={() =>
                  setVideoFiles(videoFiles.filter((_, i) => i !== index))
                }
                className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition text-sm font-medium whitespace-nowrap"
              >
                ✕ Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => setVideoFiles([...videoFiles, null])}
            className="mt-1 flex items-center gap-2 px-4 py-1 text-[15px] bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            + Add Video
          </button>
        </div>

        {/* ─── Upload PDFs ─── */}
        <div className="border border-blue-200 bg-blue-50 p-4 rounded-xl">
          <label className="block text-sm font-semibold text-blue-800 mb-3">
            📄 Upload PDFs
          </label>

          {/* Existing PDFs from server */}
          {existingPdfs.map((pdf, index) => (
            <div
              key={pdf._id}
              className="flex items-center gap-2 mb-2 bg-white border border-blue-200 p-2 rounded-lg"
            >
              <span className="text-blue-600 text-sm">✅</span>
              <span className="flex-1 text-sm text-gray-700 truncate">
                {pdf.originalName || pdf.url || `PDF ${index + 1}`}
              </span>
              <button
                type="button"
                onClick={() =>
                  setExistingPdfs(existingPdfs.filter((_, i) => i !== index))
                }
                className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition text-sm font-medium"
              >
                ✕ Remove
              </button>
            </div>
          ))}

          {/* New file inputs */}
          {pdfFiles.map((file, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  const updated = [...pdfFiles];
                  updated[index] = e.target.files[0] || null;
                  setPdfFiles(updated);
                }}
                className="flex-1 border border-gray-300 p-2 rounded-lg bg-white text-sm"
              />
              <button
                type="button"
                onClick={() =>
                  setPdfFiles(pdfFiles.filter((_, i) => i !== index))
                }
                className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition text-sm font-medium whitespace-nowrap"
              >
                ✕ Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => setPdfFiles([...pdfFiles, null])}
            className="mt-1 flex items-center gap-2 px-4 py-1 text-[15px] bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition "
          >
            + Add PDF
          </button>
        </div>

        {/* Order */}
        <div>
          <label className="block mb-1 text-[12px] font-medium text-gray-700">
            Order
          </label>
          <input
            type="number"
            placeholder="Order"
            value={formData.order}
            onChange={(e) =>
              setFormData({ ...formData, order: Number(e.target.value) })
            }
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Preview checkbox */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isPreview}
            onChange={(e) =>
              setFormData({ ...formData, isPreview: e.target.checked })
            }
            className="w-4 h-4 accent-green-600"
          />
          <span className="text-sm font-medium text-gray-700">
            Mark as Preview Lesson
          </span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          className=" bg-green-600 hover:bg-green-700 text-white text-[14px]  py-2 px-3  rounded-lg transition "
        >
          {isEdit ? "Update Lesson" : "Save Lesson"}
        </button>
      </form>
    </div>
  );
}
