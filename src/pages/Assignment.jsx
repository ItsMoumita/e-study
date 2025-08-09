import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Loading from "../component/Loading";
import { Helmet } from "react-helmet";

const Assignment = () => {
  const { user } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState("");

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const query = selectedLevel ? `?level=${selectedLevel}` : "";
      const res = await axios.get(`https://e-study-server-nine.vercel.app/assignments${query}`);
      setAssignments(res.data);
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
        confirmButtonColor: "#fdc800",
      });
    }

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this assignment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#fdc800",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`https://e-study-server-nine.vercel.app/assignments/${id}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Assignment deleted successfully.",
          confirmButtonColor: "#fdc800",
        });
        fetchAssignments();
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response?.data?.message || err.message,
          confirmButtonColor: "#fdc800",
        });
      }
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [selectedLevel]);

  if (loading) return <Loading />;

  return (
    <div className="py-10 px-6 lg:px-18 xl:px-32 mx-auto bg-[#f0f4ff] dark:bg-gray-900/80">
      <Helmet>
        <title>All Assignments | E-Study</title>
      </Helmet>
      <div className="font-bold text-xl mb-12 w-full mx-auto text-center text-[#002147] dark:text-white">
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a1f2e] py-2 px-12 rounded"
        >
          <option value="">All Levels</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>


      {/* 📦 Assignments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map((item) => (
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
                <span className="font-normal capitalize">{item.difficulty}</span>
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
    </div>
  );
};

export default Assignment;
