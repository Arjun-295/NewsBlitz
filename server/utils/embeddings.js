import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function embedTexts(texts) {
  const response = await client.embeddings.create({
    model: "text-embedding-3-small", // cheap & good
    input: texts,
  });

  return response.data.map((d) => d.embedding);
}
