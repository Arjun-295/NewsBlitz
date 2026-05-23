import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Bookmark, Trash2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api/api.js";

// Placeholder data for UI demonstration until backend is connected
const placeholderBookmarks = [
  {
    _id: "1",
    title: "AI Breakthrough: New Model Achieves Human-Level Reasoning on Complex Tasks",
    source: "TechCrunch",
    url: "https://techcrunch.com",
    createdAt: new Date().toISOString()
  },
  {
    _id: "2",
    title: "Global Markets Rally as Tech Stocks Hit Record Highs",
    source: "Bloomberg",
    url: "https://bloomberg.com",
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    _id: "3",
    title: "The Future of Web Development: What to Expect in 2027",
    source: "Wired",
    url: "https://wired.com",
    createdAt: new Date(Date.now() - 172800000).toISOString()
  }
];

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        setLoading(true);
        const res = await api.get("/bookmarks");
        setBookmarks(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookmarks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/bookmarks/${id}`);
      setBookmarks(bookmarks.filter(b => b._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#111214] text-white font-sans selection:bg-cyan-500/30">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 pt-6 pb-32">
        <Navbar showSearch={false} />

        <div className="mt-12 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
            <div className="p-3 bg-cyan-500/10 rounded-xl">
              <Bookmark className="size-8 text-cyan-400 fill-cyan-400/20" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Saved Intel</h1>
              <p className="text-gray-400 mt-1">Your personal collection of bookmarked articles.</p>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
            </div>
          ) : bookmarks.length === 0 ? (
            <div className="text-center py-20 bg-[#16181d] rounded-2xl border border-white/5 shadow-xl">
              <Bookmark className="size-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-300">No bookmarks yet</h3>
              <p className="text-gray-500 mt-2">Articles you save will appear here.</p>
              <Link to="/user/news-feed" className="mt-6 inline-block bg-white/5 hover:bg-white/10 text-cyan-400 font-semibold px-6 py-2.5 rounded-xl transition duration-300">
                Browse News
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {bookmarks.map((bookmark) => (
                <div 
                  key={bookmark._id}
                  className="bg-[#1a1c23] hover:bg-[#20232a] group transition duration-300 rounded-2xl p-5 border border-white/5 flex flex-col sm:flex-row gap-4 sm:items-center justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider bg-cyan-400/10 px-2 py-1 rounded-md">
                        {bookmark.source || "News"}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">
                        {new Date(bookmark.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <a 
                      href={bookmark.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-lg font-bold text-gray-100 hover:text-white leading-snug line-clamp-2"
                    >
                      {bookmark.title}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-2 pt-2 sm:pt-0 sm:border-l sm:border-white/10 sm:pl-4">
                    <a 
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="p-2.5 text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-xl transition duration-200"
                      title="Open Original Link"
                    >
                      <ExternalLink className="size-5" />
                    </a>
                    <button 
                      onClick={() => handleDelete(bookmark._id)}
                      className="p-2.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition duration-200"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="size-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Bookmarks;
