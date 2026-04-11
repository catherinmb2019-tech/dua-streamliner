/**
 * Port for the OCR engine.
 * Decouples the OcrAgent from any specific OCR library or cloud service.
 * Configurable for accuracy vs. performance trade-offs via AppConfig.
 */
export interface IOcrEngine {
  /**
   * Converts an image buffer to plain text using optical character recognition.
   * @param imageBuffer  Raw image bytes.
   * @param fileName     File name hint for format detection.
   */
  recognizeText(imageBuffer: Buffer, fileName: string): Promise<string>;
}

export const OCR_ENGINE = Symbol('IOcrEngine');
