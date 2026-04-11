import { Injectable } from '@nestjs/common';
import { DocumentType } from '../../../../files/domain/entities/file-record.entity';
import { IDocumentExtractor } from '../../../domain/interfaces/document-extractor.interface';

/**
 * Extraction strategy for Excel spreadsheets (.xlsx / .xls).
 * Iterates over all sheets and cells, serialising values to a structured text representation
 * that the NLP semantic extractor can analyse (e.g. "Sheet1 | Row 3 | Amount: 1200.00").
 */
@Injectable()
export class ExcelExtractor implements IDocumentExtractor {
  readonly supportedType = DocumentType.EXCEL;

  async extract(buffer: Buffer, fileName: string): Promise<string> {
    throw new Error('Not implemented');
  }
}
