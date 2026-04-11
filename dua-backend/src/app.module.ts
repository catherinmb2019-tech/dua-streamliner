import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { DuaModule } from './modules/dua/dua.module';
import { FilesModule } from './modules/files/files.module';
import { UsersModule } from './modules/users/users.module';
import { AppConfig } from './config/app.config';
import { DatabaseConfig } from './config/database.config';
import { databaseConfigFactory } from './shared/database/database-config.factory';

/**
 * Root application module.
 * Wires together all feature modules, global config, and the database connection.
 */
@Module({
  imports: [
    // Global configuration — loads env vars and validates them
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig.register, DatabaseConfig.register],
    }),

    // TypeORM database connection (PostgreSQL via RDS)
    TypeOrmModule.forRootAsync({
      useFactory: databaseConfigFactory,
      inject: [DatabaseConfig],
    }),

    // Feature modules
    AuthModule,
    UsersModule,
    FilesModule,
    DuaModule,
  ],
  providers: [AppConfig],
})
export class AppModule {}
