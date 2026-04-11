import { Injectable, Logger } from '@nestjs/common';
import { ISemanticExtractor } from '../../domain/interfaces/semantic-extractor.interface';
import { ExtractedField } from '../../domain/value-objects/extracted-field.value-object';
import { ConfidenceLevel } from '../../domain/entities/dua-process.entity';
import { DuaTemplateSchema } from '../template/dua-template.schema';
import { AppConfig } from '../../../../config/app.config';

/**
 * AI/NLP implementation of ISemanticExtractor.
 * Sends consolidated document text to an external LLM / NLP model endpoint
 * and parses the structured response into ExtractedField value objects.
 *
 * Confidence scoring is normalised against AppConfig thresholds:
 *   - score >= confidenceThresholdHigh   → ConfidenceLevel.HIGH
 *   - score >= confidenceThresholdMedium → ConfidenceLevel.MEDIUM
 *   - score <  confidenceThresholdMedium → ConfidenceLevel.LOW
 */
@Injectable()
export class AiSemanticExtractor implements ISemanticExtractor {
  private readonly logger = new Logger(AiSemanticExtractor.name);

  constructor(private readonly appConfig: AppConfig) {}

  async extractFields(consolidatedText: string): Promise<ExtractedField[]> {
    throw new Error('Not implemented');
  }

  /**
   * Builds the prompt sent to the AI model for field extraction.
   * Includes the DUA field schema so the model knows which keys to target.
   */
  private buildPrompt(text: string): string {
    throw new Error('Not implemented');
  }

  /**
   * Parses the raw model response JSON into ExtractedField value objects.
   * Applies confidence threshold normalisation.
   */
  private parseModelResponse(
    rawResponse: unknown,
  ): ExtractedField[] {
    throw new Error('Not implemented');
  }

  /** Maps a raw numeric confidence score to a ConfidenceLevel enum value. */
  private mapConfidence(score: number): ConfidenceLevel {
    if (score >= this.appConfig.confidenceThresholdHigh) return ConfidenceLevel.HIGH;
    if (score >= this.appConfig.confidenceThresholdMedium) return ConfidenceLevel.MEDIUM;
    return ConfidenceLevel.LOW;
  }
}
