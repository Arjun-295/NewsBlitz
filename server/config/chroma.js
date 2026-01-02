import { ChromaClient } from "chromadb";
import { GoogleGeminiEmbeddingFunction } from "@chroma-core/google-gemini";
import dotenv from "dotenv";

dotenv.config();

const embedder = new GoogleGeminiEmbeddingFunction({
  apiKey: process.env.GEMINI_API_KEY,
});

export const chroma = new ChromaClient({
  host: "localhost",
  port: 8000,
  ssl: false,
});

export const getNewsCollections = async () => {
  return await chroma.getOrCreateCollection({
    name: "news_articles",
    embeddingFunction: embedder, // ✅ THIS IS THE KEY
  });
};
