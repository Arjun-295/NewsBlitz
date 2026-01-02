import { NavLink } from "react-router-dom";
import { Book, Newspaper, Bot, LayoutGrid, Star } from "lucide-react";

const navItems = [
  { label: "Feed", path: "/user/news-feed", icon: LayoutGrid },
  { label: "All News", path: "/user/all-news", icon: Newspaper },
  { label: "Bot", path: "/user/news-bot", icon: Bot },
  { label: "Note", path: "/user/notes", icon: Book },
  { label: "Star", path: "/user/notes", icon: Star },
];

function BottomNav() {
  return (
    <div className="fixed bottom-6 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg rounded-3xl">
          <ul className="flex justify-around items-center py-3">
            {navItems.map(({ label, path, icon: Icon }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition ${
                      isActive
                        ? "bg-white/20 text-[#FFCC66]"
                        : "text-white hover:bg-white/10"
                    }`
                  }
                >
                  <Icon className="size-6" />
                  <span className="text-xs font-medium">{label}</span>
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
