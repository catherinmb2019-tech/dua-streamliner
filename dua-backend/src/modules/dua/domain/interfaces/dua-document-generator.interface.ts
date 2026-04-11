import { ExtractedField } from '../value-objects/extracted-field.value-object';

/**
 * Port for generating the final DUA Word document.
 * Maps extracted fields onto the DUA template and produces a .docx binary buffer.
 */
export interface IDuaDocumentGenerator {
  /**
   * Generates the DUA Word document from the provided fields.
   * @param fields  Extracted and validated field-value pairs.
   * @returns Raw .docx file buffer ready for S3 upload.
   */
  generate(fields: ExtractedField[]): Promise<Buffer>;
}

export const DUA_DOCUMENT_GENERATOR = Symbol('IDuaDocumentGenerator');
