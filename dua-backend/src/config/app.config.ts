import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Application-level configuration service.
 * Provides strongly-typed access to environment variables for the HTTP server and general settings.
 */
@Injectable()
export class AppConfig {
  constructor(private readonly configService: ConfigService) {}

  get port(): number {
    return this.configService.get<number>('PORT', 3000);
  }

  get nodeEnv(): string {
    return this.configService.get<string>('NODE_ENV', 'development');
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get payloadSizeLimitMb(): number {
    return this.configService.get<number>('PAYLOAD_SIZE_LIMIT_MB', 10);
  }

  get maxFilesPerDuaProcess(): number {
    return this.configService.get<number>('MAX_FILES_PER_DUA_PROCESS', 50);
  }

  get processingTimeoutMs(): number {
    return this.configService.get<number>('PROCESSING_TIMEOUT_MS', 300000);
  }

  get confidenceThresholdHigh(): number {
    return this.configService.get<number>('CONFIDENCE_THRESHOLD_HIGH', 0.9);
  }

  get confidenceThresholdMedium(): number {
    return this.configService.get<number>('CONFIDENCE_THRESHOLD_MEDIUM', 0.6);
  }

  /** Factory function for ConfigModule.forRoot({ load: [...] }) */
  static register() {
    return {};
  }
}
