import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * AWS-specific configuration service.
 * Provides region, S3 bucket, and Cognito parameters.
 */
@Injectable()
export class AwsConfig {
  constructor(private readonly configService: ConfigService) {}

  get region(): string {
    return this.configService.getOrThrow<string>('AWS_REGION');
  }

  get s3BucketName(): string {
    return this.configService.getOrThrow<string>('AWS_S3_BUCKET_NAME');
  }

  get cognitoUserPoolId(): string {
    return this.configService.getOrThrow<string>('AWS_COGNITO_USER_POOL_ID');
  }

  get cognitoClientId(): string {
    return this.configService.getOrThrow<string>('AWS_COGNITO_CLIENT_ID');
  }

  get cognitoJwksUri(): string {
    return `https://cognito-idp.${this.region}.amazonaws.com/${this.cognitoUserPoolId}/.well-known/jwks.json`;
  }
}
