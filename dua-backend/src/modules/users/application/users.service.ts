import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IUserRepository, USER_REPOSITORY } from '../domain/interfaces/user-repository.interface';
import { UserEntity } from '../domain/entities/user.entity';

/**
 * Application service for user management.
 * Orchestrates use cases: provisioning, retrieval, and deactivation of users.
 * Contains no business logic beyond workflow coordination.
 */
@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  /** Retrieves a user by internal UUID. Throws NotFoundException if not found. */
  async findById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  /** Retrieves a user by Cognito sub claim. Throws NotFoundException if not found. */
  async findByCognitoSub(cognitoSub: string): Promise<UserEntity> {
    const user = await this.userRepository.findByCognitoSub(cognitoSub);
    if (!user) throw new NotFoundException(`User with Cognito sub ${cognitoSub} not found`);
    return user;
  }

  /** Creates a local user record for a newly provisioned Cognito user. */
  async provisionUser(cognitoSub: string, email: string): Promise<UserEntity> {
    throw new Error('Not implemented');
  }

  /** Soft-deletes a user record. */
  async deactivateUser(id: string): Promise<void> {
    throw new Error('Not implemented');
  }
}
