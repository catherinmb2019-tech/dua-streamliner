import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Database configuration service.
 * Provides PostgreSQL/RDS connection parameters sourced from environment variables.
 */
@Injectable()
export class DatabaseConfig {
  constructor(private readonly configService: ConfigService) {}

  get host(): string {
    return this.configService.getOrThrow<string>('DB_HOST');
  }

  get port(): number {
    return this.configService.get<number>('DB_PORT', 5432);
  }

  get username(): string {
    return this.configService.getOrThrow<string>('DB_USERNAME');
  }

  get password(): string {
    return this.configService.getOrThrow<string>('DB_PASSWORD');
  }

  get database(): string {
    return this.configService.getOrThrow<string>('DB_NAME');
  }

  get ssl(): boolean {
    return this.configService.get<boolean>('DB_SSL', true);
  }

  static register() {
    return {};
  }
}
