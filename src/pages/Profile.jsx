import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { getAuth, updateProfile } from "firebase/auth";
import { RiEdit2Fill } from "react-icons/ri";
import Loading from "../component/Loading";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext) || {};
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", image: "" });

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    try {
      setForm({
        name: user.displayName || "",
        image: user.photoURL || "",
      });
    } finally {
      setLoading(false);
    }
  }, [user]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);
      await updateProfile(getAuth().currentUser, {
        displayName: form.name || null,
        photoURL: form.image || null,
      });

      // Update context so Navbar reflects changes immediately
      if (setUser) {
        setUser({ ...user, displayName: form.name, photoURL: form.image });
      }

      setEditMode(false);
      // Swal.fire("Success", "Profile updated!", "success");
      Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Profile updated successfully",
          confirmButtonColor: "#002147",
        });
    } catch (err) {
      console.error(err);
      // Swal.fire("Error", err.message || "Failed to update profile", "error");
      return Swal.fire({
        icon: "error",
        text: "Failed to update profile",
        confirmButtonColor: "#002147",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return Loading ;
  }

  if (loading) {
    return (
      <div className="min-h-[70vh] grid place-items-center">
        <span className="loading loading-spinner loading-lg text-[#fdc800]" />
      </div>
    );
  }

  return (
    <section className="min-h-[90vh] bg-[#f0f4ff] dark:bg-gray-900/80 grid place-items-center px-6">
      <div className="w-full max-w-md bg-white dark:bg-[#1f2937] border border-blue-200 dark:border-blue-600 rounded-2xl shadow p-8">
        {/* Avatar preview centered */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={(editMode ? form.image : user.photoURL) || "/default-avatar.png"}
            alt="avatar"
            className="w-28 h-28 rounded-full border-4 border-[#fdc800] object-cover bg-white"
          />
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#002147] dark:text-white">Profile</h2>
          {!editMode && (
            <button
              type="button"
              onClick={() => setEditMode(true)}
              className="text-[#002147] dark:text-white px-4 py-3 rounded-full hover:bg-[#e5eefc] dark:hover:bg-[#0f2036] transition"
              title="Edit"
            >
              <RiEdit2Fill className="text-2xl" />
            </button>
          )}
        </div>

        {/* Centered form with labels above inputs */}
        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-lg mb-1 [#0f2036] dark:text-white">
              Name:
            </label>
            <input
              id="name"
              name="name"
              value={editMode ? form.name : user.displayName || ""}
              disabled={!editMode}
              onChange={handleChange}
              className="w-full bg-[#f9fafb] dark:bg-[#111827] rounded-lg py-3 px-4 text-[#002147] dark:text-white placeholder-gray-400 focus:outline-none border border-blue-100 dark:border-blue-700"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-lg mb-1 [#0f2036] dark:text-white">
              Image:
            </label>
            <input
              id="image"
              name="image"
              value={editMode ? form.image : user.photoURL || ""}
              disabled={!editMode}
              onChange={handleChange}
              className="w-full bg-[#f9fafb] dark:bg-[#111827] rounded-lg py-3 px-4 text-[#002147] dark:text-white placeholder-gray-400 focus:outline-none border border-blue-100 dark:border-blue-700"
              placeholder="https://..."
            />
          </div>

          {editMode && (
            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="btn bg-[#fdc800] text-[#002147] border-none hover:bg-[#eab308]"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setForm({
                    name: user.displayName || "",
                    image: user.photoURL || "",
                  });
                }}
                className="btn btn-ghost text-[#002147] dark:text-white"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Profile;