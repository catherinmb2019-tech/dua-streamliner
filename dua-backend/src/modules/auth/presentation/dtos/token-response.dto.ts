import { ApiProperty } from '@nestjs/swagger';

/** Outbound shape returned by login and refresh endpoints. */
export class TokenResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  idToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  expiresIn: number;
}
