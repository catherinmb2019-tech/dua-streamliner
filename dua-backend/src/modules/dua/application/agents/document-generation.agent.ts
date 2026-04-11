import { Injectable, Logger, Inject } from '@nestjs/common';
import { ExtractedField } from '../../domain/value-objects/extracted-field.value-object';
import {
  IDuaDocumentGenerator,
  DUA_DOCUMENT_GENERATOR,
} from '../../domain/interfaces/dua-document-generator.interface';

/**
 * Agent #6 — Document Generation Agent.
 * Receives the validated, mapped DUA fields and delegates rendering to the
 * IDuaDocumentGenerator implementation, which produces the final .docx buffer.
 * Fields are colour-coded by confidence level before rendering.
 */
@Injectable()
export class DocumentGenerationAgent {
  private readonly logger = new Logger(DocumentGenerationAgent.name);

  constructor(
    @Inject(DUA_DOCUMENT_GENERATOR)
    private readonly generator: IDuaDocumentGenerator,
  ) {}

  /**
   * Generates the DUA Word document from the provided mapped fields.
   * @param mappedFields  Validated field map from MappingAgent + ValidationAgent.
   * @returns Raw .docx buffer for upload to S3.
   */
  async generate(mappedFields: Record<string, ExtractedField>): Promise<Buffer> {
    const fields = Object.values(mappedFields);
    return this.generator.generate(fields);
  }
}
