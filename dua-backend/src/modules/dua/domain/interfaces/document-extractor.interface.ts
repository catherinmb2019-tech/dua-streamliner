import { DocumentType } from '../../../files/domain/entities/file-record.entity';

/**
 * Port for document text extraction.
 * Each DocumentType (PDF, WORD, EXCEL, IMAGE) has a concrete strategy implementation.
 * Consumed by the FileProcessingAgent via the ExtractionStrategyFactory.
 */
export interface IDocumentExtractor {
  /** The document type this extractor handles. */
  readonly supportedType: DocumentType;

  /**
   * Extracts raw text from the given file buffer.
   * @param buffer  Raw file bytes.
   * @param fileName Original file name (used for format hints).
   * @returns Plain text content of the document.
   */
  extract(buffer: Buffer, fileName: string): Promise<string>;
}

export const DOCUMENT_EXTRACTOR = Symbol('IDocumentExtractor');
