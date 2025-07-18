import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../component/Loading";

const MyAssignments = () => {
  const { user } = useContext(AuthContext);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMySubmissions = async () => {
      try {
        // const token = await user.getIdToken();

        const res = await axios.get(`https://e-study-server-nine.vercel.app/submissions/user/${user.email}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });

        setSubmissions(res.data);
      } catch (err) {
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
    <div className="px-4 py-8 max-w-5xl mx-auto min-h-[calc(100vh-160px)]">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#002147] dark:text-white">
        My Submitted Assignments
      </h2>

      {submissions.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">No submissions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 dark:border-gray-700">
            <thead className="bg-[#fdc800] text-black ">
              <tr>
                <th className="p-3 border">Assignment Title</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Total Marks</th>
                <th className="p-3 border">Obtained Marks</th>
                <th className="p-3 border">Feedback</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {submissions.map((item) => (
                // console.log(item),
                <tr key={item._id} className="bg-white dark:bg-[#1a1f2e] dark:text-white">
                  <td className="p-3 border">{item.title}</td>
                  <td className="p-3 border capitalize">{item.status}</td>
                  <td className="p-3 border">{item.marks}</td>
                  <td className="p-3 border">
                    {item.status === "completed" ? item.mark : "N/A"}
                  </td>
                  <td className="p-3 border">
                    {item.status === "completed" ? item.feedback : "Not yet evaluated"}
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

export default MyAssignments;
