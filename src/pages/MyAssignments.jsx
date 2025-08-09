import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../component/Loading";
import { Helmet } from "react-helmet";

const MyAssignments = () => {
  const { user } = useContext(AuthContext);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMySubmissions = async () => {
      try {
        const res = await axios.get(
          `https://e-study-server-nine.vercel.app/submissions/user/${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        setSubmissions(res.data);
      } catch (err) {
        console.error("Error fetching submissions:", err);
        Swal.fire("Error", "Failed to fetch your assignments", "error");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchMySubmissions();
    }
  }, [user]);

  if (loading) return <Loading />;

  return (
    <div className="bg-white dark:bg-[#0b0f1a] min-h-[calc(100vh-160px)] py-10 px-4">
      <Helmet>
        <title>My Assignments | E-Study</title>
      </Helmet>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 md:mb-12 text-center text-[#002147] dark:text-[#fdc800]">
          My Submitted Assignments
        </h2>

        {submissions.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            You haven’t submitted any assignments yet.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {submissions.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-[#1a1f2e] rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow transition-all duration-300 hover:border-[#fdc800] hover:shadow-[0_4px_20px_rgba(253,200,0,0.4)]"
              >
                <h3 className="text-xl font-semibold text-[#002147] dark:text-[#fdc800] mb-2">
                  {item.title}
                </h3>

                <p className="mb-1">
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`capitalize font-medium ${
                      item.status === "completed"
                        ? "text-green-600 dark:text-green-400"
                        : "text-yellow-600 dark:text-yellow-400"
                    }`}
                  >
                    {item.status}
                  </span>
                </p>

                <p className="mb-1">
                  <span className="font-semibold">Total Marks:</span>{" "}
                  {item.marks}
                </p>

                <p className="mb-1">
                  <span className="font-semibold">Obtained Marks:</span>{" "}
                  {item.status === "completed" ? (
                    <span className="text-green-700 dark:text-green-300 font-bold">
                      {item.mark}
                    </span>
                  ) : (
                    "N/A"
                  )}
                </p>

                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Feedback:</span>{" "}
                  {item.status === "completed"
                    ? item.feedback
                    : "Not yet evaluated"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAssignments;
