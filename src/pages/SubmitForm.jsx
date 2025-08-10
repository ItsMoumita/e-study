import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../component/Loading";
import { title } from 'framer-motion/client';
import { Helmet } from 'react-helmet';


const SubmitForm = () => {
     const { id } = useParams(); // assignment ID
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
// console.log(user);
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

  const [submissionLink, setSubmissionLink] = useState("");
  const [note, setNote] = useState("");

  // Load assignment data
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
// console.log(assignment)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const submission = {
      assignmentId: id,
      studentEmail: user.email,
      submissionLink,
      note,
      title: assignment.title,
      marks: assignment.marks,
      name: user.displayName,
      status: "pending",
      submittedAt: new Date(),
    };

    // console.log(submission);

    try {
      const res = await axios.post("https://e-study-server-nine.vercel.app/submissions", submission, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      if (res.status === 201) {
        Swal.fire("Success", "Assignment submitted successfully", "success");
        navigate("/assignments");
      }
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || err.message, "error");
    }
  };

  if (loading || !assignment) return <Loading />;

  return (
    <div className="min-h-[calc(100vh-153px)] flex items-center  justify-center py-10 px-6 lg:px-18 xl:px-32 mx-auto bg-[#f0f4ff] dark:bg-gray-900/80">
      <Helmet>
        <title>Submit Assignment: {assignment.title} | E-Study</title>
      </Helmet>
      <div className="bg-white dark:bg-[#1a1f2e] p-8 rounded-xl shadow-xl w-full max-w-xl">
        <h2 className="text-2xl font-bold text-[#002147] dark:text-[#fdc800] mb-4">
          Submit Assignment: {assignment.title}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Submission Link */}
          <div>
            <label className="block font-semibold mb-1 dark:text-white">Google Docs Link</label>
            <input
              type="url"
              value={submissionLink}
              onChange={(e) => setSubmissionLink(e.target.value)}
              required
              className="w-full p-2 border rounded dark:bg-[#0b0f1a] dark:text-white"
              placeholder="https://docs.google.com/..."
            />
          </div>

          {/* Note */}
          <div>
            <label className="block font-semibold mb-1 dark:text-white">Quick Note</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              className="w-full p-2 border rounded dark:bg-[#0b0f1a] dark:text-white"
              placeholder="Anything you want to tell the teacher..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#fdc800] hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded transition-colors"
          >
            Submit Assignment
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitForm;