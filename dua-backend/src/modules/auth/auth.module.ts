import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { CognitoAuthService } from './infrastructure/cognito/cognito-auth.service';
import { AuthController } from './presentation/controllers/auth.controller';
import { AwsConfig } from '../../config/aws.config';

/**
 * Authentication module.
 * Integrates with AWS Cognito for JWT issuance and validation.
 * Exposes login and token-refresh endpoints.
 */
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}), // JWT options resolved dynamically via JwtStrategy
  ],
  providers: [JwtStrategy, CognitoAuthService, AwsConfig],
  controllers: [AuthController],
  exports: [CognitoAuthService],
})
export class AuthModule {}
