import { DuaProcessEntity, DuaProcessStatus } from '../entities/dua-process.entity';

/**
 * Domain contract for DUA process persistence.
 * Implemented by DuaProcessTypeOrmRepository in the infrastructure layer.
 */
export interface IDuaProcessRepository {
  findById(id: string): Promise<DuaProcessEntity | null>;
  findByIdWithFiles(id: string): Promise<DuaProcessEntity | null>;
  findAllByUser(userId: string): Promise<DuaProcessEntity[]>;
  save(process: DuaProcessEntity): Promise<DuaProcessEntity>;
  updateStatus(id: string, status: DuaProcessStatus, errorMessage?: string): Promise<void>;
  updateExtractedData(id: string, data: Record<string, unknown>): Promise<void>;
  updateOutputS3Key(id: string, s3Key: string): Promise<void>;
}

export const DUA_PROCESS_REPOSITORY = Symbol('IDuaProcessRepository');
