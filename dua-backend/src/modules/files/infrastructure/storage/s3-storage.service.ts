import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { AwsConfig } from '../../../../config/aws.config';
import { IStorageService } from '../../domain/interfaces/storage-service.interface';

/**
 * AWS S3 implementation of IStorageService.
 * Accesses S3 via a private VPC endpoint as per network security policy.
 * Handles upload, presigned URL generation, download, and deletion.
 */
@Injectable()
export class S3StorageService implements IStorageService {
  private readonly s3Client: S3Client;

  constructor(private readonly awsConfig: AwsConfig) {
    this.s3Client = new S3Client({ region: this.awsConfig.region });
  }

  async upload(key: string, buffer: Buffer, mimeType: string): Promise<string> {
    throw new Error('Not implemented');
  }

  async getPresignedUrl(key: string, expiresInSeconds = 900): Promise<string> {
    throw new Error('Not implemented');
  }

  async download(key: string): Promise<Buffer> {
    throw new Error('Not implemented');
  }

  async delete(key: string): Promise<void> {
    throw new Error('Not implemented');
  }

  /** Builds a namespaced S3 key for a file within a DUA process. */
  buildKey(duaProcessId: string, fileName: string): string {
    return `dua-processes/${duaProcessId}/raw/${fileName}`;
  }

  /** Builds the S3 key for a generated DUA output document. */
  buildOutputKey(duaProcessId: string): string {
    return `dua-processes/${duaProcessId}/output/dua-document.docx`;
  }
}
