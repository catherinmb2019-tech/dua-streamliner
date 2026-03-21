import { WordProcessor } from "./WordProcessor";
import { ExcelProcessor } from "./ExcelProcessor";
import { PdfProcessor } from "./PdfProcessor";
import { ImageProcessor } from "./ImageProcessor";

export class ProcessorFactory {
  static getProcessor(type: string) {
    switch (type) {
      case "docx":
        return new WordProcessor();
      case "xlsx":
        return new ExcelProcessor();
      case "pdf":
        return new PdfProcessor();
      default:
        return new ImageProcessor();
    }
  }
}