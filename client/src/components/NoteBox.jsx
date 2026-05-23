import React from "react";
import { SquarePen, Trash } from "lucide-react";

function NoteBox({ id, title = "Untitled Note", description = "No description available", onDelete, onEdit }) {
  return (
    <div className="h-[280px] bg-[#16181d]/90 border border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1 hover:border-cyan-500/20 hover:shadow-2xl hover:shadow-cyan-500/5 transition-all duration-300 relative group">
      <div className="overflow-hidden flex-1 flex flex-col">
        <div className="text-xl font-bold text-white mb-3 line-clamp-1 group-hover:text-cyan-400 transition-colors">
          {title}
        </div>
        <div className="text-sm text-gray-400 overflow-y-auto pr-2 custom-scroll flex-1 leading-relaxed line-clamp-5">
          {description}
        </div>
      </div>
      
      <div className="flex justify-end gap-3 mt-4 pt-3 border-t border-white/5">
        {onEdit && (
          <button 
            onClick={() => onEdit(id)} 
            className="p-1.5 hover:scale-110 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition duration-200 active:scale-95"
            title="Edit Note"
          >
            <SquarePen className="size-4" />
          </button>
        )}
        {onDelete && (
          <button 
            onClick={() => onDelete(id)} 
            className="p-1.5 hover:scale-110 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition duration-200 active:scale-95"
            title="Delete Note"
          >
            <Trash className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export default NoteBox;
