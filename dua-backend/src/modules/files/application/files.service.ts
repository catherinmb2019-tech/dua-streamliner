import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { IFileRepository, FILE_REPOSITORY } from '../domain/interfaces/file-repository.interface';
import { S3StorageService } from '../infrastructure/storage/s3-storage.service';
import { FileTypeDetector } from '../infrastructure/detection/file-type-detector';
import { FileRecordEntity, FileProcessingStatus } from '../domain/entities/file-record.entity';
import { AppConfig } from '../../../config/app.config';

/**
 * Application service for the Files bounded context.
 * Orchestrates file ingestion: validation, S3 upload, type detection, and metadata persistence.
 * Does NOT perform text extraction (delegated to DUA processing pipeline).
 */
@Injectable()
export class FilesService {
  constructor(
    @Inject(FILE_REPOSITORY)
    private readonly fileRepository: IFileRepository,
    private readonly storageService: S3StorageService,
    private readonly fileTypeDetector: FileTypeDetector,
    private readonly appConfig: AppConfig,
  ) {}

  /**
   * Ingests a batch of files for a given DUA process.
   * Validates count and size limits, uploads to S3, and persists metadata records.
   * @throws BadRequestException if limits are exceeded.
   */
  async ingestFiles(
    duaProcessId: string,
    files: Express.Multer.File[],
  ): Promise<FileRecordEntity[]> {
    throw new Error('Not implemented');
  }

  /**
   * Retrieves all file records belonging to a DUA process.
   */
  async findByDuaProcessId(duaProcessId: string): Promise<FileRecordEntity[]> {
    return this.fileRepository.findByDuaProcessId(duaProcessId);
  }

  /**
   * Retrieves a single file record by ID.
   * @throws NotFoundException if the record does not exist.
   */
  async findById(id: string): Promise<FileRecordEntity> {
    const file = await this.fileRepository.findById(id);
    if (!file) throw new NotFoundException(`File record ${id} not found`);
    return file;
  }

  /**
   * Generates a short-lived pre-signed S3 URL for the caller to download the raw file.
   */
  async getDownloadUrl(id: string): Promise<string> {
    throw new Error('Not implemented');
  }

  /**
   * Marks a file record as failed with an error message.
   * Called by the processing pipeline when extraction cannot be completed.
   */
  async markFailed(id: string, errorMessage: string): Promise<void> {
    await this.fileRepository.updateStatus(id, FileProcessingStatus.FAILED, errorMessage);
  }
}
