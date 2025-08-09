import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../component/Loading";
import { sub } from "framer-motion/client";
import { Helmet } from "react-helmet";

const PendingAssignment = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPendingSubmissions = async () => {
    try {
      const res = await axios.get("https://e-study-server-nine.vercel.app/submissions");
    //   console.log(res.data);
      const pending = res.data.filter((item) => item.status === "pending");
      setSubmissions(pending);
    //   console.log(pending);
    } catch (err) {
      console.error("Error fetching submissions:", err);
      Swal.fire("Error", "Failed to load submissions", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingSubmissions();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="bg-[#f0f4ff] dark:bg-gray-900/80 py-10 px-4  min-h-[92vh]">
      <Helmet>
        <title>Pending Assignments | E-Study</title>
      </Helmet>
      <h2 className="text-4xl font-bold mb-6 text-center text-[#002147] dark:text-white">
        Pending Submissions
      </h2>

      {submissions.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">No pending assignments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className=" mx-auto text-lg bg-white dark:bg-[#373f55] border rounded-lg">
            <thead className="bg-[#fdc800] text-black">
              <tr>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Marks</th>
                <th className="py-3 px-4 text-left">Student</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr
                  key={submission._id}
                  className="border-b dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-[#252b3a]"
                >
                  <td className="py-2 px-4">{submission.title || "N/A"}</td>
                  <td className="py-2 px-4">{submission.marks || "N/A"}</td>
                  <td className="py-2 px-4">{submission.name}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => navigate(`/give-mark/${submission._id}`)}
                      className="bg-[#002147] hover:bg-[#00152d] text-white px-4 py-1 rounded"
                    >
                      Give Mark
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingAssignment;
