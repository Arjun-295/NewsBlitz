import Parser from "rss-parser";
import { newsService } from "../services/feedService.js";

const parser = new Parser({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    Accept: "application/rss+xml, application/xml, text/xml; q=0.1",
  },
});

const feeds = [
  "https://techcrunch.com/feed/",
  "https://www.theverge.com/rss/index.xml",
  "https://www.wired.com/feed/rss",
  "https://www.digitaltrends.com/rss/",
];

export const newsList = async (req, res) => {
  try {
    const allFeed = await newsService();
    return res.json({
      success: true,
      data: allFeed,
    });
  } catch (err) {
    console.error("Error While Fetching News", err);
    return res.status(500).json({ error: "Failed to load RSS feeds" });
  }
};

export const getFeed = async (req, res) => {
  try {
    const allFeed = await newsService();
    return res.json({
      success: true,
      data: allFeed,
    });
  } catch (err) {
    console.error("Error While Fetching News", err);
    return res.status(500).json({ error: "Failed to load RSS feeds" });
  }

  // console.log(JSON.stringify(allFeed, null, 2));
};
