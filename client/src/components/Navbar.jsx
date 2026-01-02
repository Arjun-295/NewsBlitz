import React from "react";
import { CircleUserRound } from "lucide-react";

function Navbar() {
  return (
    <div className="max-w-7xl w-6xl bg-white/10 backdrop-blur-xl mx-auto px-6 py-4 flex justify-between items-center rounded-3xl shadow-lg border border-white/20">
      <div className="p-2 text-3xl font-bold text-white tracking-wide">
        NewsBlitz
      </div>
      <div className="p-2 font-bold text-white flex items-center gap-3 cursor-pointer hover:text-indigo-300 transition">
        <CircleUserRound className={"size-10"} />
      </div>
    </div>
  );
}

export default Navbar;
