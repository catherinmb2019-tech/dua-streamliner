import { DocumentProcessor } from "./DocumentProcessor";

export class WordProcessor implements DocumentProcessor {
  async process(file: File) {
    console.log("Reading Word:", file.name);
    return { type: "word", content: "mock text" };
  }
}