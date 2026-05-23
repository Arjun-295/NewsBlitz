import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/api";
import Loading from "../components/Loading";
import Error from "../components/Error";

function EditNote() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const response = await api.get(`notes/getNote/${id}`);
        setTitle(response.data.title);
        setDescription(response.data.description);
      } catch (err) {
        console.error("Failed to fetch note:", err);
        setErrorMsg("Failed to load the note. It may have been deleted.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchNote();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setErrorMsg("Please fill in both the title and description.");
      return;
    }

    try {
      setSubmitting(true);
      setErrorMsg("");
      await api.patch(`notes/updateNote/${id}`, { title, description });
      navigate("/user/notes");
    } catch (err) {
      console.error("Failed to update note:", err);
      setErrorMsg(err.response?.data?.message || "Failed to update note. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0c0d0e] flex items-center justify-center text-white">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-white relative overflow-hidden pb-32">
      {/* 🔮 Ambient Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] translate-x-1/2 translate-y-1/2 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Navbar Container */}
      <div className="max-w-7xl mx-auto pt-6 px-6 relative z-20">
        <Navbar />
      </div>

      {/* Page Title */}
      <div className="max-w-4xl mx-auto px-6 mt-14 mb-8 text-center relative z-10">
        <h1 className="text-4xl font-black tracking-tight text-white">
          Edit <span className="text-cyan-400 font-extrabold">Note</span>
        </h1>
        <p className="text-gray-400 text-sm mt-2 font-medium">
          Modify your existing technical briefing.
        </p>
      </div>

      {/* Form Card */}
      <form 
        onSubmit={handleSubmit} 
        className="max-w-4xl mx-auto mt-8 bg-[#16181d]/90 border border-white/5 rounded-2xl p-8 shadow-2xl backdrop-blur-md relative z-10"
      >
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center text-xs font-semibold text-red-400 tracking-wide">
            {errorMsg}
          </div>
        )}

        {/* Form Fields Stack */}
        <div className="space-y-6">
          {/* Title Field */}
          <div className="flex flex-col">
            <label htmlFor="title" className="text-xs font-bold text-gray-300 mb-2 uppercase tracking-wider">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title"
              className="px-4 py-3 text-sm rounded-xl bg-[#0d0e10] border border-white/10 text-white placeholder-gray-600 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition duration-300 font-medium"
              required
            />
            <p className="text-[11px] text-gray-500 mt-1.5 font-medium">
              Keep it short and meaningful
            </p>
          </div>

          {/* Description Field */}
          <div className="flex flex-col">
            <label htmlFor="description" className="text-xs font-bold text-gray-300 mb-2 uppercase tracking-wider">
              Description
            </label>
            <textarea
              id="description"
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write your note here..."
              className="px-4 py-3 text-sm rounded-xl bg-[#0d0e10] border border-white/10 text-white placeholder-gray-600 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition duration-300 font-medium resize-none"
              required
            />
            <p className="text-[11px] text-gray-500 mt-1.5 font-medium">
              Update context or details
            </p>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10 border-t border-white/5 pt-8">
          <button
            type="submit"
            disabled={submitting}
            className="bg-cyan-500 hover:bg-cyan-400 text-black active:scale-95 transition-all duration-200 px-8 py-3 rounded-xl text-sm font-bold shadow-lg shadow-cyan-500/10 hover:shadow-cyan-400/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Updating..." : "Update Note"}
          </button>
          
          <button
            type="button"
            onClick={() => navigate("/user/notes")}
            className="bg-white/5 hover:bg-white/10 active:scale-95 transition px-8 py-3 rounded-xl text-sm font-bold border border-white/10 text-gray-300 hover:text-white duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditNote;
