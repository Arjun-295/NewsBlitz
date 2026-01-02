import React from "react";
import Navbar from "../components/Navbar";

function CreateNote() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#454955] via-[#2e3032] to-[#1f2123] text-white pb-28">
      {/* Navbar */}
      <div className="pt-7">
        <Navbar />
      </div>

      {/* Page Title */}
      <h1 className="text-center pt-5 text-5xl font-bold tracking-wide">
        Create Note
      </h1>

      {/* Form Card */}
      <div className="max-w-5xl mx-auto mt-8 bg-white/10 backdrop-blur-xl rounded-lg p-5 shadow-2xl">
        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Title Field */}
          <div className="flex flex-col">
            <label htmlFor="title" className="text-xl font-semibold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter note title"
              className="px-4 py-4 text-lg rounded bg-white/90 text-black outline-none focus:ring-4 focus:ring-red-400"
            />
            <p className="text-sm text-gray-300 mt-1">
              Keep it short and meaningful
            </p>
          </div>

          {/* Description Field */}
          <div className="flex flex-col">
            <label htmlFor="description" className="text-xl font-semibold mb-2">
              Description
            </label>
            <textarea
              id="description"
              rows={5}
              placeholder="Write your note here..."
              className="px-4 py-4 text-lg rounded bg-white/90 text-black outline-none focus:ring-4 focus:ring-red-400 resize-none"
            />
            <p className="text-sm text-gray-300 mt-1">
              Add more context or details
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button className="block mx-auto mt-14 bg-red-700 hover:bg-red-600 active:scale-95 transition px-10 py-4 rounded text-xl font-bold shadow-xl">
          Create Note
        </button>
      </div>
    </div>
  );
}

export default CreateNote;
