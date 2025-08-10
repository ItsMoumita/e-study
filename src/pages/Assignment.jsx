import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { Helmet } from "react-helmet";

// Responsive page size by breakpoint
function useResponsivePageSize() {
  const calc = () => {
    if (typeof window === "undefined") return 6;
    const w = window.innerWidth;
    if (w >= 1024) return 9;    // lg: 3 cols x 3 rows
    if (w >= 768) return 6;     // md: 2 cols x 3 rows
    return 4;                   // mobile: 1 col x 4 rows
  };
  const [size, setSize] = useState(calc);

  useEffect(() => {
    const onChange = () => setSize(calc());
    // listen to resize and media changes
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

const Assignment = () => {
  const { user } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = useResponsivePageSize();

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const query = selectedLevel ? `?level=${selectedLevel}` : "";
      const res = await axios.get(
        `https://e-study-server-nine.vercel.app/assignments${query}`
      );
      const data = res.data || [];
      setAssignments(data);

      // realign current page if needed
      const totalPagesNew = Math.max(1, Math.ceil(data.length / pageSize));
      if (currentPage > totalPagesNew) setCurrentPage(totalPagesNew);
    } catch (err) {
      console.error("Error fetching assignments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, email) => {
    if (user?.email !== email) {
      return Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "You can't delete others' assignments!",
        confirmButtonColor: "#002147",
      });
    }

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this assignment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#002147",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(
          `https://e-study-server-nine.vercel.app/assignments/${id}`,
          {
            headers: { Authorization: `Bearer ${user.accessToken}` },
          }
        );
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Assignment deleted successfully.",
          confirmButtonColor: "#002147",
        });
        fetchAssignments();
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response?.data?.message || err.message,
          confirmButtonColor: "#002147",
        });
      }
    }
  };

  useEffect(() => {
    fetchAssignments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLevel]);

  // If pageSize changes (resize), keep page in range
  useEffect(() => {
    const totalPagesNew = Math.max(1, Math.ceil(assignments.length / pageSize));
    if (currentPage > totalPagesNew) setCurrentPage(totalPagesNew);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, assignments.length]);

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(assignments.length / pageSize));
  const startIdx = (currentPage - 1) * pageSize;
  const pageItems = assignments.slice(startIdx, startIdx + pageSize);

  return (
    <div className="py-10 px-6 lg:px-18 xl:px-32 mx-auto bg-[#f0f4ff] dark:bg-gray-900/80">
      <Helmet>
        <title>All Assignments | E-Study</title>
      </Helmet>

      {/* Filter */}
      <div className="font-bold text-xl mb-12 w-full mx-auto text-center text-[#002147] dark:text-white">
        <select
          value={selectedLevel}
          onChange={(e) => {
            setSelectedLevel(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a1f2e] py-2 px-12 rounded"
        >
          <option value="">All Levels</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {/* Grid */}
      {loading ? (
        // Skeleton loader
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: pageSize }).map((_, i) => (
            <div
              key={i}
              className="bg-white/80 dark:bg-[#293047] rounded-lg border border-gray-200 dark:border-gray-700 shadow p-4 flex items-center justify-between gap-4"
            >
              <div className="w-2/3">
                <div className="skeleton rounded-lg w-full h-[150px]" />
              </div>
              <div className="w-1/2 pl-4 space-y-2">
                <div className="skeleton h-4 w-40" />
                <div className="skeleton h-4 w-32" />
                <div className="skeleton h-4 w-28" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="skeleton h-9 w-9 rounded" />
                <div className="skeleton h-9 w-9 rounded" />
                <div className="skeleton h-9 w-9 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : assignments.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No assignments found.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageItems.map((item) => (
              <div
                key={item._id}
                className="bg-white/80 dark:bg-[#293047] rounded-lg border border-gray-200 dark:border-gray-700 shadow transition-all duration-300 hover:border-[#fdc800] hover:shadow-[0_4px_20px_rgba(253,200,0,0.4)] p-4 flex items-center justify-between gap-4"
              >
                {/* Image */}
                <div className="w-2/3">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="rounded-lg w-full h-[150px] object-cover"
                  />
                </div>

                {/* Info */}
                <div className="w-1/2 pl-4 space-y-2">
                  <p className="text-sm text-[#002147] dark:text-white font-semibold">
                    Title: <span className="font-normal">{item.title}</span>
                  </p>
                  <p className="text-sm text-[#002147] dark:text-white font-semibold">
                    Marks: <span className="font-normal">{item.marks}</span>
                  </p>
                  <p className="text-sm text-[#002147] dark:text-white font-semibold">
                    Difficulty:{" "}
                    <span className="font-normal capitalize">
                      {item.difficulty}
                    </span>
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-2">
                  <Link
                    to={`/assignments/view/${item._id}`}
                    className="bg-[#fdc800] hover:bg-yellow-400 text-white p-2 rounded"
                    title="View"
                  >
                    <FaEye />
                  </Link>
                  <Link
                    to={`/assignments/update/${item._id}`}
                    className="bg-gray-700 hover:bg-gray-800 text-white p-2 rounded"
                    title="Edit"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id, item.email)}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex flex-wrap justify-center items-center gap-2">
            <button
              className="btn btn-sm btn-outline border-[#002147] text-[#002147] dark:border-blue-500 dark:text-blue-200 hover:bg-[#002147] hover:text-white dark:hover:bg-blue-600"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
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
                >
                  {page}
                </button>
              );
            })}

            <button
              className="btn btn-sm btn-outline border-[#002147] text-[#002147] dark:border-blue-500 dark:text-blue-200 hover:bg-[#002147] hover:text-white dark:hover:bg-blue-600"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Assignment;