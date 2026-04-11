import { Injectable } from '@nestjs/common';
import { DocumentType } from '../../../files/domain/entities/file-record.entity';
import { IDocumentExtractor } from '../../domain/interfaces/document-extractor.interface';
import { PdfExtractor } from './strategies/pdf-extractor.strategy';
import { WordExtractor } from './strategies/word-extractor.strategy';
import { ExcelExtractor } from './strategies/excel-extractor.strategy';

/**
 * Factory that resolves the correct IDocumentExtractor strategy for a given DocumentType.
 * Implements the Strategy + Factory pattern to keep the pipeline decoupled from
 * concrete extraction implementations.
 */
@Injectable()
export class ExtractionStrategyFactory {
  private readonly strategies: Map<DocumentType, IDocumentExtractor>;

  constructor(
    private readonly pdfExtractor: PdfExtractor,
    private readonly wordExtractor: WordExtractor,
    private readonly excelExtractor: ExcelExtractor,
  ) {
    this.strategies = new Map<DocumentType, IDocumentExtractor>([
      [DocumentType.PDF, this.pdfExtractor],
      [DocumentType.WORD, this.wordExtractor],
      [DocumentType.EXCEL, this.excelExtractor],
      // IMAGE is handled separately by OcrAgent — not registered here
    ]);
  }

  /**
   * Returns the extractor strategy for the given document type.
   * @throws Error if no strategy is registered for the type (e.g. IMAGE, UNKNOWN).
   */
  getStrategy(documentType: DocumentType): IDocumentExtractor {
    const strategy = this.strategies.get(documentType);
    if (!strategy) {
      throw new Error(`No extraction strategy registered for document type: ${documentType}`);
    }
    return strategy;
  }

  /** Returns true if a non-OCR text extraction strategy exists for the type. */
  hasStrategy(documentType: DocumentType): boolean {
    return this.strategies.has(documentType);
  }
}
