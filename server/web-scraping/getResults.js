import { getNewsCollections } from "../config/chroma.js";

const collection = await getNewsCollections();

const results = await collection.get({
  include: ["documents"],
  limit: 20,
});

console.log(results);
