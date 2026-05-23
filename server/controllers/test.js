import { getNewsCollections } from "../config/chroma.js";

const collection = await getNewsCollections();

const results = await collection.query({
    queryTexts: ["JBL"],
    nResults: 20,
});

const link = await collection.get({ where: { source: 'https://www.digitaltrends.com/home-theater/jbl-made-the-most-stunning-transparent-earbuds-and-they-look-straight-out-of-the-matrix/' }, limit: 1 })
// console.log(link.metadatas[0].source)

console.log(await collection.get())