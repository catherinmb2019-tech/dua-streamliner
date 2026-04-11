import { Injectable } from '@nestjs/common';
import { DocumentType } from '../../../../files/domain/entities/file-record.entity';
import { IDocumentExtractor } from '../../../domain/interfaces/document-extractor.interface';

/**
 * Extraction strategy for Word documents (.docx / .doc).
 * Parses the Open XML structure and extracts paragraph text in reading order.
 */
@Injectable()
export class WordExtractor implements IDocumentExtractor {
  readonly supportedType = DocumentType.WORD;

  async extract(buffer: Buffer, fileName: string): Promise<string> {
    throw new Error('Not implemented');
  }
}
