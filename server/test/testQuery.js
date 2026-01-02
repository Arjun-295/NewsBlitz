import { getNewsCollections } from "../config/chroma.js";

const collection = await getNewsCollections();

const results = await collection.query({
  queryTexts: ["startup trends"],
  nResults: 20,
});

console.log("Results:", results.documents);
