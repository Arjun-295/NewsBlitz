import { getFeed, newsList } from "../controllers/feedController.js";
import express from "express";
import { chatWithNews } from "../controllers/newsChat.js";
import { authMiddleware } from "../controllers/auth.js";
import { getNewsCollections } from "../config/chroma.js";
import { runScraper } from "../web-scraping/runScraper.js";

const router = express.Router();

router.get("/getFeed", getFeed);
// router.get("/allNewsList", newsList);
router.post("/newsChat", authMiddleware, chatWithNews);

// Seed-test route to populate a test document in ChromaDB
router.get("/seed-test", async (req, res) => {
  try {
    const collection = await getNewsCollections();

    // Use a unique ID for the seed test document
    const seedId = `seed-${Date.now()}`;
    await collection.add({
      ids: [seedId],
      documents: ["OpenAI releases new AI model."],
      metadatas: [
        {
          source: "https://openai.com/blog",
          title: "OpenAI Releases New AI Model",
          chunkIndex: 0,
        },
      ],
    });

    res.json({
      success: true,
      message: "Test document added successfully!",
      id: seedId,
    });
  } catch (error) {
    console.error("Seed test error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Scrape-trigger route to manually start ingestion of RSS feeds in the background
router.get("/scrape-trigger", async (req, res) => {
  try {
    console.log("Manual scraping triggered...");
    // Run the scraper asynchronously in the background to avoid Render timeout limits
    runScraper()
      .then(() => console.log("Manual scraping completed successfully!"))
      .catch((err) => console.error("Manual scraping failed:", err));

    res.json({
      success: true,
      message: "Scraping pipeline triggered! Ingesting latest tech articles in the background...",
    });
  } catch (error) {
    console.error("Scrape trigger error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
