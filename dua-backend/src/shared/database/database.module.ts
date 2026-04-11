import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from '../../config/database.config';
import { databaseConfigFactory } from './database-config.factory';

/**
 * Shared database module.
 * Provides the root TypeORM connection used across all feature modules.
 * Exported so AppModule can import it without repeating configuration.
 */
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: databaseConfigFactory,
      inject: [DatabaseConfig],
    }),
  ],
  providers: [DatabaseConfig],
  exports: [DatabaseConfig],
})
export class DatabaseModule {}
