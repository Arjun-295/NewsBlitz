import cron from "node-cron";
import { getNewsCollections } from "./config/chroma.js";

// Keep track of the script running or not.
let isRunning = false;

// Function to delete old news articles
export const deleteOldNews = async () => {
  if (isRunning) {
    console.log("Cleanup job already running. Skipping...");
    return;
  }
  
  isRunning = true;
  console.log(`[${new Date().toISOString()}] Starting ChromaDB cleanup job...`);

  try {
    const collection = await getNewsCollections();

    // Get the current date and subtract 7 days to get the cutoff date
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 7);
    
    // Convert the cutoff date to a timestamp or string format that matches your ingestion format
    // Ideally, you should add an ingestedDate during the scrapeAndStore phase.
    const cutoffTimestamp = cutoffDate.getTime();

    // ChromaDB allows us to specify 'where' conditions
    // This assumes you add 'ingestedDate' to the metadata when storing articles.
    const result = await collection.delete({
       // Replace this with a query matching the structure of your metadata timestamp
      where: {
         // Example: If you stored an 'ingestedDate' field (number format)
        "ingestedDate": {
          "$lt": cutoffTimestamp 
        }
      }
    });

    console.log(`[${new Date().toISOString()}] Cleanup Complete!`);

  } catch (error) {
    console.error("Error during ChromaDB cleanup:", error);
  } finally {
    isRunning = false;
  }
};

// Start the cron job
// This cron expression "0 0 * * *" runs every day at midnight.
export const startCronJobs = () => {
    console.log("News cleanup cron job initialized (runs daily at midnight).");
    cron.schedule("0 0 * * *", () => {
      deleteOldNews();
    });
};
