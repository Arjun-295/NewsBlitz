import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";

function NewsFeed() {
  const [allNews, setAllNews] = useState([]);
  const fetchNews = async () => {
    try {
      const res = await api.get("getFeed");
      // console.log(res.data);
      // console.log(res.data.data[0].items[0].title);
      let news = [];
      res.data.data.forEach((source) => {
        source.items.forEach((item) => {
          news.push(item.title);
        });
      });
      setAllNews(news.slice(0, 5));
    } catch (err) {
      console.log("Error Occured", err);
    }
  };
  useEffect(() => {
    fetchNews();
  }, []);
  console.log(allNews);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#454955] via-[#2e3032] to-[#1f2123] text-white">
      {/* Navbar */}
      <div className="max-w-full pt-7">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex max-w-7xl h-96 mx-auto my-10 gap-6 px-4">
        {/* Main Box */}
        <div className="w-1/2 p-10 m-3 bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl shadow-xl text-white text-xl">
          <div className="font-bold text-5xl">{allNews[0]}</div>
          {/* <div className="text-3xl block pt-32">{allNews[0]}</div> */}
        </div>

        {/* Small 4 Cards */}
        <div className="grid grid-cols-2 w-1/2 my-3 mr-3 gap-4">
          {allNews.slice(1).map((news, i) => (
            <div
              key={i}
              className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl p-6 text-center text-lg shadow-lg"
            >
              <div>{news}</div>
            </div>
          ))}

          {/* <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl p-6 text-center text-lg shadow-lg">
            Box 3
          </div>

          <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl p-6 text-center text-lg shadow-lg">
            Box 4
          </div>

          <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl p-6 text-center text-lg shadow-lg">
            Box 5
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default NewsFeed;
