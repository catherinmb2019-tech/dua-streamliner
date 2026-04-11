import { Injectable } from '@nestjs/common';
import { DocumentType } from '../../domain/entities/file-record.entity';

/**
 * Infrastructure service responsible for identifying the document type of a file.
 * Uses both the file extension and MIME type (content-based validation) to classify
 * files into PDF, WORD, EXCEL, IMAGE, or UNKNOWN categories.
 */
@Injectable()
export class FileTypeDetector {
  private readonly mimeTypeMap: Record<string, DocumentType> = {
    'application/pdf': DocumentType.PDF,
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': DocumentType.WORD,
    'application/msword': DocumentType.WORD,
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': DocumentType.EXCEL,
    'application/vnd.ms-excel': DocumentType.EXCEL,
    'image/jpeg': DocumentType.IMAGE,
    'image/png': DocumentType.IMAGE,
    'image/tiff': DocumentType.IMAGE,
    'image/webp': DocumentType.IMAGE,
  };

  /**
   * Determines the DocumentType from the MIME type.
   * Falls back to extension-based detection if MIME type is ambiguous.
   */
  detect(mimeType: string, originalName: string): DocumentType {
    return this.mimeTypeMap[mimeType] ?? this.detectByExtension(originalName);
  }

  /** Secondary classification based on file extension. */
  private detectByExtension(originalName: string): DocumentType {
    const ext = originalName.split('.').pop()?.toLowerCase();
    const extensionMap: Record<string, DocumentType> = {
      pdf: DocumentType.PDF,
      docx: DocumentType.WORD,
      doc: DocumentType.WORD,
      xlsx: DocumentType.EXCEL,
      xls: DocumentType.EXCEL,
      jpg: DocumentType.IMAGE,
      jpeg: DocumentType.IMAGE,
      png: DocumentType.IMAGE,
      tiff: DocumentType.IMAGE,
      tif: DocumentType.IMAGE,
    };
    return ext ? (extensionMap[ext] ?? DocumentType.UNKNOWN) : DocumentType.UNKNOWN;
  }
}
