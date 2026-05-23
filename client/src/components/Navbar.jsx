import React from "react";
import { CircleUserRound, LogOut, Search } from "lucide-react";
import { useAuth, UserButton, useClerk } from "@clerk/clerk-react";
import { useNavigate, NavLink, Link } from "react-router-dom";

function Navbar({ searchTerm = "", onSearchChange = () => {}, showSearch = false }) {
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleCustomLogout = async () => {
    if (isSignedIn) {
      try {
        await signOut();
      } catch (e) {
        console.warn("Clerk signout warning:", e);
      }
    }
    localStorage.removeItem("token");
    localStorage.removeItem("auth_provider");
    navigate("/user/login");
  };

  return (
    <div className="w-full bg-[#16181d]/85 backdrop-blur-xl px-6 py-3 flex justify-between items-center rounded-2xl shadow-xl border border-white/5">
      {/* Brand and Nav Links */}
      <div className="flex items-center gap-8">
        <Link to="/" className="text-2xl font-extrabold text-white tracking-wider hover:opacity-90 transition">
          NewsBlitz
        </Link>
        <div className="hidden md:flex items-center gap-6 text-xs font-semibold tracking-wider uppercase">
          <NavLink
            to="/user/news-feed"
            className={({ isActive }) =>
              `transition duration-200 ${isActive ? "text-cyan-400" : "text-gray-400 hover:text-white"}`
            }
          >
            Trending
          </NavLink>
          <NavLink
            to="/user/all-news"
            className={({ isActive }) =>
              `transition duration-200 ${isActive ? "text-cyan-400" : "text-gray-400 hover:text-white"}`
            }
          >
            ALL News
          </NavLink>
          <NavLink
            to="/user/tech"
            className={({ isActive }) =>
              `transition duration-200 ${isActive ? "text-cyan-400" : "text-gray-400 hover:text-white"}`
            }
          >
            Tech
          </NavLink>
          <NavLink
            to="/user/bookmarks"
            className={({ isActive }) =>
              `transition duration-200 ${isActive ? "text-cyan-400" : "text-gray-400 hover:text-white"}`
            }
          >
            Bookmarks
          </NavLink>
        </div>
      </div>

      {/* Search Bar and Auth State */}
      <div className="flex items-center gap-6 flex-1 justify-end">
        {showSearch && (
          <div className="relative max-w-xs w-full hidden sm:block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="size-4 text-gray-500" />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Intel..."
              className="w-full bg-[#0d0e10] text-white pl-9 pr-4 py-2 rounded-xl text-xs font-medium border border-white/5 focus:outline-none focus:border-cyan-400/50 placeholder-gray-600 transition duration-300"
            />
          </div>
        )}

        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <button
              onClick={handleCustomLogout}
              title="Log Out"
              className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-xl transition duration-200 cursor-pointer active:scale-95"
            >
              <CircleUserRound className="size-6 text-gray-300 hover:text-white" />
              <LogOut className="size-5 text-gray-400 hover:text-red-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

