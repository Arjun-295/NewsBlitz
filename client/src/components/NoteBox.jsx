import React from "react";
import { SquarePen, Trash } from "lucide-react";

function NoteBox() {
  return (
    <div className="h-[50vh] bg-[#454955] rounded-xl">
      <div className="p-10 pb-8 text-4xl font-bold ">Title</div>
      <div className="px-10 pb-5 text-2xl">Description</div>
      <div className="relative top-32 flex left-36">
        <button className="p-2 hover:scale-125">
          <SquarePen className="size-8" />
        </button>
        <button className="p-2 hover:scale-125">
          <Trash className="size-8" />
        </button>
      </div>
    </div>
  );
}

export default NoteBox;
