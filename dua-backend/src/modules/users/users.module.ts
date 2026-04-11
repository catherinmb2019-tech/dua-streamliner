import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './domain/entities/user.entity';
import { UserTypeOrmRepository } from './infrastructure/persistence/repositories/user-typeorm.repository';
import { UsersController } from './presentation/controllers/users.controller';
import { UsersService } from './application/users.service';
import { USER_REPOSITORY } from './domain/interfaces/user-repository.interface';

/**
 * Users module.
 * Manages user accounts within the system.
 * User identity originates in AWS Cognito; this module handles the local user record.
 */
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    UsersService,
    { provide: USER_REPOSITORY, useClass: UserTypeOrmRepository },
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
