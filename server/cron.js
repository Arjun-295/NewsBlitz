import cron from "node-cron";
import { getNewsCollections } from "./config/chroma.js";
import { runScraper } from "./web-scraping/runScraper.js";

// Keep track of the script running or not.
let isRunning = false;

// Function to wipe existing news and immediately scrape fresh ones
export const cleanupAndScrape = async () => {
  if (isRunning) {
    console.log("Cleanup/ingestion job already running. Skipping...");
    return;
  }
  
  isRunning = true;
  console.log(`[${new Date().toISOString()}] Starting midnight ChromaDB cleanup and fresh scrape...`);

  try {
    const collection = await getNewsCollections();

    console.log("Wiping all existing documents in ChromaDB collection...");
    try {
      await collection.delete();
      console.log("✅ Wiped all documents successfully.");
    } catch (err) {
      console.warn("⚠️ Database wipe failed or was already empty:", err.message);
    }

    console.log("Running scraper for fresh daily ingestion...");
    await runScraper();
    console.log(`[${new Date().toISOString()}] Midnight cleanup and fresh scrape complete!`);

  } catch (error) {
    console.error("Error during midnight ChromaDB cleanup & scrape:", error);
  } finally {
    isRunning = false;
  }
};

// Start the cron job
// The cleanup and fresh scrape runs daily at midnight.
// Additional scrapers run every 8 hours to keep the news fresh.
export const startCronJobs = () => {
    console.log("News cleanup and fresh scrape cron job initialized (runs daily at midnight).");
    cron.schedule("0 0 * * *", () => {
      cleanupAndScrape();
    });
    
    console.log("News scraper cron job initialized (runs every 8 hours).");
    cron.schedule("0 */8 * * *", () => {
      runScraper();
    });
};
