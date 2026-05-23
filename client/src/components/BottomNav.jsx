import { NavLink, useLocation } from "react-router-dom";
import { Book, Newspaper, Bot, LayoutGrid, Star } from "lucide-react";

const navItems = [
  { label: "Feed", path: "/user/news-feed", icon: LayoutGrid },
  { label: "All News", path: "/user/all-news", icon: Newspaper },
  { label: "Bot", path: "/user/news-bot", icon: Bot },
  { label: "Note", path: "/user/notes", icon: Book },
  { label: "Saved", path: "/user/bookmarks", icon: Star },
];

function BottomNav() {
  const location = useLocation();

  // Hide the navigation bar on landing, login, and register pages
  const hideOnPaths = ["/", "/user/login", "/user/register", "/user/news-bot"];
  if (hideOnPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50">
      <div className="max-w-md mx-auto px-4">
        <nav className="bg-[#16171b]/80 border border-white/5 shadow-2xl backdrop-blur-xl rounded-2xl">
          <ul className="flex justify-around items-center py-2 px-1">
            {navItems.map(({ label, path, icon: Icon }) => (
              <li key={label}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition duration-300 ${isActive
                      ? "text-cyan-400 font-semibold"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`
                  }
                >
                  <Icon className="size-5" />
                  <span className="text-[10px] font-semibold tracking-wider uppercase">{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default BottomNav;
