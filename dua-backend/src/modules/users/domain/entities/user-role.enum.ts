/**
 * System roles used for RBAC.
 * Mapped to Cognito custom attributes and enforced via RolesGuard.
 */
export enum UserRole {
  ADMIN = 'ADMIN',
  OPERATOR = 'OPERATOR',
  VIEWER = 'VIEWER',
}
