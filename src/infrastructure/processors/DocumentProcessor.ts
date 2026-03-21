export interface DocumentProcessor {
  process(file: File): Promise<any>;
}