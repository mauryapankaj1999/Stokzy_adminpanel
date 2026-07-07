import React from "react";
import { Link } from "react-router-dom";
import { useMyCourses } from "../hooks/useCourses";

const IMAGE_URL =
  "http://localhost:5000";

export default function Mycourses() {
  const {
    data,
    isLoading,
  } = useMyCourses();

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        My Courses
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.map(
          (item) => {
            const course =
              item.course;

            return (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden border"
              >
                <img
                  src={`${IMAGE_URL}${course.thumbnail}`}
                  alt={
                    course.title
                  }
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">
                    {
                      course.title
                    }
                  </h3>

                  <p className="text-gray-500 text-sm mb-3">
                    {
                      course.duration
                    }{" "}
                    •{" "}
                    {
                      course.level
                    }
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-bold text-green-600">
                      ₹
                      {
                        course.price
                      }
                    </span>

                    <span className="line-through text-gray-400">
                      ₹
                      {
                        course.discountPrice
                      }
                    </span>
                  </div>

                  <Link
                    to={`/course/${course._id}`}
                    className="block text-center bg-green-600 text-white py-2 rounded-lg"
                  >
                    Continue Learning
                  </Link>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}