import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DuaProcessService } from '../../application/dua-process.service';
import { StartDuaProcessDto } from '../dtos/start-dua-process.dto';
import { DuaProcessResponseDto } from '../dtos/dua-process-response.dto';
import { CurrentUser } from '../../../../common/decorators/current-user.decorator';
import { AuthenticatedUser } from '../../../auth/domain/interfaces/authenticated-user.interface';
import { Roles } from '../../../../common/decorators/roles.decorator';
import { UserRole } from '../../../users/domain/entities/user-role.enum';

/**
 * Presentation layer for DUA process management.
 * Exposes REST endpoints for the full DUA lifecycle:
 *   POST   /dua-processes              — start a new process
 *   POST   /dua-processes/:id/trigger  — trigger processing after files are uploaded
 *   GET    /dua-processes              — list all processes for the authenticated user
 *   GET    /dua-processes/:id          — retrieve process status and extracted data
 *   GET    /dua-processes/:id/result   — get a pre-signed download URL for the DUA document
 */
@ApiTags('DUA Processes')
@ApiBearerAuth()
@Controller('dua-processes')
export class DuaProcessController {
  constructor(private readonly duaProcessService: DuaProcessService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Start a new DUA generation process' })
  @ApiResponse({ status: 201, type: DuaProcessResponseDto })
  async startProcess(
    @Body() dto: StartDuaProcessDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<DuaProcessResponseDto> {
    return this.duaProcessService.startProcess(dto, user.sub) as unknown as DuaProcessResponseDto;
  }

  @Post(':id/trigger')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({
    summary: 'Trigger async processing pipeline after files have been uploaded',
  })
  async triggerProcessing(@Param('id') id: string): Promise<{ message: string }> {
    await this.duaProcessService.triggerProcessing(id);
    return { message: 'Processing pipeline started' };
  }

  @Get()
  @ApiOperation({ summary: 'List all DUA processes for the authenticated user' })
  @ApiResponse({ status: 200, type: [DuaProcessResponseDto] })
  async listProcesses(
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<DuaProcessResponseDto[]> {
    return this.duaProcessService.listUserProcesses(user.sub) as unknown as DuaProcessResponseDto[];
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get the status and details of a DUA process' })
  @ApiResponse({ status: 200, type: DuaProcessResponseDto })
  async getProcess(@Param('id') id: string): Promise<DuaProcessResponseDto> {
    return this.duaProcessService.getProcessStatus(id) as unknown as DuaProcessResponseDto;
  }

  @Get(':id/result')
  @ApiOperation({ summary: 'Get a pre-signed download URL for the generated DUA document' })
  async getResult(@Param('id') id: string): Promise<{ downloadUrl: string }> {
    const url = await this.duaProcessService.getResultDownloadUrl(id);
    return { downloadUrl: url };
  }
}
