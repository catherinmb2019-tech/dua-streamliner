import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseConfig } from '../../config/database.config';
import { UserEntity } from '../../modules/users/domain/entities/user.entity';
import { DuaProcessEntity } from '../../modules/dua/domain/entities/dua-process.entity';
import { FileRecordEntity } from '../../modules/files/domain/entities/file-record.entity';

/**
 * Factory function used by TypeOrmModule.forRootAsync().
 * Constructs the PostgreSQL connection options from DatabaseConfig.
 * All entities are registered centrally here to avoid forFeature-only discovery issues.
 */
export function databaseConfigFactory(dbConfig: DatabaseConfig): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    ssl: dbConfig.ssl ? { rejectUnauthorized: true } : false,
    entities: [
      UserEntity,
      DuaProcessEntity,
      FileRecordEntity,
    ],
    // Migrations are run via CLI in CI/CD — never synchronize in production
    synchronize: false,
    migrations: ['dist/shared/database/migrations/*.js'],
    migrationsRun: false,
    logging: process.env.NODE_ENV !== 'production',
    // Connection pool sizing for ECS Fargate container memory constraints
    extra: {
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    },
  };
}
