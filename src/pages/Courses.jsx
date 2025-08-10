import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

// Responsive page size by screen width
function useResponsivePageSize() {
  const calc = () => {
    if (typeof window === "undefined") return 6;
    const w = window.innerWidth;
    if (w >= 1024) return 9; // lg: 3 cols x 3 rows
    if (w >= 768) return 6;  // md: 2 cols x 3 rows
    return 4;                // mobile: 1 col x 4 rows
  };
  const [size, setSize] = useState(calc);

  useEffect(() => {
    const onChange = () => setSize(calc());
    window.addEventListener("resize", onChange);
    const mMd = window.matchMedia("(min-width: 768px)");
    const mLg = window.matchMedia("(min-width: 1024px)");
    mMd.addEventListener?.("change", onChange);
    mLg.addEventListener?.("change", onChange);
    return () => {
      window.removeEventListener("resize", onChange);
      mMd.removeEventListener?.("change", onChange);
      mLg.removeEventListener?.("change", onChange);
    };
  }, []);

  return size;
}

const gridVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, when: "beforeChildren", staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = useResponsivePageSize();

  useEffect(() => {
    setLoading(true);
    axios
      .get("/courses.json") // fetching from public folder
      .then((res) => setCourses(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.error("Error loading courses:", err))
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.max(1, Math.ceil(courses.length / pageSize));
  const startIdx = (currentPage - 1) * pageSize;

  // Keep current page in range if data length or pageSize changes (resize)
  useEffect(() => {
    const pages = Math.max(1, Math.ceil(courses.length / pageSize));
    if (currentPage > pages) setCurrentPage(pages);
  }, [courses.length, pageSize, currentPage]);

  const pageItems = useMemo(
    () => courses.slice(startIdx, startIdx + pageSize),
    [courses, startIdx, pageSize]
  );

  return (
    <div className="py-10 px-6 lg:px-18 xl:px-32 mx-auto bg-[#f0f4ff] dark:bg-gray-900/80">
      <motion.h1
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold mb-8 md:mb-12 text-center text-[#002147] dark:text-white"
      >
        All Courses
      </motion.h1>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: pageSize }).map((_, i) => (
            <div
              key={i}
              className="bg-white/80 dark:bg-[#293047] rounded-lg border border-gray-200 dark:border-gray-700 shadow p-4 flex flex-col"
            >
              <div className="w-full">
                <div className="skeleton rounded-lg w-full h-[250px]" />
              </div>
              <div className="mt-4 space-y-4 px-2">
                <div className="skeleton h-5 w-3/4" />
                <div className="skeleton h-5 w-1/2" />
                <div className="skeleton h-16 w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : courses.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No courses found.
        </p>
      ) : (
        <>
          <motion.div
            key={`${currentPage}-${pageSize}`} // re-animate on page/size change
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {pageItems.map((course) => (
              <motion.div
                variants={cardVariants}
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
                    Duration:{" "}
                    <span className="font-normal">{course.duration}</span>
                  </p>
                  <p className="text-lg font-semibold">
                    Description:{" "}
                    <span className="font-normal">{course.description}</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination */}
          <div className="mt-10 flex flex-wrap justify-center items-center gap-2">
            <button
              className="btn btn-sm btn-outline border-[#002147] text-[#002147] dark:border-blue-500 dark:text-blue-200 hover:bg-[#002147] hover:text-white dark:hover:bg-blue-600"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => {
              const page = idx + 1;
              const isActive = page === currentPage;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={
                    isActive
                      ? "btn btn-sm bg-[#fdc800] text-[#002147] border-0"
                      : "btn btn-sm btn-outline border-[#fdc800] text-[#fdc800] hover:bg-[#fdc800] hover:text-[#002147]"
                  }
                  aria-label={`Page ${page}`}
                >
                  {page}
                </button>
              );
            })}

            <button
              className="btn btn-sm btn-outline border-[#002147] text-[#002147] dark:border-blue-500 dark:text-blue-200 hover:bg-[#002147] hover:text-white dark:hover:bg-blue-600"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Courses;