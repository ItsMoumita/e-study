import React, { useEffect, useState } from "react";
import axios from "axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("/courses.json") 
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Error loading courses:", err));
  }, []);

  return (
    <div className="px-6 py-10 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">All Courses</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-yellow-500 hover:border-yellow-500 transition-all duration-300"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold">{course.title}</h2>
              <p className="text-gray-600 text-sm">{course.description}</p>
              <span className="text-yellow-600 font-medium">
                Duration: {course.duration}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
