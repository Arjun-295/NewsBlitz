import { getNewsCollections } from "../config/chroma.js";

export async function getContext(query) {
  const collection = await getNewsCollections();

  const results = await collection.query({
    queryTexts: [query],
    nResults: 20,
  });

  return results.documents.flat().join("\n\n");
}
