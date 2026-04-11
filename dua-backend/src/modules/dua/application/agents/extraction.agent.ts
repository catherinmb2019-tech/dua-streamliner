import { Injectable, Logger } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ISemanticExtractor, SEMANTIC_EXTRACTOR } from '../../domain/interfaces/semantic-extractor.interface';
import { ExtractedField } from '../../domain/value-objects/extracted-field.value-object';

/**
 * Agent #3 — Extraction Agent.
 * Receives the consolidated raw text from all source documents and
 * applies AI/NLP-based semantic analysis to identify and extract DUA-relevant fields.
 * Produces an array of ExtractedField value objects with confidence scores.
 */
@Injectable()
export class ExtractionAgent {
  private readonly logger = new Logger(ExtractionAgent.name);

  constructor(
    @Inject(SEMANTIC_EXTRACTOR)
    private readonly semanticExtractor: ISemanticExtractor,
  ) {}

  /**
   * Runs semantic extraction on the provided consolidated text.
   * @param consolidatedText  All document text joined into a single string.
   * @returns Extracted fields with confidence levels.
   */
  async extractFields(consolidatedText: string): Promise<ExtractedField[]> {
    return this.semanticExtractor.extractFields(consolidatedText);
  }
}
