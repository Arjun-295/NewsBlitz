import React from "react";
import Navbar from "../components/Navbar";

function CreateNote() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#454955] via-[#2e3032] to-[#1f2123] text-white pb-28">
      <div className="max-w-full pt-7">
        <Navbar />
      </div>
      {/* Create Note */}
      <div>
        <h1 className="w-fit mx-auto pt-5 text-5xl font-bold">Create Note</h1>
        <div className="grid grid-cols-2 max-w-7xl w-6xl mx-auto">
          <div className="pl-10">
            <div className="pt-8 flex flex-col">
              <label htmlFor="title" className="text-2xl font-semibold pb-3">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="max-w-lg px-3 py-4 text-lg outline-none text-black"
              />
            </div>
            <div className="py-8 flex flex-col">
              <label
                htmlFor="description"
                className="text-2xl font-semibold pb-3"
              >
                Description
              </label>
              <textarea
                type="text"
                id="title"
                rows={5}
                className="max-w-lg px-3 py-4 text-lg outline-none text-black"
                style={{ resize: "none", overflow: "none" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNote;
