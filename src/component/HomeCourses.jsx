import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const HomeCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

    useEffect(() => {
    axios
      .get("/courses.json") // fetching from public folder
       .then(({ data }) => setCourses(Array.isArray(data) ? data.slice(0, 6) : []))
      .catch((err) => console.error("Error loading courses:", err));
  }, []);





  return (
    <div className="px-6 md:px-12 py-10 bg-[#f0f4ff] dark:bg-gray-900/80">
      <h1 className="text-4xl font-bold mt-8 mb-8 md:mb-14 text-center">Popular Courses</h1>
      <div className="px-6 md:px-12 grid gap-6 md:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white/80 dark:bg-[#293047] border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-yellow-500 hover:border-yellow-500 transition-all duration-300"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold">{course.title}</h2>
              <p className="text-gray-300 text-lg">{course.description}</p>
              <span className="text-yellow-500 font-medium">
                Duration: {course.duration}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <button
          onClick={() => navigate("/courses")}
          className="bg-yellow-500 text-white mt-8 md:mt-14 px-6 py-2 rounded hover:bg-yellow-600"
        >
          Explore More
        </button>
      </div>
    </div>
  );
};

export default HomeCourses;
