import Parser from "rss-parser";
// import { getAllNews } from "../services/feedService.js";

const parser = new Parser();
const feeds = [
  "https://techcrunch.com/feed/",
  "https://www.theverge.com/rss/index.xml",
  "https://www.wired.com/feed/rss",
  "https://www.digitaltrends.com/rss/",
];

export const newsService = async () => {
  try {
    let allFeed = await Promise.all(
      feeds.map(async (feed) => {
        const feedData = await parser.parseURL(feed);

        return {
          source: feedData.title,
          items: feedData.items.slice(0, 5).map((item) => ({
            title: item.title || "Title is not available",
            link: item.link || "Link is not available",
            pubDate: item.pubDate || "Published Date is not available",
            description:
              item.description ||
              item.content ||
              item.summary ||
              "Description is not available",
          })),
        };
      })
    );
    // allFeed = allFeed.slice(0, 5);

    return allFeed;
  } catch (err) {
    console.error("Error while fetching feeds:", err);
    throw err;
  }
};
