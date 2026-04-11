import { IsString, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/** DTO for initiating a new DUA generation process. */
export class StartDuaProcessDto {
  @ApiPropertyOptional({
    description: 'Optional folder path containing the source documents',
    example: '/uploads/2026/q1/project-alpha',
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  sourceFolderPath?: string;
}
