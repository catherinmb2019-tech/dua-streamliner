import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../domain/entities/user.entity';
import { IUserRepository } from '../../../domain/interfaces/user-repository.interface';

/**
 * TypeORM implementation of IUserRepository.
 * Handles all database operations for the users table in PostgreSQL (RDS).
 */
@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly ormRepository: Repository<UserEntity>,
  ) {}

  async findById(id: string): Promise<UserEntity | null> {
    return this.ormRepository.findOneBy({ id });
  }

  async findByCognitoSub(cognitoSub: string): Promise<UserEntity | null> {
    return this.ormRepository.findOneBy({ cognitoSub });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.ormRepository.findOneBy({ email });
  }

  async save(user: UserEntity): Promise<UserEntity> {
    return this.ormRepository.save(user);
  }

  async softDelete(id: string): Promise<void> {
    await this.ormRepository.update(id, { isActive: false });
  }
}
