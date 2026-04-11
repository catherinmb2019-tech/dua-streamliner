import { FileRecordEntity } from '../entities/file-record.entity';

/**
 * Domain contract for file record persistence.
 * Implemented by FileTypeOrmRepository in the infrastructure layer.
 */
export interface IFileRepository {
  findById(id: string): Promise<FileRecordEntity | null>;
  findByDuaProcessId(duaProcessId: string): Promise<FileRecordEntity[]>;
  save(file: FileRecordEntity): Promise<FileRecordEntity>;
  saveMany(files: FileRecordEntity[]): Promise<FileRecordEntity[]>;
  updateStatus(id: string, status: FileRecordEntity['status'], errorMessage?: string): Promise<void>;
  updateExtractedText(id: string, text: string): Promise<void>;
}

export const FILE_REPOSITORY = Symbol('IFileRepository');
