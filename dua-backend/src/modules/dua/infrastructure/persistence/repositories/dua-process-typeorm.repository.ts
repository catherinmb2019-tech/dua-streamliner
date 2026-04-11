import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DuaProcessEntity, DuaProcessStatus } from '../../../domain/entities/dua-process.entity';
import { IDuaProcessRepository } from '../../../domain/interfaces/dua-process-repository.interface';

/**
 * TypeORM implementation of IDuaProcessRepository.
 * Handles all persistence operations for the dua_processes table.
 * Eager-loads related file records when queried with files.
 */
@Injectable()
export class DuaProcessTypeOrmRepository implements IDuaProcessRepository {
  constructor(
    @InjectRepository(DuaProcessEntity)
    private readonly ormRepository: Repository<DuaProcessEntity>,
  ) {}

  async findById(id: string): Promise<DuaProcessEntity | null> {
    return this.ormRepository.findOneBy({ id });
  }

  async findByIdWithFiles(id: string): Promise<DuaProcessEntity | null> {
    return this.ormRepository.findOne({
      where: { id },
      relations: { files: true },
    });
  }

  async findAllByUser(userId: string): Promise<DuaProcessEntity[]> {
    return this.ormRepository.find({
      where: { createdById: userId },
      order: { createdAt: 'DESC' },
    });
  }

  async save(process: DuaProcessEntity): Promise<DuaProcessEntity> {
    return this.ormRepository.save(process);
  }

  async updateStatus(
    id: string,
    status: DuaProcessStatus,
    errorMessage?: string,
  ): Promise<void> {
    await this.ormRepository.update(id, {
      status,
      errorMessage: errorMessage ?? null,
    });
  }

  async updateExtractedData(id: string, data: Record<string, unknown>): Promise<void> {
    await this.ormRepository.update(id, { extractedData: data });
  }

  async updateOutputS3Key(id: string, s3Key: string): Promise<void> {
    await this.ormRepository.update(id, { outputS3Key: s3Key });
  }
}
