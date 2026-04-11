import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../modules/users/domain/entities/user-role.enum';

export const ROLES_KEY = 'roles';

/**
 * Specifies which roles are allowed to access a route.
 * Consumed by RolesGuard.
 */
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
