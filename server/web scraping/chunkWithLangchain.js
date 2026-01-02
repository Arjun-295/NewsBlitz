import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export const chunkWithLangchain = async (text) => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 800,
    chunkOverlap: 150,
    separators: ["\n\n", "\n", ". ", " "],
  });
  return await splitter.splitText(text);
};
