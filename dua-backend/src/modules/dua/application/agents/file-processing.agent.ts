import { Injectable, Logger } from '@nestjs/common';
import { FileRecordEntity, DocumentType } from '../../../files/domain/entities/file-record.entity';
import { ExtractionStrategyFactory } from '../../infrastructure/extraction/extraction-strategy.factory';
import { S3StorageService } from '../../../files/infrastructure/storage/s3-storage.service';

/**
 * Agent #1 — File Processing Agent.
 * Identifies each file's document type and routes it to the appropriate
 * text extraction strategy via the ExtractionStrategyFactory.
 * Fetches the raw file buffer from S3 before delegating to the strategy.
 */
@Injectable()
export class FileProcessingAgent {
  private readonly logger = new Logger(FileProcessingAgent.name);

  constructor(
    private readonly strategyFactory: ExtractionStrategyFactory,
    private readonly storageService: S3StorageService,
  ) {}

  /**
   * Downloads the file from S3 and extracts its raw text using the correct strategy.
   * @returns Extracted plain text content of the file.
   */
  async process(file: FileRecordEntity): Promise<string> {
    throw new Error('Not implemented');
  }
}
