import { Injectable } from '@nestjs/common';
import { DocumentType } from '../../../../files/domain/entities/file-record.entity';
import { IDocumentExtractor } from '../../../domain/interfaces/document-extractor.interface';

/**
 * Extraction strategy for PDF documents.
 * Uses a PDF parsing library to extract text layer content.
 * Falls back to notifying the OCR agent if the PDF is image-only (no text layer).
 */
@Injectable()
export class PdfExtractor implements IDocumentExtractor {
  readonly supportedType = DocumentType.PDF;

  async extract(buffer: Buffer, fileName: string): Promise<string> {
    throw new Error('Not implemented');
  }
}
