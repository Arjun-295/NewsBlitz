import React, { useEffect, useState } from "react";
import { 
  Home, 
  TrendingUp, 
  User, 
  Briefcase, 
  Globe, 
  Zap, 
  ChevronRight, 
  RotateCw,
  Rss,
  Star
} from "lucide-react";
import Navbar from "../components/Navbar";
import api from "../api/api";

function NewsFeed() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookmarkedItems, setBookmarkedItems] = useState({});

  const fetchBookmarks = async () => {
    try {
      const res = await api.get("/bookmarks");
      if (res.data) {
        const urls = res.data.reduce((acc, curr) => {
          acc[curr.url] = true;
          return acc;
        }, {});
        setBookmarkedItems(urls);
      }
    } catch (err) {
      console.error("Failed to fetch bookmarks", err);
    }
  };

  const handleToggleBookmark = async (e, article) => {
    e.stopPropagation();
    try {
      await api.post("/bookmarks/toggle", {
        title: article.title,
        url: article.link,
        urlToImage: "",
        source: article.source,
      });
      setBookmarkedItems(prev => ({
        ...prev,
        [article.link]: !prev[article.link]
      }));
    } catch (err) {
      console.error("Failed to toggle bookmark", err);
    }
  };

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("getFeed");
      const data = res.data.data ?? [];
      
      let items = [];
      data.forEach((source) => {
        const sourceName = source.source || "Unknown";
        const sourceLink = source.titleLink || "";
        (source.items || []).forEach((item) => {
          items.push({
            title: item.title || "No Title",
            link: item.link || "#",
            pubDate: item.pubDate || new Date().toISOString(),
            description: item.description || "",
            source: sourceName,
            sourceLink: sourceLink,
          });
        });
      });

      // Sort chronologically (Recent first)
      items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
      
      // Grab top 5 items
      setNewsItems(items.slice(0, 5));
    } catch (err) {
      console.error("Error occurred while fetching feed:", err);
      setError("Unable to load technology briefings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    fetchBookmarks();
  }, []);

  // Helper: Convert pubDate to Relative Time Ago (Uppercase)
  const getRelativeTime = (pubDate) => {
    if (!pubDate || pubDate.includes("not available")) return "SOME TIME AGO";
    const date = new Date(pubDate);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const mins = Math.max(1, diffMins);
    
    if (mins < 60) return `${mins} MIN AGO`;
    const diffHours = Math.floor(mins / 60);
    if (diffHours < 24) return `${diffHours}H AGO`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}D AGO`;
  };

  // Helper: Categorize based on keywords in title
  const getCategoryLabel = (titleText) => {
    const title = (titleText || "").toLowerCase();
    if (title.includes("hack") || title.includes("steal") || title.includes("breach") || title.includes("security") || title.includes("cyber")) {
      return "CYBERSECURITY";
    }
    if (title.includes("gemini") || title.includes("ai ") || title.includes("intelligence") || title.includes("llm") || title.includes("gpt") || title.includes("claude")) {
      return "ARTIFICIAL INTEL";
    }
    if (title.includes("figma") || title.includes("design") || title.includes("canvas") || title.includes("creative") || title.includes("ui") || title.includes("ux")) {
      return "DESIGN";
    }
    if (title.includes("science") || title.includes("health") || title.includes("medical") || title.includes("space") || title.includes("nasa")) {
      return "SCIENCE";
    }
    if (title.includes("robot") || title.includes("maritime") || title.includes("hive mind") || title.includes("swarm") || title.includes("autonomous") || title.includes("drone")) {
      return "ROBOTICS";
    }
    if (title.includes("climate") || title.includes("energy") || title.includes("water") || title.includes("carbon") || title.includes("data center") || title.includes("utah")) {
      return "ENVIRONMENT";
    }
    return "ECO TECH";
  };

  const [art1, art2, art3, art4, art5] = newsItems;

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-white relative overflow-hidden pb-32 lg:pl-16 font-sans">
      {/* 🔮 Ambient Glow Backdrop circles */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] translate-x-1/2 translate-y-1/2 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* 🧭 Sleek Vertical Left Icon Sidebar on Desktop */}
      <div className="fixed left-0 top-0 bottom-0 z-30 w-16 bg-[#0c0d0e]/60 border-r border-white/5 flex flex-col items-center py-6 gap-8 hidden lg:flex backdrop-blur-md">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
          <Zap className="size-5 fill-cyan-400/20" />
        </div>
        <div className="flex flex-col gap-6 text-gray-500 items-center w-full mt-4">
          <button className="p-2 hover:text-white transition duration-200 text-cyan-400">
            <Home className="size-5" />
          </button>
          <button className="p-2 hover:text-white transition duration-200">
            <TrendingUp className="size-5" />
          </button>
          <button className="p-2 hover:text-white transition duration-200">
            <User className="size-5" />
          </button>
          <button className="p-2 hover:text-white transition duration-200">
            <Briefcase className="size-5" />
          </button>
          <button className="p-2 hover:text-white transition duration-200">
            <Globe className="size-5" />
          </button>
        </div>
      </div>

      {/* Navbar Container */}
      <div className="max-w-7xl mx-auto pt-6 px-6 relative z-20">
        <Navbar />
      </div>

      {/* Main Page Content */}
      <div className="max-w-7xl mx-auto px-6 mt-14 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <ChevronRight className="size-8 text-cyan-400 hidden sm:inline" />
              Briefings
            </h1>
            <p className="text-gray-400 text-sm mt-2 font-medium">
              Latest tech and global news distilled for the elite.
            </p>
          </div>

          {/* Glowing updates badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#16181d] border border-white/5 rounded-full text-xs font-semibold text-gray-300 shadow-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="tracking-wide">Live Feed</span>
          </div>
        </div>

        {/* Loading state skeleton */}
        {loading && (
          <div className="py-32 text-center flex flex-col items-center gap-3 text-gray-400">
            <RotateCw className="size-8 animate-spin text-cyan-400" />
            <p className="font-medium text-sm tracking-wider">Acquiring briefings streams...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="py-24 text-center text-red-400 font-medium">
            {error}
          </div>
        )}

        {/* Main Grid View */}
        {!loading && !error && newsItems.length > 0 && (
          <div className="space-y-6">
            {/* Top row: 1 Large highlight on left, 1 secondary box on right */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Box 1: Large Main highlight Card */}
              {art1 && (
                <div 
                  className="lg:col-span-2 h-[450px] rounded-2xl overflow-hidden border border-white/5 hover:border-cyan-500/20 hover:shadow-2xl hover:shadow-cyan-500/5 duration-300 relative group cursor-pointer flex flex-col justify-end p-8 bg-cover bg-center"
                  style={{ 
                    backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 60%, transparent 100%), url('https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=800&auto=format&fit=crop')` 
                  }}
                  onClick={() => window.open(art1.link, "_blank")}
                >
                  <div className="relative z-10">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-0.5 bg-cyan-500 text-black text-[9px] font-black tracking-widest rounded-md uppercase">
                          TRENDING
                        </span>
                        <span className="text-[10px] font-black text-white/90 tracking-widest uppercase">
                          {getCategoryLabel(art1.title)}
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                          • {getRelativeTime(art1.pubDate)}
                        </span>
                      </div>
                      <button 
                        onClick={(e) => handleToggleBookmark(e, art1)}
                        className="p-2 bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-md transition-colors z-20"
                      >
                        <Star className={`size-5 ${bookmarkedItems[art1.link] ? "fill-cyan-400 text-cyan-400" : "text-white"}`} />
                      </button>
                    </div>

                    <h2 className="text-xl md:text-3xl font-black tracking-tight text-white leading-snug group-hover:text-cyan-400 transition-colors">
                      {art1.title}
                    </h2>
                  </div>
                </div>
              )}

              {/* Box 2: Top Right companion widget */}
              {art2 && (
                <div 
                  className="bg-[#16181d]/90 border border-white/5 rounded-2xl p-6 flex flex-col justify-between h-[450px] hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/5 duration-300 group cursor-pointer"
                  onClick={() => window.open(art2.link, "_blank")}
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <div className="text-[10px] font-black tracking-widest text-[#00e5ff] uppercase flex items-center gap-2">
                        {getCategoryLabel(art2.title)}
                        <span className="text-gray-500">•</span>
                        <span>{getRelativeTime(art2.pubDate)}</span>
                      </div>
                      <button 
                        onClick={(e) => handleToggleBookmark(e, art2)}
                        className="p-1 hover:bg-white/10 rounded-full transition-colors z-20"
                      >
                        <Star className={`size-4 ${bookmarkedItems[art2.link] ? "fill-cyan-400 text-cyan-400" : "text-gray-400 hover:text-white"}`} />
                      </button>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-white mt-4 leading-normal group-hover:text-cyan-400 transition-colors">
                      {art2.title}
                    </h3>
                  </div>

                  <div className="flex justify-between items-center text-gray-500 font-black text-[11px] tracking-widest uppercase border-t border-white/5 pt-4 mt-6">
                    <span>{art2.source}</span>
                    <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Row: 3 Smaller columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Box 3 */}
              {art3 && (
                <div 
                  className="bg-[#16181d]/90 border border-white/5 rounded-2xl p-5 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/5 duration-300 group cursor-pointer"
                  onClick={() => window.open(art3.link, "_blank")}
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <div className="text-[9px] font-black tracking-widest text-[#00e5ff] uppercase">
                        {getCategoryLabel(art3.title)} • {getRelativeTime(art3.pubDate)}
                      </div>
                      <button 
                        onClick={(e) => handleToggleBookmark(e, art3)}
                        className="p-1 hover:bg-white/10 rounded-full transition-colors z-20 -mt-1 -mr-1"
                      >
                        <Star className={`size-4 ${bookmarkedItems[art3.link] ? "fill-cyan-400 text-cyan-400" : "text-gray-400 hover:text-white"}`} />
                      </button>
                    </div>
                    <h4 className="text-sm font-bold text-white mt-3 leading-snug group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {art3.title}
                    </h4>
                  </div>

                  <div className="flex justify-between items-center text-gray-500 font-bold text-[10px] tracking-wider uppercase border-t border-white/5 pt-3 mt-5">
                    <span>{art3.source}</span>
                    <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              )}

              {/* Box 4 */}
              {art4 && (
                <div 
                  className="bg-[#16181d]/90 border border-white/5 rounded-2xl p-5 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/5 duration-300 group cursor-pointer"
                  onClick={() => window.open(art4.link, "_blank")}
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <div className="text-[9px] font-black tracking-widest text-[#00e5ff] uppercase">
                        {getCategoryLabel(art4.title)} • {getRelativeTime(art4.pubDate)}
                      </div>
                      <button 
                        onClick={(e) => handleToggleBookmark(e, art4)}
                        className="p-1 hover:bg-white/10 rounded-full transition-colors z-20 -mt-1 -mr-1"
                      >
                        <Star className={`size-4 ${bookmarkedItems[art4.link] ? "fill-cyan-400 text-cyan-400" : "text-gray-400 hover:text-white"}`} />
                      </button>
                    </div>
                    <h4 className="text-sm font-bold text-white mt-3 leading-snug group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {art4.title}
                    </h4>
                  </div>

                  <div className="flex justify-between items-center text-gray-500 font-bold text-[10px] tracking-wider uppercase border-t border-white/5 pt-3 mt-5">
                    <span>{art4.source}</span>
                    <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              )}

              {/* Box 5 */}
              {art5 && (
                <div 
                  className="bg-[#16181d]/90 border border-white/5 rounded-2xl p-5 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/5 duration-300 group cursor-pointer"
                  onClick={() => window.open(art5.link, "_blank")}
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <div className="text-[9px] font-black tracking-widest text-[#00e5ff] uppercase">
                        {getCategoryLabel(art5.title)} • {getRelativeTime(art5.pubDate)}
                      </div>
                      <button 
                        onClick={(e) => handleToggleBookmark(e, art5)}
                        className="p-1 hover:bg-white/10 rounded-full transition-colors z-20 -mt-1 -mr-1"
                      >
                        <Star className={`size-4 ${bookmarkedItems[art5.link] ? "fill-cyan-400 text-cyan-400" : "text-gray-400 hover:text-white"}`} />
                      </button>
                    </div>
                    <h4 className="text-sm font-bold text-white mt-3 leading-snug group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {art5.title}
                    </h4>
                  </div>

                  <div className="flex justify-between items-center text-gray-500 font-bold text-[10px] tracking-wider uppercase border-t border-white/5 pt-3 mt-5">
                    <span>{art5.source}</span>
                    <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsFeed;
