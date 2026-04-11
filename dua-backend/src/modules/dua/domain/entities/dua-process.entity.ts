import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { FileRecordEntity } from '../../../files/domain/entities/file-record.entity';
import { UserEntity } from '../../../users/domain/entities/user.entity';

/** Lifecycle states of a DUA generation process. */
export enum DuaProcessStatus {
  PENDING = 'PENDING',
  SCANNING = 'SCANNING',
  PROCESSING = 'PROCESSING',
  EXTRACTING = 'EXTRACTING',
  GENERATING = 'GENERATING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

/** Confidence level assigned to individual extracted fields. */
export enum ConfidenceLevel {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

/**
 * Root aggregate for the DUA generation lifecycle.
 * Tracks the status of an end-to-end DUA process from file ingestion
 * through document generation. Acts as the parent of all FileRecordEntity rows.
 */
@Entity('dua_processes')
export class DuaProcessEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: DuaProcessStatus, default: DuaProcessStatus.PENDING })
  status: DuaProcessStatus;

  /** Folder path supplied by the user as the source of raw documents. */
  @Column({ nullable: true })
  sourceFolderPath: string | null;

  /** S3 key of the generated DUA Word document (set after generation completes). */
  @Column({ nullable: true })
  outputS3Key: string | null;

  /** Serialised JSON blob of extracted DUA field values and confidence scores. */
  @Column({ type: 'jsonb', nullable: true })
  extractedData: Record<string, unknown> | null;

  @Column({ nullable: true })
  errorMessage: string | null;

  @ManyToOne(() => UserEntity, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'created_by' })
  createdBy: UserEntity;

  @Column({ nullable: true })
  createdById: string | null;

  @OneToMany(() => FileRecordEntity, (file) => file.duaProcess, { cascade: true })
  files: FileRecordEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
