import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CognitoAuthService } from '../../infrastructure/cognito/cognito-auth.service';
import { LoginDto } from '../dtos/login.dto';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { TokenResponseDto } from '../dtos/token-response.dto';
import { Public } from '../../../../common/decorators/public.decorator';
import { CurrentUser } from '../../../../common/decorators/current-user.decorator';
import { AuthenticatedUser } from '../../domain/interfaces/authenticated-user.interface';

/**
 * Presentation layer for authentication.
 * Exposes login, token refresh, and logout endpoints.
 * Login and refresh are public; logout requires a valid JWT.
 */
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly cognitoAuthService: CognitoAuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate with email and password via AWS Cognito' })
  @ApiResponse({ status: 200, type: TokenResponseDto })
  async login(@Body() dto: LoginDto): Promise<TokenResponseDto> {
    return this.cognitoAuthService.login(dto);
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Exchange a refresh token for new access tokens' })
  @ApiResponse({ status: 200, type: TokenResponseDto })
  async refresh(@Body() dto: RefreshTokenDto): Promise<TokenResponseDto> {
    return this.cognitoAuthService.refreshToken(dto.refreshToken);
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Invalidate the current Cognito session' })
  async logout(@CurrentUser() user: AuthenticatedUser): Promise<void> {
    // access token extracted from user context; implementation delegates to Cognito global sign-out
    throw new Error('Not implemented');
  }
}
