import Parser from "rss-parser";
import { newsService } from "../services/feedService.js";

const parser = new Parser();

const feeds = [
  "https://techcrunch.com/feed/",
  "https://www.theverge.com/rss/index.xml",
  "https://www.wired.com/feed/rss",
  "https://www.digitaltrends.com/rss/",
];

export const newsList = async (req, res) => {
  try {
    const allFeed = await getAllNews();
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
