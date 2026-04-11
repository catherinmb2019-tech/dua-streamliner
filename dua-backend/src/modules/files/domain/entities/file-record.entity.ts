import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { DuaProcessEntity } from '../../../dua/domain/entities/dua-process.entity';

/** Supported document types. Determines which extraction strategy is applied. */
export enum DocumentType {
  PDF = 'PDF',
  WORD = 'WORD',
  EXCEL = 'EXCEL',
  IMAGE = 'IMAGE',
  UNKNOWN = 'UNKNOWN',
}

/** Processing status of an individual file within a DUA process. */
export enum FileProcessingStatus {
  PENDING = 'PENDING',
  EXTRACTING = 'EXTRACTING',
  EXTRACTED = 'EXTRACTED',
  FAILED = 'FAILED',
}

/**
 * Persistent record for a file submitted as part of a DUA generation process.
 * Tracks metadata, S3 location, document type, and extraction status.
 */
@Entity('file_records')
export class FileRecordEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originalName: string;

  @Column()
  mimeType: string;

  @Column({ type: 'bigint' })
  sizeBytes: number;

  /** S3 object key where the raw file is stored. */
  @Column()
  s3Key: string;

  @Column({ type: 'enum', enum: DocumentType, default: DocumentType.UNKNOWN })
  documentType: DocumentType;

  @Column({ type: 'enum', enum: FileProcessingStatus, default: FileProcessingStatus.PENDING })
  status: FileProcessingStatus;

  /** Raw text extracted from the document (null until extraction completes). */
  @Column({ type: 'text', nullable: true })
  extractedText: string | null;

  @Column({ nullable: true })
  errorMessage: string | null;

  @ManyToOne(() => DuaProcessEntity, (process) => process.files, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'dua_process_id' })
  duaProcess: DuaProcessEntity;

  @Column()
  duaProcessId: string;

  @CreateDateColumn()
  createdAt: Date;
}
