import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ── Domain ───────────────────────────────────────────────────────────────────
import { DuaProcessEntity } from './domain/entities/dua-process.entity';
import { DUA_PROCESS_REPOSITORY } from './domain/interfaces/dua-process-repository.interface';
import { SEMANTIC_EXTRACTOR } from './domain/interfaces/semantic-extractor.interface';
import { DUA_DOCUMENT_GENERATOR } from './domain/interfaces/dua-document-generator.interface';

// ── Application ───────────────────────────────────────────────────────────────
import { DuaProcessService } from './application/dua-process.service';
import { FileProcessingPipeline } from './application/pipelines/file-processing.pipeline';
import { DuaGenerationPipeline } from './application/pipelines/dua-generation.pipeline';
import { FileProcessingAgent } from './application/agents/file-processing.agent';
import { OcrAgent } from './application/agents/ocr.agent';
import { ExtractionAgent } from './application/agents/extraction.agent';
import { MappingAgent } from './application/agents/mapping.agent';
import { ValidationAgent } from './application/agents/validation.agent';
import { DocumentGenerationAgent } from './application/agents/document-generation.agent';

// ── Infrastructure ────────────────────────────────────────────────────────────
import { DuaProcessTypeOrmRepository } from './infrastructure/persistence/repositories/dua-process-typeorm.repository';
import { ExtractionStrategyFactory } from './infrastructure/extraction/extraction-strategy.factory';
import { PdfExtractor } from './infrastructure/extraction/strategies/pdf-extractor.strategy';
import { WordExtractor } from './infrastructure/extraction/strategies/word-extractor.strategy';
import { ExcelExtractor } from './infrastructure/extraction/strategies/excel-extractor.strategy';
import { TesseractOcrEngine } from './infrastructure/ocr/tesseract-ocr-engine';
import { OCR_ENGINE } from './infrastructure/ocr/ocr-engine.interface';
import { AiSemanticExtractor } from './infrastructure/ai/ai-semantic-extractor';
import { DocxDuaGenerator } from './infrastructure/template/docx-dua-generator';

// ── Presentation ──────────────────────────────────────────────────────────────
import { DuaProcessController } from './presentation/controllers/dua-process.controller';

// ── Sibling modules ───────────────────────────────────────────────────────────
import { FilesModule } from '../files/files.module';
import { AppConfig } from '../../config/app.config';

/**
 * DUA module — the core bounded context of the system.
 * Wires all agents, pipelines, strategies, and infrastructure adapters
 * required for the end-to-end DUA generation workflow.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([DuaProcessEntity]),
    FilesModule,
  ],
  providers: [
    AppConfig,

    // ── Application services & orchestrators ──────────────────────────────
    DuaProcessService,
    FileProcessingPipeline,
    DuaGenerationPipeline,

    // ── Agents ────────────────────────────────────────────────────────────
    FileProcessingAgent,
    OcrAgent,
    ExtractionAgent,
    MappingAgent,
    ValidationAgent,
    DocumentGenerationAgent,

    // ── Extraction strategies ─────────────────────────────────────────────
    ExtractionStrategyFactory,
    PdfExtractor,
    WordExtractor,
    ExcelExtractor,

    // ── Infrastructure adapters (bound via tokens) ────────────────────────
    { provide: DUA_PROCESS_REPOSITORY, useClass: DuaProcessTypeOrmRepository },
    { provide: OCR_ENGINE,             useClass: TesseractOcrEngine },
    { provide: SEMANTIC_EXTRACTOR,     useClass: AiSemanticExtractor },
    { provide: DUA_DOCUMENT_GENERATOR, useClass: DocxDuaGenerator },
  ],
  controllers: [DuaProcessController],
  exports: [DuaProcessService],
})
export class DuaModule {}
