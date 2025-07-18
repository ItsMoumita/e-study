import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Loading from "../component/Loading";
import { Helmet } from "react-helmet";

const UpdatedAssignment = () => {

  const { id } = useParams();
  // console.log(id);
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);


  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch assignment data by ID
  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const res = await axios.get(`https://e-study-server-nine.vercel.app/assignments/${id}`);
        setAssignment(res.data);
      } catch (err) {
        console.error("Error fetching assignment:", err);
        Swal.fire("Error", "Failed to load assignment", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchAssignment();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      //   const token = await user.getIdToken();

      const { _id, ...payload } = assignment;

      const updated = await axios.patch(
        `https://e-study-server-nine.vercel.app/assignments/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      if (updated.status === 200) {
        Swal.fire("Updated!", "Assignment updated successfully.", "success");
        navigate("/assignments");
      }
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading || !assignment) return <Loading />;

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#f9f9f9] dark:bg-[#0b0f1a] py-10 px-4">
      <Helmet>
        <title>Update Assignment | E-Study</title>
      </Helmet>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-[#1a1f2e] rounded-lg shadow-lg p-8 w-full max-w-xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-[#002147] dark:text-white text-center">
          Update Assignment
        </h2>

        <input
          type="text"
          className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-[#fdc800] placeholder-gray-400"
          placeholder="Enter title"
          value={assignment.title}
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
          required
        />

        <textarea
          className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-[#fdc800] placeholder-gray-400"
          placeholder="Enter description"
          value={assignment.description}
          onChange={(e) =>
            setAssignment({ ...assignment, description: e.target.value })
          }
          required
        />

        <input
          type="number"
          className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-[#fdc800] placeholder-gray-400"
          placeholder="Total marks"
          value={assignment.marks}
          onChange={(e) =>
            setAssignment({ ...assignment, marks: Number(e.target.value) })
          }
          required
        />

        <input
          type="url"
          className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-[#fdc800] placeholder-gray-400"
          placeholder="Enter thumbnail URL"
          value={assignment.thumbnail}
          onChange={(e) =>
            setAssignment({ ...assignment, thumbnail: e.target.value })
          }
          required
        />

        <select
          className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-[#fdc800] text-gray-700 dark:text-white bg-white dark:bg-[#1a1f2e]"
          value={assignment.difficulty}
          onChange={(e) =>
            setAssignment({ ...assignment, difficulty: e.target.value })
          }
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <DatePicker
          selected={new Date(assignment.dueDate)}
          onChange={(date) =>
            setAssignment({ ...assignment, dueDate: date })
          }
          placeholderText="Select due date"
          className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-[#fdc800] placeholder-gray-400"
          dateFormat="MMMM d, yyyy"
          minDate={new Date()}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-[#fdc800] hover:bg-[#e6b800] transition-colors text-black font-semibold py-2 px-4 rounded disabled:opacity-60 w-full"
        >
          {loading ? "Updating..." : "Update Assignment"}
        </button>
      </form>
    </div>
  );
};

export default UpdatedAssignment;