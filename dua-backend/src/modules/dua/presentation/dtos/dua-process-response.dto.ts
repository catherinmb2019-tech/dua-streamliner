import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DuaProcessStatus } from '../../domain/entities/dua-process.entity';

/** Outbound representation of a DUA process returned by the API. */
export class DuaProcessResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: DuaProcessStatus })
  status: DuaProcessStatus;

  @ApiPropertyOptional()
  sourceFolderPath?: string;

  @ApiPropertyOptional({ description: 'Present only when status is COMPLETED' })
  extractedData?: Record<string, unknown>;

  @ApiPropertyOptional()
  errorMessage?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
