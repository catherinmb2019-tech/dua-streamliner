import { UserEntity } from '../entities/user.entity';

/**
 * Domain-level contract for user persistence operations.
 * Implemented in the infrastructure layer (TypeORM).
 * Keeps the domain free from database concerns.
 */
export interface IUserRepository {
  findById(id: string): Promise<UserEntity | null>;
  findByCognitoSub(cognitoSub: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  save(user: UserEntity): Promise<UserEntity>;
  softDelete(id: string): Promise<void>;
}

export const USER_REPOSITORY = Symbol('IUserRepository');
