import React from 'react';
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from '../component/Loading';

const ViewAssignment = () => {
      const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const res = await axios.get(`https://e-study-server-nine.vercel.app/assignments/${id}`);
        setAssignment(res.data);
      } catch (err) {
        Swal.fire("Error", "Failed to load assignment", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [id]);

  if (loading) return <Loading></Loading>
    return (
      <div className="min-h-[calc(100vh-163px)] flex items-center justify-center bg-[#f9f9f9] dark:bg-[#0b0f1a] px-4 py-10">
      <div className="flex flex-col md:flex-row items-center bg-white dark:bg-[#1a1f2e] rounded-2xl shadow-xl p-6 md:p-10 max-w-5xl w-full">
        {/* Left side image */}
        <div className="flex-shrink-0">
          <img
            src={assignment.thumbnail}
            alt={assignment.title}
            className="w-[280px] h-auto rounded-lg object-cover shadow-md"
          />
        </div>

        {/* Right side details */}
        <div className="ml-0 md:ml-10 mt-6 md:mt-0 text-left space-y-2 text-[#002147] dark:text-white w-full">
          <h2 className="text-2xl font-serif font-semibold text-[#311c1c] dark:text-[#fdc800] mb-4">
            Assignment Details
          </h2>

          <p><span className="font-semibold">Title:</span> {assignment.title}</p>
          <p><span className="font-semibold">Description:</span> {assignment.description}</p>
          <p><span className="font-semibold">Marks:</span> {assignment.marks}</p>
          <p><span className="font-semibold">Difficulty:</span> {assignment.difficulty}</p>
          <p><span className="font-semibold">Due Date:</span> {new Date(assignment.dueDate).toLocaleDateString()}</p>

          <button
            onClick={() => window.location.href = `/assignments/${assignment._id}/submit`}
            className="mt-6 inline-block bg-[#fdc800] hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded transition-colors"
          >
            Take Assignment
          </button>
        </div>
      </div>
    </div>
    );
};

export default ViewAssignment;