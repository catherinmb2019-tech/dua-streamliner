import { Injectable } from '@nestjs/common';
import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';
import { AwsConfig } from '../../../../config/aws.config';
import { LoginDto } from '../../presentation/dtos/login.dto';
import { TokenResponseDto } from '../../presentation/dtos/token-response.dto';

/**
 * Infrastructure service that delegates authentication operations to AWS Cognito.
 * Wraps the Cognito SDK and abstracts credential exchange from the rest of the application.
 */
@Injectable()
export class CognitoAuthService {
  private readonly cognitoClient: CognitoIdentityProviderClient;

  constructor(private readonly awsConfig: AwsConfig) {
    this.cognitoClient = new CognitoIdentityProviderClient({
      region: this.awsConfig.region,
    });
  }

  /**
   * Initiates USER_PASSWORD_AUTH flow against Cognito.
   * Returns access, id, and refresh tokens on success.
   */
  async login(_dto: LoginDto): Promise<TokenResponseDto> {
    throw new Error('Not implemented');
  }

  /**
   * Exchanges a Cognito refresh token for a new set of tokens.
   */
  async refreshToken(_refreshToken: string): Promise<TokenResponseDto> {
    throw new Error('Not implemented');
  }

  /**
   * Invalidates the user's Cognito session (global sign-out).
   */
  async logout(_accessToken: string): Promise<void> {
    throw new Error('Not implemented');
  }
}
