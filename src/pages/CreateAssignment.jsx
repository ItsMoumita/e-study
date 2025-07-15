import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const CreateAssignment = () => {
    const {user} = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [marks, setMarks] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [dueDate, setDueDate] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const assignment = {
      title,
      description,
      marks: Number(marks),
      thumbnail,
      difficulty,
      dueDate,
      name: user?.displayName || "Anonymous",
      email: user?.email || "No email",
    };

   try {
  setLoading(true);
   await axios.post("http://localhost:3000/assignments", assignment).then((res) => res.data);
   
   

  // Success – if we’re here, it didn’t throw
  Swal.fire({
    title: "Success!",
    text: "Assignment created successfully.",
    icon: "success",
    confirmButtonColor: "#fdc800",
  });

  // Clear form
  setTitle("");
  setDescription("");
  setMarks("");
  setThumbnail("");
  setDifficulty("easy");
  setDueDate(null);

} catch (err) {
  Swal.fire({
    title: "Error",
    text: err.createdAssignment?.data?.message || err.message,
    icon: "error",
    confirmButtonColor: "#fdc800",
  });
} finally {
  setLoading(false);
}

  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#f9f9f9] dark:bg-[#0b0f1a] py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-[#1a1f2e] rounded-lg shadow-lg p-8 w-full max-w-xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-[#002147] dark:text-white text-center">
          Create Assignment
        </h2>

        {/* Title */}
        <input
          type="text"
          placeholder="Enter assignment title"
          className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-[#fdc800] placeholder-gray-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Description */}
        <textarea
          placeholder="Enter description"
          className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-[#fdc800] placeholder-gray-400"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* Marks */}
        <input
          type="number"
          placeholder="Total marks"
          className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-[#fdc800] placeholder-gray-400"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          required
        />

        {/* Thumbnail URL */}
        <input
          type="url"
          placeholder="Enter image URL"
          className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-[#fdc800] placeholder-gray-400"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          required
        />

        {/* Difficulty */}
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-[#fdc800] text-gray-700 dark:text-white bg-white dark:bg-[#1a1f2e]"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        {/* Due Date */}
        <DatePicker
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
          placeholderText="Select due date"
          className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-[#fdc800] placeholder-gray-400"
          dateFormat="MMMM d, yyyy"
          minDate={new Date()}
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-[#fdc800] hover:bg-[#e6b800] transition-colors text-black font-semibold py-2 px-4 rounded disabled:opacity-60 w-full"
        >
          {loading ? "Creating..." : "Create Assignment"}
        </button>
      </form>
    </div>
  );
};

export default CreateAssignment;
