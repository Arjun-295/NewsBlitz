import Parser from "rss-parser";
// import { getAllNews } from "../services/feedService.js";

const parser = new Parser({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    Accept: "application/rss+xml, application/xml, text/xml; q=0.1",
  },
});

export const feeds = [
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
