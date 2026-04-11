import {
  Controller,
  Post,
  Get,
  Param,
  UploadedFiles,
  UseInterceptors,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiConsumes } from '@nestjs/swagger';
import { FilesService } from '../../application/files.service';
import { CurrentUser } from '../../../../common/decorators/current-user.decorator';
import { AuthenticatedUser } from '../../../auth/domain/interfaces/authenticated-user.interface';

/**
 * Presentation layer for file operations.
 * Handles multipart upload and provides file metadata and download URL endpoints.
 */
@ApiTags('Files')
@ApiBearerAuth()
@Controller('dua-processes/:processId/files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @ApiOperation({ summary: 'Upload one or more files for a DUA process (max 50 files, 10MB each)' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'))
  @HttpCode(HttpStatus.CREATED)
  async uploadFiles(
    @Param('processId') processId: string,
    @UploadedFiles() files: Express.Multer.File[],
    @CurrentUser() _user: AuthenticatedUser,
  ) {
    return this.filesService.ingestFiles(processId, files);
  }

  @Get()
  @ApiOperation({ summary: 'List all files associated with a DUA process' })
  async listFiles(@Param('processId') processId: string) {
    return this.filesService.findByDuaProcessId(processId);
  }

  @Get(':fileId/download-url')
  @ApiOperation({ summary: 'Get a short-lived pre-signed S3 URL for a file' })
  async getDownloadUrl(@Param('fileId') fileId: string) {
    const url = await this.filesService.getDownloadUrl(fileId);
    return { url };
  }
}
