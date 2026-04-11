import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileRecordEntity } from './domain/entities/file-record.entity';
import { FilesController } from './presentation/controllers/files.controller';
import { FilesService } from './application/files.service';
import { S3StorageService } from './infrastructure/storage/s3-storage.service';
import { FileTypeDetector } from './infrastructure/detection/file-type-detector';
import { FileTypeOrmRepository } from './infrastructure/persistence/repositories/file-typeorm.repository';
import { FILE_REPOSITORY } from './domain/interfaces/file-repository.interface';
import { AwsConfig } from '../../config/aws.config';

/**
 * Files module.
 * Handles file upload, metadata storage, and raw content extraction.
 * Delegates storage to AWS S3 and persistence to PostgreSQL.
 */
@Module({
  imports: [TypeOrmModule.forFeature([FileRecordEntity])],
  providers: [
    FilesService,
    S3StorageService,
    FileTypeDetector,
    AwsConfig,
    { provide: FILE_REPOSITORY, useClass: FileTypeOrmRepository },
  ],
  controllers: [FilesController],
  exports: [FilesService, S3StorageService],
})
export class FilesModule {}
