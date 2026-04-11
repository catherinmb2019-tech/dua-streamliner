import { ConfidenceLevel } from '../entities/dua-process.entity';

/**
 * Value object representing a single field extracted from source documents.
 * Pairs the raw extracted value with a confidence level used for DUA template marking.
 */
export class ExtractedField {
  constructor(
    /** The field key as defined in the DUA template schema. */
    public readonly fieldKey: string,
    /** The extracted value (string, number, or date as ISO string). */
    public readonly value: string | number | null,
    /** Confidence level assigned by the semantic extraction agent. */
    public readonly confidence: ConfidenceLevel,
    /** Optional human-readable note about the extraction source. */
    public readonly sourceNote?: string,
  ) {}

  get isHighConfidence(): boolean {
    return this.confidence === ConfidenceLevel.HIGH;
  }

  get isMediumConfidence(): boolean {
    return this.confidence === ConfidenceLevel.MEDIUM;
  }

  get isLowConfidence(): boolean {
    return this.confidence === ConfidenceLevel.LOW;
  }
}
