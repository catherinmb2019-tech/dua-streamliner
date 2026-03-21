import { DocumentProcessor } from "./DocumentProcessor";

export class ImageProcessor implements DocumentProcessor {
  async process(file: File) {
    console.log("Running OCR:", file.name);
    return { type: "image", content: "mock OCR text" };
  }
}