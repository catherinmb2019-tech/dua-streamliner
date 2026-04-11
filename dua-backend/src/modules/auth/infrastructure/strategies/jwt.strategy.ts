import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { AwsConfig } from '../../../../config/aws.config';
import { AuthenticatedUser } from '../../domain/interfaces/authenticated-user.interface';
import { UserRole } from '../../../users/domain/entities/user-role.enum';

/**
 * Passport JWT strategy backed by AWS Cognito JWKS.
 * Validates the signature of incoming Bearer tokens against the Cognito public keys
 * and maps the Cognito claims to the AuthenticatedUser shape.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly awsConfig: AwsConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: awsConfig.cognitoJwksUri,
      }),
      algorithms: ['RS256'],
    });
  }

  /**
   * Called after token signature validation.
   * Maps Cognito JWT claims to the internal AuthenticatedUser interface.
   */
  async validate(payload: Record<string, unknown>): Promise<AuthenticatedUser> {
    return {
      sub: payload.sub as string,
      email: payload.email as string,
      role: (payload['custom:role'] as UserRole) ?? UserRole.VIEWER,
    };
  }
}
