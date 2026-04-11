import { Injectable, Inject, NotFoundException, Logger } from '@nestjs/common';
import {
  IDuaProcessRepository,
  DUA_PROCESS_REPOSITORY,
} from '../domain/interfaces/dua-process-repository.interface';
import { DuaProcessEntity, DuaProcessStatus } from '../domain/entities/dua-process.entity';
import { FilesService } from '../../files/application/files.service';
import { FileProcessingPipeline } from './pipelines/file-processing.pipeline';
import { DuaGenerationPipeline } from './pipelines/dua-generation.pipeline';
import { StartDuaProcessDto } from '../presentation/dtos/start-dua-process.dto';

/**
 * Core application service for the DUA bounded context.
 * Orchestrates the full DUA lifecycle:
 *   1. Register a new process
 *   2. Trigger the file processing pipeline (async)
 *   3. Trigger the DUA generation pipeline (async, after processing)
 *   4. Expose status and result retrieval
 *
 * Heavy processing work is delegated to pipeline services to keep this class thin.
 */
@Injectable()
export class DuaProcessService {
  private readonly logger = new Logger(DuaProcessService.name);

  constructor(
    @Inject(DUA_PROCESS_REPOSITORY)
    private readonly duaProcessRepository: IDuaProcessRepository,
    private readonly filesService: FilesService,
    private readonly fileProcessingPipeline: FileProcessingPipeline,
    private readonly duaGenerationPipeline: DuaGenerationPipeline,
  ) {}

  /**
   * Registers a new DUA process in the database and returns its ID.
   * File ingestion is expected to follow via the Files controller.
   */
  async startProcess(dto: StartDuaProcessDto, userId: string): Promise<DuaProcessEntity> {
    throw new Error('Not implemented');
  }

  /**
   * Triggers the asynchronous document processing pipeline for a DUA process.
   * Called after all files have been uploaded. Transitions status to PROCESSING.
   */
  async triggerProcessing(processId: string): Promise<void> {
    throw new Error('Not implemented');
  }

  /**
   * Returns the current state (status, extracted data, files) of a DUA process.
   * @throws NotFoundException if the process does not exist.
   */
  async getProcessStatus(processId: string): Promise<DuaProcessEntity> {
    const process = await this.duaProcessRepository.findByIdWithFiles(processId);
    if (!process) throw new NotFoundException(`DUA process ${processId} not found`);
    return process;
  }

  /**
   * Returns all DUA processes initiated by the given user.
   */
  async listUserProcesses(userId: string): Promise<DuaProcessEntity[]> {
    return this.duaProcessRepository.findAllByUser(userId);
  }

  /**
   * Returns a pre-signed S3 URL for downloading the generated DUA document.
   * @throws NotFoundException if the process has not completed yet.
   */
  async getResultDownloadUrl(processId: string): Promise<string> {
    throw new Error('Not implemented');
  }
}
