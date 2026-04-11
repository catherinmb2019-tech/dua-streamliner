import { ExtractedField } from '../value-objects/extracted-field.value-object';

/**
 * Port for AI/NLP-based semantic extraction.
 * Analyses consolidated raw text from all documents in a DUA process
 * and produces a structured list of ExtractedField value objects.
 */
export interface ISemanticExtractor {
  /**
   * Analyses the consolidated document text and extracts DUA-relevant fields.
   * @param consolidatedText  All extracted text from source documents, concatenated.
   * @returns Array of field-value pairs with confidence scores.
   */
  extractFields(consolidatedText: string): Promise<ExtractedField[]>;
}

export const SEMANTIC_EXTRACTOR = Symbol('ISemanticExtractor');
