import { ChromaClient } from "chromadb";
import { GoogleGeminiEmbeddingFunction } from "@chroma-core/google-gemini";
import dotenv from "dotenv";

dotenv.config();

const embedder = new GoogleGeminiEmbeddingFunction({
  apiKey: process.env.GEMINI_API_KEY,
});

export const chroma = new ChromaClient({
  host: process.env.CHROMA_HOST || "localhost",
  port: parseInt(process.env.CHROMA_PORT) || 8000,
  ssl: process.env.CHROMA_SSL === "true" || false,
});

export const getNewsCollections = async () => {
  return await chroma.getOrCreateCollection({
    name: "news_articles",
    embeddingFunction: embedder, // ✅ THIS IS THE KEY
  });
};

const collection = await getNewsCollections();
const count = await collection.count();
console.log("Total Documents:", count);
