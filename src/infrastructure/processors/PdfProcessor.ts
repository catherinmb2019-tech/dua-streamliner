import { DocumentProcessor } from "./DocumentProcessor";

export class PdfProcessor implements DocumentProcessor {
  async process(file: File) {
    console.log("Reading PDF:", file.name);
    return { type: "pdf", content: "mock pdf text" };
  }
}