import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeAndClean(url) {
  const { data: html } = await axios.get(url, {
    timeout: 8000,
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0",
    },
  });

  const $ = cheerio.load(html);

  // ❌ Remove obvious noise (LESS aggressive)
  $("script, style, nav, footer, header, aside").remove();

  // ✅ Title
  const title =
    $("meta[property='og:title']").attr("content") ||
    $("h1").first().text() ||
    $("title").text() ||
    "";

  // ✅ Try site-aware extraction first
  let content = "";

  if (url.includes("techcrunch.com")) {
    content = $("div.article-content, article").text();
  } else if (url.includes("theverge.com")) {
    content = $("div[data-analytics-region='article body']").text();
  }

  // 🔁 Fallback: all paragraphs
  if (!content || content.trim().length < 300) {
    content = $("p")
      .map((_, el) => $(el).text())
      .get()
      .join("\n");
  }

  content = content.replace(/\s+/g, " ").trim();

  // 🚨 HARD GUARD
  if (content.length < 200) {
    throw new Error("Extracted content too short");
  }

  // 🔒 Token safety
  content = content.slice(0, 4000);

  return { title, content };
}
