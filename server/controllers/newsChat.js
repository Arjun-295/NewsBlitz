import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";
import { getNewsCollections } from "../config/chroma.js";

dotenv.config();

const model = new ChatOpenAI({
  model: "openai/gpt-oss-120b",
  apiKey: process.env.OPENAI_API_KEY,
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer": "http://localhost:5000",
      "X-Title": "NewsBlitz",
    },
  },
  temperature: 0,
  maxTokens: 1024,
});

export const chatWithNews = async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Missing query" });
  }

  try {
    const collection = await getNewsCollections();

    const results = await collection.query({
      queryTexts: [query],
      nResults: 20,
    });

    let context = "";
    const MAX_CHARS = 30000;

    for (const doc of results.documents.flat()) {
      if ((context + doc).length > MAX_CHARS) break;
      context += doc + "\n\n";
    }

    const prompt = `
You are a friendly, knowledgeable news assistant.

You must answer the user’s question using ONLY the information provided in the Context below.
Do not use outside knowledge.

If the context does not contain enough information to answer, respond exactly with:
"I don’t have context about it."

Your job:
- Understand what the news is mainly about.
- Identify what is most important or newsworthy.
- Explain it clearly, like a well-informed human, not a textbook.
- Prioritize clarity over completeness.
- If something matters, briefly explain why it matters.
- If something is minor or unclear, say so.

Response guidelines:
- If the user asks for a summary, give a concise summary of the news.
- If the user asks a specific question, answer it in **2–3 sentences**.
- Be conversational and helpful, not formal or robotic.
- Avoid jargon and marketing-style language.
- Never say “As an AI”.

Output format:
- One short paragraph, or
- Bullet points if they improve clarity (use sparingly).
- Short sentences and natural spacing.

Tone:
- Calm, conversational, confident
- Clear and direct
- Neutral and informative

If the context is incomplete:
- Say so briefly.
- Mention what information is missing, if obvious.

Context:
${context}

Question:
${query}`;
    const response = await model.invoke(prompt);

    return res.json({
      answer: response.content,
      sources: results.metadatas.flat().map((m) => m.source),
    });
  } catch (err) {
    console.error("Chat Error:", err);
    return res.status(500).json({ error: "Chat failed" });
  }
};
