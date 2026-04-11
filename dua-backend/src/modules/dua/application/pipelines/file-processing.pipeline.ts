import { Injectable, Logger } from '@nestjs/common';
import { FileProcessingAgent } from '../agents/file-processing.agent';
import { OcrAgent } from '../agents/ocr.agent';
import { ExtractionAgent } from '../agents/extraction.agent';
import { DuaProcessEntity } from '../../domain/entities/dua-process.entity';
import { FileRecordEntity, DocumentType } from '../../../files/domain/entities/file-record.entity';

/**
 * Orchestrates the multi-step document processing pipeline for a DUA process.
 *
 * Pipeline stages (executed sequentially per file, then consolidated):
 *   1. FileProcessingAgent  — identifies file type and routes to appropriate processor
 *   2. OcrAgent             — applied to IMAGE files to extract text via OCR
 *   3. ExtractionAgent      — analyses consolidated text via AI/NLP to extract DUA fields
 *
 * This service runs as part of an internal background job to avoid blocking the HTTP layer.
 */
@Injectable()
export class FileProcessingPipeline {
  private readonly logger = new Logger(FileProcessingPipeline.name);

  constructor(
    private readonly fileProcessingAgent: FileProcessingAgent,
    private readonly ocrAgent: OcrAgent,
    private readonly extractionAgent: ExtractionAgent,
  ) {}

  /**
   * Executes the full processing pipeline for all files in a DUA process.
   * Extracts text from each file, consolidates results, and runs semantic extraction.
   * @returns Serialisable extracted data map for persistence.
   */
  async run(process: DuaProcessEntity): Promise<Record<string, unknown>> {
    throw new Error('Not implemented');
  }

  /** Processes a single file: detects type, extracts text (with OCR if needed). */
  private async processFile(file: FileRecordEntity): Promise<string> {
    throw new Error('Not implemented');
  }

  /** Consolidates text from all processed files into a single string for NLP analysis. */
  private consolidateText(extractedTexts: string[]): string {
    throw new Error('Not implemented');
  }
}
