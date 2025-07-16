import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../component/Loading";

const GiveMark = () => {
  const { id } = useParams(); // submission ID
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [givenMark, setGivenMark] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/submissions/${id}`);
        setSubmission(res.data);
      } catch (err) {
        Swal.fire("Error", "Failed to fetch submission data", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmission();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submission.studentEmail === user.email) {
      return Swal.fire("Error", "You can't evaluate your own submission!", "error");
    }

    if (!givenMark || !feedback) {
      return Swal.fire("Warning", "Please provide both mark and feedback.", "warning");
    }

    try {
      const res = await axios.patch(
        `http://localhost:3000/submissions/${id}`,
        {
          mark: Number(givenMark),
          feedback,
          status: "completed",
          evaluatedBy: user.email,
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      if (res.status === 200) {
        Swal.fire("Success", "Marks given successfully!", "success");
        navigate("/pending");
      }
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || err.message, "error");
    }
  };

  if (loading || !submission) return <Loading />;

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center bg-[#f9f9f9] dark:bg-[#0b0f1a] px-4 py-10">
      <div className="bg-white dark:bg-[#1a1f2e] p-8 rounded-xl shadow-lg w-full max-w-xl space-y-4">
        <h2 className="text-2xl font-bold text-[#002147] dark:text-white mb-4">
          Evaluate Assignment
        </h2>

        <p className="dark:text-white">
          <strong>Examinee Email:</strong> {submission.studentEmail}
        </p>
        <p className="dark:text-white">
          <strong>Assignment Title:</strong> {submission.assignmentTitle || "N/A"}
        </p>
        <p className="dark:text-white">
          <strong>Submitted Note:</strong> {submission.note || "No note provided"}
        </p>
        <p className="dark:text-white">
          <strong>Google Docs Link:</strong>{" "}
          <a
            href={submission.submissionLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Open Link
          </a>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <input
            type="number"
            placeholder="Enter mark"
            className="w-full p-2 border rounded dark:bg-[#0b0f1a] dark:text-white"
            value={givenMark}
            onChange={(e) => setGivenMark(e.target.value)}
            required
          />

          <textarea
            placeholder="Enter feedback"
            rows={3}
            className="w-full p-2 border rounded dark:bg-[#0b0f1a] dark:text-white"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          ></textarea>

          <button
            type="submit"
            className="w-full bg-[#fdc800] hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded"
          >
            Submit Mark
          </button>
        </form>
      </div>
    </div>
  );
};

export default GiveMark;
