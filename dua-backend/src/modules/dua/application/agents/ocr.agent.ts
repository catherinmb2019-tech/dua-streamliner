import { Injectable, Logger } from '@nestjs/common';
import { IOcrEngine } from '../../infrastructure/ocr/ocr-engine.interface';

/**
 * Agent #2 — OCR Agent.
 * Applied exclusively to IMAGE-type documents (JPEG, PNG, TIFF).
 * Delegates pixel-to-text conversion to the configured OCR engine implementation,
 * which can be tuned for accuracy vs. performance via AppConfig thresholds.
 */
@Injectable()
export class OcrAgent {
  private readonly logger = new Logger(OcrAgent.name);

  constructor(private readonly ocrEngine: IOcrEngine) {}

  /**
   * Runs OCR on the provided image buffer and returns extracted text.
   * @param imageBuffer  Raw image bytes (JPEG / PNG / TIFF).
   * @param fileName     Original file name (used for format hints).
   */
  async extractText(imageBuffer: Buffer, fileName: string): Promise<string> {
    throw new Error('Not implemented');
  }
}
