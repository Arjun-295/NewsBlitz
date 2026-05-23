import React, { useCallback, useEffect, useState } from "react";
import { Rss, Zap, Globe, TrendingUp, SlidersHorizontal, RotateCw, Star } from "lucide-react";
import Navbar from "../components/Navbar";
import api from "../api/api";

const links = [
  "https://techcrunch.com",
  "https://www.theverge.com",
  "https://www.wired.com",
  "https://www.digitaltrends.com",
];

function AllNews() {
  const [listNews, setListNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("recent");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [bookmarkedItems, setBookmarkedItems] = useState({});

  const fetchBookmarks = useCallback(async () => {
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
  }, []);

  const handleToggleBookmark = async (e, article) => {
    e.stopPropagation();
    e.preventDefault();
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

  const fetchNewsList = useCallback(async (isSilent = false) => {
    try {
      if (!isSilent) setLoading(true);
      setError(null);
      const response = await api.get("getFeed");
      const data = response.data.data ?? [];
      const formattedNews = data.map((source, index) => ({
        id: source.source || `feed-${index}`,
        title: source.source,
        titleLink: links[index] || "https://techcrunch.com",
        items: source.items || [],
      }));

      setListNews(formattedNews);
    } catch (error) {
      console.error("Error Occured", error);
      setError("Unable to load news please try again");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchNewsList();
    fetchBookmarks();
  }, [fetchNewsList, fetchBookmarks]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchNewsList(true);
  };

  // Helper: Get Icon & Colors for each source
  const getSourceIcon = (sourceName) => {
    const name = (sourceName || "").toLowerCase();
    if (name.includes("techcrunch")) {
      return { Icon: Rss, color: "text-gray-400 bg-white/5 border-white/10" };
    }
    if (name.includes("verge")) {
      return { Icon: Zap, color: "text-cyan-400 bg-cyan-400/5 border-cyan-400/10" };
    }
    if (name.includes("wired")) {
      return { Icon: Globe, color: "text-amber-500 bg-amber-500/5 border-amber-500/10" };
    }
    return { Icon: TrendingUp, color: "text-purple-400 bg-purple-400/5 border-purple-400/10" };
  };

  // Helper: Convert pubDate to Relative Time Ago
  const getRelativeTime = (pubDate) => {
    if (!pubDate || pubDate.includes("not available")) return "some time ago";
    const date = new Date(pubDate);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    // Prevent negative offsets due to minor server clock differences
    const mins = Math.max(1, diffMins);
    
    if (mins < 60) return `${mins}m ago`;
    const diffHours = Math.floor(mins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  // Helper: Categorize based on keywords in title & description
  const getCategory = (item) => {
    const title = (item.title || "").toLowerCase();
    const desc = (item.description || "").toLowerCase();
    
    if (
      title.includes("hack") || 
      title.includes("steal") || 
      title.includes("breach") || 
      title.includes("security") || 
      title.includes("cyber") || 
      desc.includes("security") || 
      desc.includes("breach")
    ) {
      return { label: "CYBERSECURITY", style: "bg-red-500/10 text-red-400 border-red-500/10" };
    }
    if (
      title.includes("gemini") || 
      title.includes("ai ") || 
      title.includes("intelligence") || 
      title.includes("llm") || 
      title.includes("gpt") || 
      title.includes("claude") || 
      desc.includes("ai ")
    ) {
      return { label: "AI", style: "bg-purple-500/10 text-purple-400 border-purple-500/10" };
    }
    if (
      title.includes("figma") || 
      title.includes("design") || 
      title.includes("canvas") || 
      title.includes("creative") || 
      title.includes("ui") || 
      title.includes("ux")
    ) {
      return { label: "DESIGN", style: "bg-pink-500/10 text-pink-400 border-pink-500/10" };
    }
    if (
      title.includes("science") || 
      title.includes("health") || 
      title.includes("medical") || 
      title.includes("space") || 
      title.includes("nasa")
    ) {
      return { label: "SCIENCE", style: "bg-emerald-500/10 text-emerald-400 border-emerald-500/10" };
    }
    if (
      title.includes("robot") || 
      title.includes("maritime") || 
      title.includes("hive mind") || 
      title.includes("swarm") || 
      title.includes("autonomous") || 
      title.includes("drone")
    ) {
      return { label: "ROBOTICS", style: "bg-cyan-500/10 text-cyan-400 border-cyan-500/10" };
    }
    if (
      title.includes("climate") || 
      title.includes("energy") || 
      title.includes("water") || 
      title.includes("carbon") || 
      title.includes("earth") || 
      title.includes("data center") || 
      title.includes("utah")
    ) {
      return { label: "ENVIRONMENT", style: "bg-yellow-500/10 text-yellow-400 border-yellow-500/10" };
    }
    if (
      title.includes("opinion") || 
      title.includes("weeps") || 
      title.includes("heart") || 
      title.includes("essay")
    ) {
      return { label: "OPINION", style: "bg-orange-500/10 text-orange-400 border-orange-500/10" };
    }
    if (
      title.includes("analysis") || 
      title.includes("useful") || 
      title.includes("report") || 
      title.includes("insight") || 
      title.includes("google")
    ) {
      return { label: "ANALYSIS", style: "bg-blue-500/10 text-blue-400 border-blue-500/10" };
    }
    return { label: "TECH", style: "bg-gray-500/10 text-gray-400 border-gray-500/10" };
  };

  // Combine and Chronologically Sort
  const combinedNews = listNews.flatMap((feed) =>
    feed.items.map((item) => ({
      ...item,
      source: feed.title,
      sourceLink: feed.titleLink,
    }))
  );

  const sortedNews = [...combinedNews].sort((a, b) => {
    const dateA = new Date(a.pubDate);
    const dateB = new Date(b.pubDate);
    return dateB - dateA;
  });

  const displayNews = activeTab === "recent"
    ? sortedNews
    : [...combinedNews].sort((a, b) => {
        // Mock a popularity index using character count hashes to toggle sorting results
        const scoreA = (a.title?.length || 0) + ((a.description?.length || 0) % 11);
        const scoreB = (b.title?.length || 0) + ((b.description?.length || 0) % 11);
        return scoreB - scoreA;
      });

  // Filter based on parent Navbar search
  const filteredNews = displayNews.filter((item) => {
    const query = searchTerm.toLowerCase();
    return (
      item.title?.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query) ||
      item.source?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-white relative overflow-hidden pb-32">
      {/* 🔮 Aesthetic Ambient Glow Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] translate-x-1/2 translate-y-1/2 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Navbar Container */}
      <div className="max-w-7xl mx-auto pt-6 px-6 relative z-20">
        <Navbar 
          showSearch={true} 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />
      </div>

      {/* Main Page Body */}
      <div className="max-w-7xl mx-auto px-6 mt-14 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-white">
              Latest <span className="text-cyan-400 font-extrabold">Intelligence</span>
            </h1>
            <p className="text-gray-400 text-sm mt-2 font-medium">
              Consolidated real-time feed from global technology authorities.
            </p>
          </div>

          {/* Live Updates badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#16181d] border border-white/5 rounded-full text-xs font-semibold text-gray-300 shadow-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="tracking-wide">Live Updates</span>
          </div>
        </div>

        {/* Outer Feed Box Container */}
        <div className="bg-[#16181d]/90 border border-white/5 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
          {/* Feed Toolbar / Tabs Subbar */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-white/[0.01]">
            <div className="flex items-center gap-6 text-sm">
              <button
                onClick={() => setActiveTab("recent")}
                className={`transition-all duration-200 pb-1 font-semibold tracking-wide ${
                  activeTab === "recent"
                    ? "text-white border-b-2 border-cyan-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Recent
              </button>
              <button
                onClick={() => setActiveTab("popular")}
                className={`transition-all duration-200 pb-1 font-semibold tracking-wide ${
                  activeTab === "popular"
                    ? "text-white border-b-2 border-cyan-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Popular
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 text-gray-400">
              <button title="Filters" className="hover:text-white transition duration-200">
                <SlidersHorizontal className="size-4" />
              </button>
              <button
                title="Refresh Feed"
                onClick={handleRefresh}
                className="hover:text-white transition duration-200 cursor-pointer active:scale-90"
              >
                <RotateCw className={`size-4 ${(loading || isRefreshing) ? "animate-spin text-cyan-400" : ""}`} />
              </button>
            </div>
          </div>

          {/* List Feed View */}
          <div className="divide-y divide-white/5">
            {loading && !isRefreshing && (
              <div className="py-24 text-center text-gray-400 flex flex-col items-center gap-3">
                <RotateCw className="size-8 animate-spin text-cyan-400" />
                <p className="font-medium text-sm tracking-wider">Acquiring intelligence streams...</p>
              </div>
            )}

            {error && !loading && (
              <div className="py-24 text-center text-red-400 font-medium">
                {error}
              </div>
            )}

            {!loading && !error && filteredNews.length === 0 && (
              <div className="py-24 text-center text-gray-400 font-medium text-sm">
                No intelligence matching your query was found.
              </div>
            )}

            {!loading && !error && filteredNews.length > 0 && (
              filteredNews.map((item, index) => {
                const iconInfo = getSourceIcon(item.source);
                const catInfo = getCategory(item);

                return (
                  <div
                    key={`${item.source}-${index}`}
                    className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 py-5 px-6 hover:bg-white/[0.02] transition duration-200 group"
                  >
                    {/* Source Icon Column */}
                    <div className="flex items-center gap-3 md:gap-0 shrink-0">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 ${iconInfo.color}`}>
                        <iconInfo.Icon className="size-5" />
                      </div>
                      <span className="md:hidden text-gray-400 font-bold text-[10px] tracking-wider uppercase">
                        {item.source}
                      </span>
                    </div>

                    {/* Source Name Column (Desktop) */}
                    <div className="hidden md:block w-32 shrink-0">
                      <span className="text-gray-400 font-extrabold text-[11px] tracking-widest uppercase">
                        {item.source}
                      </span>
                    </div>

                    {/* Article Content Column */}
                    <div className="flex-1 min-w-0">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm md:text-base font-semibold text-gray-100 group-hover:text-cyan-400 transition-colors block leading-snug md:leading-normal"
                      >
                        {item.title}
                      </a>
                      <p className="text-gray-400 text-xs md:text-sm mt-1 line-clamp-1">
                        {item.description}
                      </p>
                    </div>

                    {/* Category Pill and Elapsed Time Column */}
                    <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 mt-2 md:mt-0">
                      <span className={`px-2.5 py-1 rounded-md text-[9px] font-black border tracking-widest ${catInfo.style}`}>
                        {catInfo.label}
                      </span>
                      <span className="text-gray-500 text-xs font-semibold w-16 text-right shrink-0">
                        {getRelativeTime(item.pubDate)}
                      </span>
                      <button 
                        onClick={(e) => handleToggleBookmark(e, item)}
                        className="p-1.5 hover:bg-white/10 rounded-full transition-colors shrink-0"
                        title={bookmarkedItems[item.link] ? "Remove Bookmark" : "Save Bookmark"}
                      >
                        <Star className={`size-4 ${bookmarkedItems[item.link] ? "fill-cyan-400 text-cyan-400" : "text-gray-500 hover:text-white"}`} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllNews;
