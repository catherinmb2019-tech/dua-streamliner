import { Injectable, Logger } from '@nestjs/common';
import { MappingAgent } from '../agents/mapping.agent';
import { ValidationAgent } from '../agents/validation.agent';
import { DocumentGenerationAgent } from '../agents/document-generation.agent';
import { S3StorageService } from '../../../files/infrastructure/storage/s3-storage.service';
import { DuaProcessEntity } from '../../domain/entities/dua-process.entity';

/**
 * Orchestrates the DUA document generation pipeline.
 *
 * Pipeline stages (executed sequentially):
 *   1. MappingAgent            — maps extracted fields to the DUA template schema
 *   2. ValidationAgent         — validates consistency, totals, dates, currency
 *   3. DocumentGenerationAgent — renders the final .docx file
 *   4. S3 upload               — stores the generated document and records the S3 key
 *
 * Triggered after the FileProcessingPipeline completes successfully.
 */
@Injectable()
export class DuaGenerationPipeline {
  private readonly logger = new Logger(DuaGenerationPipeline.name);

  constructor(
    private readonly mappingAgent: MappingAgent,
    private readonly validationAgent: ValidationAgent,
    private readonly documentGenerationAgent: DocumentGenerationAgent,
    private readonly storageService: S3StorageService,
  ) {}

  /**
   * Executes the full generation pipeline.
   * @param process  DuaProcessEntity with populated extractedData.
   * @returns The S3 key of the uploaded DUA document.
   */
  async run(process: DuaProcessEntity): Promise<string> {
    throw new Error('Not implemented');
  }
}
