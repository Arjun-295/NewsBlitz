import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Hammer, ArrowLeft } from "lucide-react";

function ComingSoon() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-white relative overflow-hidden flex flex-col pb-32">
      {/* 🔮 Ambient Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] translate-x-1/2 translate-y-1/2 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Navbar Container */}
      <div className="max-w-7xl mx-auto pt-6 px-6 relative z-20 w-full">
        <Navbar />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center relative z-10 -mt-20">
        <div className="w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 rounded-3xl flex items-center justify-center text-cyan-400 mb-8 shadow-2xl shadow-cyan-500/20">
          <Hammer className="size-10" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
          Coming <span className="text-cyan-400 font-extrabold">Soon</span>
        </h1>
        
        <p className="text-gray-400 text-lg max-w-md mx-auto mb-10 leading-relaxed font-medium">
          We're currently building this feature. Check back later to see what's new!
        </p>
        
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-bold text-sm uppercase tracking-wider px-8 py-3 rounded-xl transition duration-300 border border-white/10 hover:border-cyan-500/50"
        >
          <ArrowLeft className="size-4" /> Go Back
        </button>
      </div>
    </div>
  );
}

export default ComingSoon;
