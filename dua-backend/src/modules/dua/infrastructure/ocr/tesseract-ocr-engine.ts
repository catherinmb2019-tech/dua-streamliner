import { Injectable, Logger } from '@nestjs/common';
import { IOcrEngine } from './ocr-engine.interface';

/**
 * Tesseract-based implementation of IOcrEngine.
 * Wraps the tesseract.js (or native Tesseract binary) OCR engine.
 * Accuracy vs. performance trade-off is configurable via AppConfig thresholds.
 */
@Injectable()
export class TesseractOcrEngine implements IOcrEngine {
  private readonly logger = new Logger(TesseractOcrEngine.name);

  async recognizeText(imageBuffer: Buffer, fileName: string): Promise<string> {
    throw new Error('Not implemented');
  }
}
