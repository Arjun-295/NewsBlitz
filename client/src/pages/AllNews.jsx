import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NewsBox from "../components/NewsBox";
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
  const fetchNewsList = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await api.get("getFeed");
      const data = response.data.data ?? [];
      const formattedNews = data.map((source, index) => ({
        id: source.source || `feed-${index}`,
        title: source.source,
        titleLink: links[index],
        items: source.items || [],
      }));

      setListNews(formattedNews);
    } catch (error) {
      console.log("Error Occured", error);
      setError("Unable to load news please try again");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNewsList();
  }, [fetchNewsList]);

  console.log(listNews);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#454955] via-[#2e3032] to-[#1f2123] text-white">
      {/* Navbar */}
      <div className="max-w-7xl mx-auto pt-6 px-4">
        <Navbar />
      </div>

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 mt-10 mb-6">
        <h1 className="text-4xl font-bold tracking-wide">
          Latest <span className="text-[#FFCC66]">News</span>
        </h1>
      </div>

      {/* 4 Box Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {loading && (
          <p className="text-center text-gray-300">Loading news...</p>
        )}

        {error && <p className="text-center text-red-400">{error}</p>}

        {!loading && !error && (
          <div className="grid gap-7 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {listNews.map((feed) => (
              <NewsBox
                key={feed.id}
                title={feed.title}
                titleLink={feed.titleLink}
                items={feed.items}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllNews;
