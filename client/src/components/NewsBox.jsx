import React from "react";
import { Link } from "react-router-dom";

function NewsBox({ title, titleLink, items, index }) {
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
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-[#3b3e44] p-4 rounded-lg cursor-pointer 
                       hover:bg-[#4a4d54] transition"
          >
            {/* <h3 className="text-lg font-semibold text-[#FFCC66]">
              {item.title}
            </h3> */}
            <Link to={item.link}>
              <p className="text-gray-100 text-sm mt-1">{item.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsBox;
