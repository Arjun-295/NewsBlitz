import { Plus } from "lucide-react";
import Navbar from "../components/Navbar";
import NoteBox from "../components/NoteBox";

function Notes() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#454955] via-[#2e3032] to-[#1f2123] text-white pb-28">
      <div className="max-w-full pt-7">
        <Navbar />
      </div>
      <div className="h-[70vh] overflow-y-auto custom-scroll">
        <div className="max-w-7xl mx-auto px-4 mt-5 mb-4 flex justify-between">
          <h1 className="text-4xl font-bold tracking-wide px-4 py-6">Notes</h1>
          <button className="flex items-center gap-2 text-xl font-bold tracking-wide leading-none bg-[#1f2123] px-6 border-black rounded-lg hover:text-black hover:bg-white hover:duration-500">
            <Plus className="h-6 w-6 align-middle" /> <span>Create New</span>
          </button>
        </div>
        <div className="max-w-7xl mx-auto mt-8 px-5">
          <div className="grid gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <NoteBox />
            <NoteBox />
            <NoteBox />
            <NoteBox />
            <NoteBox />
            <NoteBox />
            <NoteBox />
            <NoteBox />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notes;
