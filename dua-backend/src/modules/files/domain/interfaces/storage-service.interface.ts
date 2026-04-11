/**
 * Domain-level port for file storage operations.
 * Implemented by S3StorageService. Decouples the domain from AWS specifics.
 */
export interface IStorageService {
  /**
   * Uploads a file buffer to the remote storage and returns the storage key.
   */
  upload(key: string, buffer: Buffer, mimeType: string): Promise<string>;

  /**
   * Generates a pre-signed URL for temporary direct access to the stored object.
   */
  getPresignedUrl(key: string, expiresInSeconds?: number): Promise<string>;

  /**
   * Downloads a file from storage and returns its raw buffer.
   */
  download(key: string): Promise<Buffer>;

  /**
   * Permanently removes an object from storage.
   */
  delete(key: string): Promise<void>;
}

export const STORAGE_SERVICE = Symbol('IStorageService');
