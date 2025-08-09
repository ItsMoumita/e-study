import React, { useEffect, useState } from "react";
import axios from "axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("/courses.json") // fetching from public folder
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Error loading courses:", err));
  }, []);

  return (
    <div className="py-10 px-6 lg:px-18 xl:px-32 mx-auto bg-[#f0f4ff] dark:bg-gray-900/80">
      <h1 className="text-5xl font-bold mb-8 md:mb-12 text-center text-[#002147] dark:text-white">
        All Courses
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white/80  dark:bg-[#293047] rounded-lg border border-gray-200 dark:border-gray-700 shadow transition-all duration-300 hover:border-[#fdc800] hover:shadow-[0_4px_20px_rgba(253,200,0,0.4)] p-4 flex flex-col"
          >
            {/* Course Image */}
            <div className="w-full">
              <img
                src={course.image}
                alt={course.title}
                className="rounded-lg w-full h-[250px] object-cover"
              />
            </div>

            {/* Course Info */}
            <div className="mt-4 space-y-4 px-2 text-[#002147] dark:text-white">
              <p className="text-lg font-semibold">
                Title: <span className="font-normal">{course.title}</span>
              </p>
              <p className="text-lg font-semibold">
                Duration: <span className="font-normal">{course.duration}</span>
              </p>
              <p className="text-lg font-semibold">
                Description:{" "}
                <span className="font-normal">{course.description}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
