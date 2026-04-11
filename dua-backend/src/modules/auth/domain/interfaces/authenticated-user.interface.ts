import { UserRole } from '../../../users/domain/entities/user-role.enum';

/**
 * Represents the decoded JWT payload attached to every authenticated request.
 * Populated by JwtStrategy after validating the Cognito token.
 */
export interface AuthenticatedUser {
  /** Cognito sub (unique user identifier) */
  sub: string;
  email: string;
  role: UserRole;
}
