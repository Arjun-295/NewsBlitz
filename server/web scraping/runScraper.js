import { scrapeAndStore } from "./scrapeAndStore.js";
import { newsService } from "../services/feedService.js";

const feeds = await newsService();

const urls = feeds
  .flatMap((feed) => feed.items.map((item) => item.link))
  .slice(0, 20);

await scrapeAndStore(urls);
console.log("Scraping complete");
