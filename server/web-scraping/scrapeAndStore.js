import { getNewsCollections } from "../config/chroma.js";
import { scrapeAndClean } from "./cleanWebDocument.js";
import { chunkWithLangchain } from "./chunkWithLangchain.js";
import { feeds } from "../services/feedService.js";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function scrapeAndStore(urls) {
  const collection = await getNewsCollections();

  for (const url of urls) {
    const existing = await collection.get({ where: { source: url }, limit: 1 });

    if (existing && existing.ids && existing.ids.length > 0) {
      console.log("Skipping, already stored:", url);
      continue;
    }
    try {
      const { title, content } = await scrapeAndClean(url);
      const chunks = await chunkWithLangchain(content);

      const documents = chunks.map((chunk, i) => ({
        id: `${url}#chunk-${i}`,
        document: `${title}\n\n${chunk}`,
        metadata: {
          source: url,
          chunkIndex: i,
          title,
        },
      }));

      await collection.add({
        ids: documents.map((d) => d.id),
        documents: documents.map((d) => d.document),
        metadatas: documents.map((d) => d.metadata),
      });
      console.log(`Stored ${documents.length} chunks from`, url);
      await sleep(1000);
    } catch (err) {
      console.log("Failed:", url, err.message);
    }

    await sleep(1000);
  }
}
