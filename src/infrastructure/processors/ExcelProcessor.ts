import { DocumentProcessor } from "./DocumentProcessor";

export class ExcelProcessor implements DocumentProcessor {
  async process(file: File) {
    console.log("Reading Excel:", file.name);
    return { type: "excel", content: "mock data" };
  }
}