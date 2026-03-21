import { ProcessorFactory } from "../../infrastructure/processors/ProcessorFactory";
import { Logger } from "../../patterns/singleton/Logger";

export class DUAServiceFacade {
  async startDUAProcess(files: File[], onProgress: (p: number) => void) {
    const logger = Logger.getInstance();
    let processed = 0;

    for (const file of files) {
      const type = this.detectType(file.name);
      const processor = ProcessorFactory.getProcessor(type);

      await processor.process(file);

      processed++;
      onProgress(Math.floor((processed / files.length) * 100));
    }

    logger.log("DUA Processing completed");
  }

  private detectType(filename: string) {
    if (filename.endsWith(".docx")) return "docx";
    if (filename.endsWith(".xlsx")) return "xlsx";
    if (filename.endsWith(".pdf")) return "pdf";
    return "image";
  }
}