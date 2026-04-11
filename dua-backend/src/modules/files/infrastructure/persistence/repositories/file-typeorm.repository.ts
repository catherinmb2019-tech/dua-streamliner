import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileRecordEntity } from '../../../domain/entities/file-record.entity';
import { IFileRepository } from '../../../domain/interfaces/file-repository.interface';

/**
 * TypeORM implementation of IFileRepository.
 * Handles all CRUD operations for the file_records table.
 */
@Injectable()
export class FileTypeOrmRepository implements IFileRepository {
  constructor(
    @InjectRepository(FileRecordEntity)
    private readonly ormRepository: Repository<FileRecordEntity>,
  ) {}

  async findById(id: string): Promise<FileRecordEntity | null> {
    return this.ormRepository.findOneBy({ id });
  }

  async findByDuaProcessId(duaProcessId: string): Promise<FileRecordEntity[]> {
    return this.ormRepository.findBy({ duaProcessId });
  }

  async save(file: FileRecordEntity): Promise<FileRecordEntity> {
    return this.ormRepository.save(file);
  }

  async saveMany(files: FileRecordEntity[]): Promise<FileRecordEntity[]> {
    return this.ormRepository.save(files);
  }

  async updateStatus(
    id: string,
    status: FileRecordEntity['status'],
    errorMessage?: string,
  ): Promise<void> {
    await this.ormRepository.update(id, { status, errorMessage: errorMessage ?? null });
  }

  async updateExtractedText(id: string, text: string): Promise<void> {
    await this.ormRepository.update(id, { extractedText: text });
  }
}
