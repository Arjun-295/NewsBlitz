import { ChromaClient } from "chromadb";
import { GoogleGeminiEmbeddingFunction } from "@chroma-core/google-gemini";
import dotenv from "dotenv";

dotenv.config();

// Gemini embedding function
const embedder = new GoogleGeminiEmbeddingFunction({
  apiKey: process.env.GEMINI_API_KEY,
});

// Chroma client
export const chroma = new ChromaClient({
  host: process.env.CHROMA_HOST || "localhost",
  port: parseInt(process.env.CHROMA_PORT) || 8000,
  ssl: process.env.CHROMA_SSL === "true",
});

// Cache collection instance
let cachedCollection = null;

// Sleep helper for retries
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Get or create collection with retry logic
export const getNewsCollections = async (retries = 5) => {
  try {
    // Return cached collection if already connected
    if (cachedCollection) {
      return cachedCollection;
    }

    console.log("Connecting to ChromaDB...");

    cachedCollection = await chroma.getOrCreateCollection({
      name: "news_articles",
      embeddingFunction: embedder,
    });

    const count = await cachedCollection.count();

    console.log("✅ Connected to ChromaDB");
    console.log("📄 Total Documents:", count);

    return cachedCollection;
  } catch (error) {
    console.error("❌ ChromaDB connection failed:", error.message);

    if (retries <= 0) {
      throw error;
    }

    console.log(`🔄 Retrying in 10 seconds... (${retries} retries left)`);

    await sleep(10000);

    return getNewsCollections(retries - 1);
  }
};
