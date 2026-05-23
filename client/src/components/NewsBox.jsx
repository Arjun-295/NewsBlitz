import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark } from "lucide-react";

function NewsBox({ title, titleLink, items, index }) {
  const [bookmarkedItems, setBookmarkedItems] = useState({});

  const handleBookmark = (e, itemIndex) => {
    e.preventDefault();
    setBookmarkedItems((prev) => ({
      ...prev,
      [itemIndex]: !prev[itemIndex],
    }));
    // Note: Add your backend API call here to actually save the bookmark
  };

  return (
    <div
      key={index}
      className="bg-[#2f3237] h-[50vh] rounded-xl p-6 shadow-lg 
                    hover:shadow-xl transition-shadow duration-300 
                    flex flex-col"
    >
      {/* Title */}
      <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-600 pb-2">
        <Link to={titleLink}>{title}</Link>
      </h2>

      {/* Scrollable News List */}
      <div className="space-y-4 overflow-y-auto pr-2 custom-scroll flex-1">
        {items.map((item, itemIndex) => (
          <div
            key={itemIndex}
            className="bg-[#3b3e44] p-4 rounded-lg cursor-pointer 
                       hover:bg-[#4a4d54] transition"
          >
            <Link to={item.link} className="flex justify-between items-start gap-3">
              <p className="text-gray-100 text-sm mt-1 leading-relaxed flex-1">{item.title}</p>
              <button 
                onClick={(e) => handleBookmark(e, itemIndex)}
                className="mt-1 p-1.5 hover:bg-white/10 rounded-full transition-colors shrink-0"
                title={bookmarkedItems[itemIndex] ? "Remove Bookmark" : "Save Bookmark"}
              >
                <Bookmark className={`size-4 transition-colors ${bookmarkedItems[itemIndex] ? "fill-cyan-400 text-cyan-400" : "text-gray-400 hover:text-white"}`} />
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsBox;
